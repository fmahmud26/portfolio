/** Theme multiplier — light canvas needs a lift too; dark gets extra punch. */
export function cosmicVisibility(isDark: boolean, opacity: number) {
  return opacity * (isDark ? 1.58 : 1.32)
}
