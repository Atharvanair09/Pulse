import React from "react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    { label: "View Venue Map", icon: "map", href: "/map", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "AI Assistant", icon: "assistant", href: "/assistant", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Accessibility", icon: "accessible", href: "/accessibility", color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Notifications", icon: "notifications", href: "/notifications", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="bg-background border border-black/10 dark:border-white/10 p-6 rounded-2xl md:col-span-1">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-rounded">bolt</span>
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-black/5 dark:border-white/5 hover:bg-black/5 hover:dark:bg-white/5 transition-colors text-center gap-2 group"
          >
            <div className={`w-10 h-10 rounded-full ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-rounded text-[20px]">{action.icon}</span>
            </div>
            <span className="text-xs font-medium text-foreground/80">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
