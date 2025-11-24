import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router'

import './App.css'

import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { Error } from './components/Error';
import { About } from './components/about/About';
import { Contact } from './components/contacts/Contacts';
import { Pricing } from './components/pricing/Pricing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Verification } from './components/auth/Verification';


function App() {
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
    }
  ])

  return(
    <>
    <RouterProvider router={router}/>
    </>
  )


}

export default App

