"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
  { name: "Map", href: "/map", icon: "map" },
  { name: "Assistant", href: "/assistant", icon: "smart_toy" },
  { name: "Notifications", href: "/notifications", icon: "notifications" },
  { name: "Profile", href: "/profile", icon: "person" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background border-t border-black/10 dark:border-white/10 flex items-center justify-around pb-safe z-50">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] ${
              isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <div
              className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors ${
                isActive ? "bg-primary/10" : "bg-transparent"
              }`}
            >
              <span className="material-symbols-rounded">{item.icon}</span>
            </div>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
