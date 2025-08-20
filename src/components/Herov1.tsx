
import ParallaxImg from '@/app/parallaxImg'
import React, { useState } from 'react'


const videoMap = {
  sya: '/video/sya.mp4',
  knight: '/video/knight.mp4',
  blushe: '/video/blushe.mp4',
  coldmark: '/video/coldmark.mp4',
  glow: '/video/glow.mp4',
};

const Herov1 = () => {
  const [video, setVideo] = useState(videoMap.sya);
  const [fade, setFade] = useState(false);

  const handleVideoChange = (newVideo: string) => {
    if (video === newVideo) return;
    setFade(true);
    setTimeout(() => {
      setVideo(newVideo);
      setFade(false);
    }, 600); // duration matches fade-out
  };

  return (
    <section className="hero">
      <div className="img" style={{ position: 'relative' }}>
        <ParallaxImg type='video' src={video} alt="" />
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

      <div className="nav">
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => handleVideoChange(videoMap.knight)}
        >Knight</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => handleVideoChange(videoMap.blushe)}
        >Blushé</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => handleVideoChange(videoMap.coldmark)}
        >Coldmark</p>
        <p
          className="font-playfair-display hover:text-red-500 hover:underline text-antiquewhite transition-all duration-300 cursor-pointer"
          onClick={() => handleVideoChange(videoMap.glow)}
        >Glow</p>
      </div>
    </section>
  )
}

export default Herov1