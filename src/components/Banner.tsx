import ParallaxImg from '@/app/parallaxImg'
import React from 'react'

const Banner = () => {
  return (
    <section className="banner">
        <div className="img">
          <ParallaxImg src="/perfumes/1.png" alt="" />
        </div>
        <div className="banner-copy">
          <p>Follow Us On Instagram</p>
          <h2 className='text-4xl italic my-2 text-[#faebd7] font-bold'>@sya.perfumes</h2>
<p>To know more about our products</p>
          <button className="bg-[#faebd7]" onClick={() => window.open('https://www.instagram.com/sya.perfumes/', '_blank')}>Follow Now</button>
        </div>
      </section>
  )
}

export default Banner