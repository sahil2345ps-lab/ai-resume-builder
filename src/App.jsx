import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button } from "@/components/ui/button"
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [count, setCount] = useState(0)
  const {user, isLoaded, isSignedIn}=useUser();

  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <>
     <Header/>
     <Outlet/>
     <Toaster 
  toastOptions={{
    style: {
      background: 'white',
      color: 'black',
      border: '1px solid black',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
    },
  }} 
/>
    </>
  )
}

export default App
