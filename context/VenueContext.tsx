"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from "react";
import { VenueContext as VenueContextType } from "../types";
import { SimulationEngine } from "../engine/SimulationEngine";
import { RecommendationEngine } from "../engine/RecommendationEngine";
import { PredictionEngine } from "../engine/PredictionEngine";
import { InsightEngine } from "../engine/InsightEngine";
import { NotificationEngine } from "../engine/NotificationEngine";
import { PulseScoreEngine } from "../engine/PulseScoreEngine";

interface VenueContextValue {
  state: VenueContextType;
  simulationControls: {
    start: () => void;
    pause: () => void;
    reset: () => void;
    triggerCrowdSpike: () => void;
    triggerWeatherEvent: () => void;
    triggerParkingOverflow: () => void;
    triggerIncident: () => void;
    triggerTransportDelay: () => void;
  };
}

const VenueContext = createContext<VenueContextValue | undefined>(undefined);

// Instantiate engines once
const simulationEngine = new SimulationEngine();
const recommendationEngine = new RecommendationEngine();
const predictionEngine = new PredictionEngine();
const insightEngine = new InsightEngine();
const notificationEngine = new NotificationEngine();
const pulseScoreEngine = new PulseScoreEngine();

const getInitialStateWithHealth = () => {
  const state = simulationEngine.getInitialState();
  state.pulseScore = pulseScoreEngine.calculateScore(state);
  return state;
};

export const VenueContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<VenueContextType>(getInitialStateWithHealth());
  const [isRunning, setIsRunning] = useState(false); // To trigger React renders when controls change
  
  // Use a ref to hold the current state for the interval to access the latest
  const stateRef = useRef<VenueContextType>(state);
  stateRef.current = state;

  useEffect(() => {
    // Determine the simulation tick rate (5 seconds as per plan)
    const intervalId = setInterval(() => {
      const status = simulationEngine.getStatus();
      if (!status.isRunning) return;

      // 1. Simulation Engine tick
      let nextState = simulationEngine.tick(stateRef.current);

      // 2. Run other engines over the new state
      nextState.recommendations = recommendationEngine.generate(nextState);
      nextState.predictions = predictionEngine.predict(nextState);
      nextState.insights = insightEngine.generate(nextState);
      
      // 3. Process Notifications (append new ones)
      const newNotifications = notificationEngine.generate(nextState);
      
      // Keep old notifications, add new ones at the beginning
      nextState.notifications = [...newNotifications, ...(stateRef.current.notifications || [])];

      // 4. Process Venue Health
      nextState.pulseScore = pulseScoreEngine.calculateScore(nextState, stateRef.current.pulseScore);

      setState(nextState);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const simulationControls = useMemo(() => ({
    start: () => {
      simulationEngine.start();
      setIsRunning(true);
    },
    pause: () => {
      simulationEngine.pause();
      setIsRunning(false);
    },
    reset: () => {
      simulationEngine.reset();
      const initialState = simulationEngine.getInitialState();
      
      initialState.pulseScore = pulseScoreEngine.calculateScore(initialState);
      
      setState(initialState);
      setIsRunning(false);
    },
    triggerCrowdSpike: () => simulationEngine.triggerCrowdSpike(),
    triggerWeatherEvent: () => simulationEngine.triggerWeatherEvent(),
    triggerParkingOverflow: () => simulationEngine.triggerParkingOverflow(),
    triggerIncident: () => simulationEngine.triggerIncident(),
    triggerTransportDelay: () => simulationEngine.triggerTransportDelay(),
  }), []);

  const value = useMemo(() => ({
    state,
    simulationControls
  }), [state, simulationControls]);

  return (
    <VenueContext.Provider value={value}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenueContext must be used within a VenueContextProvider");
  }
  return context;
};
