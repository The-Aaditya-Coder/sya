import ParallaxImg from '@/app/parallaxImg'
import React from 'react'

const Footer = () => {
  return (
    <section className="footer">
        <div className="col">
          <p>Instagram / Facebook / Twitter</p>

          <div className="footer-links">
            <h1>Knight</h1>
            <h1>Coldmark</h1>
            <h1>Glow</h1>
            <h1>Blushé</h1>
          </div>
          <p>&copy; 2025 Avantula</p>
        </div>
        <div className="col">
          <p>
            Join the newsletter
          <button>Subscribe</button>
          </p>

          <div className="shop">
            <div className="img">
              <ParallaxImg src="/perfumes/2.png" alt="" />
            </div>
          </div>

        <p>Spotify / Apple Music / YouTube</p>
        </div>
        </section>
  )
}

export default Footer