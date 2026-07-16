import React, { memo } from "react";
import { Prediction } from "@/types";

export interface PredictionCardProps {
  predictions: Prediction[];
  isLoading?: boolean;
}

export const PredictionCard = memo(function PredictionCard({ predictions, isLoading = false }: PredictionCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl" aria-label="AI Predictions">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded text-primary" aria-hidden="true">online_prediction</span>
        AI Predictions
      </h3>
      {predictions.length === 0 ? (
        <p className="text-sm text-foreground/60 italic">No predictions generated yet.</p>
      ) : (
        <div className="space-y-4">
          {predictions.map(p => (
            <div key={p.id} className="text-sm border-b border-black/5 dark:border-white/5 pb-3 last:border-0 last:pb-0">
              <div className="font-medium text-foreground">{p.prediction}</div>
              <p className="text-foreground/70 mt-1 leading-snug">{p.reasoning}</p>
              <div className="flex justify-between items-center mt-3 text-xs">
                <span className="text-foreground/50 flex items-center gap-1">
                  <span className="material-symbols-rounded text-[14px]" aria-hidden="true">timer</span>
                  {p.estimatedTimeHorizon}
                </span>
                <span className={`px-2 py-0.5 rounded font-medium ${
                  p.confidence === "High" ? "bg-success/10 text-success" :
                  p.confidence === "Medium" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {p.confidence} Confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
