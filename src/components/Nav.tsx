"use client";
import React, { useEffect, useRef, useState } from 'react';

import BrownSugar from 'next/font/local'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const brownSugar = BrownSugar({
  src: '../../public/fonts/BrownSugar.ttf',
  display: 'swap',
})


const Nav = () => {
  const [showStory, setShowStory] = useState(true);
  const [storyLeft, setStoryLeft] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Animate and hide 'Crafting Perfume Story' as user scrolls
      if (currentScroll < 500) {
        setShowStory(true);
        setStoryLeft(0);
      } else if (currentScroll < 530) {
        setShowStory(true);
        setStoryLeft(15);
      } else {
        setShowStory(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full flex justify-start p-4 items-start top-1 md:top-3 gap-2 fixed z-50 mix-blend-difference`}
    >
      <h2 onClick={() => window.location.href = '/'} className={`${brownSugar.className} cursor-pointer z-20 text-4xl md:text-6xl mix-blend-difference text-white`}>Sya</h2>
      <div
        className='md:w-[150px] w-[100px] flex text-left relative mix-blend-difference'
        style={{
          opacity: showStory ? 1 : 0,
          transform: `translateX(-${storyLeft}px)`,
          transition: 'opacity 0.3s, transform 0.3s',}}>

        <h3 className={`${playfairDisplay.className} z-20 leading-none md:text-lg text-sm mix-blend-difference text-white`}>Crafting Perfume Story</h3>
      </div>
    </div>
  );
}

export default Nav