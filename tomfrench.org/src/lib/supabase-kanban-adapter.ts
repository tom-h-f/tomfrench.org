import { createClient } from '@/utils/supabase/client'
import { Task, Column, TaskStatus, TaskPriority } from '@/lib/kanban-types'
import { StorageAdapter } from '@/lib/kanban-storage'

// Database types for Supabase
interface DatabaseTask {
    id: string
    title: string
    description: string | null
    status: TaskStatus
    priority: 'low' | 'medium' | 'high' | 'urgent'
    created_at: string
    updated_at: string
    due_date: string | null
    user_id: string
    tags?: DatabaseTag[]
}

interface DatabaseTag {
    id: string
    name: string
    color: string | null
    user_id: string
    created_at: string
}

interface DatabaseColumn {
    id: string
    title: string
    status: TaskStatus
    color: string | null
    order: number
    user_id: string
    created_at: string
}

interface DatabaseTaskTag {
    task_id: string
    tags: {
        id: string
        name: string
        color: string
    }
}


export class SupabaseAdapter implements StorageAdapter {
    private supabase = createClient()

    private mapDatabaseTaskToTask(dbTask: DatabaseTask): Task {
        return {
            id: dbTask.id,
            title: dbTask.title,
            description: dbTask.description || undefined,
            status: dbTask.status,
            priority: dbTask.priority,
            createdAt: new Date(dbTask.created_at),
            updatedAt: new Date(dbTask.updated_at),
            dueDate: dbTask.due_date ? new Date(dbTask.due_date) : undefined,
            tags: dbTask.tags?.map(tag => tag.name) || undefined,
        }
    }

    private mapDatabaseColumnToColumn(dbColumn: DatabaseColumn): Column {
        return {
            id: dbColumn.id,
            title: dbColumn.title,
            status: dbColumn.status,
            color: dbColumn.color || undefined,
            order: dbColumn.order,
        }
    }

    async getTasks(): Promise<Task[]> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        // Use the new function that includes opacity calculation
        const { data: tasksWithOpacity, error: tasksError } = await this.supabase
            .rpc('get_tasks_with_opacity')

        if (tasksError) {
            throw new Error(`Failed to fetch tasks: ${tasksError.message}`)
        }

        // Get task tags separately
        const { data: taskTags, error: tagsError } = await this.supabase
            .from('task_tags')
            .select(`
                task_id,
                tags (
                    id,
                    name,
                    color
                )
            `)

        if (tagsError) {
            throw new Error(`Failed to fetch task tags: ${tagsError.message}`)
        }

        // Group tags by task_id - handle the nested structure properly
        const tagsByTaskId: Record<string, string[]> = {}
        if (taskTags) {
            for (const taskTag of taskTags) {
                const taskId = taskTag.task_id
                // The tags field comes as an object, not an array in this query
                const tags = taskTag.tags as unknown as { id: string; name: string; color: string } | null
                const tagName = tags?.name
                if (taskId && tagName) {
                    if (!tagsByTaskId[taskId]) {
                        tagsByTaskId[taskId] = []
                    }
                    tagsByTaskId[taskId].push(tagName)
                }
            }
        }

