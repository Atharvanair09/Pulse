import { VenueContext, Recommendation } from "../types";

export class RecommendationEngine {
  public generate(context: VenueContext): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // 1. Crowd/Queue Recommendations
    const northGate = context.crowd.find(c => c.id === "cz-north");
    const southGate = context.crowd.find(c => c.id === "cz-south");
    
    const northQueue = context.queues.find(q => q.zoneId === "cz-north");
    const southQueue = context.queues.find(q => q.zoneId === "cz-south");
    
    if (northGate && southGate && northQueue && southQueue) {
      if (northGate.density === "Critical" && southGate.density === "Low") {
        recommendations.push({
          id: "rec-gate-route",
          priority: "High",
          title: "Use South Gate",
          reason: "North Gate is currently experiencing critical congestion.",
          expectedImpact: `Saves approximately ${northQueue.estimatedWait - southQueue.estimatedWait} minutes in queue.`,
          confidence: "High",
          action: "Route to South Gate",
          timestamp: context.simulatedTime || new Date().toISOString()
        });
      }
    }

    // 2. Parking Recommendations
    const mainParking = context.parking.find(p => p.id === "p-main");
    if (mainParking && mainParking.status === "Full") {
      recommendations.push({
        id: "rec-parking",
        priority: "Critical",
        title: "Main Parking Full",
        reason: "The main parking lot has reached capacity.",
        expectedImpact: "Avoids traffic bottleneck at main entrance.",
        confidence: "High",
        action: "Reroute to Overflow Parking",
        timestamp: context.simulatedTime || new Date().toISOString()
      });
    } else if (mainParking && (mainParking.occupied / mainParking.capacity) > 0.8) {
      recommendations.push({
        id: "rec-parking",
        priority: "High",
        title: "Parking filling up quickly",
        reason: "Main parking lot is over 80% full.",
        expectedImpact: "Ensures parking spot availability.",
        confidence: "High",
        action: "Leave for venue now",
        timestamp: context.simulatedTime || new Date().toISOString()
      });
    }

    // 3. Weather Recommendations
    if (context.weather && context.weather.alertLevel === "Warning") {
      recommendations.push({
        id: "rec-weather",
        priority: "Critical",
        title: "Severe Weather Warning",
        reason: `${context.weather.condition} reported in the area.`,
        expectedImpact: "Ensures personal safety.",
        confidence: "High",
        action: "Seek indoor shelter immediately",
        timestamp: context.simulatedTime || new Date().toISOString()
      });
    }

    // 4. Transport Recommendations
    const delayedMetro = context.transport.find(t => t.status === "Delayed");
    if (delayedMetro) {
      recommendations.push({
        id: "rec-transport",
        priority: "Medium",
        title: `${delayedMetro.mode} ${delayedMetro.line} Delayed`,
        reason: `Reported delay of ${delayedMetro.delayMinutes} minutes.`,
        expectedImpact: "Avoids unnecessary waiting at transit station.",
        confidence: "High",
        action: "Consider using Shuttle Bus instead",
        timestamp: context.simulatedTime || new Date().toISOString()
      });
    }

    // 5. Incident Recommendations
    const activeIncident = context.incidents.find(i => !i.resolved);
    if (activeIncident && activeIncident.severity === "High") {
      recommendations.push({
        id: `rec-incident-${activeIncident.id}`,
        priority: "Critical",
        title: "Avoid Area",
        reason: activeIncident.description,
        expectedImpact: "Allows emergency teams clear access.",
        confidence: "High",
        action: `Reroute away from ${activeIncident.location}`,
        timestamp: context.simulatedTime || new Date().toISOString()
      });
    }

    return recommendations;
  }
}
