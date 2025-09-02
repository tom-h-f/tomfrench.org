import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'minimal';
}

/**
 * Reusable brand/logo component
 */
export function BrandLogo({ className, variant = 'header' }: BrandLogoProps) {
  const baseClasses = "font-medium text-foreground hover:text-main transition-colors";
  
  const variantClasses = {
    header: "text-lg",
    footer: "text-base",
    minimal: "text-sm"
  };

  return (
    <Link
      href="/"
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-label="Go to homepage"
    >
      tom french
    </Link>
  );
}
