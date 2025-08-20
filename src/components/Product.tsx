import ParallaxImg from '@/app/parallaxImg'
import React from 'react'
import { ProductItems } from '../../Data/intex'
import BlackMango from 'next/font/local'

const blackMango = BlackMango({
  src: '../../public/fonts/BlackMango.ttf',
  display: 'swap',
})

const Product = () => {
  return (
    <>
      {ProductItems.map((prod, idx) => (
        <section className="product" key={idx}>
          <div className="product-brief md:left-[20%] w-[75%] lg:w-[25%]">
            <h4 className='text-shadow-lg text-left p-1'>
              {prod.brief}
            </h4>
          </div>

          <div className="col product-cover">
            <div className="img w-full object-fill">
              <ParallaxImg type="video" src={prod.src} alt="" />
            </div>
          </div>

          <div className="col product-list">
            <div className="product">
              <h1 className={`mix-blend-difference uppercase text-2xl ${blackMango.className}`}>{prod.title}</h1>
              <p>{prod.adverb}</p>
              <p className='text-shadow-lg'>{prod.tagline}</p>
            </div>

            <button className="bg-[#faebd7]" className='items-center z-10'>BUY NOW</button>
          </div>
        </section>
      ))}
    </>
  )
}

export default Product