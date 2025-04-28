import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function PageContainer({ 
  children, 
  title, 
  description 
}: PageContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}