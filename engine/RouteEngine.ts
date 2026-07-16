import { Route, VenueContext } from "../types";

export interface RouteMetadata {
  routeId: string;
  displayTitle: string;
  displaySubtitle: string;
  formattedDistance: string;
  formattedWalkingTime: string;
  formattedArrivalTime: string;
  congestionLabel: string;
  congestionColor: string;
  confidenceLabel: string;
  accessibilityLabel: string;
  recommendationText: string;
  isOptimal: boolean;
}

export class RouteEngine {
  constructor() {}

  /**
   * Processes routes by sorting them and generating presentation metadata.
   */
  public processRoutes(routes: Route[]): { route: Route; metadata: RouteMetadata }[] {
    if (!routes || routes.length === 0) return [];

    // Sort routes by simple heuristic (distance + congestion impact)
    const sortedRoutes = [...routes].sort((a, b) => {
      const scoreA = a.distance + (a.congestion * 10);
      const scoreB = b.distance + (b.congestion * 10);
      return scoreA - scoreB;
    });

    const recommendedId = sortedRoutes[0].id;

    return sortedRoutes.map(route => {
      return {
        route,
        metadata: this.generateMetadata(route, recommendedId)
      };
    });
  }

  private generateMetadata(route: Route, recommendedId: string): RouteMetadata {
    const isOptimal = route.id === recommendedId;
    
    let congestionLabel = "Low";
    if (route.congestion > 75) congestionLabel = "Critical";
    else if (route.congestion > 40) congestionLabel = "Moderate";

    return {
      routeId: route.id,
      displayTitle: `${route.name} Route`,
      displaySubtitle: this.generateSummary(route),
      formattedDistance: `${route.distance}m`,
      formattedWalkingTime: `${route.walkingTime} min`,
      formattedArrivalTime: `Arrive ~${route.expectedArrival}`,
      congestionLabel: `Crowd: ${route.congestion}% (${congestionLabel})`,
      congestionColor: this.determineColor(route.name, route.congestion),
      confidenceLabel: `Confidence: ${route.confidence}`,
      accessibilityLabel: route.accessibility ? "Fully Accessible" : "Standard Route",
      recommendationText: route.recommendation,
      isOptimal
    };
  }

  private generateSummary(route: Route): string {
    let summary = `Takes approx. ${route.walkingTime} mins.`;
    
    if (route.name === "Least Crowded") {
      summary += ` Avoids major congestion.`;
    } else if (route.name === "Accessible") {
      summary += ` Uses elevators and ramps.`;
    } else if (route.congestion > 70) {
      summary += ` Note: Heavy congestion on path.`;
    }
    
    return summary;
  }

  private determineColor(routeType: string, crowdScore: number): string {
    if (routeType === "Accessible") return "#8b5cf6"; // Purple
    if (crowdScore > 75) return "#ef4444"; // Red (Critical)
    if (crowdScore > 40) return "#f59e0b"; // Amber (Warning)
    if (routeType === "Least Crowded") return "#10b981"; // Green (Success)
    return "#3b82f6"; // Blue (Primary)
  }
}
