import React from "react"

interface LoadingSpinnerProps {
  query: string
}

export default function LoadingSpinner({ query }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-24 h-24 relative mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        {query ? `Analyzing "${query}"` : "Analyzing Your Profile"}
      </h2>
      <p className="text-slate-600 text-center max-w-md">
        Our AI is generating personalized career recommendations based on your input...
      </p>
    </div>
  )
}