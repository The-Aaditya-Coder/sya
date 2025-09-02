"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import '@/app/globals.css'
import { CircleStar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BlackMango from 'next/font/local'
import { Metadata } from 'next'



const blackMango = BlackMango({
    src: '../../public/fonts/BlackMango.ttf',
    display: 'swap',
})


interface Product {
    id: string;
    src: string;
    title: string;
    brief: string;
    price: number;
    discount?: number;
    tagline: string;
    para?: string;
    top?: string;
    heart?: string;
    base?: string;
    notes?: string;
    images: string[];
}

interface ProjectDetailsProps {
    product: Product;
}


const ProjectDetails = ({ product }: ProjectDetailsProps) => {
    const router = useRouter();
    const [comboOpen, setComboOpen] = useState(false);
    const handleBuyNow = () => {
        router.push(`/cart?id=${product.id}`);
    };
    const handlePopUp = () => {
        setComboOpen(true);
    };
    const handleComboBuy = (comboId: string) => {
        router.push(`/cart?id=${comboId}`);
        setComboOpen(false);
    };
    return (
        <div className='flex h-full flex-col items-center justify-center bg-[#faebd7] text-[#121212]'>
            <style>
                {`
                    h1, h3, p {
                        color: #121212;
                    }
                `}
            </style>
            <div className='w-screen h-screen bg-cover relative flex items-center justify-center'>
                <video src={product.src} poster={product.images[2]} autoPlay loop muted className='w-full h-full object-contain align-top top-0' />
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-[#faebd7]/100 via-[#faebd7]/50 to-transparent"></div>


            </div>

            <div className='absolute h-full bottom-0 w-screen flex flex-col justify-end items-center gap-4'>
                <h1 className={`${blackMango.className} text-black`}>{product.title}</h1>
                <p>{product.brief}</p>
                <h3 className='text-xl text-[#121212] font-bold tracking-tight italic font-serif'>₹{product.price}
                    {/* <span className='text-xl text-[#faebd7] w-full font-bold italic line-through'>{product.discount ? `₹${product.discount}` : ''}</span> */}
                </h3>


                <div className='flex gap-4'>
                    <button onClick={handleBuyNow} className='bg-[#faebd7] border-black border-1 text-black'>Buy Now</button>
                    <button onClick={handlePopUp} className='bg-[#121212] text-[#faebd7]'>Combo Offer 41%Off</button>
                </div>

                {/* Combo Offer Modal */}
                {comboOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#faebd7] bg-opacity-70">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                            <button className="absolute top-2 right-2 text-black text-xl" onClick={() => setComboOpen(false)}>&times;</button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Combo Offers</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Knight + Coldmark</span>
                                        <label>Two perfumes are for men</label>
                                    </div>
                                    <button className="bg-[#faebd7] text-black px-3 py-1 rounded" onClick={() => handleComboBuy('male')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Glow + Blushe</span>
                                        <label>Two perfumes are for women</label>
                                    </div>
                                    <button className="bg-[#faebd7] text-black px-3 py-1 rounded" onClick={() => handleComboBuy('female')}>₹499</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Blushe + Coldmark</span>
                                        <label>Two perfumes are for love couple</label>
                                    </div>
                                    <button className="bg-[#faebd7] text-black px-3 py-1 rounded" onClick={() => handleComboBuy('couple1')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Knight + Glow</span>
                                        <label>Two perfumes are for hustle couple</label>
                                    </div>
                                    <button className="bg-[#faebd7] text-black px-3 py-1 rounded" onClick={() => handleComboBuy('couple2')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Value Pack</span>
                                        <label>Pack of 4 perfumes for Male and Female</label>
                                    </div>
                                    <button className="bg-[#faebd7] text-black px-3 py-1 rounded" onClick={() => handleComboBuy('value-pack')}>₹699</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className='my-[5em] flex flex-col items-left justify-center text-left px-4 max-w-2xl gap-5'>
                <h3 className='tracking-tight font-black text-4xl text-[#faebd7] uppercase leading-8'>{product.tagline}</h3>
                <p>{product.para ?? ''}</p>
                {/* <p>Notes: <br/> Top:{product.notes.split("Heart:")[0]} <br/> Heart:{product.notes.split("Heart:")[1].split("Base:")[0]} <br/> Base:{product.notes.split("Base:")[1]}</p> */}
                <div className='flex flex-col gap-2'>
                    <ul className='font-semibold'>Notes:</ul>
                    <li> Top: {product.top ?? ''} </li> <li> Heart: {product.heart ?? ''} </li> <li> Base: {product.base ?? ''} </li>
                </div>
            </div>

            <div className="grid relative items-start grid-cols-2 md:grid-cols-4 gap-4 my-6 p-2 w-full max-w-4xl mx-auto text-[#faebd7]">
                {/* Genuine */}
                <div className="flex flex-col items-center justify-start flex-1 my-2 gap-1 min-w-[120px]">
                    <CircleStar color="#121212" className='mb-2' size={32} />
                    <h3 className='text-antiquewhite text-base font-bold uppercase'>Authenticity</h3>
                    <p className='text-antiquewhite text-xs text-center opacity-80'>True luxury, crafted to perfection.</p>
                </div>

                {/* Non toxic */}
                <div className="flex flex-col items-center justify-center flex-1 my-2 gap-1 min-w-[120px]">
                    <CircleStar color="#121212" className='mb-2' size={32} />
                    <h3 className='text-antiquewhite text-base font-bold uppercase'>Pure & Safe</h3>
                    <p className='text-antiquewhite text-xs text-center opacity-80'>Gentle luxury, free from toxins.</p>
                </div>

                {/* Quality */}
                <div className="flex flex-col items-center justify-start flex-1 my-2 gap-1 min-w-[120px]">
                    <CircleStar color="#121212" className='mb-2' size={32} />
                    <h3 className='text-antiquewhite text-base font-bold uppercase text-center leading-5'>Imported Fragrance</h3>
                    <p className='text-antiquewhite text-xs text-center opacity-80'>Dubai’s finest essences, perfected.</p>
                </div>

                {/* Long lasting */}
                <div className="flex flex-col items-center justify-center flex-1 my-2 gap-1 min-w-[120px]">
                    <CircleStar color="#121212" className='mb-2' size={32} />
                    <h3 className='text-antiquewhite text-base font-bold uppercase text-center leading-5'>Enduring Elegance</h3>
                    <p className='text-antiquewhite text-xs text-center opacity-80'>A fragrance that lingers with grace.</p>
                </div>
            </div>


            <div className='mt-[4em]'>
                {/* Product Images: show up to 4 if available */}
                {Array.isArray(product.images) && product.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className='flex flex-col items-center lg:h-[750px] h-[550px] relative w-screen justify-between gap-4 mb-10'>
                        <Image src={img} width={1000} height={1000} className='md:max-w-[620px] max-w-[420px] h-full object-contain' alt={product.title + ' image ' + (idx + 1)} />
                    </div>
                ))}
            </div>
            <div className='flex flex-col items-center gap-4 uppercase my-8 justify-center text-center'>
                <h1 className={`${blackMango.className}`}>{product.title}</h1>
                <p className='text-xl italic font-serif text-[#faebd7] font-bold'>{product.tagline}</p>
                <button className='bg-[#121212] text-[#faebd7] mb-[4em]' onClick={handleBuyNow}>Buy Now</button>
            </div>
        </div>
    )
}

export default ProjectDetails