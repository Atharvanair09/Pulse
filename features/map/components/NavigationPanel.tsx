import React from "react";
import { PointOfInterest, Route, Coordinates } from "../../../types";
import { RouteMetadata } from "../../../engine/RouteEngine";
import { RouteCard } from "./RouteCard";

interface NavigationPanelProps {
  pois: PointOfInterest[];
  origin: Coordinates;
  destination: PointOfInterest | null;
  routes: { route: Route; metadata: RouteMetadata }[];
  selectedRouteId: string | null;
  accessibilityRequired: boolean;
  onSelectDestination: (poi: PointOfInterest | null) => void;
  onSelectRoute: (routeId: string) => void;
  onToggleAccessibility: () => void;
}

export function NavigationPanel({
  pois,
  destination,
  routes,
  selectedRouteId,
  accessibilityRequired,
  onSelectDestination,
  onSelectRoute,
  onToggleAccessibility
}: NavigationPanelProps) {
  return (
    <nav className="absolute top-4 left-4 w-[calc(100%-2rem)] md:w-96 bg-card/95 backdrop-blur-md rounded-2xl shadow-xl border border-border p-4 z-20 flex flex-col max-h-[calc(100%-2rem)] overflow-hidden" aria-label="Venue Navigation">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
          <span className="material-symbols-rounded">navigation</span>
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Navigation</h2>
          <p className="text-xs text-muted-foreground">Find the best way around.</p>
        </div>
      </div>

      <div className="space-y-3 mb-4 shrink-0">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
          <div className="w-full bg-secondary/50 rounded-lg py-2.5 pl-8 pr-3 text-sm text-muted-foreground border border-transparent" aria-label="Starting location: Your simulated location">
            Your Location (Simulated)
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-red-500" aria-hidden="true"></div>
          <select 
            aria-label="Select destination"
            className="w-full bg-background rounded-lg py-2.5 pl-8 pr-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            value={destination?.id || ""}
            onChange={(e) => {
              const poi = pois.find(p => p.id === e.target.value) || null;
              onSelectDestination(poi);
            }}
          >
            <option value="">Select Destination...</option>
            {pois.map(poi => (
              <option key={poi.id} value={poi.id}>{poi.name} ({poi.type})</option>
            ))}
          </select>
          <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm" aria-hidden="true">expand_more</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 shrink-0">
        <span className="text-sm font-medium" id="a11y-label">Accessibility Mode</span>
        <button 
          onClick={onToggleAccessibility}
          aria-labelledby="a11y-label"
          aria-pressed={accessibilityRequired}
          className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${accessibilityRequired ? 'bg-primary' : 'bg-secondary'}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${accessibilityRequired ? 'left-5' : 'left-1'}`}></div>
        </button>
      </div>

      {destination && routes.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2 custom-scrollbar" role="region" aria-label="Recommended routes">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 mt-2">Recommended Routes</h3>
          {routes.map(item => (
            <RouteCard
              key={item.route.id}
              route={item.route}
              metadata={item.metadata}
              isSelected={selectedRouteId === item.route.id}
              onSelect={() => onSelectRoute(item.route.id)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
