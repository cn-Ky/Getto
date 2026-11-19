import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";

export default async function PanelPage() {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const user = await prisma.user.findUnique({
    where: { id: (session.user as { id: string }).id },
    include: {
      submissions: { where: { correct: true }, include: { lab: true } },
      sessions: { orderBy: { startedAt: "desc" }, take: 5, include: { lab: true } },
    },
  });

  if (!user) redirect("/giris");

  const totalLabs = await prisma.lab.count();
  const completed = user.submissions.length;

  return (
    <AppShell userLabel={user.username}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-ui text-2xl font-semibold text-text-primary">
          Merhaba, {user.displayName ?? user.username}
        </h1>
        <p className="mt-1 text-sm text-text-dim">
          Egitimsel ilerlemen asagida ozetleniyor.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-panel p-5">
            <Icon name="trophy" className="text-signal" />
            <div className="mt-3 font-mono text-2xl text-text-primary">{user.totalPoints}</div>
            <div className="text-xs text-text-dim">toplam puan</div>
          </div>
          <div className="bg-panel p-5">
            <Icon name="check" className="text-signal" />
            <div className="mt-3 font-mono text-2xl text-text-primary">
              {completed}/{totalLabs}
            </div>
            <div className="text-xs text-text-dim">tamamlanan laboratuvar</div>
          </div>
          <div className="bg-panel p-5">
            <Icon name="clock" className="text-warn" />
            <div className="mt-3 font-mono text-2xl text-text-primary">
              {user.sessions.length}
            </div>
            <div className="text-xs text-text-dim">son oturum sayisi</div>
          </div>
        </div>

        <h2 className="mt-10 font-ui text-sm font-semibold text-text-dim">
          Son oturumlar
        </h2>
        <div className="mt-3 border border-line bg-panel">
          {user.sessions.length === 0 && (
            <p className="px-5 py-6 text-sm text-text-dim">
              Henuz bir laboratuvar oturumu baslatmadin.
            </p>
          )}
          {user.sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between border-b border-line px-5 py-3 last:border-0"
            >
              <div>
                <div className="text-sm text-text-primary">{s.lab.title}</div>
                <div className="font-mono text-[11px] text-text-faint">
                  {new Date(s.startedAt).toLocaleString("tr-TR")}
                </div>
              </div>
              <span className="font-mono text-[11px] uppercase text-text-dim">
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
