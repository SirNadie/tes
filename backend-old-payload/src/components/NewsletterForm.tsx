'use client'

import { useState } from 'react'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<{
        message: string
        type: 'success' | 'error' | null
    }>({ message: '', type: null })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        try {
            const res = await fetch('/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    subscribedAt: new Date().toISOString(),
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus({
                    message: '🎉 Thanks for subscribing! Check your inbox for 10% off!',
                    type: 'success',
                })
                setEmail('')
            } else {
                setStatus({
                    message: data.message || 'Something went wrong',
                    type: 'error',
                })
            }
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
        <>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex w-full mx-auto max-w-md gap-x-4"
            >
                <label className="sr-only" htmlFor="email-address">
                    Email address
                </label>
                <input
                    autoComplete="email"
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/50 px-3.5 py-2 text-text-light placeholder-gray-500 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    id="email-address"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-background-light shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {status.message && (
                <p
                    className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'
                        }`}
                >
                    {status.message}
                </p>
            )}
        </>
    )
}
