"use client"

import * as React from "react"
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Note {
    slug: string;
    title: string;
    content: string;
    frontmatter: Record<string, unknown>;
    category?: string;
    subcategory?: string;
    fullPath?: string;
    tags?: string[];
    date?: string;
}

interface TreeNode {
    name: string;
    path: string;
    type: 'folder' | 'file';
    children?: TreeNode[];
    note?: Note;
    count?: number;
}

interface NotesTreeProps {
    notesByCategory: Record<string, Note[]>;
    selectedNote: Note | null;
    onNoteSelect: (note: Note) => void;
    searchQuery?: string;
}

export function NotesTree({ notesByCategory, selectedNote, onNoteSelect, searchQuery }: NotesTreeProps) {
    const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

    // Build tree structure from notes
    const buildTree = React.useMemo(() => {
        const tree: TreeNode[] = [];
        const pathMap = new Map<string, TreeNode>();

        Object.entries(notesByCategory).forEach(([categoryPath, notes]) => {
            const pathParts = categoryPath.split('/');
            let currentPath = '';

            pathParts.forEach((part) => {
                const parentPath = currentPath;
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                if (!pathMap.has(currentPath)) {
                    const node: TreeNode = {
                        name: part,
                        path: currentPath,
                        type: 'folder',
                        children: [],
                        count: 0
                    };

                    pathMap.set(currentPath, node);

                    if (parentPath) {
                        const parent = pathMap.get(parentPath);
                        parent?.children?.push(node);
                    } else {
                        tree.push(node);
                    }
                }
            });

            // Add notes to the final folder
            const finalFolder = pathMap.get(categoryPath);
            if (finalFolder) {
                notes.forEach(note => {
                    const noteNode: TreeNode = {
                        name: note.title,
                        path: `${categoryPath}/${note.slug}`,
                        type: 'file',
                        note
                    };
                    finalFolder.children?.push(noteNode);
                });
                finalFolder.count = notes.length;
            }
        });

        // Calculate counts for parent folders
        const calculateCounts = (node: TreeNode): number => {
            if (node.type === 'file') return 1;

            let count = 0;
            node.children?.forEach(child => {
                count += calculateCounts(child);
            });
            node.count = count;
            return count;
        };

        tree.forEach(calculateCounts);
        return tree;
    }, [notesByCategory]);

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
        const isExpanded = expandedFolders.has(node.path);
        const isSelected = selectedNote?.slug === node.note?.slug;

        // Filter based on search query
        const shouldShow = !searchQuery ||
            node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (node.note?.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (node.children?.some(child => shouldShowNode(child, searchQuery)));

        if (!shouldShow && node.type === 'file') return null;

        return (
            <div key={node.path}>
                <div
                    className={cn(
                        "flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-secondary-background rounded text-sm transition-colors",
                        isSelected && "bg-main/10 border-l-2 border-main",
                        level > 0 && "ml-4"
                    )}
                    onClick={() => {
                        if (node.type === 'folder') {
                            toggleFolder(node.path);
                        } else if (node.note) {
                            onNoteSelect(node.note);
                        }
                    }}
                >
                    {node.type === 'folder' ? (
                        <>
                            {isExpanded ? (
                                <ChevronDown size={16} className="text-foreground/60" />
                            ) : (
                                <ChevronRight size={16} className="text-foreground/60" />
                            )}
                            {isExpanded ? (
                                <FolderOpen size={16} className="text-main" />
                            ) : (
                                <Folder size={16} className="text-main" />
                            )}
                            <span className="font-medium capitalize">{node.name.replace('-', ' ')}</span>
                            {node.count !== undefined && node.count > 0 && (
                                <Badge variant="neutral" className="text-xs ml-auto">
                                    {node.count}
                                </Badge>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="w-4" /> {/* Spacer for alignment */}
                            <FileText size={14} className="text-foreground/60" />
                            <span className="truncate">{node.name}</span>
                            {node.note?.date && (
                                <span className="text-xs text-foreground/50 ml-auto">
                                    {new Date(node.note.date).toLocaleDateString()}
                                </span>
                            )}
                        </>
                    )}
                </div>

                {node.type === 'folder' && isExpanded && node.children && (
                    <div>
                        {node.children
                            .filter(child => shouldShowNode(child, searchQuery))
                            .map(child => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const shouldShowNode = (node: TreeNode, query?: string): boolean => {
        if (!query) return true;

        const queryLower = query.toLowerCase();

        // Check if current node matches
        if (node.name.toLowerCase().includes(queryLower) ||
            (node.note?.content.toLowerCase().includes(queryLower))) {
            return true;
        }

        // Check if any children match
        return node.children?.some(child => shouldShowNode(child, query)) || false;
    };

    return (
        <div className="space-y-1">
            {buildTree
                .filter(node => shouldShowNode(node, searchQuery))
                .map(node => renderNode(node))}

            {buildTree.length === 0 && (
                <div className="text-center py-8 text-foreground/60">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No notes found</p>
                </div>
            )}
        </div>
    );
}
