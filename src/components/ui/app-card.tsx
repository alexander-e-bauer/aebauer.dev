// src/components/ui/app-card.tsx
import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import clsx from 'clsx';

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  dense?: boolean;
  glass?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  subtitle,
  icon,
  dense,
  glass,
  className,
  children,
  ...rest
}) => {
  return (
    <Card
      className={clsx(
        glass && 'bg-card/50 backdrop-blur-md',
        'border-border',
        dense && 'py-2',
        className
      )}
      {...rest}
    >
      {(title || subtitle) && (
        <CardHeader className="pb-3 space-y-1">
          {title && (
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              {icon && <span className="text-accent">{icon}</span>}
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground leading-snug">{subtitle}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};
