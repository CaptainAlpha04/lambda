"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Heart,
  LineChart,
  ListChecks,
  MapPin,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Youtube,
  Headphones,
  Laptop,
  BarChart,
  Twitter,
  Globe,
  Bookmark,
  TrendingUp,
  Users,
} from "lucide-react"

// Define the career data type based on the updated JSON schema
type CareerData = {
  career: {
    title: string
    reason: string
    average_salary: {
      amount: number
      currency: string
      source: string
    }
    job_outlook: {
      growth_rate: number
      years: number
      source: string
    }
    similar_careers: Array<{
      title: string
      description: string
      average_salary: number
      job_growth: number
      work_life_balance: string
      entry_barrier: string
    }>
    top_companies: Array<{
      name: string
      description: string
      average_salary: number
      location: string
    }>
    career_path: Array<{
      title: string
      description: string
      average_salary: number
      years_of_experience: string
    }>
    job_description: string
    day_to_day_activities: string[]
    work_environment: string[]
    education_prerequisites: string[]
    recommended_certifications: Array<{
      name: string
      provider: string
      level: string
    }>
    skills_required: Array<{
      name: string
      description: string
      importance: string
      proficiency_level: string | number
    }>
    recommended_websites: Array<{
      name: string
      description: string
      link: string
    }>
    recommended_books: Array<{
      title: string
      author: string
      description: string
      buy_link: string
    }>
    recommended_youtube_channels: Array<{
      channel_name: string
      description: string
      link: string
    }>
    recommended_github_repositories: Array<{
      repo_name: string
      description: string
      link: string
    }>
    recommended_influencers: Array<{
      name: string
      description: string
      link: string
    }>
    recommended_podcasts: Array<{
      title: string
      description: string
      link: string
    }>
    recommended_online_courses: Array<{
      title: string
      platform: string
      description: string
      link: string
    }>
    recommended_projects: Array<{
      title: string
      difficulty_level: string
      description: string
      technologies_used: string[]
      project_details: string
    }>
    open_source_projects: Array<{
      name: string
      description: string
      difficulty: string
      link: string
    }>
    career_roadmap: Array<{
      title: string
      description: string
      technologies_to_learn: string[]
    }>
    career_comparison: {
      work_life_balance: string
      entry_barrier: string
    }
  }
}

interface CareerResultsProps {
  data: CareerData // Type this properly based on your actual API response
  onReset: () => void
  searchQuery: string
}

