import styles from './Avatar.module.css'

interface AvatarProps {
  initials: string
  className?: string
}

export function Avatar({ initials, className }: AvatarProps) {
  return (
    <div className={[styles.avatar, className].filter(Boolean).join(' ')}>
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}
