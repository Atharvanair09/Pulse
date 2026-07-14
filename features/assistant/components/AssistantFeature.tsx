export function AssistantFeature() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      
      <div className="flex-1 bg-background border border-black/10 dark:border-white/10 rounded-2xl flex flex-col overflow-hidden mb-4">
        <div className="flex-1 p-6 flex flex-col overflow-y-auto">
          <div className="flex gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-rounded text-primary text-sm">smart_toy</span>
            </div>
            <div className="bg-primary/5 p-4 rounded-2xl rounded-tl-none border border-primary/10 text-sm">
              <p>Hello! I'm your Pulse AI Assistant. How can I help you navigate the venue today?</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask about the venue, schedules, or directions..." 
              className="w-full bg-background border border-black/10 dark:border-white/10 rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:opacity-90 transition-opacity">
              <span className="material-symbols-rounded text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
