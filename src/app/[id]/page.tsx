'use client';
import React from 'react'
import ProductDetails from '@/components/ProjectDetails'
import { useParams, useRouter } from 'next/navigation';
// Import or define portfolioItems
import { ProductItems } from '@/../Data/intex';
import { title } from 'process';

const Page = () => {

   const params = useParams(); // Use useParams to get route parameters
  const router = useRouter(); // Use useRouter from next/navigation
  const { id } = params; // Access the dynamic route parameter

  // Find the project matching the `id`
  const product = ProductItems.find((item) => item.id === id);

  if (!product) {
    return <div className='w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4'>
      <div>Your Searched {title} Product not found please</div>
      <button className='p-4 bg-amber-100 text-black' onClick={() => router.push('/')}>Go back to home</button>
    </div>;
  }  
  return (
    <div>
        <ProductDetails product={product} />
    </div>
  )
}

export default Page