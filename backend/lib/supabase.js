const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)
const BUCKET = process.env.SUPABASE_BUCKET || 'Public_bucket'
const BASE_URL = process.env.SUPABASE_PUBLIC_BASE_URL

async function uploadFile(buffer, folder, filename, mimetype) {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `${folder}/${Date.now()}_${safeName}`
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: mimetype, upsert: false })
  if (error) throw new Error('Storage upload failed: ' + error.message)
  return `${BASE_URL}/${BUCKET}/${data.path}`
}

async function deleteFile(publicUrl) {
  try {
    const prefix = `${BASE_URL}/${BUCKET}/`
    if (!publicUrl || !publicUrl.startsWith(prefix)) return
    const path = publicUrl.replace(prefix, '')
    await supabase.storage.from(BUCKET).remove([path])
  } catch (e) {
    console.error('Storage delete error:', e.message)
  }
}

module.exports = { uploadFile, deleteFile }
