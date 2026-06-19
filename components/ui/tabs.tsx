"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // mobile: horizontal bar
      "flex overflow-x-auto scrollbar-none bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm",
      // desktop: vertical sidebar
      "lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:sticky lg:top-0 lg:h-screen lg:min-h-screen lg:w-60 xl:w-64 lg:border-b-0 lg:border-r lg:border-slate-100 lg:bg-slate-50 lg:shadow-none lg:pt-0 lg:z-40",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // mobile
      "flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-500 border-b-2 border-transparent -mb-px transition-all whitespace-nowrap",
      "hover:text-slate-800 hover:bg-slate-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
      "data-[state=active]:text-blue-600 data-[state=active]:border-blue-600",
      // desktop: full-width sidebar items
      "lg:flex-shrink-0 lg:w-full lg:justify-start lg:rounded-xl lg:mx-2 lg:px-3.5 lg:py-2.5 lg:text-sm lg:border-b-0 lg:border-0 lg:-mb-0 lg:text-slate-600",
      "lg:hover:bg-white lg:hover:text-slate-900 lg:hover:shadow-sm",
      "lg:data-[state=active]:bg-white lg:data-[state=active]:text-blue-700 lg:data-[state=active]:shadow-sm lg:data-[state=active]:border-0 lg:data-[state=active]:font-bold",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
