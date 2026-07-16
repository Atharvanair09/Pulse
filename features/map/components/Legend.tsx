import React from "react";

export function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-sm border border-border p-3 text-xs z-10 hidden md:block">
      <h4 className="font-bold mb-2 uppercase tracking-wide text-[10px] text-muted-foreground">Legend</h4>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60"></div>
          <span>Low Density</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 opacity-60"></div>
          <span>Moderate Density</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
          <span>High Density</span>
        </div>
      </div>
    </div>
  );
}
