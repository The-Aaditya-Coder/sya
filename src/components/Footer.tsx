import ParallaxImg from '@/app/parallaxImg'
import React from 'react'
import BlackMango from 'next/font/local'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const blackMango = BlackMango({
  src: '../../public/fonts/BlackMango.ttf',
  display: 'swap',
})

const Footer = () => {
  return (
    <section className="footer">
        <div className="col">
          <div className="footer-links">
            <h1 className={`${blackMango.className} cursor-pointer`} onClick={()=> window.location.href = "/knight"}>Knight</h1>
            <h1 className={`${blackMango.className} cursor-pointer`} onClick={()=> window.location.href = "/coldmark"}>Coldmark</h1>
            <h1 className={`${blackMango.className} cursor-pointer`} onClick={()=> window.location.href = "/glow"}>Glow</h1>
            <h1 className={`${blackMango.className} cursor-pointer`} onClick={()=> window.location.href = "/blushe"}>Blushé</h1>
          </div>
          <h2 className={`text-2xl ${playfairDisplay.className} italic uppercase leading-5 font-bold text-[#faebd7]`}>Crafting Perfume Story</h2>
        </div>
        <div className="col">
          <div className="shop">
            <div className="img">
              <ParallaxImg src="/perfumes/2.png" alt="" />
            </div>
          </div>
          <p>&copy; 2025 Sya Perfume x Avantula</p>
        </div>
        </section>
  )
}

export default Footer