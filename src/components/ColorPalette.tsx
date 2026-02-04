"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Color,
  HarmonyMode,
  Palette,
  generatePalette,
  createPalette,
  exportAsCSS,
  exportAsJSON,
} from "@/lib/colors";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ColorStrip } from "./ColorStrip";
import { Controls } from "./Controls";
import { FavoritesPanel } from "./FavoritesPanel";
import { ExportModal } from "./ExportModal";

export function ColorPalette() {
  const [colors, setColors] = useState<Color[]>([]);
  const [mode, setMode] = useState<HarmonyMode>("analogous");
  const [favorites, setFavorites] = useLocalStorage<Palette[]>(
    "chromatic-favorites",
    []
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "chromatic-dark-mode",
    false
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [exportData, setExportData] = useState<{
    content: string;
    format: "css" | "json";
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize colors on mount
  useEffect(() => {
    setMounted(true);
    setColors(generatePalette("analogous"));
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, mounted]);

  // Generate new palette
  const handleGenerate = useCallback(() => {
    setColors((prev) => generatePalette(mode, prev));
  }, [mode]);

  // Handle mode change
  const handleModeChange = useCallback((newMode: HarmonyMode) => {
    setMode(newMode);
    setColors((prev) => generatePalette(newMode, prev));
  }, []);

  // Toggle lock on a color
  const handleToggleLock = useCallback((index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  }, []);

  // Save current palette to favorites
  const handleSave = useCallback(() => {
    const palette = createPalette(colors, mode);
    setFavorites((prev) => [palette, ...prev]);
  }, [colors, mode, setFavorites]);

  // Load a palette from favorites
  const handleLoadPalette = useCallback((palette: Palette) => {
    setColors(palette.colors.map((c) => ({ ...c, locked: false })));
    setMode(palette.mode);
    setShowFavorites(false);
  }, []);

  // Delete a palette from favorites
  const handleDeletePalette = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((p) => p.id !== id));
    },
    [setFavorites]
  );

  // Export palette
  const handleExport = useCallback(
    (format: "css" | "json") => {
      const content = format === "css" ? exportAsCSS(colors) : exportAsJSON(colors);
      setExportData({ content, format });
    },
    [colors]
  );

  // Toggle dark mode
  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-1 min-h-[120px] md:min-h-0 bg-[var(--muted)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        {colors.map((color, index) => (
          <ColorStrip
            key={color.id}
            color={color}
            onToggleLock={() => handleToggleLock(index)}
          />
        ))}
      </div>

      <Controls
        mode={mode}
        onModeChange={handleModeChange}
        onGenerate={handleGenerate}
        onSave={handleSave}
        onExport={handleExport}
        onToggleFavorites={() => setShowFavorites(true)}
        showFavorites={showFavorites}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {showFavorites && (
        <FavoritesPanel
          favorites={favorites}
          onLoad={handleLoadPalette}
          onDelete={handleDeletePalette}
          onClose={() => setShowFavorites(false)}
        />
      )}

      {exportData && (
        <ExportModal
          content={exportData.content}
          format={exportData.format}
          onClose={() => setExportData(null)}
        />
      )}
    </>
  );
}
