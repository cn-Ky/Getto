"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Phase = "idle" | "starting" | "running" | "solved";

export function LabConsole({ slug }: { slug: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [flag, setFlag] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  async function startSession() {
    setPhase("starting");
    setLog(["$ oturum baslatiliyor...", "izole ag ayriliyor..."]);

    await fetch(`/api/labs/${slug}/start`, { method: "POST" });

    setTimeout(() => {
      setLog((l) => [
        ...l,
        "izole ag hazir — lab-net bagli",
        "hedef sistem ayaga kalkiyor...",
        "hazir. araclarin konteyner icinde kullanilabilir.",
      ]);
      setPhase("running");
    }, 900);
  }

  async function submitFlag(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/labs/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flag }),
    });
    const data = await res.json();
    setFeedback(data.correct ? "correct" : "wrong");
    if (data.correct) setPhase("solved");
  }

  return (
    <div className="mt-6 border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line bg-panel-raised px-4 py-2">
        <span className="font-mono text-[11px] text-text-faint">
          lab-konsol — {slug}
        </span>
        <span className="font-mono text-[11px] text-text-dim">
          durum:{" "}
          <span
            className={
              phase === "running" || phase === "solved"
                ? "text-signal"
                : phase === "starting"
                  ? "text-warn"
                  : "text-text-faint"
            }
          >
            {phase === "idle" && "beklemede"}
            {phase === "starting" && "baslatiliyor"}
            {phase === "running" && "calisiyor"}
            {phase === "solved" && "tamamlandi"}
          </span>
        </span>
      </div>

      <div className="min-h-[160px] px-4 py-4 font-mono text-[13px] leading-relaxed text-text-dim">
        {phase === "idle" && (
          <button
            onClick={startSession}
            className="flex items-center gap-2 border border-line px-4 py-2 text-sm text-text-primary hover:border-signal hover:text-signal"
          >
            <Icon name="play" /> Izole oturumu baslat
          </button>
        )}
        {log.map((line, i) => (
          <div key={i}>
            {line} {i === log.length - 1 && phase === "starting" && (
              <span className="caret">_</span>
            )}
          </div>
        ))}
      </div>

      {(phase === "running" || phase === "solved") && (
        <form
          onSubmit={submitFlag}
          className="flex items-center gap-2 border-t border-line px-4 py-3"
        >
          <span className="font-mono text-[11px] text-text-faint">bayrak:</span>
          <input
            value={flag}
            onChange={(e) => {
              setFlag(e.target.value);
              setFeedback(null);
            }}
            disabled={phase === "solved"}
            placeholder="GETTO{...}"
            className="flex-1 border border-line bg-void px-3 py-1.5 font-mono text-sm text-text-primary outline-none focus:border-signal disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={phase === "solved"}
            className="border border-line px-3 py-1.5 font-mono text-xs text-text-primary hover:border-signal disabled:opacity-60"
          >
            Gonder
          </button>
        </form>
      )}

      {feedback === "correct" && (
        <div className="flex items-center gap-2 border-t border-line bg-signal-dim/40 px-4 py-2 font-mono text-xs text-signal">
          <Icon name="check" /> dogru — puan hesabina eklendi
        </div>
      )}
      {feedback === "wrong" && (
        <div className="flex items-center gap-2 border-t border-line bg-critical-dim/30 px-4 py-2 font-mono text-xs text-critical">
          <Icon name="xmark" /> yanlis bayrak — tekrar dene
        </div>
      )}
    </div>
  );
}
