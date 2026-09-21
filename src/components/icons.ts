/**
 * Homepage icon set — inline Lucide-style SVG icons (stroke, 24×24).
 * Why inline, not an icon package: zero-JS, zero extra dependency, full
 * control of stroke width to match the Clean-Tech vibe (Brand.md §2).
 * Icons use currentColor so cards control their own accent.
 */
export const ICONS = {
  vibration: '<path d=\"M2 12h3l2-7 3 14 3-10 2 3h7\"/>',
  heat: '<path d=\"M12 22c4 0 7-2.9 7-6.8 0-4.5-4.5-6.7-4.5-11.2-3 1.5-4.5 4-4.5 6.5C7.5 8 6 6 6 4c-1.6 1.8-3 4.3-3 7.2C3 19.1 7 22 12 22Z\"/><path d=\"M12 22c-1.7 0-3-.8-3.7-1.9\"/>',
  noise: '<path d=\"M3 12h2l2-6 3 12 3-16 3 14 2-6 1 2h4\"/><path d=\"M17 4.5a7 7 0 0 1 0 15\"/>',
  link: '<path d=\"M9 17H7a4 4 0 0 1 0-8h2\"/><path d=\"M15 7h2a4 4 0 0 1 0 8h-2\"/><path d=\"M8 12h8\"/>',
  chip: '<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3\"/>',
  gauge: '<path d=\"M12 15a7 7 0 1 1 7-7\"/><path d=\"M12 15 16 9\"/><circle cx=\"12\" cy=\"15\" r=\"1.4\"/>',
  shield: '<path d=\"M12 2.5 4.5 5.5v6c0 4.6 3.2 8 7.5 10 4.3-2 7.5-5.4 7.5-10v-6L12 2.5Z\"/><path d=\"m9 11.5 2.2 2.2L15.5 9\"/>',
  layers: '<path d=\"m12 2.5 9 5-9 5-9-5 9-5Z\"/><path d=\"m3 12.5 9 5 9-5\"/><path d=\"m3 17.5 9 5 9-5\"/>',
  cloud: '<path d=\"M17.5 18.5a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.2 10.5 4 4 0 0 0 7 18.5h10.5Z\"/><path d=\"M9 21.5h6\"/>',
  screen: '<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 20.5h6M12 16v4\"/>',
  box: '<path d=\"M21 8.5v7.5a1.5 1.5 0 0 1-.8 1.3l-6.4 3.6a1.5 1.5 0 0 1-1.6 0L5.8 17.3a1.5 1.5 0 0 1-.8-1.3V8.5a1.5 1.5 0 0 1 .8-1.3l6.4-3.6a1.5 1.5 0 0 1 1.6 0l6.4 3.6a1.5 1.5 0 0 1 .8 1.3Z\"/><path d=\"M5.5 7.5 12 11l6.5-3.5M12 11v9.5\"/>',
  cog: '<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.08A1.7 1.7 0 0 0 10.12 3V3a2 2 0 1 1 4 0v.09c0 .68.4 1.3 1.03 1.56.6.26 1.3.13 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.08c.26.6.88 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09c-.68 0-1.3.4-1.51 1.03Z\"/>',
  arrow: '<path d=\"M5 12h14\"/><path d=\"m13 6 6 6-6 6\"/>',
} as const;

export type IconName = keyof typeof ICONS;
