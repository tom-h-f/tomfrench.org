import { getPosts } from "@/lib/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostsPage() {
    const posts = getPosts();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-3xl font-heading">Posts</h1>
                    </div>
                    <p className="text-foreground/80">
                        Thoughts on development, technology, and random musings.
                    </p>
                </header>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <Card key={post.slug}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="mb-2">
                                            <Link
                                                href={`/posts/${post.slug}`}
                                                className="hover:text-main transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                        <p className="text-sm text-foreground/60">{post.date}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            {post.excerpt && (
                                <CardContent>
                                    <p className="text-foreground/80">{post.excerpt}</p>
                                    <Button asChild variant="neutral" size="sm" className="mt-4">
                                        <Link href={`/posts/${post.slug}`}>Read More</Link>
                                    </Button>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
