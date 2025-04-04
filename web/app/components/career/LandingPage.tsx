'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Compass, MapPin, Search } from "lucide-react"

interface CareerLandingProps {
    onSearch: (query: string) => void
}

export default function LandingPage({ onSearch }: CareerLandingProps) {
    const [inputValue, setInputValue] = useState("")
    const [placeholderCareer, setPlaceholderCareer] = useState("")

    useEffect(() => {
        const careers = [
            "Software Engineer",
            "Data Scientist",
            "UX Designer",
            "Product Manager",
            "Marketing Specialist",
            "Financial Analyst",
            "Cybersecurity Analyst",
            "Web Developer",
            "Graphic Designer",
            "Doctor",
            "Nurse",
            "Teacher",
        ]
        setPlaceholderCareer(careers[Math.floor(Math.random() * careers.length)])
    }, [])
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            if (inputValue.trim()) {
            onSearch(inputValue.trim())
        }
    }   

    return (
        <div className="min-h-screen">

        {/* Hero Section with Gradient Background */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
            {/* Logo and Title */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Compass className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-4">Career <span className="font-extrabold">Coach!</span></h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Your AI-powered guide to discovering the perfect career path
                </p>
            </div>

            {/* Direct Career Search */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Know your profession?</h2>
            <p className="text-white/80 mb-6">
              Enter your desired profession to get an AI-generated roadmap and resource guide instantly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-900/50 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={`I want to be a ${placeholderCareer}...`}
                  className="pl-10 py-6 text-lg rounded-full bg-white/90 border-transparent focus:border-white focus:ring-white text-purple-900 placeholder:text-purple-900/50"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="bg-white hover:bg-white/90 text-purple-900 text-lg py-6 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                <span>Get Roadmap</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Roadmaps</h3>
                <p className="text-white/80">Get detailed step-by-step guides for any profession</p>
                </div>
                <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                    >
                    <path d="M12 2v1"></path>
                    <path d="M12 21v1"></path>
                    <path d="m4.6 4.6.7.7"></path>
                    <path d="m18.7 18.7.7.7"></path>
                    <path d="M2 12h1"></path>
                    <path d="M21 12h1"></path>
                    <path d="m4.6 19.4.7-.7"></path>
                    <path d="m18.7 5.3.7-.7"></path>
                    <path d="M12 10v6"></path>
                    <path d="m10 12 2-2 2 2"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Guidance</h3>
                <p className="text-white/80">Personalized advice based on your unique skills and goals</p>
                </div>
                <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                    >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Insights</h3>
                <p className="text-white/80">Learn from others who have successfully changed careers</p>
                </div>
            </div>
            </div>
        </div>

        {/* Second Section */}
        <div className="bg-slate-50 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
            {/* OR Divider */}
            <div className="flex items-center justify-center mb-12">
                <div className="h-px bg-slate-200 flex-grow"></div>
                <span className="px-4 text-slate-500 font-medium">OR</span>
                <div className="h-px bg-slate-200 flex-grow"></div>
            </div>

            {/* Personalized Option */}
            <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 shadow-2xl group">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative z-10 p-8 md:p-10">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                    {/* Content */}
                    <div className="md:col-span-3 text-white">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8"
                        >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Not sure what's right for you?</h2>
                    <p className="text-white/90 text-lg mb-6 md:pr-6">
                        Let's discover your perfect career path through an interactive assessment that analyzes your unique
                        skills, interests, and goals.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span className="text-sm">Personalized Results</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">Takes 5 Minutes</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span className="text-sm">100% Free</span>
                        </div>
                    </div>
                    <Button className="bg-white hover:bg-white/90 text-purple-700 text-lg py-7 px-8 rounded-full transition-all duration-300 hover:shadow-lg group-hover:scale-105 font-semibold">
                        <span>Start Your Career Discovery</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    </div>

                    {/* Visual Element */}
                    <div className="md:col-span-2 flex justify-center">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full animate-pulse-slow"></div>
                        <div className="absolute inset-2 bg-white/20 backdrop-blur-md rounded-full animate-pulse-slow animation-delay-500"></div>
                        <div className="absolute inset-4 bg-white/30 backdrop-blur-md rounded-full animate-pulse-slow animation-delay-1000"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                        <Compass className="h-24 w-24 text-white" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Enhanced Trust Indicators for Students */}
            <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Trusted by Students Everywhere</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Join thousands of students who have discovered their ideal career path and academic journey with Career
                    Coach
                </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-purple-600 font-bold text-3xl mb-1">5,000+</div>
                    <div className="text-slate-700 text-sm">Career Transitions</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                    <div className="text-indigo-600 font-bold text-3xl mb-1">250+</div>
                    <div className="text-slate-700 text-sm">Universities</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-blue-600 font-bold text-3xl mb-1">98%</div>
                    <div className="text-slate-700 text-sm">Student Satisfaction</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <div className="text-emerald-600 font-bold text-3xl mb-1">75%</div>
                    <div className="text-slate-700 text-sm">Found Jobs Faster</div>
                </div>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 relative">
                    <div className="absolute -top-3 -left-3 text-purple-500 text-4xl">"</div>
                    <p className="text-slate-700 mb-4">
                    Career Coach helped me figure out I wanted to study Computer Science instead of Engineering. Best
                    decision ever!
                    </p>
                    <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                        <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">Alex K.</div>
                        <div className="text-sm text-slate-500">Computer Science Student</div>
                    </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 relative">
                    <div className="absolute -top-3 -left-3 text-indigo-500 text-4xl">"</div>
                    <p className="text-slate-700 mb-4">
                    The personalized roadmap showed me exactly what internships to apply for. Now I'm at my dream company!
                    </p>
                    <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3">
                        <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">Jamie T.</div>
                        <div className="text-sm text-slate-500">Business Major</div>
                    </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 relative">
                    <div className="absolute -top-3 -left-3 text-blue-500 text-4xl">"</div>
                    <p className="text-slate-700 mb-4">
                    I was undecided about my major until Career Coach matched me with UX Design. Now I'm thriving!
                    </p>
                    <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                        <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">Taylor M.</div>
                        <div className="text-sm text-slate-500">Design Student</div>
                    </div>
                    </div>
                </div>
                </div>

                {/* University Partnerships */}
                <div className="text-center">
                <p className="text-sm text-slate-500 mb-6">TRUSTED BY TOP UNIVERSITIES</p>
                <div className="flex flex-wrap justify-center items-center gap-8">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                    <img src="https://ur.uni.edu/sites/default/files/inline-uploads/uni_primaryrgb.png" alt="University logo" />
                    </div>
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                    <img src="https://ur.uni.edu/sites/default/files/inline-uploads/uni_primaryrgb.png" alt="University logo" />
                    </div>
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                    <img src="https://ur.uni.edu/sites/default/files/inline-uploads/uni_primaryrgb.png" alt="University logo" />
                    </div>
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                    <img src="https://ur.uni.edu/sites/default/files/inline-uploads/uni_primaryrgb.png" alt="University logo" />
                    </div>
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2">
                    <img src="https://ur.uni.edu/sites/default/files/inline-uploads/uni_primaryrgb.png" alt="University logo" />
                    </div>
                </div>
                </div>

                {/* Student Benefits */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600"
                    >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Academic Guidance</h3>
                    <p className="text-slate-600 text-sm">
                    Get recommendations for majors, minors, and courses that align with your career goals
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-600"
                    >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Internship Matching</h3>
                    <p className="text-slate-600 text-sm">
                    Discover internship opportunities that build the right skills for your target career
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                    >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Resume Building</h3>
                    <p className="text-slate-600 text-sm">
                    Learn exactly what skills and experiences to highlight for your dream job
                    </p>
                </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg py-6 px-10 rounded-full transition-all duration-300 hover:shadow-lg ">
                    <span>Start Your Free Career Assessment</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-slate-500 text-sm mt-4">No credit card required • Perfect for students at any stage</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
