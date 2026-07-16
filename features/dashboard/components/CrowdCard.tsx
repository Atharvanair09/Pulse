import React from "react";
import { CrowdZone } from "@/types";

export interface CrowdCardProps {
  crowd: CrowdZone[];
  isLoading?: boolean;
}

export function CrowdCard({ crowd, isLoading = false }: CrowdCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl" aria-label="Crowd Status">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">groups</span>
        Crowd Density
      </h3>
      {crowd.length === 0 ? (
        <p className="text-sm text-foreground/60">No crowd data available.</p>
      ) : (
        <div className="space-y-3">
          {crowd.map(c => (
            <div key={c.id} className="flex justify-between items-center text-sm">
              <span>{c.zoneName}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                c.density === "Critical" ? "bg-critical/10 text-critical" : 
                c.density === "High" ? "bg-warning/10 text-warning" : 
                "bg-success/10 text-success"
              }`}>
                {c.density}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
