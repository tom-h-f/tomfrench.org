import { Task, Column, KanbanState, TaskStatus } from './kanban-types'
import { SupabaseAdapter } from './supabase-kanban-adapter'
import { createClient } from '@/utils/supabase/client'

const STORAGE_KEY = 'kanban-data'

// Default columns
const defaultColumns: Column[] = [
    { id: 'backlog', title: 'Backlog', status: 'backlog', color: '#6b7280', order: 0 },
    { id: 'ready', title: 'Ready', status: 'ready', color: '#3b82f6', order: 1 },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: '#f59e0b', order: 2 },
    { id: 'done', title: 'Done', status: 'done', color: '#10b981', order: 3 },
]

// Interface for external storage adapters (future Supabase integration)
export interface StorageAdapter {
    getTasks(): Promise<Task[]>
    createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>
    updateTask(id: string, updates: Partial<Task>): Promise<Task>
    deleteTask(id: string): Promise<void>
    getColumns(): Promise<Column[]>
    updateColumns(columns: Column[]): Promise<Column[]>
}

// Local storage implementation
class LocalStorageAdapter implements StorageAdapter {
    private getStorageData(): KanbanState {
        if (typeof window === 'undefined') {
            return { tasks: [], columns: defaultColumns }
        }

        try {
            const data = localStorage.getItem(STORAGE_KEY)
            if (!data) {
                const initialState = { tasks: [], columns: defaultColumns }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
                return initialState
            }

            const parsed = JSON.parse(data) as KanbanState
            // Convert date strings back to Date objects
            parsed.tasks = parsed.tasks.map(task => ({
                ...task,
                createdAt: new Date(task.createdAt),
                updatedAt: new Date(task.updatedAt),
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            }))

            // Ensure we have default columns if none exist
            if (!parsed.columns || parsed.columns.length === 0) {
                parsed.columns = defaultColumns
            }

            return parsed
        } catch (error) {
            console.error('Error parsing kanban data from localStorage:', error)
            return { tasks: [], columns: defaultColumns }
        }
    }

    private saveStorageData(data: KanbanState): void {
        if (typeof window === 'undefined') return

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } catch (error) {
            console.error('Error saving kanban data to localStorage:', error)
        }
    }

    async getTasks(): Promise<Task[]> {
        return this.getStorageData().tasks
    }

    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        const data = this.getStorageData()
        const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        data.tasks.push(newTask)
        this.saveStorageData(data)
        return newTask
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
        const data = this.getStorageData()
        const taskIndex = data.tasks.findIndex(task => task.id === id)

        if (taskIndex === -1) {
            throw new Error(`Task with id ${id} not found`)
        }

        const updatedTask = {
            ...data.tasks[taskIndex],
            ...updates,
            updatedAt: new Date(),
        }

        data.tasks[taskIndex] = updatedTask
        this.saveStorageData(data)
        return updatedTask
    }

    async deleteTask(id: string): Promise<void> {
        const data = this.getStorageData()
        data.tasks = data.tasks.filter(task => task.id !== id)
        this.saveStorageData(data)
    }

    async getColumns(): Promise<Column[]> {
        return this.getStorageData().columns
    }

    async updateColumns(columns: Column[]): Promise<Column[]> {
        const data = this.getStorageData()
        data.columns = columns
        this.saveStorageData(data)
        return columns
    }
}

// Storage service that can be swapped out for different adapters
class KanbanStorage {
    private adapter: StorageAdapter
    private supabase = createClient()

    constructor(adapter: StorageAdapter = new LocalStorageAdapter()) {
        this.adapter = adapter
    }

    setAdapter(adapter: StorageAdapter) {
        this.adapter = adapter
    }

    private async getAdapter(): Promise<StorageAdapter> {
        // Check if user is authenticated and switch to Supabase adapter
        try {
            const { data: { user } } = await this.supabase.auth.getUser()
            if (user && !(this.adapter instanceof SupabaseAdapter)) {
                this.adapter = new SupabaseAdapter()
            } else if (!user && this.adapter instanceof SupabaseAdapter) {
                this.adapter = new LocalStorageAdapter()
            }
        } catch {
            // If auth check fails, use local storage
            if (this.adapter instanceof SupabaseAdapter) {
                this.adapter = new LocalStorageAdapter()
            }
        }
        return this.adapter
    }

    async getTasks(): Promise<Task[]> {
        const adapter = await this.getAdapter()
        return adapter.getTasks()
    }

    async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        const adapter = await this.getAdapter()
        return adapter.createTask(task)
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
        const adapter = await this.getAdapter()
        return adapter.updateTask(id, updates)
    }

    async deleteTask(id: string): Promise<void> {
        const adapter = await this.getAdapter()
        return adapter.deleteTask(id)
    }

    async getColumns(): Promise<Column[]> {
        const adapter = await this.getAdapter()
        return adapter.getColumns()
    }

    async updateColumns(columns: Column[]): Promise<Column[]> {
        const adapter = await this.getAdapter()
        return adapter.updateColumns(columns)
    }

    async moveTask(taskId: string, newStatus: TaskStatus): Promise<Task> {
        const adapter = await this.getAdapter()
        return adapter.updateTask(taskId, { status: newStatus })
    }
}

// Export singleton instance
export const kanbanStorage = new KanbanStorage()
