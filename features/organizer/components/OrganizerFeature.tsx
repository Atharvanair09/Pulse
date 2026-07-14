export function OrganizerFeature() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="material-symbols-rounded text-primary text-3xl">admin_panel_settings</span>
            Organizer Dashboard
          </h1>
          <p className="text-foreground/60 text-sm mt-1">Venue operations and crowd intelligence.</p>
        </div>
        <span className="bg-critical/10 text-critical text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-critical animate-pulse"></span>
          Live Ops
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {["Total Attendance", "Active Incidents", "Avg Queue Time", "Available Staff"].map((stat, i) => (
          <div key={i} className="bg-background border border-black/10 dark:border-white/10 p-5 rounded-2xl">
            <h3 className="text-sm font-medium text-foreground/60 mb-2">{stat}</h3>
            <div className="text-2xl font-bold">--</div>
          </div>
        ))}
      </div>

      <div className="bg-background border border-black/10 dark:border-white/10 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
        <p className="text-foreground/50 text-sm flex items-center gap-2">
          <span className="material-symbols-rounded">monitoring</span>
          Crowd heatmap and insights will appear here
        </p>
      </div>
    </div>
  );
}
