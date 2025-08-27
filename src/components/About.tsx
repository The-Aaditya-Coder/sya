'use client';
import ParallaxImg from '@/app/parallaxImg'
import { Playfair_Display } from 'next/font/google';
import React, { useState } from 'react'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });


const About = () => {
  return (
    <div className="about">
      <div className="col flex flex-col items-start text-left intro text-[#121212] px-4 gap-4">
        <h2 className={`text-4xl font-bold ${playfairDisplay.className}`}>Luxury Gifting, Perfected</h2>
        <label className='md:text-center w-full text-left md:w-[90%]'>Celebrate every occasion with the timeless elegance of our signature perfume duos. Whether it’s weddings, corporate events, or special celebrations, our fragrances make the perfect gift that leaves a lasting impression. Available for exclusive gifting orders and customized sets, ensuring your moments are wrapped in luxury and unforgettable aura.</label>
        <button className="border-solid border-1 border-[#121212] text-[#121212] py-2 px-4 rounded" onClick={() => window.open('https://wa.me/919665854768', '_blank')}>Enquire for Gifting</button>
      </div>

      <div className="col portrait">
        <div className="portrait-container">
          <div className="img">
            <ParallaxImg src="/images/coldmark_p.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
