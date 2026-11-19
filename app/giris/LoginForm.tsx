"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@/components/Icon";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-posta veya sifre hatali.");
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-text-dim">e-posta</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-line bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-signal"
          placeholder="ornek@getto.local"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-text-dim">sifre</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-line bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-signal"
          placeholder="********"
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 border border-critical-dim bg-critical-dim/30 px-3 py-2 text-xs text-critical">
          <Icon name="warning" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex items-center justify-center gap-2 bg-signal py-2.5 text-sm font-medium text-void hover:bg-signal/90 disabled:opacity-60"
      >
        {loading ? "Baglaniyor..." : "Giris yap"}
      </button>
    </form>
  );
}
