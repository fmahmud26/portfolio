import { useTheme } from '../../context/ThemeContext'

/** Hero readability overlays — 3D galaxies live in `GalaxyBackground`. */
export function HeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="cosmos-drift-slow absolute h-[300px] w-[300px] rounded-full opacity-[0.18] blur-3xl"
        style={{
          top: '20%',
          right: '8%',
          background: isDark
            ? 'radial-gradient(circle at 40% 40%, rgba(139,156,247,0.12) 0%, rgba(94,200,214,0.04) 48%, transparent 78%)'
            : 'radial-gradient(circle at 40% 40%, rgba(71,85,199,0.16) 0%, rgba(17,122,138,0.07) 48%, transparent 78%)',
        }}
      />

      <div className="scene-fade pointer-events-none absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[82%] lg:w-[68%] xl:max-w-5xl"
        style={{
          background: isDark
            ? 'linear-gradient(to right, rgba(46,46,54,0.92) 0%, rgba(46,46,54,0.68) 32%, rgba(46,46,54,0.28) 55%, transparent 100%)'
            : 'linear-gradient(to right, rgba(233,238,245,0.9) 0%, rgba(233,238,245,0.7) 32%, rgba(233,238,245,0.28) 56%, transparent 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(46,46,54,0.92) 0%, transparent 100%)'
            : 'linear-gradient(to top, rgba(233,238,245,0.9) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
