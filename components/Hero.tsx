'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getContent } from '@/lib/getContent'

export default function Hero() {
  const [content, setContent] = useState({
    hero_title: 'Expert Auto Care You Can Trust',
    hero_subtitle: 'Professional Auto Service',
    hero_description: 'Professional auto repair and maintenance services delivered by certified technicians. We keep your vehicle running smoothly and safely.',
    cta_primary: 'Book Now',
    cta_secondary: 'View Services'
  })

  useEffect(() => {
    async function fetchContent() {
      const data = await getContent('home')
      if (Object.keys(data).length > 0) {
        setContent(prev => ({ ...prev, ...data }))
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="relative isolate min-h-screen">
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="Modern garage background"
            fill
            className="object-cover brightness-50"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/90 to-dark-100/70" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="mb-8">
                <span className="inline-block rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-semibold leading-6 text-primary-500 ring-1 ring-inset ring-primary-500/20">
                  {content.hero_subtitle}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {content.hero_title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {content.hero_description}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/book"
                  className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                >
                  {content.cta_primary}
                </Link>
                <Link 
                  href="/services" 
                  className="text-base font-semibold leading-6 text-white hover:text-primary-500 transition-colors"
                >
                  {content.cta_secondary} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}