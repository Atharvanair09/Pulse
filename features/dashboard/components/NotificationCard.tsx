import React from "react";
import { Notification } from "@/types";

export interface NotificationCardProps {
  notifications: Notification[];
  isLoading?: boolean;
}

export function NotificationCard({ notifications, isLoading = false }: NotificationCardProps) {
  if (isLoading) return <div className="animate-pulse bg-black/5 dark:bg-white/5 p-6 rounded-2xl h-48"></div>;
  
  const recentNotifications = notifications.slice(0, 3); // show top 3
  
  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">notifications</span>
        Recent Alerts
      </h3>
      {recentNotifications.length === 0 ? (
        <p className="text-sm text-foreground/60">No recent notifications.</p>
      ) : (
        <div className="space-y-3">
          {recentNotifications.map(n => (
            <div key={n.id} className="text-sm">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${
                  n.priority === "Critical" ? "text-critical" : 
                  n.priority === "High" ? "text-warning" : "text-success"
                }`}>
                  {n.title}
                </span>
                <span className="text-xs text-foreground/50">
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-foreground/70 mt-1 line-clamp-2">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
