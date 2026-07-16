export type UserRole = "Attendee" | "Organizer" | "Volunteer" | "Accessibility";

export type DensityLevel = "Low" | "Moderate" | "High" | "Critical";

export type FacilityType = "Food" | "Medical" | "Parking" | "Restroom" | "Water" | "Merchandise" | "Elevator" | "Ramp" | "Exit" | "Gate";

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";

export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";

export type ConfidenceLevel = "High" | "Medium" | "Low";

export type TimelineCategory = "Match" | "Weather" | "Transport" | "Incident" | "Reminder" | "Gate";

export type RouteType = "Shortest" | "Fastest" | "Least Crowded" | "Accessible" | "Emergency";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  city: string;
  country: string;
  coordinates: Coordinates;
  mapImage: string;
  capacity: number;
  gates: string[]; // gate IDs
  facilities: string[]; // facility IDs
  parkingLots: string[]; // parking lot IDs
  accessibilityFeatures: string[];
}

export interface Event {
  id: string;
  venueId: string;
  name: string;
  category: string;
  startTime: string; // ISO 8601 string
  endTime: string;
  schedule: TimelineEvent[];
  expectedAttendance: number;
  status: "Scheduled" | "Active" | "Delayed" | "Completed";
}

export interface User {
  id: string;
  role: UserRole;
  language: string;
  accessibilityPreferences: string[];
  favoriteTeam?: string;
  selectedEvent: string;
  currentLocation?: Coordinates;
}

export interface CrowdZone {
  id: string;
  zoneName: string;
  density: DensityLevel;
  confidence: ConfidenceLevel;
  timestamp: string;
}

export interface Queue {
  id: string;
  zoneId: string;
  currentLength: number;
  estimatedWait: number;
  confidence: ConfidenceLevel;
  timestamp: string;
}

export interface Facility {
  id: string;
  type: FacilityType;
  name: string;
  coordinates: Coordinates;
  accessibilitySupported: boolean;
  status: "Open" | "Closed" | "Maintenance";
}

export interface ParkingLot {
  id: string;
  capacity: number;
  occupied: number;
  available: number;
  status: "Open" | "Full" | "Closed";
}

export interface Weather {
  temperature: number; // Celsius
  condition: string;
  rainfall: number; // mm/h
  wind: number; // km/h
  alertLevel: "None" | "Advisory" | "Watch" | "Warning";
}

export interface Transport {
  mode: string;
  line: string;
  status: "On Time" | "Delayed" | "Suspended";
  delayMinutes: number;
  estimatedArrival: string;
}

export interface Incident {
  id: string;
  type: string;
  severity: SeverityLevel;
  location: string; // ID or coordinates
  description: string;
  reportedAt: string;
  resolved: boolean;
  assignedTeam?: string;
}

export interface Recommendation {
  id: string;
  priority: PriorityLevel;
  title: string;
  reason: string;
  expectedImpact: string;
  confidence: ConfidenceLevel;
  action?: string; // Suggested action description or payload
  timestamp: string;
}

export interface Notification {
  id: string;
  priority: PriorityLevel;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  source: string; // e.g., "RecommendationEngine", "Incident"
  recommendationId?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  category: TimelineCategory;
  scheduledTime: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
}

export interface Route {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: number; // minutes
  accessibilitySupported: boolean;
  crowdScore: number;
  routeType: RouteType;
}

export interface Prediction {
  id: string;
  prediction: string;
  confidence: ConfidenceLevel;
  reasoning: string;
  estimatedTimeHorizon: string; // e.g., "15 mins"
  timestamp: string;
}

export interface Insight {
  id: string;
  category: string;
  explanation: string;
  timestamp: string;
  confidence: ConfidenceLevel;
}

export interface PulseScore {
  score: number; // 0-100
  status: "Excellent" | "Good" | "Fair" | "Poor" | "Critical";
  trend: "Improving" | "Stable" | "Declining";
  reasons: string[];
}

export interface VenueContext {
  venue: Venue | null;
  event: Event | null;
  user: User | null;
  crowd: CrowdZone[];
  queues: Queue[];
  parking: ParkingLot[];
  weather: Weather | null;
  transport: Transport[];
  incidents: Incident[];
  timeline: TimelineEvent[];
  recommendations: Recommendation[];
  predictions: Prediction[];
  insights: Insight[];
  notifications: Notification[];
  
  // For simulation
  simulatedTime?: string; // current time in simulation
  simulationTick?: number;
  simulationRunning?: boolean;
  
  pulseScore?: PulseScore;
  lastUpdated?: string;
}
