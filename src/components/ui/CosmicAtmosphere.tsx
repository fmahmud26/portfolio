type CosmicAtmosphereProps = {
  variant?: 'hero' | 'subtle' | 'minimal'
}

export function CosmicAtmosphere({ variant = 'subtle' }: CosmicAtmosphereProps) {
  if (variant === 'hero') return null

  const intensity = variant === 'minimal' ? 'opacity-30' : 'opacity-50'

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${intensity}`} aria-hidden="true">
      <div className="starfield absolute inset-0" />

      <div
        className="cosmos-drift-slow absolute -top-24 right-[8%] h-72 w-72 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--theme-nebula) 0%, transparent 68%)`,
        }}
      />

      {variant === 'subtle' && (
        <div
          className="cosmos-drift-reverse absolute -bottom-16 left-[5%] h-56 w-56 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, var(--color-cyan) 10%, transparent) 0%, transparent 70%)`,
          }}
        />
      )}

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent)',
        }}
      />
    </div>
  )
}
