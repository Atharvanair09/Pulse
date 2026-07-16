import React, { memo } from "react";
import { Insight } from "@/types";

export interface InsightCardProps {
  insights: Insight[];
  isLoading?: boolean;
}

export const InsightCard = memo(function InsightCard({ insights, isLoading = false }: InsightCardProps) {
  const topInsight = insights[0];

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-2 flex flex-col justify-between" aria-label="AI Insight">
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-rounded text-primary" aria-hidden="true">tips_and_updates</span>
          AI Insight
        </h2>
        {isLoading ? (
          <div className="animate-pulse space-y-3" aria-label="Loading insight">
            <div className="h-6 w-1/3 bg-black/10 dark:bg-white/10 rounded"></div>
            <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded"></div>
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded"></div>
          </div>
        ) : !topInsight ? (
          <p className="text-sm text-foreground/60 italic">No insights available at this time.</p>
        ) : (
          <div className="space-y-2">
            <h4 className="font-bold text-lg text-primary">{topInsight.category}</h4>
            <p className="text-foreground/80 leading-relaxed">
              {topInsight.explanation}
            </p>
          </div>
        )}
      </div>

      {!isLoading && topInsight && (
        <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-xs text-foreground/50">
          <span className="flex items-center gap-1">
            <span className="material-symbols-rounded text-[14px]" aria-hidden="true">schedule</span>
            {new Date(topInsight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className={`px-2 py-0.5 rounded font-medium ${
            topInsight.confidence === "High" ? "bg-success/10 text-success" :
            topInsight.confidence === "Medium" ? "bg-warning/10 text-warning" :
            "bg-destructive/10 text-destructive"
          }`}>
            {topInsight.confidence} Confidence
          </span>
        </div>
      )}
    </div>
  );
});
