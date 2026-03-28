import { Link } from 'react-router-dom'
import { useLang } from '../App'
import { Facebook, Youtube, Linkedin, Phone, Mail, MapPin, Dot } from 'lucide-react'

// Custom X (Twitter) icon since lucide's Twitter icon may not display correctly
const XIcon = ({ size = 16, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
  const { t, lang, settings } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">

      <div className="h-16 bg-gray-50" style={{ clipPath: 'ellipse(55% 100% at 50% 0%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-2">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-4"
              onError={e => e.target.style.display='none'} />
            <h3 className="text-xl font-bold text-white mb-2">
              {lang === 'ar' ? 'منظمة تراث اليمن لأجل السلام' : 'Yemen Heritage for Peace Organization'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {lang === 'ar' ? (settings?.footer_desc_ar || t.footer_desc) : (settings?.footer_desc_en || t.footer_desc)}
            </p>
            <div className="flex gap-3">
              {settings?.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
              )}
              {settings?.social_youtube && (
                <a href={settings.social_youtube} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300" aria-label="YouTube">
                  <Youtube size={16} />
                </a>
              )}
              {settings?.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
              )}
              {settings?.social_x && (
                <a href={settings.social_x} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300" aria-label="X">
                  <XIcon size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 border-b border-primary/30 pb-2">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: t.nav.home, href: '/' },
                { label: t.nav.about, href: '/about' },
                { label: t.nav.news, href: '/news' },
                // { label: t.nav.events, href: '/events' },
                // { label: t.nav.fields, href: '/fields' },
                { label: t.nav.contact, href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link to={item.href} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <Dot size={18} className="text-primary -ms-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 border-b border-primary/30 pb-2">{t.contact_title}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-primary mt-0.5" />
                <span dir="ltr">{settings?.contact_phone || ''}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-primary mt-0.5" />
                <a href={`mailto:${settings?.contact_email || ''}`} className="hover:text-primary transition-colors break-all">
                  {settings?.contact_email || ''}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span>{lang === 'ar' ? (settings?.address_ar || t.address_val) : (settings?.address_en || t.address_val)}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
          © {year} {lang === 'ar' ? 'منظمة تراث اليمن لأجل السلام' : 'Yemen Heritage for Peace Organization'} - {t.rights}
        </div>
      </div>
    </footer>
  )
}
