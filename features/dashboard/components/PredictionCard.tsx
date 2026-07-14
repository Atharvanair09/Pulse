import React from "react";
import { Prediction } from "@/types";

export interface PredictionCardProps {
  predictions: Prediction[];
  isLoading?: boolean;
}

export function PredictionCard({ predictions, isLoading = false }: PredictionCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">online_prediction</span>
        AI Predictions
      </h3>
      {predictions.length === 0 ? (
        <p className="text-sm text-foreground/60">No predictions generated yet.</p>
      ) : (
        <div className="space-y-4">
          {predictions.map(p => (
            <div key={p.id} className="text-sm border-b border-black/5 dark:border-white/5 pb-3 last:border-0">
              <div className="font-medium text-primary">{p.prediction}</div>
              <p className="text-foreground/70 mt-1">{p.reasoning}</p>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-foreground/50">Horizon: {p.estimatedTimeHorizon}</span>
                <span className={`px-2 py-0.5 rounded ${
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
}
