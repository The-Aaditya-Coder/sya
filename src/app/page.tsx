"use client";
import Script from "next/script";

import Hero from "@/components/Hero";
import ParallaxImg from "./parallaxImg";
import { Lenis } from "lenis/react";
import Image from "next/image";
import Product from "@/components/Product";
import { ProductItems } from "../../Data/intex";
import About from "@/components/About";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <Lenis root>
      <Script
        id="sya-perfume"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://syaperfume.com/",
            "@type": "Product",
            name: "Sya Perfume – Luxury Fragrance",
            image: "https://syaperfumes.com/perfume/coldmark3.png",
            description: "Long-lasting luxury perfume with imported essences.",
            brand: { "@type": "Brand", name: "Sya Perfumes" },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: "300",
              availability: "https://syaperfume.com/",
              url: "https://syaperfume.com/",
            },
          }),
        }}
      />
      <Nav />
      <Hero />
    <Product />
      <div id="about-section">
        <About />
      </div>
      <Banner />
      <Footer />
    </Lenis>
  );
}
