'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotesTree } from "@/components/notes-tree";
import { ArrowLeft, Search, X } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Fuse from 'fuse.js';

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

interface NotesPageProps {
    notesByCategory: Record<string, Note[]>;
}

export function NotesPageClient({ notesByCategory }: NotesPageProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Create a flat array of all notes for fuzzy search
    const allNotes = useMemo(() => {
        const notes: Note[] = [];
        Object.values(notesByCategory).forEach(categoryNotes => {
            notes.push(...categoryNotes);
        });
        return notes;
    }, [notesByCategory]);

    // Configure Fuse.js for fuzzy searching
    const fuse = useMemo(() => {
        return new Fuse(allNotes, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'content', weight: 0.3 },
                { name: 'tags', weight: 0.2 },
                { name: 'category', weight: 0.1 }
            ],
            threshold: 0.4,
            includeScore: true,
            minMatchCharLength: 2
        });
    }, [allNotes]);

    // Filter notes based on search query
    const filteredNotesByCategory = useMemo(() => {
        if (!searchQuery.trim()) {
            return notesByCategory;
        }

        const searchResults = fuse.search(searchQuery);
        const filteredNotes = searchResults.map(result => result.item);

        // Rebuild categories object with filtered notes
        const filtered: Record<string, Note[]> = {};
        filteredNotes.forEach(note => {
            const categoryKey = note.subcategory
                ? `${note.category}/${note.subcategory}`
                : note.category || 'general';

            if (!filtered[categoryKey]) {
                filtered[categoryKey] = [];
            }
            filtered[categoryKey].push(note);
        });

        return filtered;
    }, [notesByCategory, searchQuery, fuse]);

    const clearSearch = () => {
        setSearchQuery('');
    };

    const totalNotes = allNotes.length;

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-7xl mx-auto px-6 py-8">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Button asChild variant="neutral" size="sm">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft size={16} />
                                Home
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-heading">Notes</h1>
                        <Badge variant="neutral">{totalNotes} notes</Badge>
                    </div>
                    <p className="text-foreground/80 mb-4">
                        Study notes from my Obsidian vault, organized by topic and searchable.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" />
                        <Input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-9"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </header>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Tree View */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-heading">Notes Structure</h2>
                            {searchQuery && (
                                <Badge variant="default" className="text-xs">
                                    {Object.values(filteredNotesByCategory).flat().length} matches
                                </Badge>
                            )}
                        </div>

                        <Card className="h-[75vh]">
                            <CardContent className="p-4 h-full">
                                <ScrollArea className="h-full">
                                    <NotesTree
                                        notesByCategory={filteredNotesByCategory}
                                        selectedNote={selectedNote}
                                        onNoteSelect={setSelectedNote}
                                        searchQuery={searchQuery}
                                    />
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>                    {/* Right Side - Note Content */}
                    <div className="lg:sticky lg:top-8 lg:max-h-[75vh]">
                        {selectedNote ? (
                            <Card className="h-full">
                                <CardHeader className="border-b">
                                    <div className="space-y-3">
                                        <CardTitle className="text-xl">{selectedNote.title}</CardTitle>

                                        <div className="flex items-center gap-4 text-sm text-foreground/80">
                                            {selectedNote.category && (
                                                <div className="flex items-center gap-1">
                                                    <Badge variant="neutral" className="capitalize">
                                                        {selectedNote.category.replace('-', ' ')}
                                                    </Badge>
                                                    {selectedNote.subcategory && (
                                                        <>
                                                            <span className="text-foreground/50">/</span>
                                                            <Badge variant="default" className="capitalize text-xs">
                                                                {selectedNote.subcategory.replace(/[\-\/]/g, ' ')}
                                                            </Badge>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {selectedNote.date && (
                                                <span>{new Date(selectedNote.date).toLocaleDateString()}</span>
                                            )}
                                        </div>

                                        {selectedNote.tags && selectedNote.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedNote.tags.map((tag) => (
                                                    <Badge key={tag} variant="default" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0 h-full">
                                    <ScrollArea className="h-[60vh] p-6">
                                        <article className="prose prose-sm max-w-none">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({ children }) => <h1 className="text-xl font-heading mb-3">{children}</h1>,
                                                    h2: ({ children }) => <h2 className="text-lg font-heading mb-2 mt-4">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="text-base font-heading mb-2 mt-3">{children}</h3>,
                                                    p: ({ children }) => <p className="mb-3 leading-6 text-sm">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-sm">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-sm">{children}</ol>,
                                                    code: ({ children, className }) => {
                                                        const isInline = !className;
                                                        if (isInline) {
                                                            return (
                                                                <code className="bg-secondary-background px-1 py-0.5 rounded text-xs font-mono">
                                                                    {children}
                                                                </code>
                                                            );
                                                        }
                                                        return (
                                                            <code className="block bg-secondary-background p-3 rounded-base overflow-x-auto text-xs font-mono border-2 border-border">
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    pre: ({ children }) => <div className="mb-3">{children}</div>,
                                                    blockquote: ({ children }) => (
                                                        <blockquote className="border-l-4 border-main pl-3 italic my-3 text-sm">
                                                            {children}
                                                        </blockquote>
                                                    ),
                                                    // Handle Obsidian-style links
                                                    a: ({ href, children }) => (
                                                        <a href={href} className="text-main hover:underline" target="_blank" rel="noopener noreferrer">
                                                            {children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {selectedNote.content}
                                            </ReactMarkdown>
                                        </article>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="h-64 flex items-center justify-center">
                                <CardContent>
                                    <div className="text-center space-y-2">
                                        <p className="text-foreground/60">
                                            Select a note from the tree to view its content
                                        </p>
                                        {searchQuery && (
                                            <p className="text-sm text-foreground/50">
                                                {Object.values(filteredNotesByCategory).flat().length} notes found for &ldquo;{searchQuery}&rdquo;
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
