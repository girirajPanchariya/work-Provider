import express from 'express'
import { AllWorker, AllWorkerProvider, currentUser, findWorkByWorkTypes, Login, logout, RegisterUser, updateUser } from '../Controller/User.js'
import { authenticate } from '../OthreFiles/authenticat.js'
export const UserRouter = express.Router()

UserRouter.post('/Register',RegisterUser)
UserRouter.post('/login',Login)
UserRouter.get('/All',authenticate,AllWorker)
UserRouter.get('/workType',authenticate,findWorkByWorkTypes)
UserRouter.get('/AllProvider',authenticate,AllWorkerProvider)
UserRouter.get('/user',authenticate,currentUser)
UserRouter.put('/update',authenticate,updateUser)
UserRouter.get('/logout',authenticate,logout)