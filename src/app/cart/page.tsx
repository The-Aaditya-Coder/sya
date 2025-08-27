'use client';
import { Playfair_Display } from 'next/font/google';
import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
// Dynamically import react-confetti for client-side only
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });
import { Lock, ShieldCheck } from 'lucide-react';

// Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
import ParallaxImg from '@/app/parallaxImg';
import { useSearchParams } from 'next/navigation';
import { ProductItems } from '@/../Data/intex';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "";

const sendTelegramMessage = async (form: {
  landmark: any; name: string; email: string; phone: string; streetaddress: string; city: string; state: string; pincode: string; address: string; perfumename: string; purchaseinfo: string
}) => {
  const now = new Date();
  const message =
    `📝 New Prebook Perfume Submission\n` +
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone}\n` +
    `Street Address: ${form.streetaddress}\n` +
    `Landmark: ${form.landmark}\n` +
    `City: ${form.city}\n` +
    `State: ${form.state}\n` +
    `Pincode: ${form.pincode}\n` +
    `Date: ${now.toLocaleString()}\n` +
    `Perfume Name: ${form.perfumename}\n` +
    `Purchase Info: ${form.purchaseinfo}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML"
    })
  });
};

const CartContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const product = ProductItems.find((item) => item.id === id) || ProductItems[0];

  const [form, setForm] = useState({ name: '', email: '', phone: '', streetaddress: '', city: '', state: '', pincode: '', landmark: '', address:'', perfumename: product.title, purchaseinfo: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentType, setPaymentType] = useState('online');

  useEffect(() => {
    setForm((prev) => ({ ...prev, perfumename: product.title }));
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handlePaymentType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(e.target.value);
    setForm({ ...form, purchaseinfo: e.target.value === 'cod' ? 'Cash on Delivery' : 'Online Payment' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (paymentType === 'cod') {
      // Cash on Delivery: normal submit
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("landmark", form.landmark);
        formData.append("streetaddress", form.streetaddress);
        formData.append("city", form.city);
        formData.append("state", form.state);
        formData.append("pincode", form.pincode);
        formData.append("address", form.address);
        formData.append("perfumename", form.perfumename);
        formData.append("purchaseId", form.purchaseinfo);
        formData.append("purchaseinfo", 'Cash on Delivery');

        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: formData,
        });

        const text = await res.text();
        if (text === "Success") {
          await sendTelegramMessage({ ...form, purchaseinfo: 'Cash on Delivery' });
          setSuccess(true);
          setShowConfetti(true);
          setShowPopup(true);
          setTimeout(() => setShowConfetti(false), 4000);
          setTimeout(() => setShowPopup(false), 3500);
          setForm({ name: '', email: '', phone: '', streetaddress: '', landmark: '', city: '', state: '', pincode: '', address: '', perfumename: product.title, purchaseinfo: '' });
        } else {
          alert("Something went wrong: " + text);
        }
      } catch (err) {
        alert("Failed to submit");
      }
      setLoading(false);
      return;
    }

    // Pay Online: Razorpay
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load Razorpay.');
      setLoading(false);
      return;
    }
    const amount = (product.price || 0) * 100; // Razorpay expects paise
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      amount,
      currency: 'INR',
      appname: product.title,
      description: product.title,
      handler: async function (response: any) {
        // On payment success, submit order
        try {
          const formData = new FormData();
          formData.append("name", form.name);
          formData.append("email", form.email);
          formData.append("phone", form.phone);
          formData.append("address", form.address);
          formData.append("perfumename", form.perfumename);
          formData.append("purchaseinfo",  response.razorpay_payment_id);

          const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formData,
          });

          const text = await res.text();
          if (text === "Success") {
            await sendTelegramMessage({ ...form, purchaseinfo: `Online Payment | Razorpay Payment ID: ${response.razorpay_payment_id}` });
            setSuccess(true);
            setShowConfetti(true);
            setShowPopup(true);
            setTimeout(() => setShowConfetti(false), 4000);
            setTimeout(() => setShowPopup(false), 3500);
            setForm({ name: '', email: '', phone: '', streetaddress: '', city: '', state: '', landmark: '', pincode: '', address: '', perfumename: product.title, purchaseinfo: '' });
          } else {
            alert("Something went wrong: " + text);
          }
        } catch (err) {
          alert("Failed to submit");
        }
        setLoading(false);
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        name: form.name,
        streetaddress: form.streetaddress,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        landmark: form.landmark,
        address: form.address,
      },
      theme: {
        color: '#121212',
      },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="about">
      {/* Confetti animation on success */}
      {showConfetti && <Confetti width={typeof window !== 'undefined' ? window.innerWidth : 300} height={typeof window !== 'undefined' ? window.innerHeight : 300} recycle={false} numberOfPieces={350} />}

      {/* Green popup on success */}
      {showPopup && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg flex items-center gap-2 text-lg animate-bounce">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Order placed successfully!
        </div>
      )}
      <div className="col intro my-[4em] columns-2 text-[#121212]">
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] p-8 border-1 border-[#121212] leading-2 rounded-2xl text-[#121212] gap-2 flex flex-col"
        >
          <div className='gap-4 my-8'>
            <label className="text-lg uppercase">You are Just Few Minutes Away From</label>
            <h2 className={`text-[#121212] font-bold mb-2 text-6xl ${playfairDisplay.className}`}>{product.title}</h2>
            <label className="text-sm text-gray-500 uppercase">{product.tagline}</label>
          </div>

          <label htmlFor="name">Enter Your Full Name:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your full name"
          />
          <label htmlFor="email">Enter Your Email:</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
          />
          <label htmlFor="phone">Enter Your Phone Number:</label>
          <input
            type='tel'
            id="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Your number to contact you"
          />
          <label htmlFor="address">Street Address / House No:</label>
          <textarea
            id="streetaddress"
            value={form.streetaddress}
            onChange={handleChange}
            required
            placeholder="Enter building, street, or apartment details"
          />
          <label htmlFor="landmark">Landmark (Optional)</label>
          <textarea
            id="landmark"
            value={form.landmark}
            onChange={handleChange}
            required
            placeholder="Nearby landmark to help us locate you easily"
          />
          <label htmlFor="city">City</label>
          <textarea
            id="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
          />
          <label htmlFor="state">State</label>
          <textarea
            id="state"
            value={form.state}
            onChange={handleChange}
            required
            placeholder="Select your state from dropdown"
          />
          <label htmlFor="pincode">Pincode / Postal Code</label>
          <textarea
          itemType='number'
            id="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            placeholder="Enter 6-digit pincode"
          />
          <label htmlFor="address">Enter Your Address:</label>
          <textarea
            id="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="We will contact you at this address"
          />

          <div className="my-2 w-full start-0 flex flex-col align-start left-0">
            <span className="font-semibold my-4">Payment Method:</span>
            <div className="flex gap-4 w-full">
              <button
                type="button"
                className={`flex-1 py-4 rounded-lg border-2 border-none text-lg font-semibold transition-all duration-150 ${paymentType === 'cod' ? 'bg-[#121212] text-[#faebd7] border-[#121212]' : 'bg-[#f5f5f5] text-[#121212] border-[#121212]'}`}
                onClick={() => handlePaymentType({ target: { value: 'cod' } } as any)}
              >
                Cash on Delivery<br/><span className='font-bold text-lg'>₹{product.price + 20}</span>
              </button>
              <button
                type="button"
                className={`flex-1 py-4 rounded-lg border-2 border-none text-lg font-semibold transition-all duration-150 ${paymentType === 'online' ? 'bg-[#121212] text-[#faebd7] border-[#121212]' : 'bg-[#f5f5f5] text-[#121212] border-[#121212]'}`}
                onClick={() => handlePaymentType({ target: { value: 'online' } } as any)}
              >
                Pay Online<br/><span className='font-bold text-lg'>₹{product.price}</span>
              </button>
            </div>
            <span className='text-sm text-[#121212] flex items-center my-2'><ShieldCheck width={16} height={16} />Your payment will be processed securely.</span>
            <span className='text-sm text-[#121212] flex items-center leading-4'>Note: For orders placed with Cash on Delivery (COD), an additional ₹20 delivery charge will be applied.</span>
          </div>

          <button type="submit" disabled={loading || success} className="flex items-center bg-[#121212] text-[#faebd7] gap-2">
            {success ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                  <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Your Order is Confirmed
              </>
            ) : loading ? "Processing..." : "Confirm Your Order"}
          </button>
          <span className='text-left justify-start text-sm leading-tight tracking-tight'>This form is to take order for {product.title}, This platform is secure and your information is safe with us. Your order will be delivered to you within 1-4 days in Nagpur, besides this location order will ship within 4-7 working days and will be handled with utmost care.</span>
        </form>
      </div>
      <div className="col portrait columns-1">
        <div className="portrait-container">
          <div className="img">
            <ParallaxImg src={product.images[0]} alt={product.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <Suspense fallback={<div className="about"><div className="col intro my-[4em] columns-2 text-[#121212]"><div>Loading...</div></div></div>}>
      <CartContent />
    </Suspense>
  );
};

export default CartPage;
