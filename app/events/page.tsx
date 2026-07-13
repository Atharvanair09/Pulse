export default function EventsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select Event</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-background rounded-lg border border-black/10 dark:border-white/10 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">FIFA World Cup Final</h2>
              <p className="text-sm text-foreground/60">MetLife Stadium</p>
            </div>
            <span className="bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <p className="text-sm text-foreground/80 mb-6 flex-1">
            Experience the ultimate football showdown with real-time crowd insights.
          </p>
          <a
            href="/dashboard"
            className="w-full py-2 bg-primary text-white font-medium rounded-md text-center hover:opacity-90 transition-opacity"
          >
            Join Event
          </a>
        </div>
      </div>
    </div>
  );
}
