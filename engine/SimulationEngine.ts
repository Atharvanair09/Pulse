import { VenueContext } from "../types";

export class SimulationEngine {
  private tickCount: number = 0;
  private isRunning: boolean = false;
  private seed: number = 42; // Seeded RNG for determinism
  
  // Developer triggers
  private forcedCrowdSpike: boolean = false;
  private forcedWeatherEvent: boolean = false;
  private forcedParkingOverflow: boolean = false;
  private forcedIncident: boolean = false;
  private forcedTransportDelay: boolean = false;

  constructor() {}

  // Basic seeded LCG for deterministic randomness
  private random(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Helper to return a random item from array
  private randomItem<T>(arr: T[]): T {
    return arr[Math.floor(this.random() * arr.length)];
  }

  public start() {
    this.isRunning = true;
  }

  public pause() {
    this.isRunning = false;
  }
  
  public reset() {
    this.tickCount = 0;
    this.isRunning = false;
    this.seed = 42;
    this.forcedCrowdSpike = false;
    this.forcedWeatherEvent = false;
    this.forcedParkingOverflow = false;
    this.forcedIncident = false;
    this.forcedTransportDelay = false;
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      tickCount: this.tickCount,
    };
  }

  // Trigger methods
  public triggerCrowdSpike() { this.forcedCrowdSpike = true; }
  public triggerWeatherEvent() { this.forcedWeatherEvent = true; }
  public triggerParkingOverflow() { this.forcedParkingOverflow = true; }
  public triggerIncident() { this.forcedIncident = true; }
  public triggerTransportDelay() { this.forcedTransportDelay = true; }

  // Initial State Factory
  public getInitialState(): VenueContext {
    return {
      venue: {
        id: "v1",
        name: "Pulse Stadium",
        type: "Stadium",
        city: "Metropolis",
        country: "USA",
        coordinates: { lat: 40.7128, lng: -74.0060 },
        mapImage: "/maps/stadium.png",
        capacity: 50000,
        gates: ["g-north", "g-south", "g-east", "g-west"],
        facilities: ["f-food-1", "f-med-1"],
        parkingLots: ["p-main", "p-overflow"],
        accessibilityFeatures: ["Elevators", "Ramps"]
      },
      event: {
        id: "e1",
        venueId: "v1",
        name: "Championship Final",
        category: "Sports",
        startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        endTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
        schedule: [],
        expectedAttendance: 48000,
        status: "Scheduled"
      },
      user: {
        id: "u1",
        role: "Attendee",
        language: "en",
        accessibilityPreferences: [],
        selectedEvent: "e1"
      },
      crowd: [
        { id: "cz-north", zoneName: "North Gate", density: "Low", confidence: "High", timestamp: new Date().toISOString() },
        { id: "cz-south", zoneName: "South Gate", density: "Low", confidence: "High", timestamp: new Date().toISOString() },
        { id: "cz-food", zoneName: "Food Court A", density: "Low", confidence: "High", timestamp: new Date().toISOString() }
      ],
      queues: [
        { id: "q-north", zoneId: "cz-north", currentLength: 20, estimatedWait: 2, confidence: "High", timestamp: new Date().toISOString() },
        { id: "q-south", zoneId: "cz-south", currentLength: 10, estimatedWait: 1, confidence: "High", timestamp: new Date().toISOString() },
        { id: "q-food", zoneId: "cz-food", currentLength: 30, estimatedWait: 3, confidence: "High", timestamp: new Date().toISOString() }
      ],
      parking: [
        { id: "p-main", capacity: 5000, occupied: 2000, available: 3000, status: "Open" },
        { id: "p-overflow", capacity: 2000, occupied: 0, available: 2000, status: "Open" }
      ],
      weather: {
        temperature: 24,
        condition: "Clear",
        rainfall: 0,
        wind: 10,
        alertLevel: "None"
      },
      transport: [
        { mode: "Metro", line: "Blue Line", status: "On Time", delayMinutes: 0, estimatedArrival: new Date(Date.now() + 300000).toISOString() },
        { mode: "Bus", line: "Shuttle A", status: "On Time", delayMinutes: 0, estimatedArrival: new Date(Date.now() + 420000).toISOString() }
      ],
      incidents: [],
      timeline: [
        { id: "tl-1", title: "Gates Open", category: "Gate", scheduledTime: new Date(Date.now() - 3600000).toISOString(), description: "All venue gates open for early access.", status: "completed" },
        { id: "tl-2", title: "Pre-Show", category: "Match", scheduledTime: new Date(Date.now() + 1800000).toISOString(), description: "Pre-show entertainment begins.", status: "upcoming" },
        { id: "tl-3", title: "Kickoff", category: "Match", scheduledTime: new Date(Date.now() + 3600000).toISOString(), description: "Main event kickoff.", status: "upcoming" }
      ],
      recommendations: [],
      predictions: [],
      insights: [],
      notifications: [],
      simulatedTime: new Date().toISOString(),
      simulationTick: 0,
      simulationRunning: false,
    };
  }

