// server.js  (FIXED)
//
// FIX 33: Added express-rate-limit on the login endpoint to prevent brute-force.
// FIX 34: Added a global uncaught error handler so the process never crashes silently.
// FIX 35: /api/health now returns DB status so ops can monitor connectivity.

require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const db        = require('./lib/db')

const app  = express()
const PORT = process.env.PORT || 5000

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ── Rate limiting on auth (brute-force protection) ────────────────────────────
// FIX: only apply if express-rate-limit is installed.
//      Install with: npm install express-rate-limit
try {
  const rateLimit = require('express-rate-limit')
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                   // max 20 login attempts per window per IP
    message: { error: 'محاولات كثيرة, حاول مجدداً بعد 15 دقيقة' },
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use('/api/auth/login', loginLimiter)
  console.log('✅ Rate limiting active on /api/auth/login')
} catch {
  console.warn('⚠️  express-rate-limit not installed. Run: npm install express-rate-limit')
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/news',     require('./routes/news'))
app.use('/api/events',   require('./routes/events'))
app.use('/api/heritage', require('./routes/heritage'))
app.use('/api/admins',   require('./routes/admins'))
app.use('/api/contact',  require('./routes/contact'))
app.use('/api/profile',  require('./routes/profile'))
app.use('/api/upload',   require('./routes/upload'))
app.use('/api/settings', require('./routes/settings'))
app.use('/api/partners', require('./routes/partners'))
app.use('/api/hero',     require('./routes/hero'))

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  let dbOk = false
  try {
    await db.query('SELECT 1')
    dbOk = true
  } catch {}
  res.status(dbOk ? 200 : 503).json({ status: dbOk ? 'ok' : 'db_error', time: new Date() })
})

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'المسار غير موجود' })
})

// ── Global error handler ──────────────────────────────────────────────────────
// FIX: without this, unhandled Express errors crash the request silently
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'خطأ داخلي في الخادم' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`)
  try {
    await db.query('SELECT 1')
    console.log('✅ MySQL connected')
  } catch (e) {
    console.error('❌ MySQL connection failed:', e.message)
    console.log('   Run schema.sql first, then node seed.js')
  }
})

module.exports = app
