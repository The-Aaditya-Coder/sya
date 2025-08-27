import React, { useState } from 'react'
import Image from 'next/image'
import '@/app/globals.css'
import { CircleStar } from 'lucide-react'
import { useRouter } from 'next/navigation'

import BlackMango from 'next/font/local'

const blackMango = BlackMango({
  src: '../../public/fonts/BlackMango.ttf',
  display: 'swap',
})


const ProjectDetails = ({ product }) => {
    const router = useRouter();
    const [comboOpen, setComboOpen] = useState(false);
    const handleBuyNow = () => {
        router.push(`/cart?id=${product.id}`);
    };
    const handlePopUp = () => {
        setComboOpen(true);
    };
    const handleComboBuy = (comboId) => {
        router.push(`/cart?id=${comboId}`);
        setComboOpen(false);
    };
    return (
        <div className='flex h-full flex-col items-center justify-center bg-black'>
            <div className='w-screen h-screen bg-cover bg-center'>
                <video src={product.src} autoPlay loop muted className='w-full h-auto' />
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-black/25 opacity-100"></div>
            </div>

            <div className='absolute h-full bottom-0 w-screen flex flex-col justify-end items-center gap-4'>
                <h1 className={`${blackMango.className}`}>{product.title}</h1>
                <p>{product.brief}</p>
                <h2 className='text-xl text-[#faebd7] font-bold tracking-tight italic font-serif'>₹{product.price} <span className='text-xl text-[#faebd7] w-full font-bold italic line-through'>{product.discount ? `₹${product.discount}` : ''}</span></h2>


                <div className='flex gap-4'>
                    <button onClick={handleBuyNow} className='bg-amber-50 text-black'>Buy Now</button>
                    <button onClick={handlePopUp} className='bg-amber-50 text-black mix-blend-difference'>Combo Offer 41%Off</button>
                </div>

                {/* Combo Offer Modal */}
                {comboOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                            <button className="absolute top-2 right-2 text-black text-xl" onClick={() => setComboOpen(false)}>&times;</button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Combo Offers</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Knight + Coldmark</span>
                                    <label>Two perfumes are for men</label>
                                    </div>
                                    <button className="bg-amber-50 text-black px-3 py-1 rounded" onClick={() => handleComboBuy('male')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Glow + Blushe</span>
                                        <label>Two perfumes are for women</label>
                                    </div>
                                    <button className="bg-amber-50 text-black px-3 py-1 rounded" onClick={() => handleComboBuy('female')}>₹499</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Blushe + Coldmark</span>
                                        <label>Two perfumes are for love couple</label>
                                    </div>
                                    <button className="bg-amber-50 text-black px-3 py-1 rounded" onClick={() => handleComboBuy('couple1')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Knight + Glow</span>
                                        <label>Two perfumes are for hustle couple</label>
                                    </div>
                                    <button className="bg-amber-50 text-black px-3 py-1 rounded" onClick={() => handleComboBuy('couple2')}>₹449</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Value Pack</span>
                                        <label>Pack of 4 perfumes for Male and Female</label>
                                    </div>
                                    <button className="bg-amber-50 text-black px-3 py-1 rounded" onClick={() => handleComboBuy('value-pack')}>₹699</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className='my-[5em] flex flex-col items-left justify-center text-left px-4 max-w-2xl gap-5'>
                <h2 className='tracking-wide font-black text-4xl text-[#faebd7] uppercase'>{product.tagline}</h2>
                <p>{product.para}</p>
                {/* <p>Notes: <br/> Top:{product.notes.split("Heart:")[0]} <br/> Heart:{product.notes.split("Heart:")[1].split("Base:")[0]} <br/> Base:{product.notes.split("Base:")[1]}</p> */}
                <div className='flex flex-col gap-2'>
                    <p>Notes:</p> <p> Top: {product.top} </p> <p> Heart: {product.heart} </p> <p> Base: {product.base} </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-8 w-full max-w-4xl mx-auto text-[#faebd7]">
                {/* Genuine */}
                <div className="flex flex-col items-center justify-start gap-2 flex-1 min-w-[120px]">
    <CircleStar color="antiquewhite" size={32} />
    <h2 className='text-antiquewhite text-lg font-bold uppercase'>Authenticity</h2>
    <p className='text-antiquewhite text-xs text-center opacity-80'>Crafted with uncompromising standards, ensuring true luxury in every drop.</p>
</div>

{/* Non toxic */}
<div className="flex flex-col items-center justify-start gap-2 flex-1 min-w-[120px]">
    <CircleStar color="antiquewhite" size={32} />
    <h2 className='text-antiquewhite text-lg font-bold uppercase'>Pure & Safe</h2>
    <p className='text-antiquewhite text-xs text-center opacity-80'>Expertly formulated without harsh chemicals—luxury that cares for you daily.</p>
</div>

{/* Quality */}
<div className="flex flex-col items-center justify-start gap-2 flex-1 min-w-[120px]">
    <CircleStar color="antiquewhite" size={32} />
    <h2 className='text-antiquewhite text-lg font-bold uppercase'>Exquisite Quality</h2>
    <p className='text-antiquewhite text-xs text-center opacity-80'>Infused with Dubai-imported premium essences, perfected under meticulous quality control.</p>
</div>

{/* Long lasting */}
<div className="flex flex-col items-center justify-start gap-2 flex-1 min-w-[120px]">
    <CircleStar color="antiquewhite" size={32} />
    <h2 className='text-antiquewhite text-lg font-bold uppercase'>Enduring Elegance</h2>
    <p className='text-antiquewhite text-xs text-center opacity-80'>A refined fragrance that lingers gracefully, lasting over 12 hours.</p>
</div>

            </div>

            <div className='mt-[4em]'>
                {/* Product Images: show up to 4 if available */}
                {Array.isArray(product.images) && product.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className='flex flex-col items-center h-screen relative w-screen justify-between gap-4 mb-10'>
                        <Image src={img} width={500} height={250} className='max-w-[450px] h-auto object-contain' alt={product.title + ' image ' + (idx + 1)} />
                    </div>
                ))}
            </div>
            <div className='flex flex-col items-center gap-4 uppercase my-8 justify-center text-center'>
                <h1 className={`${blackMango.className}`}>{product.title}</h1>
                <p className='text-xl italic font-serif text-[#faebd7] font-bold'>{product.tagline}</p>
            <button className='bg-amber-50 text-black mb-[4em]' onClick={handleBuyNow}>Buy Now</button>
            </div>
        </div>
    )
}

export default ProjectDetails