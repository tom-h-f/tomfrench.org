"use client"

import { Task } from '@/lib/kanban-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

interface TaskCardProps {
    task: Task
    onEdit: (task: Task) => void
    onDelete: (taskId: string) => void
}

const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'task',
            task,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: task.opacity ?? 1.0,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''
                }`}
        >
            <Card className="mb-3 hover:shadow-[4px_4px_0px_0px_var(--border)] transition-all">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium leading-tight">
                            {task.title}
                        </CardTitle>
                        <div className="flex gap-1">
                            <Button
                                variant="noShadow"
                                size="icon"
                                className="h-6 w-6 opacity-60 hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit(task)
                                }}
                            >
                                <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="noShadow"
                                size="icon"
                                className="h-6 w-6 opacity-60 hover:opacity-100 text-red-600"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(task.id)
                                }}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {(task.description || task.dueDate || task.tags?.length) && (
                    <CardContent className="pt-0">
                        {task.description && (
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                {task.description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 items-center">
                            <Badge
                                variant="neutral"
                                className={`text-xs ${priorityColors[task.priority]}`}
                            >
                                {task.priority}
                            </Badge>

                            {task.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {format(task.dueDate, 'MMM d')}
                                </div>
                            )}
                        </div>

                        {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {task.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="neutral"
                                        className="text-xs px-1 py-0"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </CardContent>
                )}
            </Card>
        </div>
    )
}
