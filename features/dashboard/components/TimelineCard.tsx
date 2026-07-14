import React from "react";
import { TimelineEvent } from "@/types";

export interface TimelineCardProps {
  timeline: TimelineEvent[];
  isLoading?: boolean;
}

export function TimelineCard({ timeline, isLoading = false }: TimelineCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-2">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">event</span>
        Event Timeline
      </h3>
      {timeline.length === 0 ? (
        <p className="text-sm text-foreground/60">No timeline events scheduled.</p>
      ) : (
        <div className="space-y-4">
          {timeline.map((event, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                {idx !== timeline.length - 1 && <div className="w-px h-full bg-black/10 dark:bg-white/10 my-1"></div>}
              </div>
              <div className="flex-1 pb-4">
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-foreground/60">{new Date(event.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <p className="text-sm mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
