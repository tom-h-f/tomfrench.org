export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    createdAt: Date
    updatedAt: Date
    dueDate?: Date
    tags?: string[]
    opacity?: number // For visual feedback on done tasks (0.8 for tasks pending deletion)
}

export interface Column {
    id: string
    title: string
    status: TaskStatus
    color?: string
    order: number
}

export type TaskStatus = 'backlog' | 'ready' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanState {
    tasks: Task[]
    columns: Column[]
}

export interface TaskFormData {
    title: string
    description?: string
    priority: TaskPriority
    dueDate?: Date
    tags?: string[]
}

export interface ViewState {
    view: 'kanban' | 'list'
}

// Predefined tags for easier selection
export const PREDEFINED_TAGS = [
    'bug', 'feature', 'enhancement', 'documentation', 'urgent', 'design',
    'frontend', 'backend', 'testing', 'research', 'meeting', 'review'
] as const
