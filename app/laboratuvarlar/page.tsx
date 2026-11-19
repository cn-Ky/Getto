import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/AppShell";
import { Icon, type IconName } from "@/components/Icon";

const DIFFICULTY_COLOR: Record<string, string> = {
  TEMEL: "text-signal",
  ORTA: "text-warn",
  ILERI: "text-critical",
  UZMAN: "text-critical",
};

export default async function LabsPage() {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const categories = await prisma.labCategory.findMany({
    include: { labs: true },
  });

  return (
    <AppShell userLabel={(session.user as { name?: string }).name ?? undefined}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-ui text-2xl font-semibold text-text-primary">
          Laboratuvarlar
        </h1>
        <p className="mt-1 text-sm text-text-dim">
          Her laboratuvar kendi izole agina sahiptir. Gercek dunyaya hic bir
          erisim yoktur.
        </p>

        {categories.map((cat) => (
          <section key={cat.id} className="mt-10">
            <div className="flex items-center gap-2 text-text-primary">
              <Icon name={cat.icon as IconName} className="text-signal" />
              <h2 className="font-ui text-sm font-semibold">{cat.name}</h2>
            </div>
            <p className="mt-1 text-xs text-text-dim">{cat.description}</p>

            <div className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {cat.labs.map((lab) => (
                <Link
                  key={lab.id}
                  href={`/laboratuvarlar/${lab.slug}`}
                  className="group flex flex-col justify-between bg-panel p-5 hover:bg-panel-raised"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-ui text-sm font-semibold text-text-primary">
                        {lab.title}
                      </h3>
                      <span
                        className={`font-mono text-[10px] uppercase ${DIFFICULTY_COLOR[lab.difficulty]}`}
                      >
                        {lab.difficulty}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-text-dim">
                      {lab.summary}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-text-faint">
                    <span>{lab.points} puan</span>
                    <Icon
                      name="chevronRight"
                      className="text-text-faint group-hover:text-signal"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
