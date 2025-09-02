import React from "react";
import ProjectDetails from "@/components/ProjectDetails";
import { ProductItems } from "@/../Data/intex";
import Script from "next/script";

// ✅ Dynamic metadata
export async function generateMetadata({ params }: any) {
  const product = ProductItems.find(
    (item) => String(item.id) === String(params.id)
  );

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
      type: "website",
    },
  };
}

// ✅ Page component
export default function Page({ params }: any) {
  const product = ProductItems.find(
    (item) => String(item.id) === String(params.id)
  );

  if (!product) {
    return (
      <div className="w-screen h-screen bg-black text-white flex flex-col justify-center items-center gap-4">
        <div>Product with ID {params.id} not found.</div>
        <a className="p-4 bg-[#faebd7] text-black" href="/">
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
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.title} | Sya Perfume`,
            image: product.images?.[2] || "/sya.png",
            description:
              product.brief ||
              "Long-lasting luxury perfume with imported essences.",
            brand: { "@type": "Brand", name: "Sya Perfume" },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: "300",
              availability: "InStock",
              url: `https://syaperfume.com/${product.id}`,
            },
          }),
        }}
      />
      <ProjectDetails product={product} />
    </div>
  );
}
