"use client";
import { useLenis } from 'lenis/react';
import React, {useRef, useEffect, use} from 'react'

const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor


interface ParallaxImgProps {
    src: string;
    alt?: string;
    type?: 'image' | 'video'; // 'image' (default), 'video', or both
    showImage?: boolean;
    showVideo?: boolean;
}

const ParallaxImg = ({ src, alt = '', type = 'image', showImage = true, showVideo = false }: ParallaxImgProps) => {
        const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
        const bounds = useRef<any>(null);
        const currentTranslateY = useRef(0);
        const targetTranslateY = useRef(0);
        const refId = useRef<any>(null);

    useEffect(() => {
        const updateBounds = () =>{
            if(mediaRef.current){
                const rect = mediaRef.current.getBoundingClientRect();
                bounds.current = {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                };
            }
        };
        updateBounds();
        window.addEventListener('resize', updateBounds);

        const animate = () => {
            if (mediaRef.current){
                currentTranslateY.current = lerp(
                    currentTranslateY.current,
                    targetTranslateY.current,
                    0.1
                );
                if(
                    Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.1
                ){
                    (mediaRef.current as any).style.transform = `translateY(${currentTranslateY.current}px) scale(1.40)`;
                }
            }
            refId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateBounds);
            if (refId.current) {
                cancelAnimationFrame(refId.current);
            }
        };
    }, []);


useLenis(({scroll})=>{
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * 0.2; // Adjust the multiplier for parallax effect
})

    return (
        <>
            {(type === 'image' || showImage) && (
                <img
                    ref={mediaRef as React.RefObject<HTMLImageElement>}
                    src={src}
                    alt={alt}
                    style={{
                        willChange: "transform",
                        transform: `translateY(0) scale(1.25)`
                    }}
                />
            )}
            {(type === 'video' || showVideo) && (
                <video
                    ref={mediaRef as React.RefObject<HTMLVideoElement>}
                    src={src}
                    autoPlay
                    loop
                    muted
                    onClick={() => { 
  if (mediaRef.current && mediaRef.current instanceof HTMLVideoElement) {
    mediaRef.current.muted = !mediaRef.current.muted;
  }
}}
                    playsInline
                    style={{
                        willChange: "transform",
                        transform: `translateY(0) scale(1.25)`
                        }}
                />
            )}
        </>
    )
}

export default ParallaxImg