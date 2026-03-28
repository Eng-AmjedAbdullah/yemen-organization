import { useEffect, useState, useCallback } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LayoutDashboard, Newspaper, Calendar, Users, User, LogOut, Menu, X,
         Mountain, MessageSquare, Handshake, Images, Settings, Globe, Bell } from 'lucide-react'
import { adminTranslations, AdminLangContext } from './adminI18n'
import api from '../lib/api'

export default function AdminLayout() {
  const [admin, setAdmin]         = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [adminLang, setAdminLang] = useState(localStorage.getItem('admin_lang') || 'ar')
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate  = useNavigate()
  const location  = useLocation()

  const t     = adminTranslations[adminLang]
  const isRtl = adminLang === 'ar'

  const toggleAdminLang = () => {
    const newLang = adminLang === 'ar' ? 'en' : 'ar'
    setAdminLang(newLang)
    localStorage.setItem('admin_lang', newLang)
  }

  // FIX: poll unread message count for sidebar badge
  const fetchUnread = useCallback(() => {
    api.get('/contact/unread-count').then(d => setUnreadCount(d?.count || 0)).catch(() => {})
  }, [])

  useEffect(() => {
    const token  = localStorage.getItem('yhpo_token')
    const stored = localStorage.getItem('yhpo_admin')
    if (!token) { navigate('/admin/login'); return }
    if (stored) setAdmin(JSON.parse(stored))
    fetchUnread()
    const interval = setInterval(fetchUnread, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [navigate, fetchUnread])

  // Refresh unread count when navigating to messages page
  useEffect(() => {
    if (location.pathname === '/admin/messages') {
      setTimeout(fetchUnread, 1000)
    }
  }, [location.pathname, fetchUnread])

  const handleLogout = () => {
    localStorage.removeItem('yhpo_token')
    localStorage.removeItem('yhpo_admin')
    toast.success(isRtl ? 'تم تسجيل الخروج' : 'Logged out successfully')
    navigate('/admin/login')
  }

  // FIX: only show "Manage Admins" to super_admin
  const isSuperAdmin = admin?.role === 'super_admin'

  const navItems = [
    { href:'/admin',           icon:LayoutDashboard, label:t.dashboard },
    { href:'/admin/news',      icon:Newspaper,       label:t.news },
    { href:'/admin/events',    icon:Calendar,        label:t.events },
    { href:'/admin/heritage',  icon:Mountain,        label:t.heritage },
    { href:'/admin/partners',  icon:Handshake,       label:t.partners },
    { href:'/admin/hero',      icon:Images,          label:t.heroSlides },
    { href:'/admin/settings',  icon:Settings,        label:t.siteSettings },
    { href:'/admin/messages',  icon:MessageSquare,   label:t.messages, badge: unreadCount },
    // FIX: hide admin management from regular admins
    ...(isSuperAdmin ? [{ href:'/admin/admins', icon:Users, label:t.admins }] : []),
    { href:'/admin/profile',   icon:User,            label:t.profile },
  ]

  const contextValue = { t, lang: adminLang, isRtl, toggleAdminLang, fetchUnread }

  return (
    <AdminLangContext.Provider value={contextValue}>
      <div className={`min-h-screen bg-gray-50 ${isRtl ? 'font-ar' : 'font-en'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <aside className={`fixed top-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} h-full bg-dark border-white/10 z-40 transition-all duration-300 ${sidebarOpen?'w-64':'w-16'}`}>
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {sidebarOpen && <div>
              <div className="text-white font-bold text-sm">{t.adminPanel}</div>
              <div className="text-primary text-xs">{t.yemenHeritage}</div>
            </div>}
            <button onClick={()=>setSidebarOpen(o=>!o)} className="text-gray-400 hover:text-primary p-1">
              {sidebarOpen?<X size={18}/>:<Menu size={18}/>}
            </button>
          </div>

          <nav className="p-3 space-y-1 h-[calc(100vh-200px)] overflow-y-auto">
            {navItems.map(item=>(
              <Link key={item.href} to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative
                  ${location.pathname===item.href?'bg-primary text-white':'text-gray-400 hover:bg-white/5 hover:text-primary'}`}>
                <item.icon size={18} className="flex-shrink-0"/>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                {/* FIX: unread badge on messages */}
                {item.badge > 0 && (
                  <span className={`${sidebarOpen ? 'ms-auto' : 'absolute -top-1 -end-1'} bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold`}>
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-dark">
            <button onClick={toggleAdminLang} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-primary transition-colors mb-2">
              <Globe size={18}/>
              {sidebarOpen && <span className="text-sm font-medium">{t.switchLang}</span>}
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={18}/>
              {sidebarOpen && <span className="text-sm font-medium">{t.logout}</span>}
            </button>
          </div>
        </aside>

        <div className={`transition-all duration-300 ${sidebarOpen ? (isRtl ? 'mr-64' : 'ml-64') : (isRtl ? 'mr-16' : 'ml-16')} min-h-screen`}>
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="text-sm text-gray-500">
              {navItems.find(n=>n.href===location.pathname)?.label || t.adminPanel}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {/* FIX: show role badge */}
              {isSuperAdmin && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  {isRtl ? 'مشرف رئيسي' : 'Super Admin'}
                </span>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary"/>
                </div>
                <span>{admin?.name||admin?.email||(isRtl ? 'مشرف' : 'Admin')}</span>
              </div>
            </div>
          </div>
          <div className="p-6"><Outlet /></div>
        </div>
      </div>
    </AdminLangContext.Provider>
  )
}
