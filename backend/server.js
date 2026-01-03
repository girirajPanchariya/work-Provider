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
const PORT = process.env.PORT
app.use(cors({
    credentials:true 
}))
app.use(express.json())
app.use(cookieParser())
app.use('/User',UserRouter)
app.use('/Work',workRouer)
app.use('/Api',ApplRouter)

app.listen(PORT,()=>{
        console.log(`server is runing on PORT ${PORT}`);
        ConnectionDb()

        
})