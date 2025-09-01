'use client';
import React from 'react'
import ProjectDetails from '@/components/ProjectDetails'   // ✅ FIXED
import { useParams, useRouter } from 'next/navigation';
import { ProductItems } from '@/../Data/intex';
import Script from 'next/script';
import { title } from 'process';

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const product = ProductItems.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className='w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4'>
        <div>Product with ID {id} not found.</div>
        <button className='p-4 bg-[#faebd7] text-black' onClick={() => router.push('/')}>
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div>
      <Script
        id="sya-perfume"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://syaperfume.com/",
            "@type": "Product",
            name: "Sya Perfume – Luxury Fragrance",
            image: `${product.images[2]}`,
            description: "Long-lasting luxury perfume with imported essences.",
            brand: { "@type": "Brand", name: `${product.title}` },
            offers: {
              "@type": "Perfume",
              priceCurrency: "INR",
              price: "300",
              availability: "https://syaperfume.com/",
              url: "https://syaperfume.com/",
            },
          }),
        }}
      />
      <ProjectDetails product={product as any} />   {/* ✅ FIXED */}
    </div>
  )
}

export default Page;
