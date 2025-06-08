'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPressure from '@/components/ui/TextPressure'
import ShinyText from '@/components/ui/ShinyText'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClickSpark from '@/components/ui/ClickSpark'
import ScrollFloat from '@/components/ui/ScrollFloat'
import FlowingMenu from '@/components/ui/FlowingMenu'
import { useLoading } from '@/hooks/useLoading'
import { ChevronDown } from 'lucide-react'

export const page = () => {
  const { isLoading } = useLoading({ duration: 7000 })
  const lenisRef = useRef<LenisRef>(null)
  const [scrollDownOpacity, setScrollDownOpacity] = useState(1)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const flowingMenuRefs = useRef<(HTMLDivElement | null)[]>([])
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({})

  // Toggle expansion for a specific item
  const toggleExpansion = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Sample content for each menu item
  const getMenuContent = (itemText: string) => {
    switch (itemText) {
      case 'Work':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Experience</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800">Software Developer Intern</h4>
                <p className="text-gray-600">Accelerant • May 2025 - Present</p>
                <p className="text-gray-700 mt-2">Developing a Machine Learning Model...</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800">Contract Frontend Developer</h4>
                <p className="text-gray-600">Jin Chong Marketing • May 2025 - Present</p>
                <p className="text-gray-700 mt-2">Built responsive user interfaces and optimized performance...</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800">Web Developer</h4>
                <p className="text-gray-600">Arché Journal • Sept. 2024 - May 2025</p>
                <p className="text-gray-700 mt-2">Built responsive user interfaces and optimized performance...</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-lg text-gray-800">Software Engineer Fellow</h4>
                <p className="text-gray-600">BU Spark! Innovation Fellowship • Jan. 2024 - May 2024</p>
                <p className="text-gray-700 mt-2">Built responsive user interfaces and optimized performance...</p>
              </div>
            </div>
          </div>
        )
      case 'Projects':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800">Portfolio Website</h4>
                <p className="text-gray-600 mb-2">Next.js, TypeScript, GSAP</p>
                <p className="text-gray-700">A modern portfolio showcasing my work and skills...</p>
              </div>
              
            </div>
          </div>
        )
      case 'Skills':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Frontend</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>GSAP</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Backend</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>PostgreSQL</li>
                  <li>MongoDB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Tools</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>Git / GitHub</li>
                  <li>Docker</li>
                  <li>AWS</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'Contact':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">@</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">jiehoonn@bu.edu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">in</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">LinkedIn</p>
                  <p className="text-gray-600">linkedin.com/in/jiehoonlee2002</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  I'm always interested in new opportunities and collaborations. 
                  Feel free to reach out if you'd like to work together!
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Content for {itemText}</div>
    }
  }

  const demoItems = [
    { 
      link: '#', 
      text: 'Work', 
      image: '/image1.jpg',
      content: getMenuContent('Work'),
      isExpanded: expandedItems[0] || false,
      onToggle: () => toggleExpansion(0)
    },
    { 
      link: '#', 
      text: 'Projects', 
      image: '/image2.jpg',
      content: getMenuContent('Projects'),
      isExpanded: expandedItems[1] || false,
      onToggle: () => toggleExpansion(1)
    },
    { 
      link: '#', 
      text: 'Skills', 
      image: '/image3.jpg',
      content: getMenuContent('Skills'),
      isExpanded: expandedItems[2] || false,
      onToggle: () => toggleExpansion(2)
    },
    { 
      link: '#', 
      text: 'Contact', 
      image: '/image4.jpg',
      content: getMenuContent('Contact'),
      isExpanded: expandedItems[3] || false,
      onToggle: () => toggleExpansion(3)
    }
  ]

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  // Register ScrollTrigger plugin and setup FlowingMenu animations
  useEffect(() => {
    if (isLoading) return

    gsap.registerPlugin(ScrollTrigger)

    // Animate FlowingMenu items
    flowingMenuRefs.current.forEach((ref, index) => {
      if (ref) {
        // Set initial state
        gsap.set(ref, { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        })

        // Create animation
        gsap.to(ref, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2 + (index * 0.2), // Staggered duration
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom-=1000px",
            end: "top center",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
          },
          delay: index * 0.1 // Staggered delay
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoading])

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
            <div style={{position: 'relative', minHeight: '300px'}} className="flex items-center justify-center">
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
                  Hi, my name is Jiehoon Lee,
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
                    an aspiring software engineer.
                  </ScrollFloat>
                </div>
                
                
                
                {/* FlowingMenu items with custom scroll animations - full width */}
                <div className="mt-8 -ml-8 w-screen">
                  {demoItems.map((item, index) => (
                    <div 
                      key={index}
                      className="w-full" 
                      ref={el => { flowingMenuRefs.current[index] = el }}
                    >
                      <FlowingMenu items={[item]} />
                    </div>
                  ))}
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