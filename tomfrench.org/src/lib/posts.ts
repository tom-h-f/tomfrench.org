import React from 'react';
import BuildingModernWebApps from '@/components/posts/building-modern-web-apps';
import ArtOfCleanCode from '@/components/posts/art-of-clean-code';
import TypeScriptTipsTricks from '@/components/posts/typescript-tips-tricks';

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
            title: "Building Modern Web Applications",
            slug: "building-modern-web-apps",
            date: "2025-01-15",
            excerpt: "Thoughts on modern web development patterns and best practices.",
            component: BuildingModernWebApps
        },
        {
            title: "The Art of Clean Code",
            slug: "art-of-clean-code",
            date: "2025-01-10",
            excerpt: "Why writing clean, maintainable code matters more than ever.",
            component: ArtOfCleanCode
        },
        {
            title: "TypeScript Tips and Tricks",
            slug: "typescript-tips-tricks",
            date: "2025-01-05",
            excerpt: "Advanced TypeScript patterns that will improve your development workflow.",
            component: TypeScriptTipsTricks
        }
    ];
}

export function getPost(slug: string): Post | undefined {
    return getPosts().find(post => post.slug === slug);
}
