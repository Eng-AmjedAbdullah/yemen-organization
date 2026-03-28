import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mock data for development when backend is unavailable
const MOCK_DATA = {
  '/api/hero': [
    {
      id: 1,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SanaaMorgenlworEdited.jpg/2560px-SanaaMorgenlworEdited.jpg',
      caption_ar: 'مدينة صنعاء القديمة',
      caption_en: "Old City of Sana'a",
      alt_ar: 'منظر لمدينة صنعاء القديمة',
      alt_en: "View of Old Sana'a City",
    },
    {
      id: 2,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Temple_in_Ancient_city_of_Marib.jpg/2560px-Temple_in_Ancient_city_of_Marib.jpg',
      caption_ar: 'معبد أوام في مأرب',
      caption_en: 'Awwam Temple in Marib',
      alt_ar: 'معبد أثري في مدينة مأرب القديمة',
      alt_en: 'Archaeological temple in ancient Marib',
    },
  ],
  '/api/news': [
    {
      id: 1,
      title: 'إطلاق مشروع توثيق التراث اليمني',
      title_en: 'Launch of Yemen Heritage Documentation Project',
      content: 'أعلنت المنظمة عن إطلاق مشروع جديد لتوثيق التراث الثقافي اليمني بالتعاون مع شركاء دوليين.',
      content_en: 'The organization announced the launch of a new project to document Yemeni cultural heritage in partnership with international partners.',
      category: 'مشاريع',
      category_en: 'Projects',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Shibam_Wadi_Hadhramaut_Yemen.jpg/2560px-Shibam_Wadi_Hadhramaut_Yemen.jpg',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'ورشة عمل حول حماية المواقع الأثرية',
      title_en: 'Workshop on Protecting Archaeological Sites',
      content: 'نظمت المنظمة ورشة عمل متخصصة حول أفضل الممارسات في حماية المواقع الأثرية.',
      content_en: 'The organization organized a specialized workshop on best practices in protecting archaeological sites.',
      category: 'فعاليات',
      category_en: 'Events',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mocha_Yemen.jpg/2560px-Mocha_Yemen.jpg',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      title: 'شراكة جديدة مع اليونسكو',
      title_en: 'New Partnership with UNESCO',
      content: 'وقعت المنظمة اتفاقية شراكة مع اليونسكو لدعم جهود الحفاظ على التراث.',
      content_en: 'The organization signed a partnership agreement with UNESCO to support heritage preservation efforts.',
      category: 'أخبار',
      category_en: 'News',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Old_City_Sana%27a_1.jpg/2560px-Old_City_Sana%27a_1.jpg',
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  '/api/events': [
    {
      id: 1,
      title: 'مؤتمر التراث الثقافي اليمني',
      title_en: 'Yemeni Cultural Heritage Conference',
      content: 'مؤتمر دولي يجمع خبراء ومختصين في مجال التراث الثقافي.',
      content_en: 'An international conference bringing together experts and specialists in cultural heritage.',
      type: 'seminar',
      event_date: new Date(Date.now() + 604800000).toISOString(),
      location: 'صنعاء',
      location_en: "Sana'a",
    },
    {
      id: 2,
      title: 'دورة تدريبية في ترميم الآثار',
      title_en: 'Training Course in Archaeological Restoration',
      content: 'دورة تدريبية متخصصة للمهتمين بمجال ترميم الآثار.',
      content_en: 'A specialized training course for those interested in archaeological restoration.',
      type: 'training',
      event_date: new Date(Date.now() + 1209600000).toISOString(),
      location: 'عدن',
      location_en: 'Aden',
    },
    {
      id: 3,
      title: 'معرض صور التراث اليمني',
      title_en: 'Yemeni Heritage Photo Exhibition',
      content: 'معرض يضم صوراً نادرة للتراث اليمني عبر التاريخ.',
      content_en: 'An exhibition featuring rare photos of Yemeni heritage throughout history.',
      type: 'event',
      event_date: new Date(Date.now() + 2419200000).toISOString(),
      location: 'تعز',
      location_en: 'Taiz',
    },
  ],
  '/api/partners': [
    { id: 1, name: 'اليونسكو', name_en: 'UNESCO', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/UNESCO_logo.svg/200px-UNESCO_logo.svg.png', website_url: 'https://unesco.org' },
    { id: 2, name: 'الإيسيسكو', name_en: 'ICESCO', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/ISESCO_logo.png/200px-ISESCO_logo.png', website_url: 'https://icesco.org' },
    { id: 3, name: 'الألكسو', name_en: 'ALECSO', logo_url: 'https://upload.wikimedia.org/wikipedia/ar/thumb/7/7b/ALECSO_logo.svg/200px-ALECSO_logo.svg.png', website_url: 'https://alecso.org' },
  ],
  '/api/settings': {
    contact_phone: '+967 1 234567',
    contact_email: 'info@yhpo.org',
    address_ar: 'صنعاء، اليمن',
    address_en: "Sana'a, Yemen",
    footer_desc_ar: 'منظمة تراث اليمن لأجل السلام - نعمل على حماية وتعزيز التراث الثقافي اليمني',
    footer_desc_en: 'Yemen Heritage for Peace Organization - Working to protect and promote Yemeni cultural heritage',
    social_facebook: 'https://facebook.com/yhpo',
    social_youtube: 'https://youtube.com/@yhpo',
    social_linkedin: 'https://linkedin.com/company/yhpo',
    social_x: 'https://x.com/yhpo',
  },
  '/api/heritage': [
    {
      id: 1,
      title: 'مدينة صنعاء القديمة',
      title_en: "Old City of Sana'a",
      description: 'مدينة صنعاء القديمة هي أحد مواقع التراث العالمي لليونسكو.',
      description_en: "The Old City of Sana'a is a UNESCO World Heritage Site.",
      category: 'architectural',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SanaaMorgenlworEdited.jpg/800px-SanaaMorgenlworEdited.jpg',
    },
    {
      id: 2,
      title: 'شبام حضرموت',
      title_en: 'Shibam Hadramawt',
      description: 'تُعرف بمانهاتن الصحراء بسبب ناطحات السحاب الطينية.',
      description_en: 'Known as the Manhattan of the Desert due to its mud-brick high-rises.',
      category: 'architectural',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Shibam_Wadi_Hadhramaut_Yemen.jpg/800px-Shibam_Wadi_Hadhramaut_Yemen.jpg',
    },
  ],
}

// Plugin to serve mock data when backend is unavailable
function mockApiPlugin() {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api')) {
          const basePath = req.url.split('?')[0]
          const data = MOCK_DATA[basePath]
          if (data) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  server: {
    port: 3000,
  }
})
