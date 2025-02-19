import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative isolate min-h-screen flex items-center justify-center text-center px-6">
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

      {/* Centered Content */}
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-semibold leading-6 text-primary-500 ring-1 ring-inset ring-primary-500/20">
            Professional Auto Service
          </span>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Expert Auto Care You Can Trust
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Professional auto repair and maintenance services delivered by certified technicians.
          We keep your vehicle running smoothly and safely.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/book"
            className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            Book Now
          </Link>
          <Link 
            href="/services" 
            className="text-base font-semibold leading-6 text-white hover:text-primary-500 transition-colors"
          >
            View Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
