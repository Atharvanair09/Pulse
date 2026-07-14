import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface PulseRingProps {
  score: number;
  statusLabel?: string;
  trend?: "up" | "down" | "stable" | null;
  isLoading?: boolean;
  colorClass?: string;
  size?: "sm" | "md" | "lg";
}

export function PulseRing({
  score,
  statusLabel,
  trend = null,
  isLoading = false,
  colorClass,
  size = "md",
}: PulseRingProps) {
  if (isLoading) {
    return (
      <div 
        className="flex flex-col items-center justify-center animate-pulse"
        aria-label="Loading pulse score"
        role="progressbar"
        aria-busy="true"
      >
        <div className={`rounded-full bg-black/10 dark:bg-white/10 mb-4 ${size === 'sm' ? 'w-24 h-24' : size === 'lg' ? 'w-48 h-48' : 'w-32 h-32'}`}></div>
        {statusLabel && <div className="h-6 w-3/4 bg-black/10 dark:bg-white/10 rounded"></div>}
      </div>
    );
  }

  // Require colorClass from props to ensure no business logic inside components
  const resolvedColorClass = colorClass || "text-primary";
  
  // Calculate circle dash offset based on health score
  const dashArray = 283;
  // Ensure score is between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));
  const dashOffset = dashArray - (dashArray * clampedScore) / 100;

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };
  
  const labelSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div 
        className={`relative ${sizeClasses[size]} mb-4`}
        role="progressbar"
        aria-valuenow={clampedScore}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={statusLabel || "Health score"}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            className="text-black/5 dark:text-white/5" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            className={`${resolvedColorClass} transition-[stroke-dashoffset] duration-1000 ease-in-out motion-reduce:transition-none`} 
            strokeDasharray={dashArray} 
            strokeDashoffset={dashOffset} 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <span className={`${textSizes[size]} font-bold`}>{clampedScore}</span>
            {trend === "up" && <TrendingUp className={`${iconSizes[size]} ${resolvedColorClass}`} aria-label="Trending up" />}
            {trend === "down" && <TrendingDown className={`${iconSizes[size]} ${resolvedColorClass}`} aria-label="Trending down" />}
            {trend === "stable" && <Minus className={`${iconSizes[size]} text-foreground/50`} aria-label="Stable" />}
          </div>
          <span className={`${labelSizes[size]} uppercase tracking-wider text-foreground/50 mt-1`}>Pulse</span>
        </div>
      </div>
      
      {statusLabel && (
        <h3 className={`font-bold ${size === 'lg' ? 'text-xl' : 'text-lg'} mb-1`}>
          {statusLabel}
        </h3>
      )}
    </div>
  );
}
