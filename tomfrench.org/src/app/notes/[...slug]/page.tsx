import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NotePageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export function generateStaticParams() {
    const notes = getAllNotes();
    return notes.map((note) => ({
        slug: note.slug.split('/'),
    }));
}

export default async function NotePage({ params }: NotePageProps) {
    const { slug: slugArray } = await params;
    const slug = slugArray.join('/');
    const note = getNoteBySlug(slug);

    if (!note) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Button asChild variant="neutral" size="sm">
                            <Link href="/notes">← Notes</Link>
                        </Button>
                        <Button asChild variant="neutral" size="sm">
                            <Link href="/">Home</Link>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-heading">{note.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-foreground/80">
                            {note.category && (
                                <Badge variant="neutral" className="capitalize">
                                    {note.category.replace('-', ' ')}
                                </Badge>
                            )}

                            {note.date && (
                                <span>{new Date(note.date).toLocaleDateString()}</span>
                            )}
                        </div>

                        {note.tags && note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {note.tags.map((tag) => (
                                    <Badge key={tag} variant="default" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                <article className="prose prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => <h1 className="text-2xl font-heading mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-heading mb-3 mt-6">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-heading mb-2 mt-4">{children}</h3>,
                            p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                            code: ({ children, className }) => {
                                const isInline = !className;
                                if (isInline) {
                                    return (
                                        <code className="bg-secondary-background px-1 py-0.5 rounded text-sm font-mono">
                                            {children}
                                        </code>
                                    );
                                }
                                return (
                                    <code className="block bg-secondary-background p-4 rounded-base overflow-x-auto text-sm font-mono border-2 border-border">
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ children }) => <div className="mb-4">{children}</div>,
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-main pl-4 italic my-4">
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {note.content}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
