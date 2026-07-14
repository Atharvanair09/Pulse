import { VenueContext, Notification } from "../types";

export class NotificationEngine {
  private activeNotificationIds: Set<string> = new Set();
  
  public generate(context: VenueContext): Notification[] {
    const newNotifications: Notification[] = [];
    const timestamp = context.simulatedTime || new Date().toISOString();

    // 1. Process Recommendations into Notifications
    for (const rec of context.recommendations) {
      const notifId = `notif-rec-${rec.id}`;
      if (!this.activeNotificationIds.has(notifId)) {
        newNotifications.push({
          id: notifId,
          priority: rec.priority,
          title: rec.title,
          message: `${rec.reason} ${rec.action ? `Action: ${rec.action}` : ''}`,
          timestamp,
          read: false,
          source: "RecommendationEngine",
          recommendationId: rec.id
        });
        this.activeNotificationIds.add(notifId);
      }
    }

    // 2. Process Predictions into Notifications (Only High/Critical)
    for (const pred of context.predictions) {
      if (pred.confidence === "High") {
        const notifId = `notif-pred-${pred.id}`;
        if (!this.activeNotificationIds.has(notifId)) {
          newNotifications.push({
            id: notifId,
            priority: "Medium", // Predictions are generally medium priority alerts
            title: "Prediction Alert",
            message: `${pred.prediction} ${pred.reasoning}`,
            timestamp,
            read: false,
            source: "PredictionEngine"
          });
          this.activeNotificationIds.add(notifId);
        }
      }
    }

    // 3. Process Incidents into Notifications
    for (const inc of context.incidents) {
      if (!inc.resolved) {
        const notifId = `notif-inc-${inc.id}`;
        if (!this.activeNotificationIds.has(notifId)) {
          newNotifications.push({
            id: notifId,
            priority: inc.severity as any,
            title: `Incident: ${inc.type}`,
            message: inc.description,
            timestamp,
            read: false,
            source: "IncidentSystem"
          });
          this.activeNotificationIds.add(notifId);
        }
      }
    }

    // Return the combined array (in a real app we'd manage the state of old notifications in context,
    // so we return the newly generated ones to be appended, or return the full list).
    // Let's assume the context provider will manage appending them.
    return newNotifications;
  }
}
