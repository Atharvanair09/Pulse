"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
  { name: "Map", href: "/map", icon: "map" },
  { name: "Assistant", href: "/assistant", icon: "smart_toy" },
  { name: "Notifications", href: "/notifications", icon: "notifications" },
  { name: "Profile", href: "/profile", icon: "person" },
];

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-black/10 dark:border-white/10 bg-background h-full fixed top-0 left-0">
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-rounded text-primary">favorite</span>
          Pulse
        </Link>
        <ThemeToggle />
      </div>
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-foreground/80 hover:text-foreground"
              }`}
            >
              <span className="material-symbols-rounded">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-black/10 dark:border-white/10">
        <div className="text-xs text-foreground/50 text-center">
          Pulse Organizer Mode
        </div>
      </div>
    </aside>
  );
}
