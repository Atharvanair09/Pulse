import React, { memo } from "react";
import { PulseRing } from "@/components/ui/PulseRing";

export interface HeroSectionProps {
  score: number;
  status: string;
  trend?: "Improving" | "Stable" | "Declining";
  colorClass: string;
  eventName: string;
  simulatedTime: string;
  lastUpdated: string;
  isLoading?: boolean;
}

export const HeroSection = memo(function HeroSection({
  score,
  status,
  trend,
  colorClass,
  eventName,
  simulatedTime,
  lastUpdated,
  isLoading = false,
}: HeroSectionProps) {
  let ringTrend: "up" | "down" | "stable" | null = null;
  if (trend === "Improving") ringTrend = "up";
  else if (trend === "Declining") ringTrend = "down";
  else if (trend === "Stable") ringTrend = "stable";

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 justify-between md:col-span-3 lg:col-span-4">
      <div className="flex-1 space-y-4 text-center md:text-left">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-8 w-3/4 bg-black/10 dark:bg-white/10 rounded mx-auto md:mx-0"></div>
            <div className="h-4 w-1/2 bg-black/10 dark:bg-white/10 rounded mx-auto md:mx-0"></div>
            <div className="h-4 w-1/3 bg-black/10 dark:bg-white/10 rounded mx-auto md:mx-0"></div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold">{eventName || "Live Event"}</h2>
            <div className="text-foreground/70 space-y-2 mt-4">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="material-symbols-rounded text-lg">schedule</span>
                <span className="font-medium">Simulated Time:</span> {simulatedTime || "N/A"}
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-foreground/50">
                <span className="material-symbols-rounded text-base">update</span>
                Last Updated: {lastUpdated}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center min-w-[200px]">
        <PulseRing
          score={score}
          statusLabel={status}
          trend={ringTrend}
          isLoading={isLoading}
          colorClass={colorClass}
          size="lg"
        />
        {!isLoading && (
          <p className="text-sm text-foreground/60 font-medium tracking-wide uppercase mt-2">Venue Health</p>
        )}
      </div>
    </div>
  );
});
