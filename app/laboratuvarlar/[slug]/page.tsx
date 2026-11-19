import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { LabConsole } from "./LabConsole";

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  const { slug } = await params;
  const lab = await prisma.lab.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!lab) notFound();

  const tools = lab.toolTags.split(",").map((t) => t.trim());

  return (
    <AppShell userLabel={(session.user as { name?: string }).name ?? undefined}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] text-text-faint">
              {lab.category.name}
            </span>
            <h1 className="mt-1 font-ui text-2xl font-semibold text-text-primary">
              {lab.title}
            </h1>
          </div>
          <span className="border border-line px-2 py-1 font-mono text-[11px] text-text-dim">
            {lab.points} puan
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tools.map((t) => (
            <span
              key={t}
              className="border border-line bg-panel px-2 py-1 font-mono text-[11px] text-text-dim"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 border border-line bg-panel p-5">
          <div className="flex items-center gap-2 text-text-dim">
            <Icon name="info" className="text-xs" />
            <span className="font-mono text-[11px]">senaryo</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-primary">
            {lab.briefing}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2 px-1 py-3 font-mono text-[11px] text-text-faint">
          <Icon name="lock" />
          Bu laboratuvar, platformun kendi izole agindaki kurgusal bir hedefe
          karsi calisir. Gercek dunyaya erisim yoktur.
        </div>

        <LabConsole slug={lab.slug} />
      </div>
    </AppShell>
  );
}
