'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Note {
    slug: string;
    title: string;
    content: string;
    frontmatter: Record<string, unknown>;
    category?: string;
    tags?: string[];
    date?: string;
}

interface NotesPageProps {
    notesByCategory: Record<string, Note[]>;
}

export function NotesPageClient({ notesByCategory }: NotesPageProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const categories = Object.keys(notesByCategory);

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
                    </div>
                    <p className="text-foreground/80">
                        Quick thoughts, references, and knowledge fragments organized by topic.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Notes List */}
                    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
                        {categories.map((category) => (
                            <div key={category} className="space-y-4">
                                <h2 className="text-xl font-heading capitalize flex items-center gap-2 sticky top-0 bg-background py-2">
                                    {category.replace('-', ' ')}
                                    <Badge variant="neutral">{notesByCategory[category].length}</Badge>
                                </h2>

                                <div className="space-y-2">
                                    {notesByCategory[category].map((note) => (
                                        <Card
                                            key={note.slug}
                                            className={`cursor-pointer transition-all hover:shadow-[4px_4px_0px_0px_var(--border)] ${selectedNote?.slug === note.slug ? 'ring-2 ring-main shadow-[4px_4px_0px_0px_var(--border)]' : ''
                                                }`}
                                            onClick={() => setSelectedNote(note)}
                                        >
                                            <CardContent className="p-4">
                                                <h3 className="font-medium text-sm mb-2">{note.title}</h3>

                                                <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
                                                    {note.date && (
                                                        <span>{new Date(note.date).toLocaleDateString()}</span>
                                                    )}
                                                </div>

                                                {note.tags && note.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {note.tags.slice(0, 3).map((tag) => (
                                                            <Badge key={tag} variant="neutral" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {note.tags.length > 3 && (
                                                            <Badge variant="neutral" className="text-xs">
                                                                +{note.tags.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}

                                                <p className="text-xs text-foreground/70 line-clamp-2">
                                                    {note.content.split('\n').find(line =>
                                                        line.trim() && !line.startsWith('#') && !line.startsWith('---')
                                                    )?.slice(0, 100)}...
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {categories.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-foreground/60">No notes found. Add some markdown files to get started!</p>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Note Content */}
                    <div className="lg:sticky lg:top-8 lg:max-h-[80vh] lg:overflow-y-auto">
                        {selectedNote ? (
                            <Card>
                                <CardHeader>
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl">{selectedNote.title}</CardTitle>

                                        <div className="flex items-center gap-4 text-sm text-foreground/80">
                                            {selectedNote.category && (
                                                <Badge variant="neutral" className="capitalize">
                                                    {selectedNote.category.replace('-', ' ')}
                                                </Badge>
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

                                <CardContent>
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
                                            }}
                                        >
                                            {selectedNote.content}
                                        </ReactMarkdown>
                                    </article>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="h-64 flex items-center justify-center">
                                <CardContent>
                                    <p className="text-foreground/60 text-center">
                                        Select a note to view its content
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
