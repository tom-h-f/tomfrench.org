"use client"

import { Task, TaskFormData, TaskStatus, PREDEFINED_TAGS } from '@/lib/kanban-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    dueDate: z.date().optional(),
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
            dueDate: task?.dueDate || undefined,
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
            dueDate: data.dueDate || undefined,
            tags: tags.length > 0 ? tags : undefined,
        }

        if (initialStatus) {
            formData.status = initialStatus
        }

        onSubmit(formData)
    }

    return (
        <div className="w-full mx-auto">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">{task ? 'Edit Task' : 'Create New Task'}</h2>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-3 gap-6 min-h-[400px]">
                    {/* Left Column - Title and Description (2/3) */}
                    <div className="col-span-2 flex flex-col space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-2">
                                Title *
                            </label>
                            <Input
                                id="title"
                                {...register('title')}
                                placeholder="Task title..."
                                className={`text-base ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label htmlFor="description" className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register('description')}
                                placeholder="Task description..."
                                className="flex-1 w-full px-3 py-2 text-sm border-2 border-border rounded-base bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                            />
                        </div>
                    </div>

                    {/* Right Column - Other Fields (1/3) */}
                    <div className="col-span-1 space-y-4">
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium mb-2">
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
                            <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
                                Due Date
                            </label>
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="date"
                                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const dateValue = e.target.value
                                            field.onChange(dateValue ? new Date(dateValue) : undefined)
                                        }}
                                        className="text-sm"
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium mb-2">
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
                                    className="flex-1 text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            addTag()
                                        }
                                    }}
                                />
                                <Button type="button" variant="neutral" size="sm" onClick={addTag}>
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
                    </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-border">
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
        </div>
    )
}
