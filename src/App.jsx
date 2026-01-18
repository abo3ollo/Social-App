import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";

import AuthLayout from "./Layout/AuthLayout"
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from './Context/UserContext';
import { HeroUIProvider } from '@heroui/react';
import AppProtectedRoutes from './Components/ProtectedRoutes/AppProtectedRoutes';
import AuthProtectedRoutes from './Components/ProtectedRoutes/AuthProectedRoutes';
import { PostContextProvider } from './Context/PostContext';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './Pages/PostDetails/PostDetails';
import { DarkModeProvider } from './Context/DarkModeContext';





export default function App() {

  let query = new QueryClient()

  let router = createBrowserRouter([
    {
      path: "/",
      element: <AppProtectedRoutes><MainLayout /></AppProtectedRoutes>,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "postdetails/:id", element: <PostDetails /> },

      ]
    },
    {
      element: <AuthProtectedRoutes>  <AuthLayout /></AuthProtectedRoutes>,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ]
    },
    { path: "*", element: <NotFound /> }
  ])

  return (
  <DarkModeProvider>
    <UserContextProvider>
        <HeroUIProvider>
          <QueryClientProvider client = {query}>
            <RouterProvider router={router}  />
          </QueryClientProvider>
          <ToastContainer />
        </HeroUIProvider>
    </UserContextProvider>
  </DarkModeProvider>  
  )
}