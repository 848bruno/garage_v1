'use client'

import { useState, useEffect } from 'react'
import { WrenchScrewdriverIcon, BeakerIcon, CogIcon } from '@heroicons/react/24/outline'
import { getContent } from '@/lib/getContent'

const defaultServices = [
  {
    name: 'Maintenance Services',
    description: 'Regular maintenance to keep your vehicle running smoothly.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Diagnostic Services',
    description: 'Advanced diagnostic testing to identify issues.',
    icon: BeakerIcon,
  },
  {
    name: 'Repair Services',
    description: 'Professional repair services for all vehicle makes and models.',
    icon: CogIcon,
  },
]

export default function Services() {
  const [content, setContent] = useState({
    services_title: 'Professional Services',
    services_heading: 'Everything your car needs',
    services_description: 'We offer a comprehensive range of automotive services to keep your vehicle in top condition.'
  })

  useEffect(() => {
    async function fetchContent() {
      const data = await getContent('services')
      if (Object.keys(data).length > 0) {
        setContent(prev => ({ ...prev, ...data }))
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="bg-dark-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-500">{content.services_title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {content.services_heading}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {content.services_description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {defaultServices.map((service) => (
              <div key={service.name} className="flex flex-col bg-dark-200 p-8 rounded-xl transition-transform hover:scale-105">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                  <service.icon className="h-6 w-6 flex-none text-primary-500" aria-hidden="true" />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}