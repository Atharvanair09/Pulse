export default function AlertsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      
      <div className="space-y-4">
        <div className="bg-background border-l-4 border-l-critical border border-black/10 dark:border-white/10 p-4 rounded-r-xl">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-critical flex items-center gap-2">
              <span className="material-symbols-rounded text-sm">warning</span>
              Severe Weather Alert
            </h3>
            <span className="text-xs text-foreground/50">Just now</span>
          </div>
          <p className="text-sm mt-1">Lightning detected within 5 miles. Please seek shelter immediately in concourse areas.</p>
        </div>
        
        <div className="bg-background border-l-4 border-l-warning border border-black/10 dark:border-white/10 p-4 rounded-r-xl">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-warning flex items-center gap-2">
              <span className="material-symbols-rounded text-sm">directions_transit</span>
              Transit Delay
            </h3>
            <span className="text-xs text-foreground/50">15m ago</span>
          </div>
          <p className="text-sm mt-1">Metro Line 2 is experiencing delays of approximately 20 minutes.</p>
        </div>
      </div>
    </div>
  );
}
