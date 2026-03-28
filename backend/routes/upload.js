const router = require('express').Router()
const multer = require('multer')
const auth = require('../middleware/auth')
const { uploadFile, deleteFile } = require('../lib/supabase')

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only images are allowed'))
  }
})

// POST /api/upload  (admin only)
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'لم يتم رفع أي ملف' })
    const folder = req.body.folder || 'general'
    const url = await uploadFile(req.file.buffer, folder, req.file.originalname, req.file.mimetype)
    res.json({ url })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'فشل رفع الملف: ' + e.message })
  }
})

// DELETE /api/upload  (admin only) - delete file by URL
router.delete('/', auth, async (req, res) => {
  try {
    const { url } = req.body
    await deleteFile(url)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: 'فشل حذف الملف' })
  }
})

module.exports = router
