"use client";

import { useVenueContext } from "@/context/VenueContext";

export function NotificationsFeature() {
  const { state } = useVenueContext();
  const { notifications = [] } = state;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-foreground/60 text-sm">No notifications to display.</p>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id}
              className={`bg-background border-l-4 p-4 rounded-r-xl border border-black/10 dark:border-white/10 ${
                notif.priority === "Critical" ? "border-l-critical" : 
                notif.priority === "High" ? "border-l-warning" : 
                "border-l-success"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className={`font-bold flex items-center gap-2 ${
                  notif.priority === "Critical" ? "text-critical" : 
                  notif.priority === "High" ? "text-warning" : 
                  "text-success"
                }`}>
                  {notif.title}
                </h3>
                <span className="text-xs text-foreground/50">
                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm mt-1">{notif.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
