"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function ModeToggle() {
    const { setTheme, resolvedTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const isDark = (resolvedTheme ?? theme) === "dark"

    const toggle = () => setTheme(isDark ? "light" : "dark")

    // Avoid hydration mismatch: render a disabled switch until mounted
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                    <Switch
                        checked={mounted ? isDark : false}
                        aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
                        onCheckedChange={() => toggle()}
                        className="h-4 w-7"
                    />
                    {mounted ? (
                        isDark ? <Sun className="size-3.5 text-foreground/80" /> : <Moon className="size-3.5 text-foreground/80" />
                    ) : (
                        <Sun className="size-3.5 opacity-50" />
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
                {mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"}
            </TooltipContent>
        </Tooltip>
    )
}
