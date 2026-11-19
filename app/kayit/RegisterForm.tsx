"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@/components/Icon";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Kayit sirasinda bir hata olustu.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.error) {
      router.push("/giris");
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-text-dim">kullanici adi</span>
        <input
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border border-line bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-signal"
          placeholder="kullanici_adi"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-text-dim">e-posta</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-line bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-signal"
          placeholder="ornek@getto.local"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-text-dim">sifre</span>
        <input
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-line bg-void px-3 py-2 text-sm text-text-primary outline-none focus:border-signal"
          placeholder="en az 8 karakter"
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
        {loading ? "Olusturuluyor..." : "Hesap olustur"}
      </button>
    </form>
  );
}
