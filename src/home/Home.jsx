import React from 'react'
import Header from '@/components/custom/Header'
import { AtomIcon, Edit, Share2, ArrowRight } from 'lucide-react'

function Home() {
  return (
    <div className="relative min-h-screen w-full font-sans">

      {/* BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
            backgroundImage: "url('/background.jpg')" 
        }}
      >
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <Header/>
        
        <div>
          {/* Hero Section */}
          <section className="py-24 lg:py-32">
            <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12 flex flex-col items-center justify-center">
              
              {/* HEADLINE */}
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl max-w-3xl">
                Build Your Resume <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600'>With AI</span> 
              </h1>
              
              
              <p className="mb-8 text-base font-medium text-slate-600 lg:text-lg max-w-xs mx-auto drop-shadow-sm">
                Effortlessly craft a professional, standout resume in minutes with our AI-powered builder. Get noticed and get hired faster.
              </p>
              
              <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/dashboard" className="inline-flex justify-center items-center py-4 px-8 text-base font-semibold text-center text-white rounded-full bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary-300 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
                  Get Started for Free
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5 animate-pulse" />
                </a>
              </div>
            </div>
          </section>
          
          
          <section className="py-20 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
              <h2 className="font-bold text-4xl mb-4 text-gray-900">How it Works?</h2>
              <h2 className="text-lg text-gray-600 max-w-2xl mx-auto">Get your professional resume ready in just 3 simple steps.</h2>

              <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  
                  {/* Card 1 */}
                  <div className="group block rounded-[2rem] border border-gray-100 bg-white/80 p-10 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:-translate-y-2">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                          <AtomIcon className='h-8 w-8' />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Add Your Details</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Enter your personal information, work history, and education to build the foundation.
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div className="group block rounded-[2rem] border border-gray-100 bg-white/80 p-10 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:-translate-y-2">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                          <Edit className='h-8 w-8' />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Enhance with AI</h3>
                      <p className="text-gray-600 leading-relaxed">
                          Use our AI tools to generate professional summaries and improve your bullet points.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="group block rounded-[2rem] border border-gray-100 bg-white/80 p-10 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:-translate-y-2">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                          <Share2 className='h-8 w-8' />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Download & Share</h3>
                      <p className="text-gray-600 leading-relaxed">
                          Export your polished resume as a PDF or share a unique link directly with recruiters.
                      </p>
                  </div>
              </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home