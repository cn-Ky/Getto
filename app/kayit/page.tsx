import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 font-ui text-text-primary">
      <div className="w-full max-w-sm border border-line bg-panel">
        <div className="border-b border-line bg-panel-raised px-5 py-3 font-mono text-[11px] text-text-faint">
          oturum — kayit
        </div>
        <div className="px-6 py-7">
          <h1 className="font-ui text-lg font-semibold">Hesap olustur</h1>
          <p className="mt-1 text-sm text-text-dim">
            Yalnizca egitim amacli kullanim icin. Tek bir hesap, tum izole
            laboratuvarlara erisim saglar.
          </p>
          <RegisterForm />
          <p className="mt-6 text-center text-xs text-text-dim">
            Zaten hesabin var mi?{" "}
            <Link href="/giris" className="text-signal hover:underline">
              Giris yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
