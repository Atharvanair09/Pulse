import React from "react";

interface HeatmapZone {
  id: string;
  x: number;
  y: number;
  color: string;
  radius: number;
}

interface CrowdHeatmapProps {
  zones: HeatmapZone[];
}

export function CrowdHeatmap({ zones }: CrowdHeatmapProps) {
  return (
    <g className="crowd-heatmap-layer pointer-events-none mix-blend-multiply dark:mix-blend-screen" aria-hidden="true">
      {/* SVG Filters for gaussian blur to create heatmap effect */}
      <defs>
        <filter id="heatmap-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
        </filter>
      </defs>

      {zones.map(zone => (
        <g key={`heatmap-${zone.id}`}>
          {/* Outer soft glow */}
          <circle
            cx={zone.x}
            cy={zone.y}
            r={zone.radius}
            fill={zone.color}
            filter="url(#heatmap-blur)"
            className="transition-all duration-1000 ease-in-out"
          />
          {/* Inner intense core */}
          <circle
            cx={zone.x}
            cy={zone.y}
            r={zone.radius * 0.4}
            fill={zone.color}
            filter="url(#heatmap-blur)"
            className="transition-all duration-1000 ease-in-out opacity-80"
          />
        </g>
      ))}
    </g>
  );
}
