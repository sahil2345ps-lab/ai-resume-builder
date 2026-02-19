import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button } from "@/components/ui/button"
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import { Toaster } from "@/components/ui/sonner"
import Footer from './components/custom/Footer';

function App() {
  const [count, setCount] = useState(0)
  const {user, isLoaded, isSignedIn}=useUser();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
  <>
    <div className="min-h-screen flex flex-col">
      
      
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
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
    </div>
  </>
)
}

export default App
