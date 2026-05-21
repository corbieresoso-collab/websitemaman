"use client";

import { useState } from "react";
import type { Artwork } from "@/lib/artworks";
import type { Locale, Dictionary } from "@/lib/dictionaries";

interface OrderFormProps {
  artwork: Artwork;
  lang: Locale;
  dict: Dictionary;
}

// Replace with your Formspree endpoint after creating a free account at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

export default function OrderForm({ artwork, lang, dict }: OrderFormProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const o = dict.order;
  const title = artwork.titles[lang];

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
      if (res.ok) {
        setSent(true);
      }
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-teal/30 p-6 text-teal text-sm text-center"
        style={{ fontFamily: "var(--font-body)" }}>
        {o.note}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden field: artwork */}
      <input type="hidden" name="artwork" value={title} />
      <input type="hidden" name="lang" value={lang} />

      {/* Name */}
      <div>
        <label className="block text-muted text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-body)" }}>
          {o.name}
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-muted text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-body)" }}>
          {o.email}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Format */}
      <div>
        <label className="block text-muted text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-body)" }}>
          {o.format_label}
        </label>
        <select
          name="format"
          required
          className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors appearance-none cursor-pointer"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <option value="">—</option>
          {formats.map(([key, label]) => (
            <option key={key} value={label}>{label}</option>
          ))}
        </select>
      </div>

      {/* Paper */}
      <div>
        <label className="block text-muted text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-body)" }}>
          {o.paper_label}
        </label>
        <select
          name="paper"
          required
          className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors appearance-none cursor-pointer"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <option value="">—</option>
          {papers.map(([key, label]) => (
            <option key={key} value={label}>{label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-muted text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-body)" }}>
          {o.message_label}
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full bg-surface border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors resize-none"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-teal/40 text-teal hover:bg-teal/5 transition-all duration-300 py-4 text-xs tracking-[0.25em] uppercase disabled:opacity-50"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {loading ? "…" : o.send}
      </button>

      <p className="text-muted/60 text-xs text-center"
        style={{ fontFamily: "var(--font-body)" }}>
        {o.note}
      </p>
    </form>
  );
}
