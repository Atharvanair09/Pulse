import React from "react";
import { Recommendation } from "@/types";

export interface RecommendationCardProps {
  recommendations: Recommendation[];
  isLoading?: boolean;
}

export function RecommendationCard({ recommendations, isLoading = false }: RecommendationCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-2">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded text-primary">assistant</span>
        AI Recommendations
      </h3>
      {recommendations.length === 0 ? (
        <p className="text-sm text-foreground/60">No recommendations at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(r => (
            <div key={r.id} className={`p-4 rounded-xl border ${
              r.priority === "Critical" ? "border-critical bg-critical/5" :
              r.priority === "High" ? "border-warning bg-warning/5" :
              "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
            }`}>
              <h4 className={`font-bold ${
                r.priority === "Critical" ? "text-critical" :
                r.priority === "High" ? "text-warning" : "text-foreground"
              }`}>{r.title}</h4>
              <p className="text-sm mt-2">{r.reason}</p>
              {r.action && (
                <div className="mt-3 inline-block bg-background px-3 py-1 rounded border border-black/10 dark:border-white/10 text-xs font-medium">
                  {r.action}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
