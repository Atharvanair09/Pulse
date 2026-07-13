export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="bg-background border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-medium">
            <span className="material-symbols-rounded text-3xl">person</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Guest User</h2>
            <p className="text-sm text-foreground/60">Attendee Mode</p>
          </div>
        </div>
        
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="/organizer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-rounded text-foreground/60">admin_panel_settings</span>
                <span>Switch to Organizer Mode</span>
              </a>
            </li>
            <li>
              <a href="/volunteer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-rounded text-foreground/60">volunteer_activism</span>
                <span>Switch to Volunteer Mode</span>
              </a>
            </li>
            <li>
              <a href="/accessibility" className="flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-rounded text-foreground/60">accessible_forward</span>
                <span>Accessibility Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
