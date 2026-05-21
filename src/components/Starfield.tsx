"use client";

import { useState, useEffect } from "react";

function makeShadows(
  count: number,
  spread: number,
  W: number,
  H: number,
  colored = false
): string {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    const a = (Math.random() * 0.6 + 0.35).toFixed(2);
    let color: string;
    if (colored) {
      const r = Math.random();
      if (r < 0.55) color = `rgba(240,237,232,${a})`;
      else if (r < 0.78)
        color = `rgba(78,205,196,${(parseFloat(a) * 0.75).toFixed(2)})`;
      else color = `rgba(160,185,255,${(parseFloat(a) * 0.7).toFixed(2)})`;
    } else {
      color = `rgba(240,237,232,${a})`;
    }
    return `${x}px ${y}px 0 ${spread}px ${color}`;
  }).join(",");
}

function makeGlowStars(count: number, W: number, H: number): string {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    const r = Math.random();
    const a = (Math.random() * 0.3 + 0.2).toFixed(2);
    const color =
      r < 0.5
        ? `rgba(240,237,232,${a})`
        : r < 0.75
          ? `rgba(78,205,196,${a})`
          : `rgba(160,185,255,${a})`;
    return `${x}px ${y}px 2px 1px ${color}`;
  }).join(",");
}

export default function Starfield() {
  const [layers, setLayers] = useState<{
    tiny: string;
    small: string;
    bright: string;
  } | null>(null);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    setLayers({
      tiny: makeShadows(280, 0, W, H),
      small: makeShadows(100, 0, W, H),
      bright:
        makeShadows(28, 1, W, H, true) + "," + makeGlowStars(12, W, H),
    });
  }, []);

  if (!layers) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <span
        className="absolute top-0 left-0 block w-px h-px star-layer-1"
        style={{ boxShadow: layers.tiny }}
      />
      <span
        className="absolute top-0 left-0 block w-px h-px star-layer-2"
        style={{ boxShadow: layers.small }}
      />
      <span
        className="absolute top-0 left-0 block w-px h-px star-layer-3"
        style={{ boxShadow: layers.bright }}
      />
    </div>
  );
}
