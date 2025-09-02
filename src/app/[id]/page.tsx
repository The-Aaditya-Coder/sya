import React from 'react'
import ProjectDetails from '@/components/ProjectDetails'
import { ProductItems } from '@/../Data/intex'
import Script from 'next/script'
import { useParams, useRouter } from 'next/navigation'

// Dynamic metadata function
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = ProductItems.find((item) => String(item.id) === String(params.id));
  if (!product) {
    return {
      title: "Product Not Found | Sya Perfume",
      description: "Requested perfume not found.",
    };
  }
  return {
    title: `${product.title} | Sya Perfume`,
    description: product.brief || "Discover luxury perfumes at Sya.",
    keywords: `perfume, ${product.title}, luxury fragrance, Sya Perfume`,
    openGraph: {
  title: `${product.title} | Sya Perfume`,
  description: product.brief || "Discover luxury perfumes at Sya.",
  url: `https://syaperfume.com/${product.id}`,
  siteName: "Sya Perfume",
  images: product.images?.length ? [product.images[0]] : ["/sya.png"],
  type: "website", // <-- FIXED HERE
},
  };
}

const Page = ({ params }: { params: { id: string } }) => {
  const product = ProductItems.find((item) => String(item.id) === String(params.id));

  if (!product) {
    return (
      <div className='w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4'>
        <div>Product with ID {params.id} not found.</div>
        {/* You may need to use a normal <a> or Link here instead of useRouter */}
        <a className='p-4 bg-[#faebd7] text-black' href="/">
          Go back to home
        </a>
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
            "@context": `https://syaperfume.com/${product.id}`,
            "@type": "Product",
            name: `${product.title} | Sya Perfume`,
            image: `${product.images[2]}`,
            description: "Long-lasting luxury perfume with imported essences.",
            brand: { "@type": "Brand", name: `${product.title}` },
            offers: {
              "@type": "Perfume",
              priceCurrency: "INR",
              price: "300",
              availability: `https://syaperfume.com/${product.id}`,
              url: `https://syaperfume.com/${product.id}`,
            },
          }),
        }}
      />
      <ProjectDetails product={product as any} />
    </div>
  )
}

export default Page