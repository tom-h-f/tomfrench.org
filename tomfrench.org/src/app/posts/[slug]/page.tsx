import { getPost, getPosts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    const posts = getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    const PostComponent = post.component;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Button asChild variant="neutral" size="sm">
                            <Link href="/posts">← Posts</Link>
                        </Button>
                    </div>
                    <h1 className="text-3xl font-heading mb-2">{post.title}</h1>
                    <p className="text-foreground/60">{post.date}</p>
                </header>

                <article className="prose prose-lg max-w-none">
                    <PostComponent />
                </article>
            </div>
        </div>
    );
}
