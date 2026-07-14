"use client";

import React, { useState, useEffect } from "react";
import { useVenueContext } from "@/context/VenueContext";
import { 
  CrowdZone, Recommendation, Prediction, Insight, Notification 
} from "@/types";

export function DebugFeature() {
  const { state, simulationControls } = useVenueContext();
  const [activeTab, setActiveTab] = useState("all");
  
  // Performance tracking
  const [lastTick, setLastTick] = useState<number>(0);
  const [tickMs, setTickMs] = useState<number>(0);

  useEffect(() => {
    if (state.simulationTick !== lastTick) {
      setLastTick(state.simulationTick || 0);
      setTickMs(Date.now());
    }
  }, [state.simulationTick, lastTick]);

  return (
    <div className="p-4 bg-background min-h-screen text-xs md:text-sm font-mono overflow-auto text-foreground">
      <div className="mb-6 border-b pb-4 border-border flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Intelligence Layer Debug</h1>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${state.simulationRunning ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'}`}>
            {state.simulationRunning ? 'RUNNING' : 'PAUSED'}
          </span>
          <span className="px-2 py-1 bg-secondary rounded text-xs">
            Tick: {state.simulationTick}
          </span>
          <span className="px-2 py-1 bg-secondary rounded text-xs">
            Time: {new Date(state.simulatedTime || "").toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Controls & Engine Health */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-4 border rounded shadow-sm bg-card">
            <h2 className="font-bold mb-3 uppercase tracking-wider text-muted-foreground">Simulation Controls</h2>
            <div className="flex gap-2 mb-4">
              <button onClick={simulationControls.start} className="flex-1 bg-green-600 text-white px-2 py-1 rounded hover:opacity-90">Start</button>
              <button onClick={simulationControls.pause} className="flex-1 bg-yellow-600 text-white px-2 py-1 rounded hover:opacity-90">Pause</button>
              <button onClick={simulationControls.reset} className="flex-1 bg-destructive text-white px-2 py-1 rounded hover:opacity-90">Reset</button>
            </div>
            
            <h2 className="font-bold mb-3 uppercase tracking-wider text-muted-foreground mt-6">Developer Triggers</h2>
            <div className="flex flex-col gap-2">
              <button onClick={simulationControls.triggerCrowdSpike} className="text-left px-3 py-2 bg-secondary rounded hover:bg-secondary/80">🔥 Force North Gate Spike</button>
              <button onClick={simulationControls.triggerWeatherEvent} className="text-left px-3 py-2 bg-secondary rounded hover:bg-secondary/80">🌧️ Trigger Heavy Rain</button>
              <button onClick={simulationControls.triggerParkingOverflow} className="text-left px-3 py-2 bg-secondary rounded hover:bg-secondary/80">🚗 Trigger Parking Overflow</button>
              <button onClick={simulationControls.triggerTransportDelay} className="text-left px-3 py-2 bg-secondary rounded hover:bg-secondary/80">🚆 Trigger Metro Delay</button>
              <button onClick={simulationControls.triggerIncident} className="text-left px-3 py-2 bg-secondary rounded hover:bg-secondary/80">🚑 Trigger Medical Incident</button>
            </div>
          </div>

          <div className="p-4 border rounded shadow-sm bg-card">
            <h2 className="font-bold mb-3 uppercase tracking-wider text-muted-foreground">Engine Health</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Venue Context Engine</span>
                <span className="text-green-500">✅</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Simulation Engine</span>
                <span className="text-green-500">✅</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Recommendation Engine</span>
                <span className="text-green-500">✅</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Prediction Engine</span>
                <span className="text-green-500">✅</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Insight Engine</span>
                <span className="text-green-500">✅</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Notification Engine</span>
                <span className="text-green-500">✅</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border rounded shadow-sm bg-card">
            <h2 className="font-bold mb-3 uppercase tracking-wider text-muted-foreground">Performance Metrics</h2>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Recs:</span>
                <span>{state.recommendations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Predictions:</span>
                <span>{state.predictions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notifications:</span>
                <span>{state.notifications.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engine Outputs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
            {['all', 'crowd', 'recommendations', 'predictions', 'insights', 'notifications', 'context'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 uppercase tracking-wider font-bold rounded ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Crowd Monitor */}
          {(activeTab === 'all' || activeTab === 'crowd') && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Crowd Monitor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.crowd.map((zone: CrowdZone) => {
                  const queue = state.queues?.find(q => q.zoneId === zone.id);
                  return (
                    <div key={zone.id} className="p-3 border rounded border-border">
                      <div className="font-bold mb-2">{zone.zoneName}</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground">Density:</span>
                        <span className={`font-bold ${zone.density === 'Critical' ? 'text-destructive' : zone.density === 'High' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {zone.density}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Wait:</span>
                        <span>{queue?.estimatedWait ?? 0} min</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommendations Panel */}
          {(activeTab === 'all' || activeTab === 'recommendations') && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Recommendation Engine</h2>
              {state.recommendations.length === 0 ? (
                <div className="text-muted-foreground">No active recommendations.</div>
              ) : (
                <div className="space-y-3">
                  {state.recommendations.map((rec: Recommendation) => (
                    <div key={rec.id} className={`p-3 border-l-4 rounded bg-secondary/50 ${rec.priority === 'Critical' ? 'border-destructive' : 'border-yellow-500'}`}>
                      <div className="flex justify-between">
                        <span className="font-bold">{rec.title}</span>
                        <span className="text-xs px-2 py-1 bg-background rounded">{rec.priority}</span>
                      </div>
                      <p className="mt-1 text-muted-foreground">{rec.reason}</p>
                      <div className="mt-2 text-xs font-bold text-primary">{rec.action}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Predictions Panel */}
          {(activeTab === 'all' || activeTab === 'predictions') && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Prediction Engine</h2>
              {state.predictions.length === 0 ? (
                <div className="text-muted-foreground">No active predictions.</div>
              ) : (
                <div className="space-y-3">
                  {state.predictions.map((pred: Prediction) => (
                    <div key={pred.id} className="p-3 border rounded bg-secondary/50">
                      <div className="flex justify-between">
                        <span className="font-bold text-blue-500">{pred.prediction}</span>
                        <span className="text-xs text-muted-foreground">in ~{pred.estimatedTimeHorizon}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{pred.reasoning}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Insights Panel */}
          {(activeTab === 'all' || activeTab === 'insights') && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Insight Engine</h2>
              {state.insights.length === 0 ? (
                <div className="text-muted-foreground">No insights generated.</div>
              ) : (
                <div className="space-y-3">
                  {state.insights.map((ins: Insight) => (
                    <div key={ins.id} className="p-3 border-l-2 border-purple-500 rounded bg-secondary/50">
                      <div className="text-xs font-bold text-purple-500 mb-1">{ins.category}</div>
                      <p>{ins.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notification Monitor */}
          {(activeTab === 'all' || activeTab === 'notifications') && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Notification Engine</h2>
              <div className="h-64 overflow-y-auto pr-2 space-y-2">
                {state.notifications.length === 0 ? (
                  <div className="text-muted-foreground">No notifications.</div>
                ) : (
                  state.notifications.map((notif: Notification, idx: number) => (
                    <div key={`${notif.id}-${idx}`} className="p-2 border rounded text-sm flex gap-3 items-start">
                      <div className={`mt-1 w-2 h-2 rounded-full ${notif.priority === 'Critical' ? 'bg-destructive' : notif.priority === 'High' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <div className="font-bold">{notif.title}</div>
                        <div className="text-muted-foreground">{notif.message}</div>
                        <div className="text-xs mt-1 opacity-50">{new Date(notif.timestamp).toLocaleTimeString()} • {notif.source}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Raw Context */}
          {activeTab === 'context' && (
            <div className="p-4 border rounded bg-card shadow-sm">
              <h2 className="font-bold mb-4 uppercase tracking-wider text-muted-foreground">Venue Context Dump</h2>
              <pre className="text-xs bg-secondary p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
