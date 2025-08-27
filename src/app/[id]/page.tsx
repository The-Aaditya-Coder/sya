'use client';
import React from 'react'
import ProjectDetails from '@/components/ProjectDetails'   // ✅ FIXED
import { useParams, useRouter } from 'next/navigation';
import { ProductItems } from '@/../Data/intex';

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const product = ProductItems.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className='w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4'>
        <div>Product with ID {id} not found.</div>
        <button className='p-4 bg-amber-100 text-black' onClick={() => router.push('/')}>
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProjectDetails product={product as any} />   {/* ✅ FIXED */}
    </div>
  )
}

export default Page;
