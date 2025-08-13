"use client"

import { Task, Column, TaskStatus } from '@/lib/kanban-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TaskCard } from './task-card'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface KanbanColumnProps {
    column: Column
    tasks: Task[]
    onAddTask: (status?: TaskStatus) => void
    onEditTask: (task: Task) => void
    onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({
    column,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask
}: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: {
            type: 'column',
            column,
        },
    })

    const taskIds = tasks.map(task => task.id)

    return (
        <div className="flex flex-col h-full w-full">
            <Card className="flex flex-col h-full min-h-[500px]">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            {column.color && (
                                <div
                                    className="w-3 h-3 rounded-full border"
                                    style={{ backgroundColor: column.color }}
                                />
                            )}
                            {column.title}
                            <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                                {tasks.length}
                            </span>
                        </CardTitle>
                        <Button
                            variant="noShadow"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onAddTask(column.status)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 pt-0">
                    <div
                        ref={setNodeRef}
                        className={`min-h-[200px] transition-colors ${isOver ? 'bg-muted/50 rounded-md' : ''
                            }`}
                    >
                        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={onEditTask}
                                    onDelete={onDeleteTask}
                                />
                            ))}
                        </SortableContext>

                        {tasks.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                                <p className="text-sm">No tasks yet</p>
                                <Button
                                    variant="noShadow"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => onAddTask(column.status)}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add task
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
