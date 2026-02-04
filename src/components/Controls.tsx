"use client";

import { HarmonyMode } from "@/lib/colors";

interface ControlsProps {
  mode: HarmonyMode;
  onModeChange: (mode: HarmonyMode) => void;
  onGenerate: () => void;
  onSave: () => void;
  onExport: (format: "css" | "json") => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
  favoritesCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const HARMONY_MODES: { value: HarmonyMode; label: string }[] = [
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "split-complementary", label: "Split-Complementary" },
  { value: "monochromatic", label: "Monochromatic" },
];

export function Controls({
  mode,
  onModeChange,
  onGenerate,
  onSave,
  onExport,
  onToggleFavorites,
  showFavorites,
  favoritesCount,
  darkMode,
  onToggleDarkMode,
}: ControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left side - Mode selector and Generate */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={mode}
            onChange={(e) => onModeChange(e.target.value as HarmonyMode)}
            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {HARMONY_MODES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <button
            onClick={onGenerate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Generate
            <span className="hidden sm:inline text-xs opacity-70">(Space)</span>
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save
          </button>
        </div>

        {/* Right side - Export, Favorites, Dark mode */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="px-4 py-2 bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--foreground)] rounded-lg font-medium transition-colors text-sm flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Export
            </button>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
              <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => onExport("css")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] text-[var(--foreground)]"
                >
                  CSS Variables
                </button>
                <button
                  onClick={() => onExport("json")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] text-[var(--foreground)]"
                >
                  JSON
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleFavorites}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2 ${
              showFavorites
                ? "bg-purple-600 text-white"
                : "bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--foreground)]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={showFavorites ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            Favorites
            {favoritesCount > 0 && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
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
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
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
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
