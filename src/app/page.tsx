'use client'
import React from 'react'
import TextPressure from '@/components/ui/TextPressure'
import ShinyText from '@/components/ui/ShinyText'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ClickSpark from '@/components/ui/ClickSpark'
import { useLoading } from '@/hooks/useLoading'

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
            <div className="pb-8 text-center fade-in-delayed">
              <ShinyText text="Scroll down" disabled={false} speed={3} className="text-l" />
            </div>
          </div>
        </ClickSpark>
      </div>
    </>
  )
}

export default page;