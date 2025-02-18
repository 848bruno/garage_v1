'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
]

const services = [
  { id: 'oil-change', name: 'Oil Change Service', price: '$79.99' },
  { id: 'brake-service', name: 'Brake Service', price: '$249.99' },
  { id: 'tire-rotation', name: 'Tire Rotation', price: '$49.99' },
  { id: 'engine-diagnostic', name: 'Engine Diagnostic', price: '$89.99' },
  { id: 'ac-service', name: 'AC Service', price: '$129.99' },
]

export default function BookingForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !timeSlot) {
      toast.error('Please select a date and time')
      return
    }

    try {
      const appointmentDate = new Date(date)
      const [hours, minutes] = timeSlot.split(':')
      appointmentDate.setHours(parseInt(hours), parseInt(minutes))

      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{
          email: formData.email,
          full_name: formData.name,
          phone: formData.phone
        }])
        .select()
        .single()

      if (userError) throw userError

      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([{
          user_id: userData.id,
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          year: parseInt(formData.vehicleYear)
        }])
        .select()
        .single()

      if (vehicleError) throw vehicleError

      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          user_id: userData.id,
          vehicle_id: vehicleData.id,
          appointment_date: appointmentDate.toISOString(),
          notes: formData.notes,
          status: 'pending'
        }])

      if (appointmentError) throw appointmentError

      toast.success('Appointment booked successfully!')
      router.push('/')
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium leading-6 text-primary-500 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium leading-6 text-primary-500 mb-4">Vehicle Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-300 mb-2">
                Make
              </label>
              <input
                type="text"
                name="vehicleMake"
                id="vehicleMake"
                required
                value={formData.vehicleMake}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                id="vehicleModel"
                required
                value={formData.vehicleModel}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Camry"
              />
            </div>

            <div>
              <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                name="vehicleYear"
                id="vehicleYear"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.vehicleYear}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder={new Date().getFullYear().toString()}
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium leading-6 text-primary-500 mb-4">Select Service</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
                className={`${
                  formData.serviceType === service.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-200 text-gray-300 hover:bg-dark-400'
                } p-4 rounded-lg border border-dark-400 text-left transition-colors`}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm mt-1 text-primary-500">{service.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium leading-6 text-primary-500 mb-4">Appointment Details</h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Date
              </label>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={[
                  { before: new Date() }  // Only disable past dates
                ]}
                className="border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`${
                      timeSlot === slot
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-400'
                    } px-4 py-3 text-sm font-medium rounded-md border border-dark-400 transition-colors`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleInputChange}
                className="block w-full rounded-md border-dark-400 bg-dark-200 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Any special requests or additional information..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-100 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </form>
  )
}