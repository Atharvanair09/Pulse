export function AccessibilityFeature() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="material-symbols-rounded text-primary text-3xl">accessible_forward</span>
        Accessibility Mode
      </h1>
      
      <p className="text-foreground/70 mb-8">
        Customize your experience. Pulse will adapt navigation, recommendations, and assistance to your preferences.
      </p>

      <div className="space-y-4">
        {[
          { title: "Wheelchair Accessible Routing", desc: "Prioritize elevators and ramps, avoid stairs." },
          { title: "Avoid Crowded Areas", desc: "Suggest routes with lower density." },
          { title: "High Contrast Mode", desc: "Increase visual contrast for better readability." },
          { title: "Screen Reader Optimizations", desc: "Enhance compatibility with voiceover technologies." }
        ].map((setting, i) => (
          <div key={i} className="bg-background border border-black/10 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold">{setting.title}</h3>
              <p className="text-sm text-foreground/60">{setting.desc}</p>
            </div>
            <div className="w-12 h-6 bg-black/10 dark:bg-white/10 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
