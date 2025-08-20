import ParallaxImg from '@/app/parallaxImg'
import React, { useState } from 'react'


const videoMap = {
  sya: '/video/sya.mp4',
  knight: '/video/knight.mp4',
  blushe: '/video/blushe.mp4',
  coldmark: '/video/coldmark.mp4',
  glow: '/video/glow.mp4',
};

const videoPoster = {
  sya: '/images/sya_poster.png',
  knight: '/images/knight_p.png',
  blushe: '/images/blushe_p.png',
  coldmark: '/images/coldmark_p.png',
  glow: '/images/glow_p.png',
};

{/* This is from product------- */}
import BrownSugar from 'next/font/local'

const brownSugar = BrownSugar({
  src: '../../public/fonts/BrownSugar.ttf',
  display: 'swap',
})
{/* This is from product------- */}

const Hero = () => {
  const [video, setVideo] = useState(videoMap.sya);
  const [poster, setPoster] = useState(videoPoster.sya);
  const [fade, setFade] = useState(false);

  const handleVideoChange = (newVideo: string) => {
    if (video === newVideo) return;
    setFade(true);
    setTimeout(() => {
      setVideo(newVideo);
      setFade(false);
    }, 600); // duration matches fade-out
  };
  const handlePosterChange = (newPoster: string) => {
    if (poster === newPoster) return;
    setPoster(newPoster);
  };

  return (
    <section className="hero">
      <div className="img" style={{ position: 'relative' }}>
        <ParallaxImg type='video' src={video} poster={poster} alt="" />
        {/* Black fade overlay */}
        <div
          style={{
            opacity: fade ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.6s',
            background: '#121212',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      </div>


<div className='w-full flex justify-center absolute'>
  <button
    onClick={() => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className='md:bottom-50 bg-[#faebd7] bottom-40 z-20 absolute'
  >
    Pre Book Now
  </button>
</div>

{/* This is from product------- */}

      <div className="nav">
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleVideoChange(videoMap.knight);
            handlePosterChange(videoPoster.knight);
          }}
        >Knight</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleVideoChange(videoMap.blushe);
            handlePosterChange(videoPoster.blushe);
          }}
        >Blushé</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleVideoChange(videoMap.coldmark);
            handlePosterChange(videoPoster.coldmark);
          }}
        >Coldmark</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => {
            handleVideoChange(videoMap.glow);
            handlePosterChange(videoPoster.glow);
          }}
        >Glow</p>
      </div>
    </section>
  )
}

export default Hero