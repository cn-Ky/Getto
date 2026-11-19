import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const users = await prisma.user.findMany({
    orderBy: { totalPoints: "desc" },
    take: 25,
    select: { id: true, username: true, displayName: true, totalPoints: true },
  });

  return (
    <AppShell userLabel={(session.user as { name?: string }).name ?? undefined}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-ui text-2xl font-semibold text-text-primary">
          Siralama
        </h1>
        <p className="mt-1 text-sm text-text-dim">
          Tum izole laboratuvarlardan toplanan puanlara gore.
        </p>

        <div className="mt-8 border border-line bg-panel">
          {users.map((u, i) => (
            <div
              key={u.id}
              className="flex items-center justify-between border-b border-line px-5 py-3 last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 font-mono text-sm text-text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-text-primary">
                  {u.displayName ?? u.username}
                </span>
                {i === 0 && u.totalPoints > 0 && (
                  <Icon name="trophy" className="text-warn text-xs" />
                )}
              </div>
              <span className="font-mono text-sm text-text-dim">
                {u.totalPoints} puan
              </span>
            </div>
          ))}
          {users.length === 0 && (
            <p className="px-5 py-6 text-sm text-text-dim">Henuz kayit yok.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
