'use client';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav'
import { Lenis } from "lenis/react";
import React, { Children } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <Lenis root>
    <div className='bg-black'>
      <Nav />
        {children}
        <Banner/>
        <Footer/>
        </div>
    </Lenis>
  )
}

export default layout