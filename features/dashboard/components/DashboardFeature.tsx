"use client";

import { useVenueContext } from "@/context/VenueContext";
import { PulseScoreCard } from "./PulseScoreCard";
import { InsightCard } from "./InsightCard";
import { CrowdCard } from "./CrowdCard";
import { QueueCard } from "./QueueCard";
import { WeatherCard } from "./WeatherCard";
import { ParkingCard } from "./ParkingCard";
import { TransportCard } from "./TransportCard";
import { TimelineCard } from "./TimelineCard";
import { PredictionCard } from "./PredictionCard";
import { RecommendationCard } from "./RecommendationCard";
import { NotificationCard } from "./NotificationCard";

export function DashboardFeature() {
  const { state } = useVenueContext();
  const { 
    pulseScore, 
    insights = [], 
    crowd = [], 
    queues = [], 
    weather = null, 
    parking = [], 
    transport = [], 
    timeline = [], 
    predictions = [], 
    recommendations = [], 
    notifications = [] 
  } = state;

  const score = pulseScore?.score ?? 100;
  const status = pulseScore?.status ?? "Optimal";
  const trend = pulseScore?.trend ?? "Stable";
  const colorClass = score > 60 ? "text-success" : score > 40 ? "text-warning" : "text-destructive";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-foreground/60 text-sm">Live venue operations overview.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PulseScoreCard score={score} status={status} trend={trend as any} colorClass={colorClass} />
        <InsightCard insights={insights} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CrowdCard crowd={crowd} />
        <QueueCard queues={queues} />
        <WeatherCard weather={weather} />
        <ParkingCard parking={parking} />
        <TransportCard transport={transport} />
        <PredictionCard predictions={predictions} />
        <NotificationCard notifications={notifications} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecommendationCard recommendations={recommendations} />
        <TimelineCard timeline={timeline} />
      </section>
    </div>
  );
}
