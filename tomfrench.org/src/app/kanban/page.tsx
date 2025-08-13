import { KanbanBoard } from '@/components/kanban/kanban-board'

export default function KanbanPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <KanbanBoard />
            </div>
        </div>
    )
}
