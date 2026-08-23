"use client";
import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignoriši ako clipboard nije dostupan
    }
  }

  return (
    <button className="svglink" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={copy}>
      {copied ? "Kopirano ✓" : "Kopiraj podatke"}
    </button>
  );
}
