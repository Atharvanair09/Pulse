import React from "react";
import { Weather } from "@/types";

export interface WeatherCardProps {
  weather: Weather | null;
  isLoading?: boolean;
}

export function WeatherCard({ weather, isLoading = false }: WeatherCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  if (!weather) return null;

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">cloud</span>
        Weather
      </h3>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground/60">Condition</span>
          <span className="font-medium">{weather.condition}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Temperature</span>
          <span className="font-medium">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Wind</span>
          <span className="font-medium">{weather.wind} km/h</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-foreground/60">Alert Level</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            weather.alertLevel === "Warning" ? "bg-critical/10 text-critical" :
            weather.alertLevel === "Watch" ? "bg-warning/10 text-warning" :
            weather.alertLevel === "Advisory" ? "bg-warning/5 text-warning" :
            "bg-success/10 text-success"
          }`}>
            {weather.alertLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
