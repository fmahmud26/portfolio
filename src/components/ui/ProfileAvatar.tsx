import { useState } from 'react'
import { profile } from '../../data/content'

type ProfileAvatarProps = {
  className?: string
  interactive?: boolean
}

export function ProfileAvatar({ className = '', interactive = false }: ProfileAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const showPhoto = Boolean(profile.avatar) && !imageFailed

  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-accent/25 bg-accent/10 text-sm font-semibold text-accent ${
        interactive
          ? 'avatar-interactive transition-all group-hover:border-accent/40'
          : ''
      } ${className}`.trim()}
    >
      {interactive && (
        <span className="absolute inset-0 rounded-xl bg-linear-to-br from-accent/20 to-cyan/10 opacity-0 transition-opacity group-hover:opacity-100" />
      )}

      {showPhoto ? (
        <img
          src={profile.avatar}
          alt={profile.name}
          className="relative h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="relative">{profile.initials}</span>
      )}
    </div>
  )
}
