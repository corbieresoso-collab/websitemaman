"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

const steps = [
  {
    icon: "01",
    titleKey: "step1_title" as const,
    textKey: "step1_text" as const,
  },
  {
    icon: "02",
    titleKey: "step2_title" as const,
    textKey: "step2_text" as const,
  },
  {
    icon: "03",
    titleKey: "step3_title" as const,
    textKey: "step3_text" as const,
  },
];

export default function CommanderClient({ lang, dict }: Props) {
  const h = dict.how;
  const o = dict.order;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const formats = Object.entries(o.formats) as [string, string][];
  const papers = Object.entries(o.papers) as [string, string][];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">
        <h1
          className="animate-fade-in-up font-light italic text-text leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 6rem)",
          }}
        >
          {h.title}
        </h1>
        <div className="w-10 h-px bg-gold mx-auto mb-6 animate-fade-in delay-200" />
        <p
          className="animate-fade-in-up delay-400 text-muted"
          style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: "1.8" }}
        >
          {h.subtitle}
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-24">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-bg px-8 py-10"
            >
              <div
                className="text-gold/40 mb-5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                }}
              >
                {step.icon}
              </div>
              <h3
                className="font-light italic text-text mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                }}
              >
                {h[step.titleKey]}
              </h3>
              <p
                className="text-muted text-sm leading-7"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {h[step.textKey]}
              </p>
              {i === 0 && (
                <Link
                  href={`/${lang}/galerie`}
                  className="inline-flex items-center gap-3 mt-6 text-muted/50 hover:text-gold transition-colors duration-400 group"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  <span className="w-5 h-px bg-current group-hover:w-9 transition-all duration-500" />
                  {h.cta_gallery}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* ── Order form ── */}
        <div className="max-w-xl mx-auto">
          <h2
            className="font-light italic text-text text-center mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {h.form_title}
          </h2>
          <div className="w-8 h-px bg-gold/40 mx-auto mb-4" />
          <p
            className="text-muted text-sm text-center leading-7 mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {h.form_intro}
          </p>

          {sent ? (
            <div
              className="border border-gold/30 p-8 text-gold text-sm text-center"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {o.note}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="lang" value={lang} />

              {/* Name */}
              <FormField label={o.name}>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </FormField>

              {/* Email */}
              <FormField label={o.email}>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </FormField>

              {/* Artwork name (free text) */}
              <FormField label={o.artwork_label}>
                <input
                  type="text"
                  name="artwork"
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                  placeholder="—"
                />
              </FormField>

              {/* Format */}
              <FormField label={o.format_label}>
                <select
                  name="format"
                  required
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <option value="">—</option>
                  {formats.map(([key, label]) => (
                    <option key={key} value={label}>{label}</option>
                  ))}
                </select>
              </FormField>

              {/* Paper */}
              <FormField label={o.paper_label}>
                <select
                  name="paper"
                  required
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <option value="">—</option>
                  {papers.map(([key, label]) => (
                    <option key={key} value={label}>{label}</option>
                  ))}
                </select>
              </FormField>

              {/* Message */}
              <FormField label={o.message_label}>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </FormField>

              <button
                type="submit"
                disabled={loading}
                className="w-full border border-gold/40 text-gold hover:bg-gold/5 transition-all duration-300 py-4 text-xs tracking-[0.25em] uppercase disabled:opacity-50"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {loading ? "…" : o.send}
              </button>

              <p
                className="text-muted/50 text-xs text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {o.note}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-muted mb-2"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
