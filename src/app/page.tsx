'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import gsap from 'gsap'
import TextPressure from '@/components/ui/TextPressure'
import ShinyText from '@/components/ui/ShinyText'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClickSpark from '@/components/ui/ClickSpark'
import ScrollFloat from '@/components/ui/ScrollFloat'
import { useLoading } from '@/hooks/useLoading'
import { ChevronDown } from 'lucide-react'

export const page = () => {
  const { isLoading } = useLoading({ duration: 7000 })
  const lenisRef = useRef<LenisRef>(null)
  const [scrollDownOpacity, setScrollDownOpacity] = useState(1)
  const [showScrollDown, setShowScrollDown] = useState(false)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  // Handle delayed show of scroll down section
  useEffect(() => {
    if (!isLoading) {
      // Delay showing the scroll down section to match the fade-in-delayed class
      const timer = setTimeout(() => {
        setShowScrollDown(true)
      }, 1000) // Adjust timing to match your fade-in-delayed CSS

      return () => clearTimeout(timer)
    } else {
      setShowScrollDown(false)
    }
  }, [isLoading])

  // Handle scroll down section fade out
  useEffect(() => {
    if (isLoading || !showScrollDown) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeDistance = 100 // 100px scroll distance
      
      if (scrollY <= fadeDistance) {
        const opacity = 1 - (scrollY / fadeDistance)
        setScrollDownOpacity(Math.max(0, opacity))
      } else {
        setScrollDownOpacity(0)
      }
    }

    // Use requestAnimationFrame for smoother updates
    let ticking = false
    const smoothHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', smoothHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', smoothHandleScroll)
  }, [isLoading, showScrollDown])

  return (
    <>
      {!isLoading && <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />}
      <LoadingScreen isLoading={isLoading} />

      <div className={`main-content ${!isLoading ? 'fade-in' : ''}`}>
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <div className="min-h-screen flex flex-col justify-between">
            <div style={{position: 'relative', height: '300px'}}>
              <TextPressure
                text="Portfolio"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </div>
            <div 
              className="pb-8 text-center flex flex-col items-center gap-1 transition-all duration-500"
              style={{ 
                opacity: showScrollDown ? scrollDownOpacity : 0,
                transform: showScrollDown ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <ShinyText text="Scroll down" disabled={false} speed={3} className="text-l" />
              <div
                className="text-[#b5b5b5a4] animate-shine"
                style={{
                  backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  animationDuration: '3s',
                }}
              >
                <ChevronDown size={24} className="text-[#b5b5b5a4]" />
              </div>
            </div>
          </div>
        
        
          {/* Reduced spacing for scroll trigger */}
          <div className="h-24"></div>
          
          {/* Sticky ScrollFloat section with multiple components */}
          <div className="relative">
            <div className="sticky top-0 min-h-screen flex items-center justify-start pl-8">
              <div className="text-left leading-none">
                <ScrollFloat
                  animationDuration={1}
                  ease='back.inOut(2)'
                  scrollStart='center bottom-=200px'
                  scrollEnd='center top+=200px'
                  stagger={0.03}
                  containerClassName="text-left"
                  textClassName="text-white font-bold text-6xl leading-none"
                >
                  Hi, My name is Jiehoon Lee
                </ScrollFloat>
                
                <div className="-mt-4">
                  <ScrollFloat
                    animationDuration={1.2}
                    ease='back.inOut(2)'
                    scrollStart='center bottom-=150px'
                    scrollEnd='center top+=150px'
                    stagger={0.04}
                    containerClassName="text-left"
                    textClassName="text-white font-bold text-6xl leading-none"
                  >
                    An aspiring software engineer.
                  </ScrollFloat>
                </div>
                
                <div className="-mt-4">
                  <ScrollFloat
                    animationDuration={1.4}
                    ease='back.inOut(2)'
                    scrollStart='center bottom-=100px'
                    scrollEnd='center top+=100px'
                    stagger={0.05}
                    containerClassName="text-left"
                    textClassName="text-white font-bold text-6xl leading-none"
                  >
                    Flowing Menu Reactbits
                  </ScrollFloat>
                </div>
              </div>
            </div>
            
            {/* This div creates the scroll space for the sticky section */}
            <div className="h-[200vh]"></div>
          </div>
          
          {/* Content after sticky section
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <p className="text-white text-xl">Content continues here...</p>
          </div> */}
        </ClickSpark>
      </div>
    </>
  )
}

export default page;