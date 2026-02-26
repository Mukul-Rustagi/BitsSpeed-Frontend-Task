import type { SaveStatus } from '../types'

interface StatusBannerProps {
  saveStatus: SaveStatus
}

function StatusBanner({ saveStatus }: StatusBannerProps) {
  return (
    <p className={`status-banner ${saveStatus.type === 'error' ? 'status-banner--error' : ''}`}>
      {saveStatus.message}
    </p>
  )
}

export default StatusBanner
