const BASE = import.meta.env.VITE_API_URL || ''
const MOCK_DATA = {
  '/hero': [
    {
      id: 1,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/The_castle_above_Taiz_%288683935588%29.jpg/1920px-The_castle_above_Taiz_%288683935588%29.jpg',
      caption_ar: 'قلعة القاهرة – تعز، اليمن',
      caption_en: 'Al-Qahira Castle – Taiz, Yemen',
      alt_ar: 'قلعة القاهرة التاريخية تطل على مدينة تعز',
      alt_en: 'Historic Al-Qahira Castle overlooking Taiz city',
      link_url: '/heritage-life?type=tangible',
      link_text_ar: 'اكتشف التراث المادي',
      link_text_en: 'Explore Tangible Heritage',
      sort_order: 1,
      is_active: 1,
    },
    {
      id: 2,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Shibam_Wadi_Hadhramaut_Yemen.jpg/1920px-Shibam_Wadi_Hadhramaut_Yemen.jpg',
      caption_ar: 'مدينة شبام – ناطحات سحاب من الطين',
      caption_en: 'Shibam – The Ancient Skyscrapers of Mud',
      alt_ar: 'أبراج شبام الطينية الشاهقة في وادي حضرموت – موقع تراث عالمي يونسكو',
      alt_en: 'The towering mud-brick skyscrapers of Shibam – a UNESCO World Heritage Site',
      link_url: '/about',
      link_text_ar: 'عن منظمتنا',
      link_text_en: 'About Our Organization',
      sort_order: 2,
      is_active: 1,
    },
    {
      id: 3,
      image_url: '/maarb.jpg',
      caption_ar: 'معبد مأرب الأثري – حضارة سبأ العريقة',
      caption_en: 'Marib Archaeological Temple – The Ancient Sabaean Civilization',
      alt_ar: 'المعبد الأثري في مدينة مأرب القديمة، شاهد على حضارة سبأ',
      alt_en: 'The archaeological temple in the ancient city of Marib, a testament to the Sabaean civilization',
      link_url: '/heritage-life?type=tangible',
      link_text_ar: 'اكتشف التراث',
      link_text_en: 'Discover Heritage',
      sort_order: 3,
      is_active: 1,
    },
  ],

  '/news': [
    {
      id: 1,
      title: 'ورشة عمل متخصصة في توثيق التراث المعماري التاريخي بتعز',
      title_en: 'Specialized Workshop on Documenting Historic Architectural Heritage in Taiz',
      content: 'نظّمت منظمة تراث اليمن لأجل السلام بالتعاون مع جامعة تعز ورشة عمل تفاعلية حول أساليب توثيق التراث المعماري باستخدام التصوير الفوتوغرامتري ثلاثي الأبعاد والمسح بالليزر. شارك في الورشة نخبة من الأكاديميين والباحثين والطلاب، وتناولت الجلسات أحدث التقنيات الرقمية في الحفاظ على المباني التاريخية وأرشفتها.',
      content_en: 'The Yemen Heritage for Peace Organization, in cooperation with Taiz University, organized an interactive workshop on architectural heritage documentation methods using 3D photogrammetry and laser scanning. The workshop brought together academics, researchers, and students, covering the latest digital technologies in preserving and archiving historic buildings.',
      category: 'فعاليات',
      category_en: 'Events',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/The_castle_above_Taiz_%288683935588%29.jpg/1280px-The_castle_above_Taiz_%288683935588%29.jpg',
      published: 1,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 2,
      title: 'إطلاق مشروع رقمنة الموروث الشفهي اليمني للأجيال القادمة',
      title_en: 'Launch of the Yemeni Oral Heritage Digitization Project for Future Generations',
      content: 'أطلقت المنظمة مشروع توثيق الموروث الشفهي اليمني رقمياً، الذي يستهدف تسجيل وحفظ الأمثال الشعبية والحكايات التراثية والأشعار والأغاني الشعبية في أرشيف رقمي مفتوح المصدر. ويضم الفريق باحثين ومختصين في اللسانيات وتكنولوجيا المعلومات.',
      content_en: 'The organization launched a digital documentation project for Yemeni oral heritage, aiming to record and preserve proverbs, folk tales, poetry, and folk songs in an open-source digital archive. The team includes researchers and specialists in linguistics and information technology.',
      category: 'مشاريع',
      category_en: 'Projects',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg/1280px-Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg',
      published: 1,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      id: 3,
      title: 'تقرير تحليلي شامل حول أوضاع المواقع الأثرية في محافظة تعز',
      title_en: 'Comprehensive Analytical Report on the State of Archaeological Sites in Taiz',
      content: 'أصدرت المنظمة تقريرها التحليلي السنوي حول أوضاع المواقع الأثرية في محافظة تعز، الذي يرصد ما لا يقل عن 27 موقعاً أثرياً تتفاوت درجات الخطر التي تهددها. ويوصي التقرير بإنشاء منظومة رقابة ميدانية دورية وتفعيل التعاون مع اليونسكو وإيكروم.',
      content_en: 'The organization published its annual analytical report on the state of archaeological sites in Taiz Governorate, documenting no fewer than 27 sites facing varying degrees of risk. The report recommends establishing a regular field monitoring system and activating cooperation with UNESCO and ICCROM.',
      category: 'دراسات',
      category_en: 'Studies',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Temple_in_Ancient_city_of_Marib.jpg/1280px-Temple_in_Ancient_city_of_Marib.jpg',
      published: 1,
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
  ],

  '/events': [
    {
      id: 1,
      title: 'ندوة علمية: دور التراث الثقافي في بناء السلام المستدام',
      title_en: 'Scientific Seminar: The Role of Cultural Heritage in Building Sustainable Peace',
      content: 'تنظم المنظمة ندوةً علميةً رفيعة المستوى تجمع أكاديميين وباحثين ومختصين من اليمن والمنطقة العربية لمناقشة الدور المحوري للتراث الثقافي في تعزيز قيم السلام والمصالحة المجتمعية.',
      content_en: 'The organization is hosting a high-level scientific seminar bringing together academics, researchers, and specialists from Yemen and the Arab region to discuss the role of cultural heritage in promoting peace values and community reconciliation.',
      type: 'seminar',
      event_date: '2026-04-10',
      location: 'تعز – قاعة المؤتمرات الكبرى، فندق الجزيرة',
      location_en: 'Taiz – Grand Conference Hall, Al-Jazira Hotel',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/The_castle_above_Taiz_%288683935588%29.jpg/1280px-The_castle_above_Taiz_%288683935588%29.jpg',
      published: 1,
    },
    {
      id: 2,
      title: 'برنامج تدريبي مكثف: مناهج توثيق التراث الرقمي',
      title_en: 'Intensive Training Program: Digital Heritage Documentation Methods',
      content: 'برنامج تدريبي متخصص مدّته خمسة أيام يستهدف الباحثين والطلاب، ويتناول أحدث أدوات التوثيق الرقمي للتراث الثقافي المادي وغير المادي. يشمل التصوير ثلاثي الأبعاد وقواعد البيانات الأثرية وأدوات الواقع الافتراضي.',
      content_en: 'A specialized five-day training program targeting researchers and students, covering the latest digital documentation tools for tangible and intangible cultural heritage, including 3D photography, archaeological databases, and virtual reality tools.',
      type: 'training',
      event_date: '2026-05-20',
      location: 'عدن – مركز التدريب والتطوير، جامعة عدن',
      location_en: 'Aden – Training and Development Center, University of Aden',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg/1280px-Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg',
      published: 1,
    },
    {
      id: 3,
      title: 'معرض فني وتوثيقي: روائع التراث المادي اليمني',
      title_en: 'Art and Documentary Exhibition: Masterpieces of Yemeni Tangible Heritage',
      content: 'يستضيف مركز تعز الثقافي معرضاً استثنائياً يضم أكثر من 150 صورة فوتوغرافية توثّق المواقع الأثرية اليمنية، إلى جانب مجموعة من المستنسخات الأثرية المصنوعة بتقنيات الطباعة ثلاثية الأبعاد.',
      content_en: 'The Taiz Cultural Center is hosting an exceptional exhibition featuring over 150 photographs documenting Yemeni archaeological sites, alongside a collection of archaeological replicas made using 3D printing technology.',
      type: 'event',
      event_date: '2026-06-01',
      location: 'تعز – المركز الثقافي',
      location_en: 'Taiz – Cultural Center',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Temple_in_Ancient_city_of_Marib.jpg/1280px-Temple_in_Ancient_city_of_Marib.jpg',
      published: 1,
    },
  ],

  '/partners': [
    {
      id: 1,
      name: 'الهيئة العامة للآثار والمتاحف – تعز',
      name_en: 'General Authority for Antiquities and Museums – Taiz',
      logo_url: "generallogo.png",
      website_url: null,
      sort_order: 1,
      is_active: 1,
    },
    {
      id: 2,
      name: 'جامعة تعز',
      name_en: 'Taiz University',
      logo_url: "/Taizz_University_Logo.jpg",
      website_url: 'https://tu.edu.ye/',
      sort_order: 2,
      is_active: 1,
    },
    {
      id: 3,
      name: 'المركز الإسباني للبحوث العلمية',
      name_en: 'Spanish National Research Council (CSIC)',
      logo_url: 'Spanish National Research Council.png',
      website_url: 'https://www.csic.es/',
      sort_order: 3,
      is_active: 1,
    },
    {
      id: 4,
      name: 'جامعة بريستول – المملكة المتحدة',
      name_en: 'University of Bristol – United Kingdom',
      logo_url: 'University_of_Bristol_logo.png',
      website_url: 'https://www.bristol.ac.uk/',
      sort_order: 4,
      is_active: 1,
    },
    {
      id: 5,
      name: 'منظمة تراث من أجل السلام',
      name_en: 'Heritage for Peace',
      logo_url: '/peacelogo.png',
      website_url: 'https://www.heritageforpeace.org',
      sort_order: 5,
      is_active: 1,
    },
  ],

  '/settings': {
    id: 1,
    site_name_ar: 'منظمة تراث اليمن لأجل السلام',
    site_name_en: 'Yemen Heritage for Peace',
    contact_phone: '00967777240900',
    contact_email: 'info@yemenheritagepeace.org',
    address_ar: 'الجمهورية اليمنية – تعز – حوض الأشراف ',
    address_en: 'Republic of Yemen – Taiz\'',
    footer_desc_ar: 'منظمة مجتمع مدني غير حكومية تعمل على الحفاظ على التراث الثقافي والعلمي اليمني وتعزيز السلام عبر التعليم والبحث والفعاليات الثقافية.',
    footer_desc_en: 'A non-governmental civil society organization working to preserve Yemeni cultural and scientific heritage and promote peace through education, research, and cultural programs.',
    social_facebook: 'https://www.facebook.com/share/15kSKtN3Rw/',
    social_youtube: 'https://youtube.com/@yemenheritageforpeace',
    social_linkedin: 'https://www.linkedin.com/in/منظمة-تراث-اليمن-لأجل-السلام-6331903aa',
    social_x: 'https://x.com/yemenheritage26',
    home_about_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/The_castle_above_Taiz_%288683935588%29.jpg/1280px-The_castle_above_Taiz_%288683935588%29.jpg',
    home_about_image_alt_ar: 'قلعة القاهرة التاريخية تطل على مدينة تعز',
    home_about_image_alt_en: 'Historic Al-Qahira Castle overlooking Taiz city',
    about_desc_ar: 'منظمة تراث اليمن لأجل السلام منظمةٌ مجتمعيةٌ مدنيةٌ غير حكومية، تأسّست في تعز لصون الحضارة اليمنية العريقة وتوظيفها في خدمة السلام والتنمية المستدامة. تعمل على الحفاظ على التراث الثقافي والعلمي اليمني وتعزيز الوعي المجتمعي به من خلال برامج تعليمية وفعاليات ثقافية وبحوث علمية تربط الماضي بالحاضر.',
    about_desc_en: 'Yemen Heritage for Peace is a non-governmental civil society organization founded in Taiz to preserve Yemen\'s ancient civilization and leverage it for peace and sustainable development. It works to protect Yemeni cultural and scientific heritage and raise community awareness through educational programs, cultural events, and scientific research that bridges the past and present.',
    vision_ar: 'بناء مجتمع يمني مزدهر يحتفي بتراثه الغني، يعزّز السلام من خلال العلوم والثقافة، ويبني جسور التواصل بين الأجيال والشعوب.',
    vision_en: 'Building a prosperous Yemeni society that celebrates its rich heritage, promotes peace through science and culture, and builds bridges of communication between generations and peoples.',
    mission_ar: 'تعزيز التراث اليمني في مجالات الثقافة والعلوم من خلال برامج بحثية وعملية تربط الماضي بالمستقبل، لدعم السلام والاستقرار الاجتماعي والاقتصادي في اليمن.',
    mission_en: 'Promoting Yemeni heritage in culture and science through research and practical programs that connect the past to the future, to support peace and social and economic stability in Yemen.',
  },

  '/heritage': [
    {
      id: 1,
      title: 'قلعة القاهرة التاريخية – تعز',
      title_en: 'Al-Qahira Historic Castle – Taiz',
      content: 'تقع على ذروة جبل يطل على تعز بارتفاع 2800م، وهي من أبرز القلاع في اليمن والجزيرة العربية. تعود إلى الدولة الرسولية في القرن الثالث عشر الميلادي.',
      content_en: 'Located atop a mountain overlooking Taiz at 2,800m elevation, one of the most prominent castles in Yemen. Dating back to the Rasulid State in the 13th century AD.',
      type: 'tangible',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/The_castle_above_Taiz_%288683935588%29.jpg/1280px-The_castle_above_Taiz_%288683935588%29.jpg',
      location: 'تعز، اليمن',
      period: 'القرن 13 – 15 م',
    },
    {
      id: 2,
      title: 'مدينة شبام – تراث عالمي يونسكو',
      title_en: 'Shibam – UNESCO World Heritage',
      content: 'أقدم مدن الناطحات السحاب في التاريخ، تضم نحو 500 مبنى طينياً شاهقاً. أُدرجت على قائمة التراث العالمي لليونسكو عام 1982م.',
      content_en: 'The oldest city of skyscrapers in history, containing approximately 500 tall mud-brick buildings. Inscribed on the UNESCO World Heritage List in 1982.',
      type: 'tangible',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Shibam_Wadi_Hadhramaut_Yemen.jpg/1280px-Shibam_Wadi_Hadhramaut_Yemen.jpg',
      location: 'وادي حضرموت، اليمن',
      period: 'القرن 3 ق.م',
    },
    {
      id: 3,
      title: 'رقصة البرع – تراث إنساني لامادي (يونسكو)',
      title_en: 'Al-Bura\'a Dance – UNESCO Intangible Heritage',
      content: 'فن أدائي تقليدي يجمع الشعر والغناء والرقص والموسيقى. أدرجته اليونسكو في قائمة التراث الثقافي غير المادي للإنسانية عام 2014م.',
      content_en: 'A traditional performing art combining poetry, singing, dance, and music. UNESCO inscribed it on the Intangible Cultural Heritage of Humanity list in 2014.',
      type: 'intangible',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg/1280px-Janbiya_Dance%2C_Yemen_%2811041030075%29.jpg',
      location: 'اليمن – جميع المحافظات',
      period: 'موروث متجدد',
    },
    {
      id: 4,
      title: 'القهوة اليمنية والقشر – أصل القهوة في العالم',
      title_en: 'Yemeni Coffee & Qishr – The Origin of Coffee',
      content: 'اليمن الموطن الأصلي لزراعة البن وصناعة القهوة. ميناء المخا أول من صدّر القهوة للعالم في القرن 15م. القشر مشروب تقليدي فريد من قشور ثمرة البن.',
      content_en: 'Yemen is the original homeland of coffee cultivation. The port of Mocha was the first to export coffee to the world in the 15th century. Qishr is a unique drink made from dried coffee husks.',
      type: 'intangible',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG',
      location: 'اليمن – إب وحراز وريمة',
      period: 'القرن 15 م حتى اليوم',
    },
  ],
}

function getMockData(path) {
  const basePath = path.split('?')[0]
  // handle /heritage?type=tangible or intangible filtering
  if (basePath === '/heritage') {
    const params = new URLSearchParams(path.split('?')[1] || '')
    const type = params.get('type')
    const items = MOCK_DATA['/heritage'] || []
    return type ? items.filter(i => i.type === type) : items
  }
  return MOCK_DATA[basePath] || []
}

function getToken() {
  return localStorage.getItem('yhpo_token')
}

async function request(method, path, body = null, isFormData = false) {
  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData && body) headers['Content-Type'] = 'application/json'

  const opts = { method, headers }
  if (body) opts.body = isFormData ? body : JSON.stringify(body)

  try {
    const res = await fetch(`${BASE}/api${path}`, opts)
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Request failed')
    return data
  } catch (error) {
    if (method === 'GET') {
      console.warn(`[mock] Backend unavailable, using mock data for: ${path}`)
      return getMockData(path)
    }
    throw error
  }
}

export const api = {
  get:    (path)        => request('GET',    path),
  post:   (path, body)  => request('POST',   path, body),
  put:    (path, body)  => request('PUT',    path, body),
  patch:  (path, body)  => request('PATCH',  path, body),
  delete: (path)        => request('DELETE', path),

  upload: async (file, folder = 'general') => {
    const form = new FormData()
    form.append('file', file)
    form.append('folder', folder)
    return request('POST', '/upload', form, true)
  },
}

export default api