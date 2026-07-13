"use client";

import { DesktopNavigation } from "./DesktopNavigation";
import { BottomNavigation } from "./BottomNavigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DesktopNavigation />
      <main className="flex-1 md:ml-64 pb-16 md:pb-0 relative">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
