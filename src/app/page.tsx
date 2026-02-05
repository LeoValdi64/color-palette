import { ColorPalette } from "@/components/ColorPalette";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Chromatic - Free Color Palette Generator</h1>
      <ColorPalette />
    </main>
  );
}
