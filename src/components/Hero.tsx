import ParallaxImg from '@/app/parallaxImg'
import React from 'react'

{/* This is from product------- */}
import BrownSugar from 'next/font/local'

const brownSugar = BrownSugar({
  src: '../../public/fonts/BrownSugar.ttf',
  display: 'swap',
})
{/* This is from product------- */}

const Hero = () => {

  return (
    <section className="hero">
      <div className="img" style={{ position: 'relative' }}>
        <ParallaxImg type='video' src='/video/sya-main.MP4' poster='sya.png' alt="" />
      </div>

      <div className="nav">
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => { window.location.href = '/knight'; }}
        >Knight</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => { window.location.href = '/blushe'; }}
        >Blushé</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => { window.location.href = '/coldmark'; }}
        >Coldmark</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => { window.location.href = '/glow'; }}
        >Glow</p>
      </div>
    </section>
  )
}

export default Hero