export function LandingFeature() {
  return (
    <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-rounded text-primary text-4xl">favorite</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        Pulse
      </h1>
      <p className="text-xl text-foreground/70 mb-8 max-w-lg">
        AI-Powered Venue Intelligence
      </p>
      <a
        href="/dashboard"
        className="px-8 py-4 bg-primary text-white font-medium rounded-lg shadow-sm hover:opacity-90 transition-opacity"
      >
        Enter Demo Mode
      </a>
    </div>
  );
}
