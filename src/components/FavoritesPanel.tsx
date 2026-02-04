"use client";

import { Palette } from "@/lib/colors";

interface FavoritesPanelProps {
  favorites: Palette[];
  onLoad: (palette: Palette) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function FavoritesPanel({
  favorites,
  onLoad,
  onDelete,
  onClose,
}: FavoritesPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--background)] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Saved Palettes
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
          >
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 opacity-50"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <p>No saved palettes yet</p>
              <p className="text-sm mt-1">
                Click &quot;Save&quot; to save the current palette
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {favorites.map((palette) => (
                <div
                  key={palette.id}
                  className="border border-[var(--border)] rounded-lg overflow-hidden group"
                >
                  <div className="flex h-16">
                    {palette.colors.map((color) => (
                      <div
                        key={color.id}
                        className="flex-1"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <div className="p-3 flex items-center justify-between bg-[var(--muted)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)] capitalize">
                        {palette.mode.replace("-", " ")}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {new Date(palette.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onLoad(palette)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => onDelete(palette.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
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
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
