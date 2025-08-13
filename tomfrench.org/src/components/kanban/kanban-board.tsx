"use client"

import { useState, useEffect } from 'react'
import { Task, Column, TaskFormData, TaskStatus } from '@/lib/kanban-types'
import { kanbanStorage } from '@/lib/kanban-storage'
import { KanbanColumn } from './kanban-column'
import { TaskForm } from './task-form'
import { TaskListView } from './task-list-view'
import { AuthForm } from '@/components/auth/auth-form'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw, LayoutGrid, List, LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    closestCorners,
} from '@dnd-kit/core'
import { TaskCard } from './task-card'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [columns, setColumns] = useState<Column[]>([])
    const [loading, setLoading] = useState(true)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [initialStatus, setInitialStatus] = useState<TaskStatus | undefined>()
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [currentView, setCurrentView] = useState<'kanban' | 'list'>('kanban')
    const [showAuth, setShowAuth] = useState(false)

    const { user, signOut } = useAuth()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [tasksData, columnsData] = await Promise.all([
                kanbanStorage.getTasks(),
                kanbanStorage.getColumns(),
            ])
            setTasks(tasksData)
            setColumns(columnsData.sort((a, b) => a.order - b.order))
        } catch (error) {
            console.error('Error loading kanban data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = (status?: TaskStatus) => {
        setEditingTask(null)
        setInitialStatus(status)
        setShowTaskForm(true)
    }

    const handleEditTask = (task: Task) => {
        setEditingTask(task)
        setInitialStatus(undefined)
        setShowTaskForm(true)
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            await kanbanStorage.deleteTask(taskId)
            setTasks(prev => prev.filter(task => task.id !== taskId))
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const handleTaskSubmit = async (data: TaskFormData & { status?: TaskStatus }) => {
        try {
            if (editingTask) {
                // Update existing task
                const updatedTask = await kanbanStorage.updateTask(editingTask.id, data)
                setTasks(prev => prev.map(task =>
                    task.id === editingTask.id ? updatedTask : task
                ))
            } else {
                // Create new task
                const newTask = await kanbanStorage.createTask({
                    ...data,
                    status: data.status || 'backlog',
                })
                setTasks(prev => [...prev, newTask])
            }
            setShowTaskForm(false)
            setEditingTask(null)
            setInitialStatus(undefined)
        } catch (error) {
            console.error('Error saving task:', error)
        }
    }

    const handleUpdateStatus = async (taskId: string, newStatus: TaskStatus) => {
        try {
            const updatedTask = await kanbanStorage.updateTask(taskId, { status: newStatus })
            setTasks(prev => prev.map(task =>
                task.id === taskId ? updatedTask : task
            ))
        } catch (error) {
            console.error('Error updating task status:', error)
        }
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        if (active.data.current?.type === 'task') {
            setActiveTask(active.data.current.task)
        }
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'task'
        const isOverColumn = over.data.current?.type === 'column'

        if (isActiveTask && isOverColumn) {
            const activeTask = active.data.current?.task
            const overColumn = over.data.current?.column

            if (activeTask && overColumn && activeTask.status !== overColumn.status) {
                setTasks(prev => prev.map(task =>
                    task.id === activeTask.id
                        ? { ...task, status: overColumn.status }
                        : task
                ))
            }
        }
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'task'
        const isOverColumn = over.data.current?.type === 'column'

        if (isActiveTask && isOverColumn) {
            const activeTask = active.data.current?.task
            const overColumn = over.data.current?.column

            if (activeTask && overColumn && activeTask.status !== overColumn.status) {
                try {
                    await kanbanStorage.moveTask(activeTask.id as string, overColumn.status)
                } catch (error) {
                    console.error('Error moving task:', error)
                    // Revert optimistic update
                    setTasks(prev => prev.map(task =>
                        task.id === activeTask.id
                            ? { ...task, status: activeTask.status }
                            : task
                    ))
                }
            }
        }
    }

    const getTasksForColumn = (status: TaskStatus) => {
        return tasks.filter(task => task.status === status)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading kanban board...</span>
            </div>
        )
    }

    const columnIds = columns.map(column => column.id)

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Task Board</h1>
                <div className="flex gap-2 items-center">
                    {/* Auth Status */}
                    {user ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{user.email}</span>
                            <Button
                                variant="neutral"
                                size="sm"
                                onClick={signOut}
                            >
                                <LogOut className="h-4 w-4 mr-1" />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="neutral"
                            size="sm"
                            onClick={() => setShowAuth(true)}
                        >
                            <User className="h-4 w-4 mr-1" />
                            Sign In
                        </Button>
                    )}

                    {/* View Toggle */}
                    <div className="flex border-2 border-border rounded-base overflow-hidden">
                        <Button
                            variant={currentView === 'kanban' ? 'default' : 'neutral'}
                            size="sm"
                            className="rounded-none border-0"
                            onClick={() => setCurrentView('kanban')}
                        >
                            <LayoutGrid className="h-4 w-4 mr-1" />
                            Kanban
                        </Button>
                        <Button
                            variant={currentView === 'list' ? 'default' : 'neutral'}
                            size="sm"
                            className="rounded-none border-0"
                            onClick={() => setCurrentView('list')}
                        >
                            <List className="h-4 w-4 mr-1" />
                            List
                        </Button>
                    </div>

                    <Button
                        variant="neutral"
                        size="sm"
                        onClick={loadData}
                    >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Refresh
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => handleCreateTask()}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Task
                    </Button>
                </div>
            </div>

            {/* Conditional View Rendering */}
            {currentView === 'kanban' ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-max">
                        <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                            {columns.map((column) => (
                                <div key={column.id} className="min-w-[280px]">
                                    <KanbanColumn
                                        column={column}
                                        tasks={getTasksForColumn(column.status)}
                                        onAddTask={handleCreateTask}
                                        onEditTask={handleEditTask}
                                        onDeleteTask={handleDeleteTask}
                                    />
                                </div>
                            ))}
                        </SortableContext>
                    </div>

                    <DragOverlay>
                        {activeTask && (
                            <div className="transform rotate-2">
                                <TaskCard
                                    task={activeTask}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                />
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>
            ) : (
                <TaskListView
                    tasks={tasks}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}

            <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                <DialogContent className="max-w-md">
                    <TaskForm
                        task={editingTask || undefined}
                        initialStatus={initialStatus}
                        onSubmit={handleTaskSubmit}
                        onCancel={() => {
                            setShowTaskForm(false)
                            setEditingTask(null)
                            setInitialStatus(undefined)
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={showAuth} onOpenChange={setShowAuth}>
                <DialogContent className="max-w-md">
                    <AuthForm
                        onAuthSuccess={() => {
                            setShowAuth(false)
                            loadData() // Reload data with new auth state
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
