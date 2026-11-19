import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-text-primary font-ui">
      {/* Titlebar */}
      <header className="flex h-10 items-center justify-between border-b border-line bg-panel px-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center bg-signal-dim text-signal text-[11px] font-mono font-semibold">
            G
          </span>
          <span className="font-mono text-xs text-text-dim">getto</span>
        </div>
        <nav className="flex items-center gap-5 font-mono text-xs text-text-dim">
          <Link href="/giris" className="hover:text-text-primary">giris</Link>
          <Link
            href="/kayit"
            className="border border-line px-3 py-1 text-text-primary hover:border-signal hover:text-signal"
          >
            hesap olustur
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        {/* Boot sequence hero */}
        <section className="border border-line bg-panel">
          <div className="flex items-center gap-2 border-b border-line bg-panel-raised px-4 py-2 font-mono text-[11px] text-text-faint">
            <span className="h-2 w-2 rounded-full bg-critical/70" />
            <span className="h-2 w-2 rounded-full bg-warn/70" />
            <span className="h-2 w-2 rounded-full bg-signal/70" />
            <span className="ml-2">oturum — baslangic</span>
          </div>
          <div className="px-6 py-10 font-mono text-sm leading-relaxed text-text-dim sm:px-10">
            <p className="text-text-faint">$ getto --init</p>
            <p className="mt-1">izole laboratuvar agi hazirlaniyor ... <span className="text-signal">tamam</span></p>
            <p>gercek dunya erisimi devre disi ... <span className="text-signal">dogrulandi</span></p>
            <p>ilerleme takip sistemi baglandi ... <span className="text-signal">tamam</span></p>
            <h1 className="mt-8 max-w-2xl font-ui text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              Web guvenligini, gercek bir hedefe dokunmadan ogrenin.
            </h1>
            <p className="mt-5 max-w-xl font-ui text-base leading-relaxed text-text-dim">
              Getto, her laboratuvari kendi izole agina alan bir egitim
              platformudur. Kesif, sizma testi ve savunma tekniklerini
              gercek araclarla, ama yalnizca kurgusal hedeflere karsi
              pratik edersiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 font-ui text-sm">
              <Link
                href="/kayit"
                className="flex items-center gap-2 bg-signal px-5 py-2.5 font-medium text-void hover:bg-signal/90"
              >
                Egitime basla <Icon name="arrowRight" className="text-xs" />
              </Link>
              <Link
                href="/laboratuvarlar"
                className="flex items-center gap-2 border border-line px-5 py-2.5 text-text-primary hover:border-text-dim"
              >
                Laboratuvarlara goz at
              </Link>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="mt-6 grid grid-cols-1 divide-y divide-line border border-line bg-panel sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "izole laboratuvar", value: "4", icon: "server" as const },
            { label: "guvenlik kategorisi", value: "3", icon: "shield-halved" as const },
            { label: "gercek dunya erisimi", value: "0", icon: "lock" as const },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-6 py-5">
              <Icon name={s.icon} className="text-xl text-text-faint" />
              <div>
                <div className="font-mono text-2xl text-text-primary">{s.value}</div>
                <div className="text-xs text-text-dim">{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="mt-16">
          <h2 className="font-ui text-xl font-semibold text-text-primary">
            Her laboratuvar kendi izole agina sahiptir
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
            {[
              {
                icon: "flask" as const,
                title: "Kurgusal hedef",
                body: "Her senaryo, platform tarafindan onceden hazirlanmis savunmasiz bir sisteme karsi kurulur.",
              },
              {
                icon: "network-wired" as const,
                title: "Izole ag",
                body: "Laboratuvar konteyneri yalnizca kendi agindaki hedeflerle konusabilir; disariya cikis yoktur.",
              },
              {
                icon: "checklist" as const,
                title: "Takip edilen ilerleme",
                body: "Tum oturumlar ve gonderimler, egitimsel ilerlemeyi olcmek icin kayit altina alinir.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-panel p-6">
                <Icon name={f.icon} className="text-lg text-signal" />
                <h3 className="mt-4 font-ui text-sm font-semibold text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 font-ui text-sm leading-relaxed text-text-dim">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-6 text-center font-mono text-xs text-text-faint">
        getto — yalnizca egitim amaclidir. izinsiz hic bir sisteme saldirilmaz.
      </footer>
    </div>
  );
}
