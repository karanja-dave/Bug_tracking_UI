import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';

import './App.css'

import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/ProductsPage';
import { Error } from './components/Error';
import { About } from './components/about/About';
import { Contact } from './components/contacts/Contacts';
import { Pricing } from './components/pricing/Pricing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Verification } from './components/auth/Verification';
import {AdminDashboard} from "./dashboard/AdminDashboard/content/AdminDashboard"
import { UserDashboard } from './dashboard/Userdashboard/content/UserDashboard';
import type { RootState } from './app/store';


function App() {
  const isAdmin = useSelector((state:RootState)=>state.user.user?.role_user==='admin')
  const isUser = useSelector((state:RootState)=>state.user.user?.role_user==='user')
  const router = createBrowserRouter([
    // define routes here 
    {
      path:'/',
      element:<LandingPage/>
    },
    {
      path:'/features',
      element:<FeaturesPage/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'pricing',
      element:<Pricing/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/register',
      element: <Register/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path: '/verify',
      element: <Verification/>
    },
    {
      path:'*', //handling non-existing routes
      element: <Error/>
    },
    // admin dashboard 
    {
      path:"/admin",
      element: isAdmin? <AdminDashboard/>:<Login/>,
      children:[
        {
          path:"dashboard",
          element: <h1>Admin Dashboard</h1>
        },
        {
          path:"projects",
          element: <h1>All Projects</h1>,
        },
        {
          path:"tasks",
          element: <h1>All Tasks</h1>
        },
        {
          path:"bugs",
          element: <h1>Bug tracking</h1>
        },
        {
          path:"team",
          element: <h1>Teams</h1>
        },
        {
          path:"settings",
          element: <h1>Admin settings</h1>
        }
      ]
    },
    // user dashboard 
    {
      path:"/user",
      element: isUser? <UserDashboard/> : <Login/>,
      children:[
        {
          path:"dashboard",
          element: <h1>Admin Dashboard</h1>
        },
        {
          path:"projects",
          element: <h1>All Projects</h1>,
        },
        {
          path:"tasks",
          element: <h1>All Tasks</h1>
        },
        {
          path:"bugs",
          element: <h1>Bug tracking</h1>
        },
        {
          path:"team",
          element: <h1>Teams</h1>
        },
        {
          path:"settings",
          element: <h1>Admin settings</h1>
        }
      ]
    }
  ])

  return(
    <>
    <RouterProvider router={router}/>
    <Toaster position='top-right' toastOptions={{
        classNames:{
          error:'bg-red-500 text-white',
          success:"bg-green text-white"
        }
        }} />
    </>
  )


}

export default App

