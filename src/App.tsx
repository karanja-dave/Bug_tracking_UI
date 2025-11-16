import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router'

import './App.css'

import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { Error } from './components/Error';
import { About } from './components/about/About';
import { Contact } from './components/contacts/Contacts';
import { Pricing } from './components/pricing/Pricing';


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

