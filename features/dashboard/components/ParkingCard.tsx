import React from "react";
import { ParkingLot } from "@/types";

export interface ParkingCardProps {
  parking: ParkingLot[];
  isLoading?: boolean;
}

export function ParkingCard({ parking, isLoading = false }: ParkingCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl" aria-label="Parking Status">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">local_parking</span>
        Parking
      </h3>
      {parking.length === 0 ? (
        <p className="text-sm text-foreground/60">No parking data available.</p>
      ) : (
        <div className="space-y-4">
          {parking.map(p => {
            const fillPercent = (p.occupied / p.capacity) * 100;
            return (
              <div key={p.id} className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Lot {p.id}</span>
                  <span className={p.status === "Full" ? "text-critical font-medium" : ""}>
                    {p.status}
                  </span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      fillPercent > 90 ? "bg-critical" : 
                      fillPercent > 70 ? "bg-warning" : "bg-success"
                    }`} 
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <div className="text-xs text-foreground/50 text-right">
                  {p.available} spots left
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