export default function CareerResults({ data, onReset, searchQuery }: CareerResultsProps) {
  
  const career = data.career


  // Helper function to get color based on difficulty level
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "green"
      case "intermediate":
        return "blue"
      case "advanced":
        return "purple"
      default:
        return "slate"
    }
  }

  // Helper function to get color based on importance
  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case "essential":
        return "purple"
      case "important":
        return "blue"
      default:
        return "slate"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/career"
            className="inline-flex items-center text-slate-600 hover:text-purple-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assessment
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge className="bg-purple-100 text-purple-800 mb-3">Personalized Recommendation</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{career.title}</h1>
              <p className="text-slate-600">{career.reason}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
                <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                <div>
                  <div className="text-sm text-slate-500">Average Yearly Salary</div>
                  <div className="text-xl font-bold">${career.average_salary.amount.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm text-slate-500">Job Growth</div>
                  <div className="text-xl font-bold">
                    {career.job_outlook.growth_rate}%{" "}
                    <span className="text-xs font-normal text-slate-500">by {career.job_outlook.years}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto p-1">
            <TabsTrigger value="overview" className="py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="py-2">
              Skills & Education
            </TabsTrigger>
            <TabsTrigger value="path" className="py-2">
              Career Path
            </TabsTrigger>
            <TabsTrigger value="resources" className="py-2">
              Learning Resources
            </TabsTrigger>
            <TabsTrigger value="projects" className="py-2">
              Projects
            </TabsTrigger>
            <TabsTrigger value="similar" className="py-2">
              Similar Careers
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Why This Career */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      <CardTitle>Why This Career Is Perfect For You</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Matches Your Technical Interests</h3>
                          <p className="text-slate-600">
                            Your interest in technology and problem-solving aligns perfectly with the core skills needed
                            for software engineering.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Star className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Strong Job Market & Growth</h3>
                          <p className="text-slate-600">
                            With a {career.job_outlook.growth_rate}% projected growth rate, software engineering offers
                            excellent job security and career advancement opportunities.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <LineChart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Competitive Compensation</h3>
                          <p className="text-slate-600">
                            Software engineers enjoy above-average salaries with excellent benefits and perks,
                            especially at top tech companies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Career Description */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <BriefcaseBusiness className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Career Description</CardTitle>
                    </div>
                    <CardDescription>What {career.title} do and where they work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{career.job_description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-medium flex items-center mb-2">
                          <Building2 className="h-4 w-4 mr-2 text-slate-700" />
                          Work Environment
                        </h3>
                        <ul className="space-y-1 text-slate-600">
                          {career.work_environment.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-2 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-medium flex items-center mb-2">
                          <ListChecks className="h-4 w-4 mr-2 text-slate-700" />
                          Day-to-Day Activities
                        </h3>
                        <ul className="space-y-1 text-slate-600">
                          {career.day_to_day_activities.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-2 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Companies */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Top Companies Hiring Software Engineers</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {career.top_companies.map((company, index) => (
                        <div
                          key={index}
                          className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="p-4 border-b border-slate-100">
                            <h3 className="font-bold text-lg">{company.name}</h3>
                            <div className="flex items-center text-sm text-slate-500">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>{company.location}</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-slate-600 mb-3">{company.description}</p>
                            <div className="flex items-center text-sm font-medium text-green-600">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              <span>Avg. Salary: ${company.average_salary.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Career Path Summary */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Career Progression</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {career.career_path.map((role, index) => (
                        <div key={index} className="relative pl-8 pb-4">
                          {index < career.career_path.length - 1 && (
                            <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-slate-200"></div>
                          )}
                          <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center z-10">
                            <span className="font-bold text-indigo-600 text-xs">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-md">{role.title}</h3>
                            <p className="text-sm text-slate-600 mb-1">{role.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                ${role.average_salary.toLocaleString()}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {role.years_of_experience} years
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const element = document.querySelector('[data-value="path"]') as HTMLElement;
                        element?.click();
                      }}
                    >
                      View Detailed Career Path
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Skills Preview */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Key Skills</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {career.skills_required.slice(0, 4).map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-slate-500">{skill.importance}</span>
                          </div>
                          <Progress value={Number(skill.proficiency_level)} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const element = document.querySelector('[data-value="skills"]') as HTMLElement;
                        element?.click();
                      }}
                    >
                      View All Skills
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Learning Resources Preview */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Learning Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Youtube className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Top YouTube Channels</h3>
                        <p className="text-xs text-slate-600">
                          {career.recommended_youtube_channels
                            .slice(0, 2)
                            .map((c) => c.channel_name)
                            .join(", ")}{" "}
                          and more
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Recommended Books</h3>
                        <p className="text-xs text-slate-600">
                          {career.recommended_books
                            .slice(0, 2)
                            .map((b) => b.title)
                            .join(", ")}{" "}
                          and more
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Online Courses</h3>
                        <p className="text-xs text-slate-600">
                          {career.recommended_online_courses
                            .slice(0, 2)
                            .map((c) => c.title.split(":")[0])
                            .join(", ")}{" "}
                          and more
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const element = document.querySelector('[data-value="resources"]') as HTMLElement;
                        element?.click();
                      }}
                    >
                      Explore All Resources
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Skills & Education Tab */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Required */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    <CardTitle>Skills Required</CardTitle>
                  </div>
                  <CardDescription className="text-white/80">
                    Key skills needed to succeed as a {career.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {career.skills_required.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <p className="text-sm text-slate-600">{skill.description}</p>
                          </div>
                          <Badge
                            className={`${
                              skill.importance === "Essential"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {skill.importance}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Advanced</span>
                          </div>
                          <Progress value={Number(skill.proficiency_level)} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Prerequisites */}
              <div className="space-y-8">
                <Card className="shadow-md border-slate-200">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      <CardTitle>Education Prerequisites</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Educational pathways to become a {career.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {career.education_prerequisites.map((edu, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-slate-600">{edu}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Certifications */}
                <Card className="shadow-md border-slate-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Bookmark className="h-5 w-5 mr-2 text-slate-700" />
                      <CardTitle>Recommended Certifications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {career.recommended_certifications.map((cert, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg">
                          <h3 className="font-medium text-sm">{cert.name}</h3>
                          <p className="text-xs text-slate-500">{cert.provider}</p>
                          <Badge className="mt-2 bg-slate-200 text-slate-700 text-xs">{cert.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Career Path Tab */}
          <TabsContent value="path">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Career Progression */}
              <Card className="shadow-md border-slate-200 lg:col-span-1">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    <CardTitle>Career Progression</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                    {career.career_path.map((role, index) => (
                      <div key={index} className="relative pl-12 pb-8">
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center z-10">
                          <span className="font-bold text-indigo-600">{index + 1}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{role.title}</h3>
                        <p className="text-slate-600 mb-3 text-sm">{role.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            ${role.average_salary.toLocaleString()}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {role.years_of_experience} years
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Roadmap */}
              <Card className="shadow-md border-slate-200 lg:col-span-2">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <CardTitle>Recommended Career Roadmap</CardTitle>
                  </div>
                  <CardDescription className="text-white/80">
                    A step-by-step guide to becoming a {career.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {career.career_roadmap.map((stage, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="font-bold text-purple-600 text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-1">{stage.title}</h3>
                          <p className="text-slate-600 mb-3">{stage.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {stage.technologies_to_learn.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="bg-slate-50">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Books */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-amber-600 text-white">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <CardTitle>Recommended Books</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {career.recommended_books.map((book, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-16 h-20 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-8 w-8 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{book.title}</h3>
                          <p className="text-sm text-slate-500">{book.author}</p>
                          <p className="text-sm text-slate-600 mb-2">{book.description}</p>
                          <a
                            href={book.buy_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            View on Amazon
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Channels */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-red-600 text-white">
                  <div className="flex items-center">
                    <Youtube className="h-5 w-5 mr-2" />
                    <CardTitle>YouTube Channels</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {career.recommended_youtube_channels.map((channel, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Youtube className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{channel.channel_name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{channel.description}</p>
                          <a
                            href={channel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            Visit Channel
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Online Courses */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-blue-600 text-white">
                  <div className="flex items-center">
                    <Laptop className="h-5 w-5 mr-2" />
                    <CardTitle>Online Courses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {career.recommended_online_courses.map((course, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Laptop className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-xs text-slate-500">{course.platform}</p>
                          <p className="text-sm text-slate-600 mb-2">{course.description}</p>
                          <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            View Course
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* GitHub Repositories */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-slate-800 text-white">
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    <CardTitle>GitHub Repositories</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {career.recommended_github_repositories.map((repo, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center flex-shrink-0">
                          <Code className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="font-medium">{repo.repo_name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{repo.description}</p>
                          <a
                            href={repo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            View Repository
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Websites */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-green-600 text-white">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    <CardTitle>Recommended Websites</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {career.recommended_websites.map((website, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Globe className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{website.name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{website.description}</p>
                          <a
                            href={website.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            Visit Website
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Podcasts & Influencers */}
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-purple-600 text-white">
                  <div className="flex items-center">
                    <Headphones className="h-5 w-5 mr-2" />
                    <CardTitle>Podcasts & Influencers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-3">Recommended Podcasts</h3>
                  <div className="space-y-3 mb-6">
                    {career.recommended_podcasts.slice(0, 3).map((podcast, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Headphones className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{podcast.title}</h4>
                          <p className="text-xs text-slate-600 mb-1">{podcast.description}</p>
                          <a
                            href={podcast.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center"
                          >
                            Listen
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-medium mb-3">Industry Influencers</h3>
                  <div className="space-y-3">
                    {career.recommended_influencers.slice(0, 3).map((influencer, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Twitter className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{influencer.name}</h4>
                          <p className="text-xs text-slate-600 mb-1">{influencer.description}</p>
                          <a
                            href={influencer.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center"
                          >
                            Follow
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-8">
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    <CardTitle>Recommended Projects</CardTitle>
                  </div>
                  <CardDescription className="text-white/80">
                    Build these projects to develop your skills and enhance your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {career.recommended_projects.map((project, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <div
                          className={`bg-${getDifficultyColor(project.difficulty_level)}-50 p-4 border-b border-slate-200`}
                        >
                          <Badge
                            className={`bg-${getDifficultyColor(project.difficulty_level)}-100 text-${getDifficultyColor(project.difficulty_level)}-800 mb-2`}
                          >
                            {project.difficulty_level}
                          </Badge>
                          <h3 className="font-bold text-lg">{project.title}</h3>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-slate-600 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies_used.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="bg-slate-50 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg mb-4">
                            <h4 className="text-sm font-medium mb-1">Project Details</h4>
                            <p className="text-xs text-slate-600">{project.project_details}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-${getDifficultyColor(project.difficulty_level)}-600 hover:text-${getDifficultyColor(project.difficulty_level)}-800 hover:bg-${getDifficultyColor(project.difficulty_level)}-50 w-full`}
                          >
                            View Project Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-slate-200">
                <CardHeader>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-slate-700" />
                    <CardTitle>Open Source Contribution Opportunities</CardTitle>
                  </div>
                  <CardDescription>
                    Contribute to these open source projects to gain real-world experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {career.open_source_projects.map((project, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center flex-shrink-0">
                          <Code className="h-5 w-5 text-slate-700" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{project.name}</h3>
                            <Badge variant="outline" className="bg-slate-100">
                              {project.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                          >
                            View Repository
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Similar Careers Tab */}
          <TabsContent value="similar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {career.similar_careers.map((similarCareer, index) => (
                <Card key={index} className="shadow-md border-slate-200">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <CardTitle>{similarCareer.title}</CardTitle>
                    <CardDescription className="text-white/80">Similar to {career.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-600 mb-4">{similarCareer.description}</p>

                    <div className="flex items-center mb-4">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <div className="text-sm text-slate-500">Average Yearly Salary</div>
                        <div className="text-lg font-bold">${similarCareer.average_salary.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm text-slate-500">Job Growth</div>
                        <div className="text-lg font-bold">{similarCareer.job_growth}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">Work-Life Balance</div>
                        <div className="font-medium">{similarCareer.work_life_balance}</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded">
                        <div className="text-xs text-slate-500">Entry Barrier</div>
                        <div className="font-medium">{similarCareer.entry_barrier}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Explore This Career
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="shadow-md border-slate-200 md:col-span-3">
                <CardHeader>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-slate-700" />
                    <CardTitle>Career Comparison</CardTitle>
                  </div>
                  <CardDescription>How {career.title} compares to similar careers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4">Career</th>
                          <th className="text-left py-3 px-4">Avg. Salary</th>
                          <th className="text-left py-3 px-4">Job Growth</th>
                          <th className="text-left py-3 px-4">Work-Life Balance</th>
                          <th className="text-left py-3 px-4">Entry Barrier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200 bg-purple-50">
                          <td className="py-3 px-4 font-medium">{career.title}</td>
                          <td className="py-3 px-4">${career.average_salary.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{career.job_outlook.growth_rate}%</td>
                          <td className="py-3 px-4">{career.career_comparison.work_life_balance}</td>
                          <td className="py-3 px-4">{career.career_comparison.entry_barrier}</td>
                        </tr>
                        {career.similar_careers.map((similarCareer, index) => (
                          <tr key={index} className="border-b border-slate-200">
                            <td className="py-3 px-4 font-medium">{similarCareer.title}</td>
                            <td className="py-3 px-4">${similarCareer.average_salary.toLocaleString()}</td>
                            <td className="py-3 px-4">{similarCareer.job_growth}%</td>
                            <td className="py-3 px-4">{similarCareer.work_life_balance}</td>
                            <td className="py-3 px-4">{similarCareer.entry_barrier}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

