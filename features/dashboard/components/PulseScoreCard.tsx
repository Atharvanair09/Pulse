import React from "react";
import { PulseRing } from "@/components/ui/PulseRing";

export interface PulseScoreCardProps {
  score: number;
  status: string;
  trend?: "Improving" | "Stable" | "Declining";
  colorClass: string;
  isLoading?: boolean;
}

export function PulseScoreCard({ score, status, trend, colorClass, isLoading = false }: PulseScoreCardProps) {
  // Translate trend to PulseRing format
  let ringTrend: "up" | "down" | "stable" | null = null;
  if (trend === "Improving") ringTrend = "up";
  else if (trend === "Declining") ringTrend = "down";
  else if (trend === "Stable") ringTrend = "stable";

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-1 flex flex-col items-center justify-center text-center">
      <PulseRing 
        score={score}
        statusLabel={status}
        trend={ringTrend}
        isLoading={isLoading}
        colorClass={colorClass}
        size="md"
      />
      {!isLoading && (
        <p className="text-sm text-foreground/60">{status}</p>
      )}
    </div>
  );
}