  // Calculate next state
  public tick(currentState: VenueContext): VenueContext {
    if (!this.isRunning) return currentState;

    this.tickCount++;
    const now = new Date(currentState.simulatedTime || Date.now());
    now.setSeconds(now.getSeconds() + 30); // each tick simulates 30 seconds

    const nextState = { ...currentState };
    nextState.simulatedTime = now.toISOString();
    nextState.simulationTick = this.tickCount;
    nextState.simulationRunning = this.isRunning;

    // Simulate Queues
    nextState.queues = currentState.queues.map(q => {
      let wait = q.estimatedWait;
      let length = q.currentLength;

      // Base random fluctuation
      if (this.random() > 0.7) {
        wait += Math.floor(this.random() * 3) - 1; 
        length += Math.floor(this.random() * 10) - 5;
      }

      if (this.forcedCrowdSpike && q.zoneId === "cz-north") {
        wait += 15;
        length += 50;
      }

      return { ...q, currentLength: Math.max(0, length), estimatedWait: Math.max(0, wait), timestamp: now.toISOString() };
    });

    // Simulate Crowd based on Queues
    nextState.crowd = currentState.crowd.map(c => {
      let density = c.density;
      const relatedQueue = nextState.queues.find(q => q.zoneId === c.id);
      const wait = relatedQueue ? relatedQueue.estimatedWait : 0;

      if (wait < 5) density = "Low";
      else if (wait < 15) density = "Moderate";
      else if (wait < 30) density = "High";
      else density = "Critical";

      return { ...c, density, timestamp: now.toISOString() };
    });

    // Simulate Parking
    nextState.parking = currentState.parking.map(p => {
      let occupied = p.occupied;
      
      if (p.id === "p-main" && this.forcedParkingOverflow) {
        occupied = p.capacity;
      } else {
        // Natural fill rate
        occupied += Math.floor(this.random() * 20); 
      }
      
      occupied = Math.min(occupied, p.capacity);
      
      return { 
        ...p, 
        occupied, 
        available: p.capacity - occupied,
        status: occupied >= p.capacity ? "Full" : "Open"
      };
    });

    // Simulate Weather
    if (this.forcedWeatherEvent && currentState.weather) {
      nextState.weather = {
        ...currentState.weather,
        condition: "Heavy Rain",
        rainfall: 25,
        alertLevel: "Warning"
      };
    }

    // Simulate Transport
    if (this.forcedTransportDelay) {
      nextState.transport = currentState.transport.map(t => {
        if (t.mode === "Metro") {
          return { ...t, status: "Delayed", delayMinutes: 15 };
        }
        return t;
      });
    }

    // Update timeline status
    nextState.timeline = currentState.timeline.map((event, idx, arr) => {
      const isPast = new Date(event.scheduledTime) < now;
      const isCurrent = !isPast && (idx === 0 || new Date(arr[idx - 1].scheduledTime) < now);
      
      let status: "completed" | "current" | "upcoming" = "upcoming";
      if (isPast) status = "completed";
      else if (isCurrent) status = "current";
      
      return { ...event, status };
    });

    // Simulate Incidents
    if (this.forcedIncident && nextState.incidents.length === 0) {
      nextState.incidents = [{
        id: "inc-" + this.tickCount,
        type: "Medical",
        severity: "High",
        location: "cz-south",
        description: "Medical assistance required near South Gate.",
        reportedAt: now.toISOString(),
        resolved: false
      }];
    }

    // Reset forces after applying them
    this.forcedCrowdSpike = false;
    this.forcedWeatherEvent = false;
    this.forcedParkingOverflow = false;
    this.forcedIncident = false;
    this.forcedTransportDelay = false;

    return nextState;
  }
}
