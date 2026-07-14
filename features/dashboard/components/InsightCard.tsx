import React from "react";
import { Insight } from "@/types";

export interface InsightCardProps {
  insights: Insight[];
  isLoading?: boolean;
}

export function InsightCard({ insights, isLoading = false }: InsightCardProps) {
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-2 flex flex-col">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded text-primary">tips_and_updates</span>
        AI Insights
      </h2>
      <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-5 w-1/3 bg-primary/20 rounded mb-2"></div>
                    <div className="h-4 w-full bg-primary/10 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : insights.length === 0 ? (
          <p className="text-sm text-foreground/50 italic">No recent insights.</p>
        ) : (
          insights.map(insight => (
            <div key={insight.id} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <span className="material-symbols-rounded text-primary">info</span>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{insight.category}</h4>
                  <p className="text-sm text-foreground/80">{insight.explanation}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
