import React, { useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const WorkPost = () => {
    const [work,setwork]=useState({
        workerType:"",
         address:"",
         PyMeant:"",
         workDescription:"",
         workPostData:"",
        
    })
    const handleChange =(e)=>{
        setwork({...work, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
             e.preventDefault();
             try {
                    const res = await axios.post('https://work-provider-1.onrender.com/Work/Postwork',work,{
                        headers:{
                            'Content-Type':'application/json'
                        },
                        withCredentials:true
                    })
                    setwork(res.data)
                    alert(res.data.message)
             } catch (error) {
                console.log(error);
                
             }
    }
  return (
    <div className=' min-h-screen w-full bg-blue-600'>
        <Navbar/>
        <div className='flex justify-center  items-center pt-10 rounded-sm'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md '>
                <h1 className='text-2xl font-bold text-blue-600 text-center md-6'>Post the work</h1>

             <form onSubmit={handleSubmit} className="space-y-4">                 <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
             workerType
              </label>
              <select
                name="workerType"
                value={work.workerType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select</option>
                <option value="electric">electrick</option>
                <option value="majdur">majdur</option>
                <option value="kariger">kariger</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                address
              </label>
              <input
                name="address"
                value={work.address}
                onChange={handleChange}
                type="input"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                PyMeant
              </label>
              <input
                name="PyMeant"
                value={work.PyMeant}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                workDescription
              </label>
              <input
                name="workDescription"
                value={work.workDescription}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                workPostData
              </label>
              <input
                name="workPostData"
                value={work.workPostData}
                onChange={handleChange}
                type="Date"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
           
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                postWork
              </button>
              <Link
                to="/MyWork"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition duration-200 block"
              >
                Mywork
              </Link>
            </div>
                </form>
            </div>

        </div>
      
    </div>
  )
}

export default WorkPost
