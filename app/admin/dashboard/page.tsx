'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-hot-toast'

interface ContentItem {
  id: string
  section: string
  key: string
  value: string
  created_at: string
}

export default function Dashboard() {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [newContent, setNewContent] = useState({
    section: '',
    key: '',
    value: ''
  })
  const supabase = createClientComponentClient()

  const fetchContents = useCallback(async () => {
    const { data, error } = await supabase
      .from('website_content')
      .select('*')
      .order('section', { ascending: true })

    if (error) {
      toast.error('Error fetching content')
      return
    }

    setContents(data)
  }, [supabase])

  useEffect(() => {
    fetchContents()
  }, [fetchContents])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('website_content')
      .insert([newContent])
      .select()

    if (error) {
      toast.error('Error saving content')
      return
    }

    toast.success('Content saved successfully')
    setContents([...contents, data[0]])
    setNewContent({ section: '', key: '', value: '' })
  }

  const handleUpdate = async (id: string, value: string) => {
    const { error } = await supabase
      .from('website_content')
      .update({ value })
      .eq('id', id)

    if (error) {
      toast.error('Error updating content')
      return
    }

    toast.success('Content updated successfully')
    fetchContents()
  }

  return (
    <div className="space-y-8">
      <div className="bg-dark-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-300">Section</label>
              <select
                value={newContent.section}
                onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                className="mt-1 block w-full rounded-md border-dark-300 bg-dark-300 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="">Select section</option>
                <option value="home">Home</option>
                <option value="services">Services</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Key</label>
              <input
                type="text"
                value={newContent.key}
                onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                className="mt-1 block w-full rounded-md border-dark-300 bg-dark-300 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
                placeholder="e.g., hero_title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Value</label>
              <input
                type="text"
                value={newContent.value}
                onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                className="mt-1 block w-full rounded-md border-dark-300 bg-dark-300 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
                placeholder="Content value"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-100"
            >
              Add Content
            </button>
          </div>
        </form>
      </div>

      <div className="bg-dark-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Manage Content</h2>
        <div className="space-y-4">
          {contents.map((content) => (
            <div key={content.id} className="border border-dark-300 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Section</label>
                  <p className="mt-1 text-white">{content.section}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Key</label>
                  <p className="mt-1 text-white">{content.key}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Value</label>
                  <input
                    type="text"
                    value={content.value}
                    onChange={(e) => handleUpdate(content.id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-dark-300 bg-dark-300 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}