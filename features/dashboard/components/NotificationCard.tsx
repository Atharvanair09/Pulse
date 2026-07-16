import React, { memo } from "react";
import Link from "next/link";
import { Notification } from "@/types";

export interface NotificationCardProps {
  notifications: Notification[];
  isLoading?: boolean;
}

export const NotificationCard = memo(function NotificationCard({ notifications, isLoading = false }: NotificationCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48" aria-label="Loading notifications"></div>;
  
  const recentNotifications = notifications.slice(0, 3); // show top 3
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full" aria-label="Recent Alerts">
      <div>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-rounded text-primary" aria-hidden="true">notifications</span>
          Recent Alerts
        </h3>
        {recentNotifications.length === 0 ? (
          <p className="text-sm text-foreground/60 italic">No recent notifications.</p>
        ) : (
          <div className="space-y-3">
            {recentNotifications.map(n => (
              <div key={n.id} className="text-sm pb-3 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-medium ${
                    n.priority === "Critical" ? "text-critical" : 
                    n.priority === "High" ? "text-warning" : "text-success"
                  }`}>
                    {n.title}
                  </span>
                  <span className="text-xs text-foreground/50 whitespace-nowrap ml-2">
                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-foreground/70 leading-snug line-clamp-2">{n.message}</p>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-foreground/40 font-medium">
                  {n.source}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
        <Link 
          href="/notifications"
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center gap-1 transition-colors"
          aria-label="View all notifications"
        >
          View All Notifications
          <span className="material-symbols-rounded text-[18px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
});
