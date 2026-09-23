/** Soft theme lift — never blow past 1 so additive layers stay eye-comfortable. */
export function cosmicVisibility(isDark: boolean, opacity: number) {
  const scaled = opacity * (isDark ? 1.32 : 1.34)
  return Math.min(scaled, 0.98)
}
