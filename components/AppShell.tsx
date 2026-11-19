"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";
import clsx from "clsx";

const NAV: { href: string; icon: IconName; label: string }[] = [
  { href: "/panel", icon: "gauge", label: "Panel" },
  { href: "/laboratuvarlar", icon: "flask", label: "Laboratuvarlar" },
  { href: "/siralama", icon: "trophy", label: "Siralama" },
];

export function AppShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col bg-void text-text-primary font-ui">
      {/* Titlebar — gercek bir masaustu uygulamasinin pencere cubugu gibi davranir */}
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-line bg-panel px-3 select-none">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center bg-signal-dim text-signal text-[11px] font-mono font-semibold">
            G
          </span>
          <span className="font-mono text-xs text-text-dim tracking-tight">
            getto <span className="text-text-faint">/ egitim-konsolu</span>
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-text-faint">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-signal" />
            izole-ag: aktif
          </span>
          {userLabel && <span className="text-text-dim">{userLabel}</span>}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Icon rail */}
        <nav className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-line bg-panel py-3">
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={clsx(
                  "flex h-11 w-11 items-center justify-center text-base transition-colors",
                  active
                    ? "bg-panel-raised text-signal border-l-2 border-signal"
                    : "text-text-dim hover:text-text-primary hover:bg-panel-raised border-l-2 border-transparent"
                )}
              >
                <Icon name={item.icon} />
              </Link>
            );
          })}
          <div className="mt-auto flex flex-col items-center gap-1">
            <Link
              href="/api/auth/signout"
              title="Oturumu kapat"
              className="flex h-11 w-11 items-center justify-center text-text-dim hover:text-critical"
            >
              <Icon name="logout" />
            </Link>
          </div>
        </nav>

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Status bar */}
      <footer className="flex h-7 shrink-0 items-center justify-between border-t border-line bg-panel px-3 font-mono text-[11px] text-text-faint select-none">
        <span>getto v0.1 — egitim modu</span>
        <span>loglama: etkin · veriler yalnizca ilerleme takibi icin tutulur</span>
      </footer>
    </div>
  );
}
