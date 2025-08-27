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

  // id from params may be string or array, ensure string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Find the product matching the `id` (ensure both are strings)
  const product = ProductItems.find((item) => String(item.id) === String(id));

  if (!product) {
    return <div className='w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4'>
      <div>Your searched "{id}" was not found.</div>
      <button className='p-4 bg-amber-100 text-black' onClick={() => router.push('/')}>Go back to home</button>
    </div>;
  }
  // Ensure all required fields are present for ProductDetails
  const safeProduct = {
    ...product,
    para: product.para || '',
    top: product.top || '',
    heart: product.heart || '',
    base: product.base || ''
  };
  return (
    <div>
        <ProductDetails product={safeProduct} />
    </div>
  )
}

export default Page