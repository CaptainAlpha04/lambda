"use client"

import { useState, useEffect } from "react"
import CareerLanding from "../components/career/LandingPage"
import CareerResults from "../components/career/ResultPage"
import PersonalizedForm from "../components/career/PersonalizedForm"
import LoadingSpinner from "../components/LoadingSpinner"


export default function CareerPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [onPersonalize, setOnPersonalize] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setLoading(true)
    
    try {
      // Simulate API call - replace with actual API call
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ career: query }),
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(data.career)
        // Add a slight delay to show loading state
        setTimeout(() => {
          setResults(data)
          setLoading(false)
        }, 10)
      } else {
        console.error("Error:", response.statusText)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching results:", error)
      setLoading(false)
    }
  }

  const resetSearch = () => {
    setResults(null)
    setSearchQuery("")
  }

  const handlePersonalized = () => {
    setOnPersonalize(true)
  }

  const submitPersonalized = async (formData: any) => {
    setLoading(true)
    setOnPersonalize(false) // Hide the personalized form after submission
    try {
      // Simulate API call - replace with actual API call
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data : formData }),
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(data.career)
        // Add a slight delay to show loading state
        setTimeout(() => {
          setResults(data)
          setLoading(false)
          setOnPersonalize(false) // Reset personalization state after submission
        }, 10)
      } else {
        console.error("Error:", response.statusText)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching results:", error)
      setLoading(false)
    }
  }

  // Render the appropriate component based on state
  if (loading) {
    return <LoadingSpinner query={searchQuery} />
  }

  if (onPersonalize) {
    return <PersonalizedForm onSubmit={submitPersonalized}/>
  }

  if (results) {
    return <CareerResults data={results} onReset={resetSearch} onSearch={handleSearch} />
  }

  // Default view when no search has been performed
  return <CareerLanding onPersonalize={handlePersonalized} onSearch={handleSearch} />
}