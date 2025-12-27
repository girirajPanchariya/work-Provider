import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Componets/Home'
import UserRegistertion from './Componets/pages/UserRegistertion'
import UserLogin from './Componets/pages/UserLogin'
import WorkPost from './Componets/pages/WorkPost'
import MyWork from './Componets/MyWork'
import ViewWork from './Componets/pages/ViewWork'
import WorkerTypeToWork from './Componets/pages/WorkerTypeToWork'
import ProfileUpdata from './Componets/pages/ProfileUpdata'
import Application from './Componets/Application'

const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
        
    {
      path:'/Registertion',
      element:<UserRegistertion/>
    },
    {
      path:'/login',
      element:<UserLogin/>
    },
      {
      path:'/PostWork',
      element:<WorkPost/>
    },
      {
      path:'/MyWork',
      element:<MyWork/>
    },  {
      path:'/MyWork/:id',
      element:<ViewWork/>
    },
    {
      path:'/work',
      element:<WorkerTypeToWork/>
    },
    {
      path:'/profile',
      element:<ProfileUpdata/>
    },
    {
      path:'/Application/:id',
      element:<Application/>
    }


]
    
)
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
