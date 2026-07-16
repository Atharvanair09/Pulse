import React from "react";
import { Transport } from "@/types";

export interface TransportCardProps {
  transport: Transport[];
  isLoading?: boolean;
}

export function TransportCard({ transport, isLoading = false }: TransportCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl" aria-label="Transport Status">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">directions_bus</span>
        Transit Options
      </h3>
      {transport.length === 0 ? (
        <p className="text-sm text-foreground/60">No transit data available.</p>
      ) : (
        <div className="space-y-3">
          {transport.map((t, idx) => (
            <div key={idx} className="flex flex-col gap-1 text-sm border-b border-black/5 dark:border-white/5 pb-2 last:border-0">
              <div className="flex justify-between font-medium">
                <span>{t.mode} - {t.line}</span>
                <span className={
                  t.status === "Suspended" ? "text-critical" : 
                  t.status === "Delayed" ? "text-warning" : "text-success"
                }>
                  {t.status}
                </span>
              </div>
              {t.status === "Delayed" && (
                <span className="text-xs text-foreground/60">Delayed by {t.delayMinutes} mins</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
