import { VenueContext, Prediction } from "../types";

export class PredictionEngine {
  public predict(context: VenueContext): Prediction[] {
    const predictions: Prediction[] = [];
    const timestamp = context.simulatedTime || new Date().toISOString();

    // 1. Parking Overflow Prediction
    const mainParking = context.parking.find(p => p.id === "p-main");
    if (mainParking && (mainParking.occupied / mainParking.capacity) > 0.8 && mainParking.status !== "Full") {
      predictions.push({
        id: "pred-parking",
        prediction: "Main Parking will reach capacity.",
        confidence: "High",
        reasoning: "Current fill rate and event start time suggest overflow.",
        estimatedTimeHorizon: "15 minutes",
        timestamp
      });
    }

    // 2. Weather Impact Prediction
    if (context.weather && context.weather.condition === "Heavy Rain") {
      predictions.push({
        id: "pred-weather",
        prediction: "Indoor areas and concourses will experience high density.",
        confidence: "Medium",
        reasoning: "Attendees will seek shelter from the rain.",
        estimatedTimeHorizon: "5 minutes",
        timestamp
      });
    }

    // 3. Crowd / Transport Prediction
    const delayedMetro = context.transport.find(t => t.status === "Delayed");
    if (delayedMetro) {
      predictions.push({
        id: "pred-transport",
        prediction: "Surge in arrivals delayed.",
        confidence: "High",
        reasoning: `${delayedMetro.mode} ${delayedMetro.line} is delayed by ${delayedMetro.delayMinutes} minutes. Expect a localized spike at the transit gate upon arrival.`,
        estimatedTimeHorizon: `${delayedMetro.delayMinutes} minutes`,
        timestamp
      });
    }
    
    // 4. Timeline based prediction (Mock heuristic based on time to event)
    if (context.event && context.event.startTime) {
      const msToStart = new Date(context.event.startTime).getTime() - new Date(timestamp).getTime();
      const minsToStart = Math.floor(msToStart / 60000);
      
      if (minsToStart > 0 && minsToStart <= 30) {
        predictions.push({
          id: "pred-gate-rush",
          prediction: "Gate congestion will increase rapidly.",
          confidence: "High",
          reasoning: "Event kickoff is approaching in less than 30 minutes.",
          estimatedTimeHorizon: "10 minutes",
          timestamp
        });
      }
    }

    // Sort predictions by confidence (High > Medium > Low)
    const confidenceOrder = { High: 0, Medium: 1, Low: 2 };
    predictions.sort((a, b) => {
      return (confidenceOrder[a.confidence] ?? 3) - (confidenceOrder[b.confidence] ?? 3);
    });

    return predictions;
  }
}
