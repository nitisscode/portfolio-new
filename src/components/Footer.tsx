import { usePortfolio } from '../context/PortfolioContext'

export default function Footer() {
  const { profile } = usePortfolio()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.footer_tagline || 'Backend · APIs · Cloud'}</p>
      </div>
    </footer>
  )
}
