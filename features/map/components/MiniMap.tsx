import React from "react";

export function MiniMap() {
  return (
    <div className="absolute bottom-4 right-4 w-32 h-24 bg-card rounded-lg shadow-sm border border-border overflow-hidden z-10 hidden lg:block opacity-70 hover:opacity-100 transition-opacity">
      <div className="w-full h-full bg-secondary/50 relative">
        {/* Simple visual representation of a minimap */}
        <div className="absolute inset-2 border-2 border-primary/20 rounded-[40%]"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-6 bg-primary/20 -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-sm shadow-[0_0_0_999px_rgba(0,0,0,0.1)]"></div>
      </div>
    </div>
  );
}
