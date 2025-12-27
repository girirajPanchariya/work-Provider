import express from 'express'
import { authenticate } from '../OthreFiles/authenticat.js'
import { getAllwork, MyWorks, PostWork, workByid, workTypeTofineworker } from '../Controller/work.js'

export const workRouer = express.Router()

workRouer.post('/postWork',authenticate,PostWork)
workRouer.get('/All',authenticate,getAllwork)
workRouer.get('/MyAll',authenticate,MyWorks)
workRouer.get('/MyAll/:id',authenticate,workByid)
workRouer.get('/work/:id',authenticate,workTypeTofineworker)