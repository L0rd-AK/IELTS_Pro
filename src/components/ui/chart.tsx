import React from 'react';
import { cn } from '@/lib/utils';

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>;
  children: React.ReactNode;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}