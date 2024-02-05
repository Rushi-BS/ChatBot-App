import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/Error'
import Home from './pages/Home'
import Signup from './pages/SignUp'
import Profile from './pages/Profile'
import Signin from './pages/SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/chat',
    element: <Signup />,
  },
])

const App : React.FC = () => {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
