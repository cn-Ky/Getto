import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 font-ui text-text-primary">
      <div className="w-full max-w-sm border border-line bg-panel">
        <div className="border-b border-line bg-panel-raised px-5 py-3 font-mono text-[11px] text-text-faint">
          oturum — giris
        </div>
        <div className="px-6 py-7">
          <h1 className="font-ui text-lg font-semibold">Hesabina giris yap</h1>
          <p className="mt-1 text-sm text-text-dim">
            Laboratuvarlara ve ilerleme kaydina erismek icin.
          </p>
          <LoginForm />
          <p className="mt-6 text-center text-xs text-text-dim">
            Hesabin yok mu?{" "}
            <Link href="/kayit" className="text-signal hover:underline">
              Hesap olustur
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
