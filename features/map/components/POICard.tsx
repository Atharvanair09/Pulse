import React, { useEffect, useRef } from "react";
import { PointOfInterest } from "../../../types";

interface POICardProps {
  poi: PointOfInterest;
  onClose: () => void;
  onNavigate: () => void;
}

export function POICard({ poi, onClose, onNavigate }: POICardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Focus the card for screen readers when it appears
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [poi.id]);

  const getIcon = (type: string) => {
    switch(type) {
      case "Gate": return "door_front";
      case "Facility": return "restaurant";
      case "Parking": return "local_parking";
      case "Transport": return "directions_bus";
      case "Zone": return "stadium";
      default: return "location_on";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "open": return "text-emerald-500 bg-emerald-500/10";
      case "closed": return "text-red-500 bg-red-500/10";
      default: return "text-foreground bg-secondary";
    }
  };

  return (
    <div 
      ref={cardRef}
      role="dialog"
      aria-labelledby="poi-title"
      tabIndex={-1}
      className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card rounded-xl shadow-xl border border-border p-4 animate-in slide-in-from-bottom-4 focus:outline-none"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-rounded text-primary text-sm" aria-hidden="true">{getIcon(poi.type)}</span>
          </div>
          <div>
            <h3 id="poi-title" className="font-medium text-foreground leading-tight">{poi.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">{poi.type}</span>
              {poi.status && (
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getStatusColor(poi.status)}`}>
                  {poi.status}
                </span>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close POI details"
          className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 -mr-1 -mt-1"
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>

      {poi.description && (
        <p className="text-sm text-muted-foreground mb-4">{poi.description}</p>
      )}

      {/* Real-time Context Data */}
      {(poi.crowdDensity || poi.queueLength !== undefined) && (
        <div className="bg-secondary/50 rounded-lg p-3 mb-4 space-y-2">
          {poi.crowdDensity && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Crowd Density:</span>
              <span className="font-medium">{poi.crowdDensity}</span>
            </div>
          )}
          {poi.queueLength !== undefined && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Queue Line:</span>
              <span className="font-medium">{poi.queueLength} people</span>
            </div>
          )}
          {poi.estimatedWait !== undefined && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Est. Wait:</span>
              <span className="font-medium">{poi.estimatedWait} mins</span>
            </div>
          )}
        </div>
      )}

      {poi.recommendation && (
        <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 text-primary rounded-lg p-2.5 mb-4 text-xs">
          <span className="material-symbols-rounded text-[16px] mt-0.5">smart_toy</span>
          <span>{poi.recommendation}</span>
        </div>
      )}

      {poi.accessibilitySupported && (
        <div className="flex items-center gap-1 text-xs text-purple-500 mb-4 bg-purple-500/10 w-max px-2 py-1 rounded">
          <span className="material-symbols-rounded text-[14px]">accessible</span>
          Accessible
        </div>
      )}

      <button 
        onClick={onNavigate}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <span className="material-symbols-rounded text-sm">directions</span>
        Navigate Here
      </button>
    </div>
  );
}
