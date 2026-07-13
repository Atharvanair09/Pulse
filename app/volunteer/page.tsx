export default function VolunteerPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="material-symbols-rounded text-primary text-3xl">volunteer_activism</span>
        Volunteer Hub
      </h1>
      
      <div className="bg-background border border-black/10 dark:border-white/10 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Current Assignment</h2>
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <h3 className="font-medium mb-1">Gate C - Crowd Management</h3>
          <p className="text-sm text-foreground/70">Assist attendees with ticket scanning and direct them to the shortest queues.</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Report Incident", icon: "report_problem", color: "text-warning" },
          { name: "Lost & Found", icon: "search", color: "text-primary" },
          { name: "Medical Request", icon: "medical_services", color: "text-critical" },
          { name: "Translation Help", icon: "translate", color: "text-success" }
        ].map((action, i) => (
          <button key={i} className="bg-background border border-black/10 dark:border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className={`material-symbols-rounded text-2xl ${action.color}`}>{action.icon}</span>
            <span className="text-sm font-medium text-center">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
