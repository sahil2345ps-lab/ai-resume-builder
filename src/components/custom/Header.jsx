import React from 'react'
import { Button } from '../ui/button'
import logo from '/logo.svg'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'


function Header() {
    const {user,isSignedIn}=useUser();
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
        
      <img src={logo} alt="Logo" width={150} height={150} />

      {isSignedIn?
        <div className= 'flex gap-2 items-center'>
          <Link to={'/dashboard'}>
             <Button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md">
              Dashboard
              </Button>
          </Link>
          <UserButton/>  
        </div>:
        
        
        <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
        </Link>  
      }
    </div>
  )
}

export default Header