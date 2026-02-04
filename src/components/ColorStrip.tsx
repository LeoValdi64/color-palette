"use client";

import { useState, useCallback } from "react";
import { Color, getContrastColor } from "@/lib/colors";

interface ColorStripProps {
  color: Color;
  onToggleLock: () => void;
}

export function ColorStrip({ color, onToggleLock }: ColorStripProps) {
  const [copied, setCopied] = useState(false);
  const textColor = getContrastColor(color.hex);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [color.hex]);

  return (
    <div
      className="color-strip relative flex flex-1 flex-col items-center justify-center min-h-[120px] md:min-h-0 cursor-pointer group"
      style={{ backgroundColor: color.hex }}
      onClick={handleCopy}
    >
      {/* Lock button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        className="absolute top-4 right-4 p-2 rounded-full transition-all opacity-60 hover:opacity-100"
        style={{
          color: textColor,
          backgroundColor:
            textColor === "white"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
        }}
        aria-label={color.locked ? "Unlock color" : "Lock color"}
      >
        {color.locked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </svg>
        )}
      </button>

      {/* Color info */}
      <div
        className="text-center transition-transform group-hover:scale-105"
        style={{ color: textColor }}
      >
        <p className="text-2xl md:text-3xl font-bold mb-2">
          {copied ? "Copied!" : color.hex}
        </p>
        <p className="text-sm opacity-80">
          RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
        </p>
      </div>

      {/* Click hint */}
      <p
        className="absolute bottom-4 text-xs opacity-0 group-hover:opacity-60 transition-opacity"
        style={{ color: textColor }}
      >
        Click to copy
      </p>
    </div>
  );
}
