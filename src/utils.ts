export const hexToRGB = (h: string): number[] => {
  let rgb = [0, 0, 0];
  if (h.length === 4) {
    for (let i = 1; i <= rgb.length; i++) {
      rgb[i - 1] = parseInt(h[i] + h[i], 16);
    }
  } else if (h.length === 7) {
    for (let i = 1; i <= rgb.length; i++) {
      rgb[i - 1] = parseInt(h[i] + h[i + 1], 16);
    }
  } else {
    throw new Error("Invalid hex");
  }

  return rgb;
};

export function RGBToHSL(rgb: number[]): number[] {
  // Make r, g, and b fractions of 1
  const [r, g, b] = rgb.map((x) => x / 255);

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
