import React from "react";
import { RouteMetadata } from "../../../engine/RouteEngine";
import { Route } from "../../../types";

interface RouteCardProps {
  route: Route; // still passed for ID/identifying if needed, but display values from metadata
  metadata: RouteMetadata;
  isSelected: boolean;
  onSelect: () => void;
}

export function RouteCard({ route, metadata, isSelected, onSelect }: RouteCardProps) {
  return (
    <div 
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Select ${metadata.displayTitle}`}
      aria-pressed={isSelected}
      className={`p-4 rounded-xl cursor-pointer border transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isSelected 
          ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium flex items-center gap-2">
          {metadata.displayTitle}
          {metadata.isOptimal && (
            <span className="text-[10px] uppercase font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded" aria-label="Recommended route">
              Recommended
            </span>
          )}
        </h4>
        <div className="text-right">
          <span className="text-lg font-bold">{metadata.formattedWalkingTime}</span>
          <div className="text-[10px] text-muted-foreground">{metadata.formattedArrivalTime}</div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-2">{metadata.displaySubtitle}</p>
      
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium" style={{ color: metadata.congestionColor }}>
            <span className="material-symbols-rounded text-[14px]">groups</span>
            {metadata.congestionLabel}
          </span>
          <span className="text-muted-foreground font-medium">{metadata.formattedDistance}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="material-symbols-rounded text-[14px]">{route.accessibility ? "accessible" : "directions_walk"}</span>
            {metadata.accessibilityLabel}
          </span>
          <span>{metadata.confidenceLabel}</span>
        </div>
      </div>
    </div>
  );
}
