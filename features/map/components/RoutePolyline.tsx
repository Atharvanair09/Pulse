import React from "react";
import { Route } from "../../../types";

interface RoutePolylineProps {
  route: Route;
  colorHex: string;
  isActive: boolean;
  mapCoords: (coords: {lat: number, lng: number}) => {x: number, y: number};
}

export function RoutePolyline({ route, colorHex, isActive, mapCoords }: RoutePolylineProps) {
  if (!route.path || route.path.length < 2) return null;

  // Convert logical lat/lng to SVG x/y
  const points = route.path.map(p => mapCoords(p));
  
  // Construct SVG path string
  const d = points.reduce((acc, point, i) => {
    return acc + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
  }, "");

  return (
    <g className={`route-polyline transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {/* Background thicker line for click area and border effect */}
      <path
        d={d}
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-white/10"
      />
      
      {/* Main route line */}
      <path
        d={d}
        fill="none"
        stroke={colorHex}
        strokeWidth={isActive ? "6" : "4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={route.routeType === "Accessible" ? "10,10" : "none"}
        className={`transition-all duration-300 ${isActive ? 'drop-shadow-md' : ''}`}
      />
      
      {/* Animated dots flowing along the active line to indicate direction */}
      {isActive && (
        <path
          d={d}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1, 15"
          className="animate-[dash_20s_linear_infinite]"
        />
      )}
    </g>
  );
}
