export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-foreground/60 text-sm">Live venue operations overview.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-1 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-black/5 dark:text-white/5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-success" strokeDasharray="283" strokeDashoffset="56" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">80</span>
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">Pulse</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">Venue Healthy</h3>
          <p className="text-sm text-foreground/60">Conditions are optimal.</p>
        </div>

        <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-2 flex flex-col">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-rounded text-primary">tips_and_updates</span>
            AI Insights
          </h2>
          <div className="flex-1 space-y-4">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-start gap-3">
                <span className="material-symbols-rounded text-success">check_circle</span>
                <div>
                  <h4 className="font-medium text-success mb-1">Queue Status</h4>
                  <p className="text-sm text-success/80">Gate C currently has significantly lower congestion. Expected wait time reduced by 12 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
