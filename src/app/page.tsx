'use client'
import React from 'react'
import TextPressure from '@/components/ui/TextPressure'
import ShinyText from '@/components/ui/ShinyText'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClickSpark from '@/components/ui/ClickSpark'
import { useLoading } from '@/hooks/useLoading'
import { ChevronDown } from 'lucide-react'

export const page = () => {
  const { isLoading } = useLoading({ duration: 7000 })

  return (
    <>
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
            <div className="pb-8 text-center fade-in-delayed flex flex-col items-center gap-1">
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
        </ClickSpark>
      </div>
    </>
  )
}

export default page;