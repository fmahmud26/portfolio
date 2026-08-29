type CosmicAtmosphereProps = {
  variant?: 'hero' | 'subtle' | 'minimal'
}

/** Section backdrop — sparse distant stars only; no repeated galaxy blobs. */
export function CosmicAtmosphere({ variant = 'subtle' }: CosmicAtmosphereProps) {
  if (variant === 'hero') return null

  if (variant === 'minimal') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]" aria-hidden="true">
        <div className="starfield starfield--distant absolute inset-0" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.1]" aria-hidden="true">
      <div className="starfield starfield--distant absolute inset-0" />
    </div>
  )
}
