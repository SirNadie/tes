'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState<{
        message: string
        type: 'success' | 'error' | null
    }>({ message: '', type: null })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // For now, just simulate a successful submission
        // In production, this would send to an API endpoint
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setStatus({
                message: 'Thank you for your message! We\'ll get back to you soon.',
                type: 'success',
            })
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            setStatus({
                message: 'Something went wrong. Please try again.',
                type: 'error',
            })
        } finally {
            setIsLoading(false)
            setTimeout(() => setStatus({ message: '', type: null }), 5000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    type="text"
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                </label>
                <input
                    type="text"
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                </label>
                <textarea
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            {status.message && (
                <p
                    className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'
                        }`}
                >
                    {status.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-background-light py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {isLoading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
