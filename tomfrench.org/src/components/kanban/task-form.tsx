"use client"

import { Task, TaskFormData, TaskStatus, PREDEFINED_TAGS } from '@/lib/kanban-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    dueDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

interface TaskFormProps {
    task?: Task
    initialStatus?: TaskStatus
    onSubmit: (data: TaskFormData & { status?: TaskStatus }) => void
    onCancel: () => void
}

export function TaskForm({ task, initialStatus, onSubmit, onCancel }: TaskFormProps) {
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState<string[]>(task?.tags || [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'medium',
            dueDate: task?.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
            tags: task?.tags || [],
        },
    })

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const onFormSubmit = (data: z.infer<typeof taskSchema>) => {
        const formData: TaskFormData & { status?: TaskStatus } = {
            title: data.title,
            description: data.description || undefined,
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
            tags: tags.length > 0 ? tags : undefined,
        }

        if (initialStatus) {
            formData.status = initialStatus
        }

        onSubmit(formData)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{task ? 'Edit Task' : 'Create New Task'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Title *
                        </label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Task title..."
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register('description')}
                            placeholder="Task description..."
                            className="w-full min-h-[80px] px-3 py-2 text-sm border-2 border-border rounded-base bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y"
                        />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium mb-1">
                            Priority
                        </label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                            Due Date
                        </label>
                        <Input
                            id="dueDate"
                            type="date"
                            {...register('dueDate')}
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-1">
                            Tags
                        </label>

                        {/* Predefined tags */}
                        <div className="mb-3">
                            <p className="text-xs text-muted-foreground mb-2">Quick select:</p>
                            <div className="flex flex-wrap gap-1">
                                {PREDEFINED_TAGS.map((predefinedTag) => (
                                    <Button
                                        key={predefinedTag}
                                        type="button"
                                        variant={tags.includes(predefinedTag) ? 'default' : 'neutral'}
                                        size="sm"
                                        className="text-xs h-7 px-2"
                                        onClick={() => {
                                            if (tags.includes(predefinedTag)) {
                                                removeTag(predefinedTag)
                                            } else {
                                                setTags([...tags, predefinedTag])
                                            }
                                        }}
                                    >
                                        {predefinedTag}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Custom tag input */}
                        <div className="flex gap-2 mb-2">
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Add custom tag..."
                                className="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        addTag()
                                    }
                                }}
                            />
                            <Button type="button" variant="noShadow" onClick={addTag}>
                                Add
                            </Button>
                        </div>

                        {/* Selected tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="neutral" className="text-xs">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                        </Button>
                        <Button
                            type="button"
                            variant="neutral"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
