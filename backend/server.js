import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ConnectionDb } from './OthreFiles/db.js'
import { UserRouter } from './Router/UserRouter.js'
import { workRouer } from './Router/workRouter.js'
import { ApplRouter } from './Router/application.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

// ✅ CORRECT CORS CONFIG
app.use(cors({
  origin: 'https://peaceful-frangollo-2b133a.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('/User', UserRouter)
app.use('/Work', workRouer)
app.use('/Api', ApplRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  ConnectionDb()
})
