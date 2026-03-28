import { useState, useEffect } from 'react'
import api from '../lib/api'
import toast from 'react-hot-toast'
import ImageUpload from './ImageUpload'
import { Plus, CreditCard as Edit, Trash2, X, Save, Search } from 'lucide-react'
import { useAdminLang } from './adminI18n'

const EMPTY = { title:'', title_en:'', content:'', content_en:'', category:'أخبار', category_en:'News', image_url:'', published:true }

export default function ManageNews() {
  const { t, isRtl } = useAdminLang()
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const load = () => {
    setLoading(true)
    api.get('/news/all').then(d=>setItems(d||[])).catch(()=>setItems([])).finally(()=>setLoading(false))
  }
  useEffect(load, [])

  useEffect(() => {
    let filtered = items
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item =>
        statusFilter === 'published' ? item.published === 1 : item.published === 0
      )
    }
    setFilteredItems(filtered)
  }, [items, searchTerm, statusFilter])

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal('form') }
  const openEdit = (item) => {
    setForm({ title:item.title||'', title_en:item.title_en||'', content:item.content||'', content_en:item.content_en||'',
      category:item.category||'أخبار', category_en:item.category_en||'News', image_url:item.image_url||'', published:item.published!==0 })
    setEditId(item.id); setModal('form')
  }

  const handleSave = async () => {
    if (!form.title) { toast.error(t.titleRequired); return }
    setSaving(true)
    try {
      if (editId) await api.put(`/news/${editId}`, form)
      else await api.post('/news', form)
      toast.success(editId ? t.saved : t.added)
      load(); setModal(null)
    } catch(e) { toast.error(e.message) }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return
    try { await api.delete(`/news/${id}`); toast.success(t.deleted); load() }
    catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">{t.manageNews}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.totalNews}: {items.length}</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16}/>{t.addNews}</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-400 pointer-events-none`}/>
            <input
              type="text"
              placeholder={t.searchNews}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`input-field ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.all} ({items.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'published' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.published} ({items.filter(i => i.published === 1).length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'draft' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.draft} ({items.filter(i => i.published === 0).length})
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.image}</th>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.title}</th>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.category}</th>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.status}</th>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.date}</th>
              <th className={`${isRtl ? 'text-right' : 'text-left'} p-4 font-medium text-gray-600`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="text-center p-8 text-gray-400">{t.loading}</td></tr>
            : filteredItems.length===0 ? <tr><td colSpan={6} className="text-center p-8 text-gray-400">{t.noResults}</td></tr>
            : filteredItems.map(item=>(
              <tr key={item.id} className="table-row border-b border-gray-50">
                <td className="p-3">
                  {item.image_url && <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded-lg"/>}
                </td>
                <td className="p-4 font-medium text-dark max-w-xs">
                  <div className="line-clamp-1">{item.title}</div>
                  {item.title_en && <div className="text-xs text-gray-400 line-clamp-1" dir="ltr">{item.title_en}</div>}
                </td>
                <td className="p-4 text-gray-500">{isRtl ? item.category : (item.category_en || item.category)}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.published?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                    {item.published ? t.published : t.draft}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-xs">{new Date(item.created_at).toLocaleDateString(isRtl ? 'ar-YE' : 'en-US')}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={()=>openEdit(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={14}/></button>
                    <button onClick={()=>handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal-box">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-xl text-dark">{editId ? t.editNews : t.addNewNews}</h2>
              <button onClick={()=>setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <ImageUpload value={form.image_url} onChange={v=>setForm({...form,image_url:v})} folder="news" label={t.newsImage}/>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.titleAr} *</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="input-field"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.titleEn}</label><input value={form.title_en} onChange={e=>setForm({...form,title_en:e.target.value})} className="input-field" dir="ltr"/></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.categoryAr}</label><input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="input-field"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.categoryEn}</label><input value={form.category_en} onChange={e=>setForm({...form,category_en:e.target.value})} className="input-field" dir="ltr"/></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.contentAr}</label><textarea rows={4} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} className="input-field resize-none"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.contentEn}</label><textarea rows={4} value={form.content_en} onChange={e=>setForm({...form,content_en:e.target.value})} className="input-field resize-none" dir="ltr"/></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} className="w-4 h-4 accent-primary"/>
                <span className="text-sm text-gray-700">{t.publishedPublic}</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={handleSave} disabled={saving} className="btn-primary"><Save size={16}/>{saving ? t.saving : t.save}</button>
              <button onClick={()=>setModal(null)} className="btn-outline">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
