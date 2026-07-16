import React, { memo } from "react";
import { Recommendation } from "@/types";

export interface RecommendationCardProps {
  recommendations: Recommendation[];
  isLoading?: boolean;
}

export const RecommendationCard = memo(function RecommendationCard({ recommendations, isLoading = false }: RecommendationCardProps) {
  const topRec = recommendations[0];

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-1 flex flex-col justify-between" aria-label="Top Recommendation">
      <div>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-rounded text-primary" aria-hidden="true">assistant</span>
          Top Recommendation
        </h3>
        {isLoading ? (
          <div className="animate-pulse space-y-3" aria-label="Loading recommendation">
            <div className="h-6 w-1/2 bg-black/10 dark:bg-white/10 rounded"></div>
            <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded"></div>
            <div className="h-8 w-1/3 bg-black/10 dark:bg-white/10 rounded mt-4"></div>
          </div>
        ) : !topRec ? (
          <p className="text-sm text-foreground/60 italic">No active recommendations.</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-bold text-lg ${
                  topRec.priority === "Critical" ? "text-critical" :
                  topRec.priority === "High" ? "text-warning" : "text-foreground"
                }`}>{topRec.title}</h4>
                <div className="flex gap-2 items-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    topRec.confidence === "High" ? "text-success" :
                    topRec.confidence === "Medium" ? "text-warning" : "text-destructive"
                  }`}>
                    {topRec.confidence} Conf.
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                    topRec.priority === "Critical" ? "bg-critical/10 text-critical border border-critical/20" :
                    topRec.priority === "High" ? "bg-warning/10 text-warning border border-warning/20" :
                    "bg-black/5 dark:bg-white/5 text-foreground/60"
                  }`}>
                    {topRec.priority}
                  </span>
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-3">{topRec.reason}</p>
              {topRec.expectedImpact && (
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex gap-2 items-start">
                  <span className="material-symbols-rounded text-primary text-[18px]" aria-hidden="true">trending_up</span>
                  <span className="text-sm font-medium text-foreground/80">{topRec.expectedImpact}</span>
                </div>
              )}
            </div>

            {topRec.action && (
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 py-3 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2">
                {topRec.action}
                <span className="material-symbols-rounded text-[18px]" aria-hidden="true">arrow_forward</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
