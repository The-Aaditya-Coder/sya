import ParallaxImg from '@/app/parallaxImg'
import React from 'react'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const Banner = () => {
  return (
    <section className="banner">
        <div className="img">
          <ParallaxImg src="/perfumes/1.jpg" className=' brightness-75' alt="" />
        </div>
        <div className="banner-copy">
          <p>To know more about our products</p>
          <h2 className={`text-4xl italic my-2 text-[#faebd7] ${playfairDisplay.className} font-bold`}>@sya.perfumes</h2>
          <button className="bg-[#faebd7]" onClick={() => window.open('https://www.instagram.com/sya.perfumes/', '_blank')}>Follow Now</button>
        </div>
      </section>
  )
}

export default Banner