"use client";
import React from 'react';
import { ProductItems } from '@/../Data/intex';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


import { useState } from 'react';

const PerfumeGrid = () => {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{ [id: string]: number }>(
    Object.fromEntries(ProductItems.map((item) => [item.id, 0]))
  );

  // Calculate total selected and offer price
  const selected = ProductItems.filter((item) => quantities[item.id] > 0);
  const totalQty = selected.reduce((sum, item) => sum + quantities[item.id], 0);
  let total = selected.reduce((sum, item) => sum + item.price * quantities[item.id], 0);
  if (totalQty === 2) total = 449;
  if (totalQty === 4) total = 699;

  const handleQty = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, val) }));
  };

  const handleBuyNow = () => {
    // Pass selected perfumes and quantities as query string
    const params = new URLSearchParams();
    Object.entries(quantities).forEach(([id, qty]) => {
      if (qty > 0) params.append('items', `${id}:${qty}`);
    });
    router.push(`/cart?${params.toString()}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-8 uppercase">Our Perfumes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-2">
        {ProductItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
            <Image src={item.images[0]} alt={item.title} width={200} height={200} className="object-contain rounded mb-2" />
            <div className="font-bold text-lg mb-1 uppercase">{item.title}</div>
            <div className="text-xs text-gray-500 mb-2">{item.tagline}</div>
            <div className="text-base font-semibold mb-2">₹{item.price}</div>
            <div className="flex items-center gap-2 my-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleQty(item.id, quantities[item.id] - 1)}
                disabled={quantities[item.id] === 0}
              >-</button>
              <span className="w-6 text-center">{quantities[item.id]}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleQty(item.id, quantities[item.id] + 1)}
              >+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <h2 className="font-bold text-xl mb-2">Order Summary</h2>
        {selected.length === 0 ? (
          <div className="text-gray-500">No perfumes selected.</div>
        ) : (
          <ul className="w-full mb-2">
            {selected.map((item) => (
              <li key={item.id} className="flex justify-between w-full border-b py-1">
                <span>{item.title} x {quantities[item.id]}</span>
                <span>₹{item.price * quantities[item.id]}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="w-full flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        {(totalQty === 2 || totalQty === 4) && (
          <div className="text-green-600 font-semibold mt-1">Offer Applied: {totalQty} perfumes for ₹{total}</div>
        )}
        <button
          className="mt-4 w-full bg-[#121212] text-[#faebd7] py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PerfumeGrid;
