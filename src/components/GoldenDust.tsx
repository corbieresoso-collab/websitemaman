"use client";

import { useState, useEffect } from "react";

function makeGoldShadows(count: number, W: number, H: number): string {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    const a = (Math.random() * 0.25 + 0.08).toFixed(2);
    const r = Math.random();
    let color: string;
    if (r < 0.6) {
      color = `rgba(201,168,76,${a})`;
    } else if (r < 0.82) {
      color = `rgba(230,200,130,${(parseFloat(a) * 0.7).toFixed(2)})`;
    } else {
      color = `rgba(160,120,60,${(parseFloat(a) * 0.6).toFixed(2)})`;
    }
    return `${x}px ${y}px 0 0px ${color}`;
  }).join(",");
}

function makeGoldGlow(count: number, W: number, H: number): string {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    const a = (Math.random() * 0.18 + 0.06).toFixed(2);
    const color =
      Math.random() < 0.65
        ? `rgba(201,168,76,${a})`
        : `rgba(240,210,140,${a})`;
    return `${x}px ${y}px 2px 1px ${color}`;
  }).join(",");
}

export default function GoldenDust() {
  const [layers, setLayers] = useState<{
    fine: string;
    medium: string;
    bright: string;
  } | null>(null);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    setLayers({
      fine: makeGoldShadows(220, W, H),
      medium: makeGoldShadows(80, W, H),
      bright: makeGoldShadows(20, W, H) + "," + makeGoldGlow(10, W, H),
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
        className="absolute top-0 left-0 block w-px h-px dust-layer-1"
        style={{ boxShadow: layers.fine }}
      />
      <span
        className="absolute top-0 left-0 block w-px h-px dust-layer-2"
        style={{ boxShadow: layers.medium }}
      />
      <span
        className="absolute top-0 left-0 block w-px h-px dust-layer-3"
        style={{ boxShadow: layers.bright }}
      />
    </div>
  );
}
