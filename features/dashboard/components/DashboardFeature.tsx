"use client";

import { useVenueContext } from "@/context/VenueContext";
import { HeroSection } from "./HeroSection";
import { QuickActions } from "./QuickActions";
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
    notifications = [],
    event = null,
    simulatedTime,
    lastUpdated
  } = state;

  const score = pulseScore?.score ?? 100;
  const status = pulseScore?.status ?? "Optimal";
  const trend = pulseScore?.trend ?? "Stable";
  const colorClass = score > 60 ? "text-success" : score > 40 ? "text-warning" : "text-destructive";
  
  const eventName = event?.name || "Live Event";
  const formattedSimulatedTime = simulatedTime ? new Date(simulatedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A";
  const displayLastUpdated = lastUpdated || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-foreground/60 text-sm mt-1">Live venue operations overview.</p>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <HeroSection 
          score={score}
          status={status}
          trend={trend}
          colorClass={colorClass}
          eventName={eventName}
          simulatedTime={formattedSimulatedTime}
          lastUpdated={displayLastUpdated}
        />
      </section>

      {/* AI Insights & Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <InsightCard insights={insights} />
        <RecommendationCard recommendations={recommendations} />
        <QuickActions />
      </section>

      {/* Venue Status Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <CrowdCard crowd={crowd} />
        <QueueCard queues={queues} />
        <ParkingCard parking={parking} />
        <TransportCard transport={transport} />
        <WeatherCard weather={weather} />
      </section>

      {/* Timeline, Predictions, Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TimelineCard timeline={timeline} simulatedTime={simulatedTime} />
        <PredictionCard predictions={predictions} />
        <NotificationCard notifications={notifications} />
      </section>
    </div>
  );
}
