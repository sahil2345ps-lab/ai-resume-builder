import React from 'react'

function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <div className="container mx-auto px-4 text-center">
       
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Sahil Singh | Powered by Gemini AI & Strapi
        </p>

        
        <div className="flex justify-center gap-10 mt-4">
          <a 
            href="https://github.com/sahil2345ps-lab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-black transition-all"
          >
            GitHub
          </a>
          <a 
            href="mailto:testuser3917@gmail.com" 
            className="text-gray-400 hover:text-black transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer