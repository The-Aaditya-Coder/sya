'use client';
import ParallaxImg from '@/app/parallaxImg'
import { Playfair_Display } from 'next/font/google';
import React, { useState } from 'react'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxyTIo-1ZG4AoV0Ixp4FEENBxqe-80JQA48Vl56aTeaMZJV0b53sVo2BNkaAs26BklNcg/exec"; 
// Replace with your deployed Google Apps Script Web App URL


const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || ""; // Replace with your chat ID

const sendTelegramMessage = async (form: { name: string; email: string; phone: string; address: string }) => {
  const now = new Date();
  const message =
    `📝 New Prebook Perfume Submission\n` +
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone}\n` +
    `Address: ${form.address}\n` +
    `Date: ${now.toLocaleString()}`;
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

const About = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Send to Google Sheets
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      if (text === "Success") {
        // Send to Telegram
        await sendTelegramMessage(form);
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', address: '' });
      } else {
        alert("Something went wrong: " + text);
      }
    } catch (err) {
      alert("Failed to submit");
    }

    setLoading(false);
  };

  return (
    <div className="about">
      <div className="col intro columns-2 text-[#121212]">
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] p-8 border-1 border-[#121212] leading-2 rounded-2xl text-[#121212] gap-2 flex flex-col"
        >
          <h2 className={`text-[#121212] font-bold py-4 text-6xl ${playfairDisplay.className}`}>Prebook Perfumes</h2>

          <label htmlFor="name">Enter Your Name:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your name"
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
            type="tel"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Your number to contact you"
          />

          <label htmlFor="address">Enter Your Address:</label>
          <textarea
            id="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="We will contact you at this address"
          />

          <button type="submit" disabled={loading || success} className="flex items-center bg-[#121212] text-[#faebd7] gap-2">
            {success ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                  <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Submitted
              </>
            ) : loading ? "Submitting..." : "Submit"}
          </button>

          <span className='text-left justify-start text-sm leading-tight tracking-tight'>This form is only for prebooking perfumes. We will contact you once the perfumes are available. Thank you for your interest!</span>
        </form>
      </div>

      <div className="col portrait columns-1">
        <div className="portrait-container">
          <div className="img">
            <ParallaxImg src="/images/coldmark_p.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
