import { VenueContext, Insight } from "../types";

export class InsightEngine {
  public generate(context: VenueContext): Insight[] {
    const insights: Insight[] = [];
    const timestamp = context.simulatedTime || new Date().toISOString();

    // Look at crowd zones
    const northGate = context.crowd.find(c => c.id === "cz-north");
    if (northGate && northGate.density === "Critical") {
      insights.push({
        id: `ins-north-gate-${context.simulationTick}`,
        category: "Crowd Dynamics",
        explanation: "North Gate congestion has reached critical levels due to the simultaneous arrival of two shuttle buses and limited open turnstiles.",
        timestamp,
        confidence: "High"
      });
    }

    // Look at parking
    const mainParking = context.parking.find(p => p.id === "p-main");
    if (mainParking && mainParking.status === "Full") {
      insights.push({
        id: `ins-parking-${context.simulationTick}`,
        category: "Operations",
        explanation: "Main parking lot filled faster than expected because more attendees opted to drive rather than use the delayed Metro service.",
        timestamp,
        confidence: "High"
      });
    }

    // Look at incidents
    const activeIncident = context.incidents.find(i => !i.resolved);
    if (activeIncident) {
      insights.push({
        id: `ins-incident-${activeIncident.id}`,
        category: "Security",
        explanation: `A ${activeIncident.type.toLowerCase()} incident near ${activeIncident.location} is causing localized traffic redirection.`,
        timestamp,
        confidence: "High"
      });
    }

    // Look at weather
    if (context.weather && context.weather.alertLevel === "Warning") {
      insights.push({
        id: `ins-weather-${context.simulationTick}`,
        category: "Environment",
        explanation: "Severe weather conditions are driving attendees away from outdoor vendor areas and into the main concourse.",
        timestamp,
        confidence: "Medium"
      });
    }

    // Limit insights to the most recent/relevant to prevent spam, or return all current valid insights.
    // In a real system, you'd compare against previous state to only generate *new* insights on edges.
    return insights;
  }
}
