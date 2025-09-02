'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandLogo } from './brand-logo';
import { useNavigation } from '@/hooks/use-navigation';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    { href: '/', label: 'about' },
    { href: '/posts', label: 'posts' },
    { href: '/cv', label: 'cv' },
    { href: '/math', label: 'math' },
    { href: '/noise', label: 'noise' },
];

export function Navigation() {
    const { isActiveRoute, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation();

    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50" role="navigation" aria-label="Main navigation">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <BrandLogo />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-main",
                                    isActiveRoute(item.href) 
                                        ? "text-main border-b-2 border-main pb-1" 
                                        : "text-foreground/70"
                                )}
                                aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div id="mobile-menu" className="md:hidden mt-4 pb-4 border-t border-border pt-4">
                        <div className="flex flex-col space-y-3">
                            {navItems.slice(1).map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-main py-2",
                                        isActiveRoute(item.href) 
                                            ? "text-main font-semibold" 
                                            : "text-foreground/70"
                                    )}
                                    onClick={closeMobileMenu}
                                    aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
