'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/getContent'

const defaultFeatures = [
  'Certified Professional Technicians',
  'State-of-the-Art Equipment',
  'Genuine Parts and Materials',
  'Transparent Pricing',
  'Warranty on Services',
  'Convenient Online Booking',
]

export default function WhyChooseUs() {
  const [content, setContent] = useState({
    why_choose_title: 'Why Choose Us',
    why_choose_heading: 'The Trusted Choice for Auto Care',
    why_choose_description: 'We pride ourselves on delivering exceptional service and maintaining the highest standards in automotive care.',
    features: defaultFeatures
  })

  useEffect(() => {
    async function fetchContent() {
      const data = await getContent('why_choose_us')
      if (Object.keys(data).length > 0) {
        setContent(prev => ({ ...prev, ...data }))
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="bg-dark-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-500">{content.why_choose_title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {content.why_choose_heading}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {content.why_choose_description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2">
            {content.features.map((feature) => (
              <div key={feature} className="flex items-center gap-x-3 bg-dark-100 p-6 rounded-lg transition-colors hover:bg-dark-300">
                <CheckCircleIcon className="h-6 w-6 flex-none text-primary-500" aria-hidden="true" />
                <dt className="text-base font-semibold leading-7 text-white">{feature}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}