        return (tasksWithOpacity || []).map((task: {
            id: string
            title: string
            description: string | null
            status: string
            priority: string
            created_at: string
            updated_at: string
            due_date: string | null
            user_id: string
            opacity: number
        }) => ({
            id: task.id,
            title: task.title,
            description: task.description || undefined,
            status: task.status as TaskStatus,
            priority: task.priority as TaskPriority,
            createdAt: new Date(task.created_at),
            updatedAt: new Date(task.updated_at),
            dueDate: task.due_date ? new Date(task.due_date) : undefined,
            tags: tagsByTaskId[task.id] || undefined,
            opacity: task.opacity || 1.0,
        }))
    }

    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        // Insert the task
        const { data: task, error: taskError } = await this.supabase
            .from('tasks')
            .insert({
                title: taskData.title,
                description: taskData.description || null,
                status: taskData.status,
                priority: taskData.priority,
                due_date: taskData.dueDate?.toISOString() || null,
                user_id: user.user.id,
            })
            .select()
            .single()

        if (taskError) {
            throw new Error(`Failed to create task: ${taskError.message}`)
        }

        // Handle tags if provided
        if (taskData.tags && taskData.tags.length > 0) {
            await this.handleTaskTags(task.id, taskData.tags, user.user.id)
        }

        // Fetch the complete task with tags
        const createdTask = await this.getTaskById(task.id)
        return createdTask
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        // Prepare update data
        const updateData: Record<string, unknown> = {}
        if (updates.title !== undefined) updateData.title = updates.title
        if (updates.description !== undefined) updateData.description = updates.description || null
        if (updates.status !== undefined) updateData.status = updates.status
        if (updates.priority !== undefined) updateData.priority = updates.priority
        if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate?.toISOString() || null

        // Update the task
        const { error: taskError } = await this.supabase
            .from('tasks')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', user.user.id)

        if (taskError) {
            throw new Error(`Failed to update task: ${taskError.message}`)
        }

        // Handle tags if provided
        if (updates.tags !== undefined) {
            await this.handleTaskTags(id, updates.tags, user.user.id)
        }

        // Fetch the updated task
        const updatedTask = await this.getTaskById(id)
        return updatedTask
    }

    async deleteTask(id: string): Promise<void> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        const { error } = await this.supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .eq('user_id', user.user.id)

        if (error) {
            throw new Error(`Failed to delete task: ${error.message}`)
        }
    }

    async getColumns(): Promise<Column[]> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        const { data: columns, error } = await this.supabase
            .from('columns')
            .select('*')
            .eq('user_id', user.user.id)
            .order('order', { ascending: true })

        if (error) {
            throw new Error(`Failed to fetch columns: ${error.message}`)
        }

        return columns.map(this.mapDatabaseColumnToColumn)
    }

    async updateColumns(columns: Column[]): Promise<Column[]> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        // Update each column
        const updatePromises = columns.map(column =>
            this.supabase
                .from('columns')
                .update({
                    title: column.title,
                    color: column.color || null,
                    order: column.order,
                })
                .eq('id', column.id)
                .eq('user_id', user.user.id)
        )

        const results = await Promise.all(updatePromises)

        // Check for errors
        const error = results.find(result => result.error)?.error
        if (error) {
            throw new Error(`Failed to update columns: ${error.message}`)
        }

        return columns
    }

    private async getTaskById(id: string): Promise<Task> {
        const { data: task, error } = await this.supabase
            .from('tasks')
            .select(`
        *,
        task_tags (
          tags (
            id,
            name,
            color
          )
        )
      `)
            .eq('id', id)
            .single()

        if (error) {
            throw new Error(`Failed to fetch task: ${error.message}`)
        }

        return {
            id: task.id,
            title: task.title,
            description: task.description || undefined,
            status: task.status,
            priority: task.priority,
            createdAt: new Date(task.created_at),
            updatedAt: new Date(task.updated_at),
            dueDate: task.due_date ? new Date(task.due_date) : undefined,
            tags: task.task_tags?.map((tt: DatabaseTaskTag) => tt.tags.name) || undefined,
        }
    }

    private async handleTaskTags(taskId: string, tagNames: string[], userId: string): Promise<void> {
        // Remove existing tags for this task
        await this.supabase
            .from('task_tags')
            .delete()
            .eq('task_id', taskId)

        if (tagNames.length === 0) {
            return
        }

        // Get or create tags
        const tagIds: string[] = []
        for (const tagName of tagNames) {
            const { data: existingTag } = await this.supabase
                .from('tags')
                .select('id')
                .eq('name', tagName)
                .eq('user_id', userId)
                .single()

            if (!existingTag) {
                // Create new tag
                const { data: newTag, error } = await this.supabase
                    .from('tags')
                    .insert({
                        name: tagName,
                        user_id: userId,
                    })
                    .select('id')
                    .single()

                if (error) {
                    throw new Error(`Failed to create tag: ${error.message}`)
                }

                tagIds.push(newTag.id)
            } else {
                tagIds.push(existingTag.id)
            }
        }

        // Create task-tag relationships
        const taskTagInserts = tagIds.map(tagId => ({
            task_id: taskId,
            tag_id: tagId,
        }))

        const { error } = await this.supabase
            .from('task_tags')
            .insert(taskTagInserts)

        if (error) {
            throw new Error(`Failed to create task-tag relationships: ${error.message}`)
        }
    }

    // Get user's tags for autocomplete/suggestions
    async getUserTags(): Promise<string[]> {
        const { data: user } = await this.supabase.auth.getUser()
        if (!user.user) {
            throw new Error('User not authenticated')
        }

        const { data: tags, error } = await this.supabase
            .from('tags')
            .select('name')
            .eq('user_id', user.user.id)
            .order('name')

        if (error) {
            throw new Error(`Failed to fetch user tags: ${error.message}`)
        }

        return tags.map(tag => tag.name)
    }
}
