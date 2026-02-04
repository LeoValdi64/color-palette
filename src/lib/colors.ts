export type HarmonyMode =
  | "analogous"
  | "complementary"
  | "triadic"
  | "split-complementary"
  | "monochromatic";

export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  locked: boolean;
  id: string;
}

export interface Palette {
  id: string;
  colors: Color[];
  mode: HarmonyMode;
  createdAt: number;
  name?: string;
}

// Convert HSL to RGB
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Convert RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

// Generate a random base hue
function randomHue(): number {
  return Math.floor(Math.random() * 360);
}

// Generate random saturation (keeping it vibrant)
function randomSaturation(): number {
  return Math.floor(Math.random() * 30) + 55; // 55-85%
}

// Generate random lightness
function randomLightness(): number {
  return Math.floor(Math.random() * 35) + 35; // 35-70%
}

// Create a color from HSL values
function createColor(h: number, s: number, l: number): Omit<Color, "locked" | "id"> {
  const hNormalized = ((h % 360) + 360) % 360;
  const rgb = hslToRgb(hNormalized, s, l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb,
    hsl: { h: hNormalized, s, l },
  };
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Generate colors based on harmony mode
export function generatePalette(
  mode: HarmonyMode,
  existingColors?: Color[]
): Color[] {
  const baseHue = randomHue();
  const baseSaturation = randomSaturation();
  const baseLightness = randomLightness();

  let hues: number[] = [];
  let saturations: number[] = [];
  let lightnesses: number[] = [];

  switch (mode) {
    case "analogous":
      // Colors next to each other on the color wheel (30 degrees apart)
      hues = [
        baseHue - 30,
        baseHue - 15,
        baseHue,
        baseHue + 15,
        baseHue + 30,
      ];
      saturations = Array(5)
        .fill(0)
        .map(() => baseSaturation + (Math.random() * 20 - 10));
      lightnesses = [
        baseLightness - 15,
        baseLightness - 5,
        baseLightness,
        baseLightness + 10,
        baseLightness + 20,
      ];
      break;

    case "complementary":
      // Two opposite colors with variations
      hues = [
        baseHue,
        baseHue + 15,
        baseHue + 180,
        baseHue + 180 - 15,
        baseHue + 180 + 15,
      ];
      saturations = Array(5)
        .fill(0)
        .map(() => baseSaturation + (Math.random() * 15 - 7));
      lightnesses = [
        baseLightness,
        baseLightness + 15,
        baseLightness - 10,
        baseLightness + 5,
        baseLightness + 20,
      ];
      break;

    case "triadic":
      // Three colors equally spaced (120 degrees apart)
      hues = [
        baseHue,
        baseHue + 120,
        baseHue + 240,
        baseHue + 30,
        baseHue + 150,
      ];
      saturations = Array(5)
        .fill(0)
        .map(() => baseSaturation + (Math.random() * 20 - 10));
      lightnesses = [
        baseLightness,
        baseLightness + 10,
        baseLightness - 10,
        baseLightness + 20,
        baseLightness + 5,
      ];
      break;

    case "split-complementary":
      // Base color + two colors adjacent to its complement
      hues = [
        baseHue,
        baseHue + 150,
        baseHue + 210,
        baseHue + 165,
        baseHue + 195,
      ];
      saturations = Array(5)
        .fill(0)
        .map(() => baseSaturation + (Math.random() * 15 - 7));
      lightnesses = [
        baseLightness,
        baseLightness + 15,
        baseLightness - 10,
        baseLightness + 25,
        baseLightness + 5,
      ];
      break;

    case "monochromatic":
      // Same hue, different saturation and lightness
      hues = Array(5).fill(baseHue);
      saturations = [
        baseSaturation - 20,
        baseSaturation - 10,
        baseSaturation,
        baseSaturation + 5,
        baseSaturation + 10,
      ];
      lightnesses = [25, 40, 50, 65, 80];
      break;
  }

  // Clamp values
  saturations = saturations.map((s) => Math.max(30, Math.min(100, s)));
  lightnesses = lightnesses.map((l) => Math.max(15, Math.min(85, l)));

  const newColors: Color[] = [];

  for (let i = 0; i < 5; i++) {
    // Keep locked colors from existing palette
    if (existingColors && existingColors[i]?.locked) {
      newColors.push(existingColors[i]);
    } else {
      const colorData = createColor(hues[i], saturations[i], lightnesses[i]);
      newColors.push({
        ...colorData,
        locked: false,
        id: existingColors?.[i]?.id || generateId(),
      });
    }
  }

  return newColors;
}

// Calculate relative luminance for contrast
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Determine if text should be light or dark
export function getContrastColor(hex: string): "white" | "black" {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = getLuminance(r, g, b);
  return luminance > 0.179 ? "black" : "white";
}

// Export palette as CSS variables
export function exportAsCSS(colors: Color[]): string {
  const variables = colors
    .map(
      (color, index) =>
        `  --color-${index + 1}: ${color.hex};\n  --color-${index + 1}-rgb: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b};`
    )
    .join("\n");

  return `:root {\n${variables}\n}`;
}

// Export palette as JSON
export function exportAsJSON(colors: Color[]): string {
  const exportData = colors.map((color, index) => ({
    name: `Color ${index + 1}`,
    hex: color.hex,
    rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
    hsl: `hsl(${Math.round(color.hsl.h)}, ${Math.round(color.hsl.s)}%, ${Math.round(color.hsl.l)}%)`,
  }));

  return JSON.stringify(exportData, null, 2);
}

// Create palette object
export function createPalette(colors: Color[], mode: HarmonyMode): Palette {
  return {
    id: generateId(),
    colors,
    mode,
    createdAt: Date.now(),
  };
}
