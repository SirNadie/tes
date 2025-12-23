'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center p-8">
                        <span className="material-symbols-outlined text-6xl text-red-400">
                            error
                        </span>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">
                            Something went wrong
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We encountered an error while loading this content.
                        </p>
                        <div className="mt-6 flex gap-4 justify-center">
                            <button
                                onClick={() => this.setState({ hasError: false })}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/"
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
