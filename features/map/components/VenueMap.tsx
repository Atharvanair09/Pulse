import React from "react";
import { PointOfInterest } from "../../../types";

interface VenueMapProps {
  pois: PointOfInterest[];
  selectedPoiId: string | null;
  onSelectPoi: (poi: PointOfInterest) => void;
  mapCoords: (coords: {lat: number, lng: number}) => {x: number, y: number};
  children: React.ReactNode; // For layers (Heatmap, Routes)
}

export function VenueMap({ pois, selectedPoiId, onSelectPoi, mapCoords, children }: VenueMapProps) {
  const viewBox = "0 0 1000 800";

  const getIconForType = (type: string) => {
    switch(type) {
      case "Gate": return "door_front";
      case "Facility": return "restaurant";
      case "Parking": return "local_parking";
      case "Zone": return "stadium";
      case "Transport": return "directions_bus";
      default: return "location_on";
    }
  };

  const getColorForType = (type: string) => {
    switch(type) {
      case "Gate": return "fill-blue-500 text-blue-500";
      case "Facility": return "fill-amber-500 text-amber-500";
      case "Parking": return "fill-indigo-500 text-indigo-500";
      case "Zone": return "fill-emerald-500 text-emerald-500";
      case "Transport": return "fill-purple-500 text-purple-500";
      default: return "fill-gray-500 text-gray-500";
    }
  };

  return (
    <div className="w-full h-full bg-[#f8fafc] dark:bg-[#0f172a] relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} aria-hidden="true"></div>
      
      <svg 
        viewBox={viewBox} 
        className="w-full h-full max-w-[1200px] max-h-[960px] drop-shadow-xl"
        preserveAspectRatio="xMidYMid meet"
        role="application"
        aria-label="Interactive venue map"
      >
        {/* Render base venue outline (Stadium Shape) */}
        <g className="venue-base" aria-hidden="true">
          {/* Outer Grounds */}
          <rect x="50" y="50" width="900" height="700" rx="100" fill="currentColor" className="text-secondary/30 dark:text-secondary/10" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          
          {/* Main Stadium Building */}
          <ellipse cx="500" cy="400" rx="300" ry="200" fill="currentColor" className="text-card stroke-border" strokeWidth="4"/>
          
          {/* Field / Pitch */}
          <rect x="350" y="300" width="300" height="200" fill="#10b981" opacity="0.1" rx="10" stroke="#10b981" strokeWidth="2"/>
          <circle cx="500" cy="400" r="30" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.4"/>
          <line x1="500" y1="300" x2="500" y2="500" stroke="#10b981" strokeWidth="2" opacity="0.4"/>
        </g>

        {/* Dynamic Layers (Heatmap, Routes) */}
        {children}

        {/* POI Markers */}
        <g className="poi-layer">
          {pois.map(poi => {
            const pos = mapCoords(poi.coordinates);
            const isSelected = selectedPoiId === poi.id;
            const colorClass = getColorForType(poi.type);
            const isZone = poi.type === "Zone";
            
            return (
              <g 
                key={poi.id} 
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => onSelectPoi(poi)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPoi(poi);
                  }
                }}
                className={`cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary ${isZone ? 'opacity-60 hover:opacity-100' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Select ${poi.name} (${poi.type})`}
                aria-pressed={isSelected}
              >
                {/* Zone Boundary Highlight if it's a zone */}
                {isZone && (
                  <circle cx="0" cy="0" r="80" fill="currentColor" className={`${colorClass.split(' ')[0]} opacity-10 stroke-current stroke-2 stroke-dasharray-[5,5]`} />
                )}

                {/* Click target padding */}
                <circle cx="0" cy="0" r="30" fill="transparent" />
                
                {/* Marker Body */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={isSelected ? "18" : "14"} 
                  className={`transition-all duration-300 ${isSelected ? 'fill-primary shadow-lg' : `fill-card stroke-2 stroke-current ${colorClass}`}`}
                />
                
                {/* Marker Icon */}
                <foreignObject x="-12" y="-12" width="24" height="24" className="pointer-events-none flex items-center justify-center">
                   <div className="w-full h-full flex items-center justify-center">
                     <span className={`material-symbols-rounded text-[14px] ${isSelected ? 'text-primary-foreground' : colorClass.replace('fill-', 'text-')}`} aria-hidden="true">
                       {getIconForType(poi.type)}
                     </span>
                   </div>
                </foreignObject>
                
                {/* Label */}
                <text 
                  x="0" 
                  y={isSelected ? "32" : "24"} 
                  textAnchor="middle" 
                  className={`text-[12px] font-bold transition-all duration-300 pointer-events-none select-none ${isSelected ? 'fill-primary' : 'fill-foreground/70 group-hover:fill-foreground'}`}
                  style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
                  aria-hidden="true"
                >
                  {poi.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
