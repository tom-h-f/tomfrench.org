'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/', label: 'home' },
    { href: '/posts', label: 'posts' },
    { href: '/notes', label: 'notes' },
    { href: '/research', label: 'research' },
    { href: '/kanban', label: 'kanban' },
    { href: '/noise', label: 'noise' },
    { href: '/files', label: 'files' },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-lg font-medium text-foreground hover:text-main transition-colors"
                    >
                        tom french
                    </Link>

                    <div className="flex items-center space-x-6">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm transition-colors hover:text-main ${pathname.startsWith(item.href) && item.href !== '/'
                                        ? 'text-main font-medium'
                                        : 'text-foreground/70'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
