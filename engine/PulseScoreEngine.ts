import { VenueContext, PulseScore } from "../types";

export class PulseScoreEngine {
  private readonly config = {
    weights: {
      incidentCritical: 25,
      incidentHigh: 15,
      incidentMedium: 5,
      incidentLow: 2,
      crowdCritical: 15,
      crowdHigh: 8,
      crowdModerate: 3,
      queueCritical: 10,
      queueHigh: 5,
      parkingFull: 10,
      weatherWarning: 20,
      weatherWatch: 10,
      weatherAdvisory: 5,
      transportSuspended: 15,
      transportDelayed: 5,
      predictionNegative: 5, // Deduct per negative prediction (e.g. low confidence or alarming predictions)
    },
    baseScore: 100
  };

  public calculateScore(context: VenueContext, previousScore?: PulseScore): PulseScore {
    let score = this.config.baseScore;
    const reasons: string[] = [];

    // 1. Process Incidents
    const activeIncidents = context.incidents.filter(i => !i.resolved);
    activeIncidents.forEach(incident => {
      if (incident.severity === "Critical") {
        score -= this.config.weights.incidentCritical;
        reasons.push(`Critical incident reported: ${incident.type}`);
      } else if (incident.severity === "High") {
        score -= this.config.weights.incidentHigh;
        reasons.push(`High severity incident reported: ${incident.type}`);
      } else if (incident.severity === "Medium") {
        score -= this.config.weights.incidentMedium;
      } else {
        score -= this.config.weights.incidentLow;
      }
    });

    // 2. Process Crowd Density
    context.crowd.forEach(zone => {
      if (zone.density === "Critical") {
        score -= this.config.weights.crowdCritical;
        reasons.push(`Critical crowd density at ${zone.zoneName}`);
      } else if (zone.density === "High") {
        score -= this.config.weights.crowdHigh;
        reasons.push(`High crowd density at ${zone.zoneName}`);
      } else if (zone.density === "Moderate") {
        score -= this.config.weights.crowdModerate;
      }
    });

    // 2b. Process Queues
    if (context.queues) {
      context.queues.forEach(q => {
        if (q.estimatedWait >= 30) {
          score -= this.config.weights.queueCritical;
          reasons.push(`Critical wait time at zone ${q.zoneId} (${q.estimatedWait}m)`);
        } else if (q.estimatedWait >= 15) {
          score -= this.config.weights.queueHigh;
        }
      });
    }

    // 3. Process Parking
    context.parking.forEach(lot => {
      if (lot.status === "Full") {
        score -= this.config.weights.parkingFull;
        reasons.push(`Parking lot ${lot.id} is full`);
      }
    });

    // 4. Process Weather
    if (context.weather) {
      if (context.weather.alertLevel === "Warning") {
        score -= this.config.weights.weatherWarning;
        reasons.push(`Weather Warning: ${context.weather.condition}`);
      } else if (context.weather.alertLevel === "Watch") {
        score -= this.config.weights.weatherWatch;
        reasons.push(`Weather Watch: ${context.weather.condition}`);
      } else if (context.weather.alertLevel === "Advisory") {
        score -= this.config.weights.weatherAdvisory;
      }
    }

    // 5. Process Transport
    context.transport.forEach(t => {
      if (t.status === "Suspended") {
        score -= this.config.weights.transportSuspended;
        reasons.push(`${t.mode} transport suspended`);
      } else if (t.status === "Delayed") {
        score -= this.config.weights.transportDelayed;
        reasons.push(`${t.mode} transport delayed`);
      }
    });

    // 6. Process Predictions
    // For predictions, we can deduct score if they indicate future issues 
    // e.g., low confidence or alarming reasoning.
    // Assuming 'prediction' string might contain keywords or confidence could be 'Low'
    context.predictions.forEach(p => {
      if (p.confidence === "Low") {
        score -= this.config.weights.predictionNegative;
        reasons.push(`Low confidence prediction: ${p.prediction}`);
      }
    });

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // Determine Status
    let status: PulseScore["status"] = "Excellent";
    if (score <= 20) {
      status = "Critical";
    } else if (score <= 50) {
      status = "Poor";
    } else if (score <= 75) {
      status = "Fair";
    } else if (score < 95) {
      status = "Good";
    }

    // Determine Trend
    let trend: PulseScore["trend"] = "Stable";
    if (previousScore) {
      if (score > previousScore.score + 2) {
        trend = "Improving";
      } else if (score < previousScore.score - 2) {
        trend = "Declining";
      }
    }

    if (reasons.length === 0) {
      reasons.push("All systems operating nominally");
    }

    return {
      score,
      status,
      trend,
      reasons
    };
  }
}
