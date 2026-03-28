import { useState, useRef } from 'react'
import api from '../lib/api'
import toast from 'react-hot-toast'
import { Upload, X, Loader } from 'lucide-react'

export default function ImageUpload({ value, onChange, folder = 'general', label = 'صورة' }) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('يُسمح بالصور فقط'); return }
    if (file.size > 10 * 1024 * 1024) { toast.error('الحجم الأقصى 10MB'); return }
    setUploading(true)
    try {
      const data = await api.upload(file, folder)
      onChange(data.url)
      toast.success('تم رفع الصورة')
    } catch(e) {
      toast.error('فشل رفع الصورة: ' + e.message)
    }
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="" className="h-36 w-full max-w-sm object-cover rounded-xl border border-gray-200"/>
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 end-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600">
            <X size={12}/>
          </button>
        </div>
      ) : (
        <div onClick={() => ref.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-primary rounded-xl p-6 text-center cursor-pointer transition-colors hover:bg-primary/5">
          {uploading ? (
            <Loader size={24} className="text-primary animate-spin mx-auto mb-2"/>
          ) : (
            <Upload size={24} className="text-gray-400 mx-auto mb-2"/>
          )}
          <p className="text-sm text-gray-500">
            {uploading ? 'جارٍ الرفع...' : 'اضغط لرفع صورة'}
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP — بحد أقصى 10MB</p>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile}/>
      {/* Or paste URL manually */}
      <div className="mt-2">
        <input value={value||''} onChange={e=>onChange(e.target.value)}
          className="input-field text-xs" dir="ltr" placeholder="أو الصق رابط الصورة مباشرةً..."/>
      </div>
    </div>
  )
}
