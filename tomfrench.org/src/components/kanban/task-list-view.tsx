"use client"

import { Task, TaskStatus } from '@/lib/kanban-types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Calendar, Trash2, Clock, ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface TaskListViewProps {
    tasks: Task[]
    onEditTask: (task: Task) => void
    onDeleteTask: (taskId: string) => void
    onUpdateStatus: (taskId: string, status: TaskStatus) => void
}

const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
}

const statusColors = {
    'backlog': 'bg-gray-50 text-gray-700 border-gray-200',
    'ready': 'bg-blue-50 text-blue-700 border-blue-200',
    'in-progress': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'done': 'bg-green-50 text-green-700 border-green-200',
}

type SortField = 'title' | 'status' | 'priority' | 'dueDate' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export function TaskListView({ tasks, onEditTask, onDeleteTask, onUpdateStatus }: TaskListViewProps) {
    const [sortField, setSortField] = useState<SortField>('createdAt')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
    const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')

    const filteredAndSortedTasks = tasks
        .filter(task => filterStatus === 'all' || task.status === filterStatus)
        .sort((a, b) => {
            let comparison = 0

            switch (sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title)
                    break
                case 'status':
                    comparison = a.status.localeCompare(b.status)
                    break
                case 'priority':
                    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
                    break
                case 'dueDate':
                    const aDate = a.dueDate?.getTime() || 0
                    const bDate = b.dueDate?.getTime() || 0
                    comparison = aDate - bDate
                    break
                case 'createdAt':
                    comparison = a.createdAt.getTime() - b.createdAt.getTime()
                    break
            }

            return sortDirection === 'asc' ? comparison : -comparison
        })

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex gap-4 items-center flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Filter:</span>
                    <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as TaskStatus | 'all')}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="backlog">Backlog</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sort by:</span>
                    <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="dueDate">Due Date</SelectItem>
                            <SelectItem value="createdAt">Created</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="neutral"
                        size="sm"
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                        <ArrowUpDown className="h-4 w-4" />
                        {sortDirection === 'asc' ? 'Asc' : 'Desc'}
                    </Button>
                </div>

                <span className="text-sm text-muted-foreground ml-auto">
                    {filteredAndSortedTasks.length} of {tasks.length} tasks
                </span>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {filteredAndSortedTasks.map((task) => (
                    <Card
                        key={task.id}
                        className="hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all cursor-pointer"
                        onDoubleClick={() => onEditTask(task)}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3 mb-2">
                                        <h3 className="font-medium text-base leading-tight">{task.title}</h3>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <Badge
                                                variant="neutral"
                                                className={`text-xs ${priorityColors[task.priority]}`}
                                            >
                                                {task.priority}
                                            </Badge>
                                            <Select
                                                value={task.status}
                                                onValueChange={(value) => onUpdateStatus(task.id, value as TaskStatus)}
                                            >
                                                <SelectTrigger className="w-32 h-7 text-xs">
                                                    <Badge
                                                        variant="neutral"
                                                        className={`text-xs border-0 ${statusColors[task.status]}`}
                                                    >
                                                        {task.status === 'in-progress' ? 'In Progress' :
                                                            task.status === 'backlog' ? 'Backlog' :
                                                                task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                                    </Badge>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="backlog">Backlog</SelectItem>
                                                    <SelectItem value="ready">Ready</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="done">Done</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {task.description && (
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        {task.dueDate && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>Due {format(task.dueDate, 'MMM d, yyyy')}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>Created {format(task.createdAt, 'MMM d, yyyy')}</span>
                                        </div>
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
                                </div>

                                <div className="flex gap-1 flex-shrink-0">
                                    <Button
                                        variant="neutral"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteTask(task.id)
                                        }}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredAndSortedTasks.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No tasks found matching your filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
