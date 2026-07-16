import React from "react";

export interface MapLayers {
  crowd: boolean;
  routes: boolean;
  parking: boolean;
  weather: boolean;
  accessibility: boolean;
  transport: boolean;
}

interface LayerSelectorProps {
  layers: MapLayers;
  onToggle: (layer: keyof MapLayers) => void;
}

export function LayerSelector({ layers, onToggle }: LayerSelectorProps) {
  const options: { id: keyof MapLayers; label: string; icon: string }[] = [
    { id: "crowd", label: "Crowd Heatmap", icon: "groups" },
    { id: "routes", label: "Routes", icon: "route" },
    { id: "parking", label: "Parking", icon: "local_parking" },
    { id: "weather", label: "Weather", icon: "partly_cloudy_day" },
    { id: "accessibility", label: "Accessibility", icon: "accessible" },
    { id: "transport", label: "Transport", icon: "directions_bus" },
  ];

  return (
    <div className="absolute top-4 right-4 bg-card rounded-xl shadow-sm border border-border p-2 hidden md:block z-10" aria-label="Map Layers">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 mb-1">Layers</h3>
      <div className="flex flex-col gap-1" role="group" aria-label="Layer toggles">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            aria-pressed={layers[opt.id]}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary ${
              layers[opt.id] 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="material-symbols-rounded text-[18px]" aria-hidden="true">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
