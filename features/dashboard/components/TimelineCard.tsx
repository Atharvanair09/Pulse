import React, { memo } from "react";
import { TimelineEvent } from "@/types";

export interface TimelineCardProps {
  timeline: TimelineEvent[];
  simulatedTime?: string;
  isLoading?: boolean;
}

export const TimelineCard = memo(function TimelineCard({ timeline, isLoading = false }: TimelineCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48" aria-label="Loading timeline"></div>;
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-1" aria-label="Event Timeline">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded text-primary" aria-hidden="true">event</span>
        Event Timeline
      </h3>
      {timeline.length === 0 ? (
        <p className="text-sm text-foreground/60">No timeline events scheduled.</p>
      ) : (
        <div className="space-y-4">
          {timeline.map((event, idx) => {
            const isPast = event.status === "completed";
            const isCurrent = event.status === "current";

            return (
              <div key={event.id} className={`flex gap-4 ${isPast ? 'opacity-50' : ''}`} aria-current={isCurrent ? "step" : undefined}>
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-1 flex items-center justify-center ${
                    isCurrent ? 'bg-primary ring-4 ring-primary/20 motion-safe:animate-pulse' :
                    isPast ? 'bg-foreground/30' : 'bg-black/10 dark:bg-white/10 border-2 border-primary'
                  }`}>
                    {isCurrent && <div className="w-1.5 h-1.5 bg-background rounded-full"></div>}
                  </div>
                  {idx !== timeline.length - 1 && <div className={`w-0.5 h-full my-1 ${
                    isPast ? 'bg-foreground/30' : 'bg-black/10 dark:bg-white/10'
                  }`}></div>}
                </div>
                <div className="flex-1 pb-4">
                  <div className={`text-sm font-bold ${isCurrent ? 'text-primary' : ''}`}>
                    {event.title}
                    {isCurrent && <span className="ml-2 text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-1.5 py-0.5 rounded">Now</span>}
                  </div>
                  <div className="text-xs text-foreground/60">{new Date(event.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <p className="text-sm mt-1 text-foreground/80 leading-snug">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
