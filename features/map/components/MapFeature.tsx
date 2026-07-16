"use client";

import React, { useState, useMemo } from "react";
import { useVenueContext } from "../../../context/VenueContext";
import { NavigationEngine } from "../../../engine/NavigationEngine";
import { RouteEngine } from "../../../engine/RouteEngine";
import { PointOfInterest } from "../../../types";
import { VenueMap } from "./VenueMap";
import { NavigationPanel } from "./NavigationPanel";
import { CrowdHeatmap } from "./CrowdHeatmap";
import { RoutePolyline } from "./RoutePolyline";
import { POICard } from "./POICard";
import { LayerSelector, MapLayers } from "./LayerSelector";
import { Legend } from "./Legend";
import { MiniMap } from "./MiniMap";

const mapCoords = (coords: { lat: number, lng: number }) => {
  const centerLat = 40.7128;
  const centerLng = -74.0060;
  const x = 500 + (coords.lng - centerLng) * 50000;
  const y = 400 - (coords.lat - centerLat) * 50000;
  return { x, y };
};

// Base static POIs (raw representation)
const BASE_POIS: PointOfInterest[] = [
  { id: "g-north", name: "North Gate", type: "Gate", coordinates: { lat: 40.7188, lng: -74.0060 }, zoneId: "cz-north", status: "Open", accessibilitySupported: true, description: "Main entrance with security." },
  { id: "g-south", name: "South Gate", type: "Gate", coordinates: { lat: 40.7068, lng: -74.0060 }, zoneId: "cz-south", status: "Open", accessibilitySupported: true, description: "Secondary entrance." },
  { id: "f-food-1", name: "Food Court A", type: "Facility", coordinates: { lat: 40.7128, lng: -73.9960 }, zoneId: "cz-food", status: "Open", accessibilitySupported: true, description: "Main concessions." },
  { id: "p-main", name: "Main Parking", type: "Parking", coordinates: { lat: 40.7128, lng: -74.0160 }, zoneId: "pz-main", status: "Open", accessibilitySupported: true, description: "VIP and General parking." },
  // Adding requested Zone and Transport POIs
  { id: "z-north-conc", name: "North Concourse", type: "Zone", coordinates: { lat: 40.7170, lng: -74.0060 }, zoneId: "cz-north", status: "Open", description: "Main circulation area behind North Gate." },
  { id: "t-bus-1", name: "Transit Hub", type: "Transport", coordinates: { lat: 40.7198, lng: -74.0080 }, zoneId: "tz-hub", status: "Open", accessibilitySupported: true, description: "City bus connections." }
];

const ORIGIN_COORDS = { lat: 40.7088, lng: -74.0100 };

