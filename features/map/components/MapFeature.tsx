export function MapFeature() {
  return (
    <div className="p-4 md:p-8 h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Venue Map</h1>
      <div className="flex-1 bg-background border border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#1a73e8 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="text-center z-10 p-6 bg-background/80 backdrop-blur-sm rounded-xl">
          <span className="material-symbols-rounded text-primary text-4xl mb-2">map</span>
          <h2 className="text-xl font-medium">Interactive Map</h2>
          <p className="text-foreground/60 text-sm">Venue map rendering goes here.</p>
        </div>
      </div>
    </div>
  );
}
