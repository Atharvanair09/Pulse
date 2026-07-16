import React from "react";
import { Queue } from "@/types";

export interface QueueCardProps {
  queues: Queue[];
  isLoading?: boolean;
}

export function QueueCard({ queues, isLoading = false }: QueueCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl" aria-label="Queue Status">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">schedule</span>
        Queue Status
      </h3>
      {queues.length === 0 ? (
        <p className="text-sm text-foreground/60">No queue data available.</p>
      ) : (
        <div className="space-y-3">
          {queues.map(q => (
            <div key={q.id} className="flex justify-between items-center text-sm">
              <span>Zone {q.zoneId}</span>
              <span className={`font-medium ${
                q.estimatedWait > 15 ? "text-critical" : 
                q.estimatedWait > 5 ? "text-warning" : 
                "text-success"
              }`}>
                {q.estimatedWait} min
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
