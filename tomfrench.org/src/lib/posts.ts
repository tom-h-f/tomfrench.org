import React from 'react';
import PlaceholderPost from '@/components/posts/placeholder-post';

export interface Post {
    title: string;
    slug: string;
    date: string;
    excerpt?: string;
    component: React.ComponentType;
}

// Posts with actual components
export function getPosts(): Post[] {
    return [
        {
            title: "placeholder title",
            slug: "placholder-slug",
            date: "2025-01-15",
            excerpt: "placeholder excerpt snippet etc",
            component: PlaceholderPost
        },
    ];
}

export function getPost(slug: string): Post | undefined {
    return getPosts().find(post => post.slug === slug);
}
