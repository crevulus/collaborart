"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import * as React from "react";
import { cn } from "../../lib/utils";

const avatarClasses = {
  sm: "h-16 w-16 text-md",
  md: "h-20 w-20 text-lg",
  lg: "h-24 w-24 text-xl",
};

type AvatarSize = keyof typeof avatarClasses;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    avatarSize?: AvatarSize;
  }
>(({ className, avatarSize, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "outline-border relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full outline-2",
      className,
      `border-border border-1 transition-transform group-hover:scale-105`,
      avatarSize ? avatarClasses[avatarSize] : "",
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "bg-bw font-base text-text flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
