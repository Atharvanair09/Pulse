import { VenueContext, Coordinates, Route, PointOfInterest, CrowdZone, Queue } from "../types";

export class NavigationEngine {
  constructor() {}

  /**
   * Generates route options from an origin to a destination.
   * Calculates paths, distances, times, and incorporates crowd/queue statuses from VenueContext.
   */
  public calculateRoutes(
    context: VenueContext,
    origin: Coordinates,
    destination: PointOfInterest,
    requiresAccessibility: boolean = false
  ): Route[] {
    const baseDistance = this.calculateDistance(origin, destination.coordinates);
    const baseDuration = Math.ceil(baseDistance / 80); 
    
    const crowdScore = this.evaluateCrowdScore(context, destination);
    const simulatedTime = context.simulatedTime ? new Date(context.simulatedTime) : new Date();

    const routes: Route[] = [];

    // Route 1: Shortest Path
    routes.push(this.generateSimulatedRoute(
      "r1", "Shortest", origin, destination.coordinates, baseDistance, baseDuration, crowdScore, true, "High", simulatedTime, 0
    ));

    // Route 2: Least Crowded
    const leastCrowdedScore = Math.max(0, crowdScore - 20);
    routes.push(this.generateSimulatedRoute(
      "r2", "Least Crowded", origin, destination.coordinates, baseDistance * 1.2, baseDuration * 1.15, leastCrowdedScore, true, "Medium", simulatedTime, 1
    ));

    // Route 3: Accessible
    routes.push(this.generateSimulatedRoute(
      "r3", "Accessible", origin, destination.coordinates, baseDistance * 1.1, baseDuration * 1.25, crowdScore - 10, true, "High", simulatedTime, -1
    ));
    
    let availableRoutes = routes;
    if (requiresAccessibility) {
      availableRoutes = routes.filter(r => r.accessibility);
    }

    return availableRoutes;
  }

  private calculateDistance(p1: Coordinates, p2: Coordinates): number {
    const dx = p1.lng - p2.lng;
    const dy = p1.lat - p2.lat;
    const dxMeters = dx * 85000;
    const dyMeters = dy * 111000;
    return Math.sqrt(dxMeters * dxMeters + dyMeters * dyMeters);
  }

  private evaluateCrowdScore(context: VenueContext, poi: PointOfInterest): number {
    let zoneId = poi.zoneId;
    if (!zoneId) {
      if (poi.name.includes("Food")) zoneId = "cz-food";
      else if (poi.name.includes("North")) zoneId = "cz-north";
      else if (poi.name.includes("South")) zoneId = "cz-south";
    }

    if (!zoneId) return 10;

    const zone = context.crowd.find(c => c.id === zoneId);
    const queue = context.queues.find(q => q.zoneId === zoneId);

    let score = 10;
    if (zone) {
      switch (zone.density) {
        case "Low": score += 0; break;
        case "Moderate": score += 20; break;
        case "High": score += 50; break;
        case "Critical": score += 80; break;
      }
    }
    if (queue) {
      score += queue.estimatedWait * 2;
    }

    return Math.min(100, score);
  }

  private generateSimulatedRoute(
    id: string,
    routeType: string,
    origin: Coordinates,
    destination: Coordinates,
    distance: number,
    duration: number,
    crowdScore: number,
    accessibilitySupported: boolean,
    confidence: "High" | "Medium" | "Low",
    currentTime: Date,
    offsetDirection: number
  ): Route {
    // Deterministic offset based on distance and offsetDirection
    const offsetMagnitude = (distance * 0.000005);
    const midPoint: Coordinates = {
      lat: origin.lat + (destination.lat - origin.lat) * 0.5 + (offsetMagnitude * offsetDirection),
      lng: origin.lng + (destination.lng - origin.lng) * 0.5 - (offsetMagnitude * offsetDirection)
    };

    const path = [origin, midPoint, destination];
    const expectedArrival = new Date(currentTime.getTime() + duration * 60000);
    
    const formattedArrival = expectedArrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let recommendation = "";
    if (routeType === "Shortest") recommendation = "Fastest path to your destination.";
    else if (routeType === "Least Crowded") recommendation = "Avoids major crowds.";
    else if (routeType === "Accessible") recommendation = "Fully accessible route.";

    return {
      id,
      name: routeType,
      from: origin,
      to: destination,
      path,
      distance: Math.round(distance),
      walkingTime: Math.round(duration),
      congestion: Math.round(crowdScore),
      accessibility: accessibilitySupported,
      confidence,
      recommendation,
      expectedArrival: formattedArrival,
      
      // legacy
      duration: Math.round(duration),
      crowdScore: Math.round(crowdScore),
      accessibilitySupported,
      routeType: routeType as any
    };
  }
}
