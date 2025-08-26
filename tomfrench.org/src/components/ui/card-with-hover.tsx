import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardWithHoverProps extends CardProps {
  /**
   * Whether the card should have hover effects
   * @default true
   */
  enableHover?: boolean;
  /**
   * Custom hover shadow color
   * @default "var(--border)"
   */
  hoverShadowColor?: string;
}

/**
 * Reusable card component with consistent hover effects used throughout the app
 */
export function CardWithHover({ 
  className, 
  enableHover = true, 
  hoverShadowColor = "var(--border)",
  children,
  ...props 
}: CardWithHoverProps) {
  return (
    <Card
      className={cn(
        enableHover && "hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer",
        className
      )}
      style={enableHover ? { 
        "--hover-shadow-color": hoverShadowColor 
      } as React.CSSProperties : undefined}
      {...props}
    >
      {children}
    </Card>
  );
}
