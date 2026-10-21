import { usePortfolio } from '../context/PortfolioContext'

type Props = {
  className?: string
  compact?: boolean
}

export default function ResumeActions({ className = '', compact = false }: Props) {
  const { profile } = usePortfolio()
  const resumeUrl = profile.resume_url
  const downloadName = profile.resume_download_name || 'Nitish-Kumar-Resume.pdf'

  return (
    <div className={`resume-actions ${compact ? 'resume-actions--compact' : ''} ${className}`.trim()}>
      <a
        className={compact ? 'btn btn--ghost btn--sm' : 'btn btn--ghost'}
        href={resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        View resume
      </a>
      <a
        className={compact ? 'btn btn--primary btn--sm' : 'btn btn--primary'}
        href={resumeUrl}
        download={downloadName}
      >
        Download resume
      </a>
    </div>
  )
}
