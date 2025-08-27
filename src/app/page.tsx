"use client";

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
