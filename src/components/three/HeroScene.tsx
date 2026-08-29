import { useTheme } from '../../context/ThemeContext'

/** Hero readability overlays — 3D galaxies live in `GalaxyBackground`. */
export function HeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="cosmos-drift-slow absolute h-[320px] w-[320px] rounded-full opacity-20 blur-3xl"
        style={{
          top: '22%',
          right: '10%',
          background: isDark
            ? 'radial-gradient(circle at 40% 40%, rgba(176,166,228,0.1) 0%, rgba(129,140,248,0.03) 48%, transparent 78%)'
            : 'radial-gradient(circle at 40% 40%, rgba(79,70,229,0.14) 0%, rgba(17,122,138,0.06) 48%, transparent 78%)',
        }}
      />

      <div className="scene-fade pointer-events-none absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[82%] lg:w-[68%] xl:max-w-5xl"
        style={{
          background: isDark
            ? 'linear-gradient(to right, rgba(46,46,54,0.99) 0%, rgba(46,46,54,0.88) 38%, rgba(46,46,54,0.52) 62%, transparent 100%)'
            : 'linear-gradient(to right, rgba(237,241,247,0.99) 0%, rgba(237,241,247,0.92) 36%, rgba(237,241,247,0.58) 58%, transparent 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(46,46,54,0.92) 0%, transparent 100%)'
            : 'linear-gradient(to top, rgba(237,241,247,0.92) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