export function MapFeature() {
  const { state } = useVenueContext();
  
  const navigationEngine = useMemo(() => new NavigationEngine(), []);
  const routeEngine = useMemo(() => new RouteEngine(), []);

  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [destinationPoiId, setDestinationPoiId] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [accessibilityRequired, setAccessibilityRequired] = useState(false);
  const [layers, setLayers] = useState<MapLayers>({
    crowd: true,
    routes: true,
    parking: true,
    weather: false,
    accessibility: false,
    transport: true, // New layer toggle
  });

  // Inject dynamic data into POIs
  const dynamicPois = useMemo(() => {
    return BASE_POIS.map(poi => {
      const zone = state.crowd.find(c => c.id === poi.zoneId);
      const queue = state.queues.find(q => q.zoneId === poi.zoneId);
      
      let recommendation = "";
      if (zone?.density === "Critical") recommendation = "Avoid this area due to severe congestion.";
      else if (queue && queue.estimatedWait > 20) recommendation = "Long wait times expected. Check back later.";
      else recommendation = "Conditions are normal.";

      return {
        ...poi,
        queueLength: queue?.currentLength,
        estimatedWait: queue?.estimatedWait,
        crowdDensity: zone?.density,
        recommendation
      };
    });
  }, [state.crowd, state.queues]);

  const visiblePois = useMemo(() => {
    return dynamicPois.filter(poi => {
      if (poi.type === "Transport" && !layers.transport) return false;
      if (poi.type === "Parking" && !layers.parking) return false;
      return true;
    });
  }, [dynamicPois, layers]);

  // Construct Heatmap Data without tying UI to density logic
  const heatmapZones = useMemo(() => {
    return state.crowd.map(zone => {
      const relatedPoi = dynamicPois.find(p => p.zoneId === zone.id);
      if (!relatedPoi) return null;
      
      const pos = mapCoords(relatedPoi.coordinates);
      const queue = state.queues.find(q => q.zoneId === zone.id);
      const waitTime = queue ? queue.estimatedWait : 0;
      
      let color = "transparent";
      let baseRadius = 0;
      switch(zone.density) {
        case "Low": color = "rgba(16, 185, 129, 0.4)"; baseRadius = 60; break;
        case "Moderate": color = "rgba(245, 158, 11, 0.5)"; baseRadius = 90; break;
        case "High": color = "rgba(239, 68, 68, 0.6)"; baseRadius = 120; break;
        case "Critical": color = "rgba(220, 38, 38, 0.8)"; baseRadius = 150; break;
      }
      
      return {
        id: zone.id,
        x: pos.x,
        y: pos.y,
        color,
        radius: baseRadius + (waitTime * 2)
      };
    }).filter(Boolean) as any[];
  }, [state.crowd, state.queues, dynamicPois]);

  const navigationData = useMemo(() => {
    if (!destinationPoiId) return null;
    const dest = dynamicPois.find(p => p.id === destinationPoiId);
    if (!dest) return null;

    const navResult = navigationEngine.calculateRoutes(state, ORIGIN_COORDS, dest, accessibilityRequired);
    return routeEngine.processRoutes(navResult);
  }, [state, destinationPoiId, accessibilityRequired, navigationEngine, routeEngine, dynamicPois]);

  const activeRouteId = useMemo(() => {
    if (selectedRouteId) return selectedRouteId;
    if (navigationData && navigationData.length > 0) {
      const recommended = navigationData.find(n => n.metadata.isOptimal);
      return recommended ? recommended.route.id : navigationData[0].route.id;
    }
    return null;
  }, [selectedRouteId, navigationData]);

  const handleToggleLayer = (layer: keyof MapLayers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const selectedPoi = dynamicPois.find(p => p.id === selectedPoiId) || null;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-screen bg-background overflow-hidden">
      <VenueMap 
        pois={visiblePois} 
        selectedPoiId={selectedPoiId}
        onSelectPoi={(poi) => setSelectedPoiId(poi.id)}
        mapCoords={mapCoords}
      >
        {layers.crowd && (
          <CrowdHeatmap zones={heatmapZones} />
        )}
        
        {layers.routes && navigationData && (
          <g className="routes-layer" aria-label="Route paths">
            {navigationData.map(({ route, metadata }) => (
              <RoutePolyline
                key={route.id}
                route={route}
                colorHex={metadata.congestionColor}
                isActive={activeRouteId === route.id}
                mapCoords={mapCoords}
              />
            ))}
          </g>
        )}
      </VenueMap>

      <NavigationPanel
        pois={dynamicPois}
        origin={ORIGIN_COORDS}
        destination={dynamicPois.find(p => p.id === destinationPoiId) || null}
        routes={navigationData || []}
        selectedRouteId={activeRouteId}
        accessibilityRequired={accessibilityRequired}
        onSelectDestination={(poi) => {
          setDestinationPoiId(poi ? poi.id : null);
          setSelectedRouteId(null);
          if (poi) setSelectedPoiId(poi.id);
        }}
        onSelectRoute={(id) => setSelectedRouteId(id)}
        onToggleAccessibility={() => setAccessibilityRequired(p => !p)}
      />

      <LayerSelector layers={layers} onToggle={handleToggleLayer} />
      <Legend />
      <MiniMap />

      {selectedPoi && (
        <POICard 
          poi={selectedPoi} 
          onClose={() => setSelectedPoiId(null)}
          onNavigate={() => setDestinationPoiId(selectedPoi.id)}
        />
      )}
    </div>
  );
}
