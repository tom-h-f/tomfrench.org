"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitive.Root>,
    SwitchProps
>(({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
        ref={ref}
        className={cn(
            "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-border transition-colors data-[state=checked]:bg-main data-[state=unchecked]:bg-secondary-background",
            className
        )}
        {...props}
    >
        <SwitchPrimitive.Thumb
            className={cn(
                "pointer-events-none block h-3 w-3 translate-x-0 rounded-full bg-foreground shadow transition-transform data-[state=checked]:translate-x-3"
            )}
        />
    </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"

export { Switch }
