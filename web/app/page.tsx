"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Beaker, BookOpen, Pencil, GraduationCap, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      {/* Neon glow effects */}
      <div className="fixed -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="fixed top-1/2 -right-40 w-80 h-80 bg-cyan-500 rounded-full filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>
      <div className="fixed -bottom-40 left-1/3 w-80 h-80 bg-pink-600 rounded-full filter blur-[100px] opacity-20 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              QURRI<span className="text-cyan-400">CULA</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </nav>
            <Button className="md:hidden bg-transparent hover:bg-gray-800">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Future of{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  Education
                </span>{" "}
                is Here
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Immersive learning experiences powered by cutting-edge technology. Transform how you learn with our
                interactive tools.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-6 rounded-md text-lg"
                  onClick={() => router.push("/signup")}
                >
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 text-white px-8 py-6 rounded-md text-lg"
                  onClick={() => router.push("/demo")}
                >
                  Watch Demo
                </Button>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
             
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Learning Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our suite of advanced learning tools designed to make education engaging and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Pencil className="h-8 w-8 text-purple-400" />}
              title="Interactive Whiteboard"
              description="Collaborate in real-time with our digital whiteboard. Perfect for brainstorming and visual learning."
              onClick={() => router.push("/whiteboard")}
            />
            <FeatureCard
              icon={<Beaker className="h-8 w-8 text-cyan-400" />}
              title="Virtual Chemistry Lab"
              description="Conduct experiments safely in our virtual lab environment with realistic simulations."
              onClick={() => router.push("/chemlab")}
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-pink-400" />}
              title="Digital Notebook"
              description="Take smart notes that organize and connect your ideas automatically."
              onClick={() => router.push("/notebook")}
            />
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-green-400" />}
              title="Career Counseling"
              description="Get personalized guidance on educational and career paths based on your interests."
              onClick={() => router.push("/career")}
            />
          </div>
        </section>

        {/* Upload Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload Your Learning Materials</h2>
                <p className="text-gray-300 mb-6">
                  Our AI-powered system can transform your textbooks and materials into interactive learning
                  experiences. Upload your content and watch it come to life.
                </p>
              </div>
              <div className="md:w-1/2">
                <UploadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/50 backdrop-blur-md border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  QURRI<span className="text-cyan-400">CULA</span>
                </div>
                <p className="text-gray-400 mt-2">The future of education is interactive</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Product</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Testimonials
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Company</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-cyan-400 transition-colors">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
              <p>© {new Date().getFullYear()} QURRICULA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Component for navigation links
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
      {children}
    </a>
  )
}

// Component for feature cards
function FeatureCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <Card
      className="bg-gray-900/70 backdrop-blur-md border border-gray-800 hover:border-cyan-800 transition-all duration-300 overflow-hidden group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="bg-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <div className="mt-4 flex items-center text-cyan-500 font-medium">
          <span>Explore</span>
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
    </Card>
  )
}

// Upload form component with original functionality
function UploadForm() {
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  const uploadBook = async () => {
    const fileInput = document.querySelector("#upload-book") as HTMLInputElement
    if (!fileInput?.files?.length) {
      setUploadStatus({ success: false, message: "Please select a file to upload" })
      return
    }

    if (!subject.trim()) {
      setUploadStatus({ success: false, message: "Please enter a subject" })
      return
    }

    if (!grade.trim()) {
      setUploadStatus({ success: false, message: "Please enter a grade" })
      return
    }

    setIsUploading(true)
    setUploadStatus(null)

    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append("book", file)
    formData.append("subject", subject)
    formData.append("grade", grade)

    try {
      const response = await fetch("http://localhost:5000/admin/content/generateNotes", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("Response:", data)
      setUploadStatus({ success: true, message: "Upload successful!" })
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus({ success: false, message: "Upload failed. Please try again." })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter subject"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-300">
            Grade Level
          </label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter grade"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="upload-book" className="block text-sm font-medium text-gray-300">
            Upload a book
          </label>
          <input
            type="file"
            id="upload-book"
            accept=".pdf"
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-2 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
          />
        </div>
        <div className="pt-2">
          <Button
            onClick={uploadBook}
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" /> Upload Book
              </>
            )}
          </Button>
        </div>

        {uploadStatus && (
          <div
            className={`mt-4 p-3 rounded-md ${uploadStatus.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}
          >
            {uploadStatus.message}
          </div>
        )}
      </div>
    </div>
  )
}
