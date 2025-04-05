"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Compass, ArrowRight, Plus, X, HelpCircle, Info, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the form data type
type FormData = {
  education: {
    grade: string
    major: string
    subjects: string[]
    gpa: string
  }
  interests: {
    hobbies: string[]
    strengths: string[]
    experience: number
  }
  personality: {
    workStyles: string[]
    preferWorkingWith: string
    approachToChallenges: string
    environment: string
  }
  preferences: {
    careerImportance: string[]
    workLocation: string
    travelPreference: string
  }
  goals: {
    careerFields: string[]
    learningStyle: string
    challenges: string
    additionalInfo: string
  }
}

interface PersonalizedFormProps {
  onSubmit: (data: FormData) => void
}

export default function PersonalizedForm({ onSubmit }: PersonalizedFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basics")
  const [progress, setProgress] = useState(20)
  const [subjects, setSubjects] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [strengths, setStrengths] = useState<string[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newStrength, setNewStrength] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [experienceYears, setExperienceYears] = useState<number>(0)
  const [selectedWorkStyles, setSelectedWorkStyles] = useState<string[]>([])
  const [selectedCareerImportance, setSelectedCareerImportance] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    education: {
      grade: "",
      major: "",
      subjects: [],
      gpa: "",
    },
    interests: {
      hobbies: [],
      strengths: [],
      experience: 0,
    },
    personality: {
      workStyles: [],
      preferWorkingWith: "",
      approachToChallenges: "",
      environment: "",
    },
    preferences: {
      careerImportance: [],
      workLocation: "",
      travelPreference: "",
    },
    goals: {
      careerFields: [],
      learningStyle: "",
      challenges: "",
      additionalInfo: "",
    },
  })

  // Update form data when values change
  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     education: {
  //       ...prev.education,
  //       subjects,
  //     },
  //     interests: {
  //       ...prev.interests,
  //       hobbies: interests,
  //       strengths,
  //       experience: experienceYears,
  //     },
  //     personality: {
  //       ...prev.personality,
  //       workStyles: selectedWorkStyles,
  //     },
  //     preferences: {
  //       ...prev.preferences,
  //       careerImportance: selectedCareerImportance,
  //     },
  //   }))
  // }, [subjects, interests, strengths, experienceYears, selectedWorkStyles, selectedCareerImportance])

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      const updatedSubjects = [...subjects, newSubject];
      setSubjects(updatedSubjects);
      setFormData(prev => ({
        ...prev,
        education: {
          ...prev.education,
          subjects: updatedSubjects
        }
      }));
      setNewSubject("");
    }
  }

  const removeSubject = (subject: string) => {
    const updatedSubjects = subjects.filter((s) => s !== subject);
    setSubjects(updatedSubjects);
    setFormData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        subjects: updatedSubjects
      }
    }));
  }

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      const updatedInterests = [...interests, newInterest];
      setInterests(updatedInterests);
      setFormData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          hobbies: updatedInterests
        }
      }));
      setNewInterest("");
    }
  }

  const removeInterest = (interest: string) => {
    const updatedInterests = interests.filter((i) => i !== interest);
    setInterests(updatedInterests);
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        hobbies: updatedInterests
      }
    }));
  }

  const addStrength = () => {
    if (newStrength && !strengths.includes(newStrength)) {
      const updatedStrengths = [...strengths, newStrength];
      setStrengths(updatedStrengths);
      setFormData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          strengths: updatedStrengths
        }
      }));
      setNewStrength("");
    }
  }

  const removeStrength = (strength: string) => {
    const updatedStrengths = strengths.filter((s) => s !== strength);
    setStrengths(updatedStrengths);
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        strengths: updatedStrengths
      }
    }));
  }

  const handleTabChange = (value: string) => {
    // Validate current tab before moving to the next one
    if (activeTab === "basics" && value !== "basics") {
      if (!formData.education.grade) {
        setErrors({ grade: "Please select your education level" })
        return
      }
    }

    if (activeTab === "personality" && value !== "personality" && value !== "interests") {
      if (!formData.personality.preferWorkingWith) {
        setErrors({ preferWorkingWith: "Please select your preference" })
        return
      }
      if (!formData.personality.approachToChallenges) {
        setErrors({ approachToChallenges: "Please select your approach" })
        return
      }
      if (!formData.personality.environment) {
        setErrors({ environment: "Please select your preferred environment" })
        return
      }
    }

    if (activeTab === "preferences" && value !== "preferences" && value !== "personality") {
      if (selectedCareerImportance.length === 0) {
        setErrors({ careerImportance: "Please select at least one option" })
        return
      }
      if (!formData.preferences.workLocation) {
        setErrors({ workLocation: "Please select your preferred work location" })
        return
      }
      if (!formData.preferences.travelPreference) {
        setErrors({ travelPreference: "Please select your travel preference" })
        return
      }
    }

    // Clear errors when changing tabs
    setErrors({})
    setActiveTab(value)

    // Update progress based on tab
    switch (value) {
      case "basics":
        setProgress(20)
        break
      case "interests":
        setProgress(40)
        break
      case "personality":
        setProgress(60)
        break
      case "preferences":
        setProgress(80)
        break
      case "goals":
        setProgress(100)
        break
    }
  }

  const handleWorkStyleChange = (style: string) => {
    let updatedWorkStyles;
    if (selectedWorkStyles.includes(style)) {
      updatedWorkStyles = selectedWorkStyles.filter(s => s !== style);
    } else {
      updatedWorkStyles = [...selectedWorkStyles, style];
    }
    setSelectedWorkStyles(updatedWorkStyles);
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        workStyles: updatedWorkStyles
      }
    }));
  }

  const handleCareerImportanceChange = (value: string) => {
    // If already selected, remove it
    if (selectedCareerImportance.includes(value)) {
      const newImportance = selectedCareerImportance.filter(v => v !== value);
      setSelectedCareerImportance(newImportance);
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          careerImportance: newImportance
        }
      }));
    } 
    // If not selected and under the limit, add it
    else if (selectedCareerImportance.length < 3) {
      const newImportance = [...selectedCareerImportance, value];
      setSelectedCareerImportance(newImportance);
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          careerImportance: newImportance
        }
      }));
    }
    // Otherwise do nothing (at max selections)
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.education.grade) {
      newErrors.grade = "Please select your education level"
    }

    if (selectedCareerImportance.length === 0) {
      newErrors.careerImportance = "Please select at least one career importance"
    }

    if (!formData.personality.preferWorkingWith) {
      newErrors.preferWorkingWith = "Please select your preference"
    }

    if (!formData.personality.approachToChallenges) {
      newErrors.approachToChallenges = "Please select your approach"
    }

    if (!formData.personality.environment) {
      newErrors.environment = "Please select your preferred environment"
    }

    if (!formData.preferences.workLocation) {
      newErrors.workLocation = "Please select your preferred work location"
    }

    if (!formData.preferences.travelPreference) {
      newErrors.travelPreference = "Please select your travel preference"
    }

    if (!formData.goals.learningStyle) {
      newErrors.learningStyle = "Please select your learning style"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    // Pass the form data to the parent component
    onSubmit(formData)
  }

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <Compass className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold">Career Coach</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Perfect Career Path</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Not sure what career is right for you? Answer a few questions about yourself, and our AI will analyze your
            unique profile to recommend personalized career paths that match your interests, strengths, and goals.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Getting Started</span>
            <span>Almost Done!</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Your Profile</CardTitle>
            <CardDescription className="text-white/80">
              The more information you provide, the more personalized your career recommendations will be
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-5 w-full rounded-none bg-slate-100">
                  <TabsTrigger
                    value="basics"
                    className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600"
                  >
                    Basics
                  </TabsTrigger>
                  <TabsTrigger
                    value="interests"
                    className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600"
                  >
                    Interests
                  </TabsTrigger>
                  <TabsTrigger
                    value="personality"
                    className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600"
                  >
                    Personality
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600"
                  >
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="goals"
                    className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600"
                  >
                    Goals
                  </TabsTrigger>
                </TabsList>

                {/* Basics Tab */}
                <TabsContent value="basics" className="p-6 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium border-l-4 border-purple-600 pl-3">Basic Information</h3>
                    <p className="text-sm text-slate-500">
                      Let's start with some basic information about your education
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="grade">
                          Current Grade/Education Level <span className="text-red-500">*</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                This helps us recommend careers that align with your current educational stage
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        required
                        value={formData.education.grade}
                        onValueChange={(value) => handleInputChange("education", "grade", value)}
                      >
                        <SelectTrigger id="grade" className={errors.grade ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="middle-school">Middle School</SelectItem>
                          <SelectItem value="high-school-9">High School - Grade 9</SelectItem>
                          <SelectItem value="high-school-10">High School - Grade 10</SelectItem>
                          <SelectItem value="high-school-11">High School - Grade 11</SelectItem>
                          <SelectItem value="high-school-12">High School - Grade 12</SelectItem>
                          <SelectItem value="college-freshman">College - Freshman</SelectItem>
                          <SelectItem value="college-sophomore">College - Sophomore</SelectItem>
                          <SelectItem value="college-junior">College - Junior</SelectItem>
                          <SelectItem value="college-senior">College - Senior</SelectItem>
                          <SelectItem value="graduate">Graduate Student</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="major">Current/Intended Major (if applicable)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                If you're undecided, that's completely fine! Just leave this blank or select "Undecided"
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        value={formData.education.major}
                        onValueChange={(value) => handleInputChange("education", "major", value)}
                      >
                        <SelectTrigger id="major">
                          <SelectValue placeholder="Select or type your major (optional)" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="undecided">Undecided</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="psychology">Psychology</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="communications">Communications</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Favorite Subjects</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The subjects you enjoy most in school can reveal potential career paths you might find
                                fulfilling
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-slate-200">
                            {subject}
                            <button
                              type="button"
                              onClick={() => removeSubject(subject)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          placeholder="Add a subject (e.g., Mathematics, Art, Biology)"
                          className="flex-1"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
                        />
                        <Button type="button" onClick={addSubject} variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">Press Enter or click the plus icon to add</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="gpa">GPA (if applicable)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                This is optional and helps us understand your academic performance
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        value={formData.education.gpa}
                        onValueChange={(value) => handleInputChange("education", "gpa", value)}
                      >
                        <SelectTrigger id="gpa" className="!bg-white">
                          <SelectValue placeholder="Select your GPA range (optional)" />
                        </SelectTrigger>
                        <SelectContent className="bg-white" >
                          <SelectItem value="4.0+">4.0 or higher</SelectItem>
                          <SelectItem value="3.5-3.99">3.5 - 3.99</SelectItem>
                          <SelectItem value="3.0-3.49">3.0 - 3.49</SelectItem>
                          <SelectItem value="2.5-2.99">2.5 - 2.99</SelectItem>
                          <SelectItem value="2.0-2.49">2.0 - 2.49</SelectItem>
                          <SelectItem value="below-2.0">Below 2.0</SelectItem>
                          <SelectItem value="not-applicable">Not applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="button"
                        onClick={() => handleTabChange("interests")}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Interests Tab */}
                  <TabsContent value="interests" className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium border-l-4 border-indigo-600 pl-3">Interests & Strengths</h3>
                      <p className="text-sm text-slate-500">Tell us about what you enjoy and what you're good at</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Hobbies & Interests</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The activities you enjoy in your free time can reveal career paths you might find
                                fulfilling
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="secondary"
                            className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-indigo-100"
                          >
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add an interest (e.g., Programming, Music, Sports)"
                          className="flex-1"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                        />
                        <Button type="button" onClick={addInterest} variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">Press Enter or click the plus icon to add</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Personal Strengths</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                What are you naturally good at? These could be skills, talents, or personal qualities
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {strengths.map((strength) => (
                          <Badge
                            key={strength}
                            variant="secondary"
                            className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-blue-100"
                          >
                            {strength}
                            <button
                              type="button"
                              onClick={() => removeStrength(strength)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newStrength}
                          onChange={(e) => setNewStrength(e.target.value)}
                          placeholder="Add a strength (e.g., Problem-solving, Creativity, Leadership)"
                          className="flex-1"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStrength())}
                        />
                        <Button type="button" onClick={addStrength} variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">Press Enter or click the plus icon to add</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="experience">Years of Experience (if any)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                If you have experience in a particular field, this helps us tailor recommendations
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-grow">
                          <Slider
                            value={[experienceYears]}
                            max={10}
                            step={1}
                            onValueChange={(value) => {
                              setExperienceYears(value[0]);
                              setFormData(prev => ({
                                ...prev,
                                interests: {
                                  ...prev.interests,
                                  experience: value[0]
                                }
                              }));
                            }}
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>0 years</span>
                            <span>5 years</span>
                            <span>10+ years</span>
                          </div>
                        </div>
                        <div className="w-20">
                          <Input
                            type="number"
                            min={0}
                            max={50}
                            value={experienceYears}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              setExperienceYears(value);
                              setFormData(prev => ({
                                ...prev,
                                interests: {
                                  ...prev.interests,
                                  experience: value
                                }
                              }));
                            }}
                            className="text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => handleTabChange("basics")}>
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleTabChange("personality")}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Personality Tab */}
                  <TabsContent value="personality" className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium border-l-4 border-blue-600 pl-3">Personality & Work Style</h3>
                      <p className="text-sm text-slate-500">
                        Understanding your personality helps us recommend careers that match your natural tendencies
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>How would you describe your work style?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div
                            className={`flex items-start space-x-2 p-3 rounded-md transition-colors ${selectedWorkStyles.includes("independent") ? "bg-purple-50 border border-purple-200" : "hover:bg-slate-50"}`}
                          >
                            <Checkbox
                              id="independent"
                              className="text-white"
                              checked={selectedWorkStyles.includes("independent")}
                              onCheckedChange={() => handleWorkStyleChange("independent")}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="independent"
                                
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Independent Worker
                              </Label>
                              <p className="text-xs text-slate-500">
                                I prefer working on my own and taking ownership of tasks
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-2 p-3 rounded-md transition-colors ${selectedWorkStyles.includes("collaborative") ? "bg-purple-50 border border-purple-200" : "hover:bg-slate-50"}`}
                          >
                            <Checkbox
                              id="collaborative"
                              className="text-white"
                              checked={selectedWorkStyles.includes("collaborative")}
                              onCheckedChange={() => handleWorkStyleChange("collaborative")}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="collaborative"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Collaborative
                              </Label>
                              <p className="text-xs text-slate-500">
                                I enjoy working in teams and bouncing ideas off others
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-2 p-3 rounded-md transition-colors ${selectedWorkStyles.includes("structured") ? "bg-purple-50 border border-purple-200" : "hover:bg-slate-50"}`}
                          >
                            <Checkbox
                              id="structured"
                              className="text-white"
                              checked={selectedWorkStyles.includes("structured")}
                              onCheckedChange={() => handleWorkStyleChange("structured")}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="structured"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Structured
                              </Label>
                              <p className="text-xs text-slate-500">
                                I prefer clear guidelines and established processes
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-2 p-3 rounded-md transition-colors ${selectedWorkStyles.includes("flexible") ? "bg-purple-50 border border-purple-200" : "hover:bg-slate-50"}`}
                          >
                            <Checkbox
                              id="flexible"
                              className="text-white"
                              checked={selectedWorkStyles.includes("flexible")}
                              onCheckedChange={() => handleWorkStyleChange("flexible")}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="flexible"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Flexible
                              </Label>
                              <p className="text-xs text-slate-500">I adapt easily and enjoy variety in my work</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Do you prefer working with:</Label>
                        {errors.preferWorkingWith && <p className="text-red-500 text-xs">{errors.preferWorkingWith}</p>}
                        <RadioGroup
                          value={formData.personality.preferWorkingWith}
                          onValueChange={(value) => handleInputChange("personality", "preferWorkingWith", value)}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.preferWorkingWith === "people" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="people" id="people" className="sr-only" />
                            <Label htmlFor="people" className="cursor-pointer text-center">
                              <div className="mb-2 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                              </div>
                              <div className="font-medium">People</div>
                              <p className="text-xs text-slate-500">Interacting with and helping others</p>
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.preferWorkingWith === "data" ? "bg-purple-50 border-purple-300" : ""}`}
                          >
                            <RadioGroupItem value="data" id="data" className="sr-only" />
                            <Label htmlFor="data" className="cursor-pointer text-center">
                              <div className="mb-2 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"></path>
                                  <path d="M12 6v4"></path>
                                  <path d="M12 14h.01"></path>
                                </svg>
                              </div>
                              <div className="font-medium">Data & Ideas</div>
                              <p className="text-xs text-slate-500">Analyzing information and solving problems</p>
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.preferWorkingWith === "things" ? "bg-green-50 border-green-300" : ""}`}
                          >
                            <RadioGroupItem value="things" id="things" className="sr-only" />
                            <Label htmlFor="things" className="cursor-pointer text-center">
                              <div className="mb-2 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  className="text-green-600"
                                >
                                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                </svg>
                              </div>
                              <div className="font-medium">Things</div>
                              <p className="text-xs text-slate-500">Working with tools, machines, or physical objects</p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>How do you approach challenges?</Label>
                        {errors.approachToChallenges && (
                          <p className="text-red-500 text-xs">{errors.approachToChallenges}</p>
                        )}
                        <RadioGroup
                          value={formData.personality.approachToChallenges}
                          onValueChange={(value) => handleInputChange("personality", "approachToChallenges", value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.approachToChallenges === "analytical" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="analytical" id="analytical" className="text-white"/>
                            <div>
                              <Label htmlFor="analytical" className="font-medium">
                                Analytical Approach
                              </Label>
                              <p className="text-xs text-slate-500">
                                I prefer to gather information, analyze data, and make logical decisions
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.approachToChallenges === "creative" ? "bg-purple-50 border-purple-300" : ""}`}
                          >
                            <RadioGroupItem value="creative" id="creative" className="text-white" />
                            <div>
                              <Label htmlFor="creative" className="font-medium">
                                Creative Approach
                              </Label>
                              <p className="text-xs text-slate-500">
                                I like to think outside the box and find innovative solutions to problems
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>What environment do you thrive in?</Label>
                        {errors.environment && <p className="text-red-500 text-xs">{errors.environment}</p>}
                        <RadioGroup
                          value={formData.personality.environment}
                          onValueChange={(value) => handleInputChange("personality", "environment", value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.environment === "fast-paced" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="fast-paced" id="fast-paced" className="text-white" />
                            <div>
                              <Label htmlFor="fast-paced" className="font-medium">
                                Fast-Paced & Dynamic
                              </Label>
                              <p className="text-xs text-slate-500">
                                I enjoy environments with variety, quick decisions, and new challenges
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.personality.environment === "calm" ? "bg-green-50 border-green-300" : ""}`}
                          >
                            <RadioGroupItem value="calm" id="calm" className="text-white" />
                            <div>
                              <Label htmlFor="calm" className="font-medium">
                                Calm & Methodical
                              </Label>
                              <p className="text-xs text-slate-500">
                                I prefer environments where I can focus deeply and work at a steady pace
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => handleTabChange("interests")}>
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleTabChange("preferences")}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Preferences Tab */}
                  <TabsContent value="preferences" className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium border-l-4 border-green-600 pl-3">Work Preferences</h3>
                      <p className="text-sm text-slate-500">Tell us about what matters to you in a career</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>What's most important to you in a career? (Select up to 3)</Label>
                          <span className="text-xs text-slate-500">{selectedCareerImportance.length}/3 selected</span>
                        </div>
                        {errors.careerImportance && <p className="text-red-500 text-xs">{errors.careerImportance}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[
    { id: "salary", label: "High Salary", description: "Earning potential is a top priority for me", bgColor: "green" },
    { id: "work-life", label: "Work-Life Balance", description: "Having time for personal interests and family", bgColor: "blue" },
    { id: "creativity", label: "Creativity & Expression", description: "Being able to express myself and think creatively", bgColor: "purple" },
    { id: "impact", label: "Making an Impact", description: "Helping others and contributing to society", bgColor: "amber" },
    { id: "stability", label: "Job Stability", description: "Security and predictable career progression", bgColor: "slate" },
    { id: "growth", label: "Learning & Growth", description: "Continuous skill development and advancement", bgColor: "indigo" }
  ].map(item => (
    <div
      key={item.id}
      className={`flex items-start space-x-2 p-3 rounded-md transition-colors ${
        selectedCareerImportance.includes(item.id)
          ? `bg-${item.bgColor}-50 border border-${item.bgColor}-200`
          : "hover:bg-slate-50"
      } ${
        selectedCareerImportance.length >= 3 && !selectedCareerImportance.includes(item.id)
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      <Checkbox
        id={item.id}
        className="text-white"
        checked={selectedCareerImportance.includes(item.id)}
        disabled={selectedCareerImportance.length >= 3 && !selectedCareerImportance.includes(item.id)}
        onCheckedChange={() => {
          if (selectedCareerImportance.length < 3 || selectedCareerImportance.includes(item.id)) {
            handleCareerImportanceChange(item.id);
          }
        }}
      />
      <div 
        className="grid gap-1.5 leading-none"
        onClick={() => {
          if (selectedCareerImportance.length < 3 || selectedCareerImportance.includes(item.id)) {
            handleCareerImportanceChange(item.id);
          }
        }}
      >
        <Label
          htmlFor={item.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {item.label}
        </Label>
        <p className="text-xs text-slate-500">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>
                      </div>

                      <div className="space-y-2">
                        <Label>What type of work location do you prefer?</Label>
                        {errors.workLocation && <p className="text-red-500 text-xs">{errors.workLocation}</p>}
                        <RadioGroup
                          value={formData.preferences.workLocation}
                          onValueChange={(value) => handleInputChange("preferences", "workLocation", value)}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.workLocation === "remote" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="remote" id="remote" className="sr-only text-white"/>
                            <Label htmlFor="remote" className="cursor-pointer text-center">
                              <div className="mb-2 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  <path d="M20 7h-5"></path>
                                  <path d="M14 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"></path>
                                  <path d="M6 9h8"></path>
                                  <path d="M6 12h8"></path>
                                  <path d="M6 15h2"></path>
                                </svg>
                              </div>
                              <div className="font-medium">Remote Work</div>
                              <p className="text-xs text-slate-500">Working from home or anywhere</p>
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.workLocation === "office" ? "bg-purple-50 border-purple-300" : ""}`}
                          >
                            <RadioGroupItem value="office" id="office" className="sr-only text-white" />
                            <Label htmlFor="office" className="cursor-pointer text-center">
                              <div className="mb-2 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                              </div>
                              <div className="font-medium">Office-Based</div>
                              <p className="text-xs text-slate-500">Working in a traditional workplace</p>
                            </Label>
                          </div>
                          <div
                            className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.workLocation === "hybrid" ? "bg-green-50 border-green-300" : ""}`}
                          >
                            <RadioGroupItem value="hybrid" id="hybrid" className="sr-only text-white" />
                            <Label htmlFor="hybrid" className="cursor-pointer text-center">
                              <div className="mb-2 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
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
                                  className="text-green-600"
                                >
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                              </div>
                              <div className="font-medium">Hybrid</div>
                              <p className="text-xs text-slate-500">Mix of remote and office work</p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>How much do you value work-related travel?</Label>
                        {errors.travelPreference && <p className="text-red-500 text-xs">{errors.travelPreference}</p>}
                        <RadioGroup
                          value={formData.preferences.travelPreference}
                          onValueChange={(value) => handleInputChange("preferences", "travelPreference", value)}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.travelPreference === "no-travel" ? "bg-slate-100 border-slate-300" : ""}`}
                          >
                            <RadioGroupItem value="no-travel" id="no-travel" className="text-white" />
                            <div>
                              <Label htmlFor="no-travel" className="font-medium">
                                Minimal Travel
                              </Label>
                              <p className="text-xs text-slate-500">I prefer to stay in one location</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.travelPreference === "occasional" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="occasional" id="occasional" className="text-white" />
                            <div>
                              <Label htmlFor="occasional" className="font-medium">
                                Occasional Travel
                              </Label>
                              <p className="text-xs text-slate-500">I'm open to some travel but not too frequent</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.preferences.travelPreference === "frequent" ? "bg-green-50 border-green-300" : ""}`}
                          >
                            <RadioGroupItem value="frequent" id="frequent" className="text-white" />
                            <div>
                              <Label htmlFor="frequent" className="font-medium">
                                Frequent Travel
                              </Label>
                              <p className="text-xs text-slate-500">
                                I enjoy traveling and would like it to be part of my job
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => handleTabChange("personality")}>
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleTabChange("goals")}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Goals Tab */}
                  <TabsContent value="goals" className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium border-l-4 border-amber-600 pl-3">
                        Future Goals & Additional Information
                      </h3>
                      <p className="text-sm text-slate-500">
                        Help us understand your aspirations and any other relevant information
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="career-fields">Career field you're most curious about (optional)</Label>
                        <Select
                          value={formData.goals.careerFields.join(",")}
                          onValueChange={(value) =>
                            handleInputChange("goals", "careerFields", value.split(",").filter(Boolean))
                          }
                        >
                          <SelectTrigger id="career-fields">
                            <SelectValue placeholder="Select fields you're interested in exploring" />
                          </SelectTrigger>
                          <SelectContent className="bg-white" >
                            <SelectItem value="technology">Technology & Computing</SelectItem>
                            <SelectItem value="healthcare">Healthcare & Medicine</SelectItem>
                            <SelectItem value="business">Business & Finance</SelectItem>
                            <SelectItem value="arts">Arts & Design</SelectItem>
                            <SelectItem value="education">Education & Training</SelectItem>
                            <SelectItem value="science">Science & Research</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="law">Law & Public Policy</SelectItem>
                            <SelectItem value="media">Media & Communication</SelectItem>
                            <SelectItem value="trades">Skilled Trades</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-slate-500">You can select multiple options</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="learning-style">How do you prefer to learn new things?</Label>
                        {errors.learningStyle && <p className="text-red-500 text-xs">{errors.learningStyle}</p>}
                        <RadioGroup
                          value={formData.goals.learningStyle}
                          onValueChange={(value) => handleInputChange("goals", "learningStyle", value)}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.goals.learningStyle === "hands-on" ? "bg-green-50 border-green-300" : ""}`}
                          >
                            <RadioGroupItem value="hands-on" id="hands-on" className="text-white" />
                            <div>
                              <Label htmlFor="hands-on" className="font-medium">
                                Hands-on Practice
                              </Label>
                              <p className="text-xs text-slate-500">Learning by doing and experimenting</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.goals.learningStyle === "theoretical" ? "bg-blue-50 border-blue-300" : ""}`}
                          >
                            <RadioGroupItem value="theoretical" id="theoretical" className="text-white" />
                            <div>
                              <Label htmlFor="theoretical" className="font-medium">
                                Theoretical Study
                              </Label>
                              <p className="text-xs text-slate-500">Reading, researching, and understanding concepts</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-start space-x-3 border rounded-lg p-4 hover:bg-slate-50 transition-colors ${formData.goals.learningStyle === "mixed" ? "bg-purple-50 border-purple-300" : ""}`}
                          >
                            <RadioGroupItem value="mixed" id="mixed" className="text-white"/>
                            <div>
                              <Label htmlFor="mixed" className="font-medium">
                                Mixed Approach
                              </Label>
                              <p className="text-xs text-slate-500">Combination of theory and practical application</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="challenges">What challenges are you facing in your career decision?</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                  <HelpCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  This helps us understand your specific concerns and address them in our recommendations
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Select
                          value={formData.goals.challenges}
                          onValueChange={(value) => handleInputChange("goals", "challenges", value)}
                        >
                          <SelectTrigger id="challenges">
                            <SelectValue placeholder="Select your biggest challenge" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="too-many-options">Too many options, feeling overwhelmed</SelectItem>
                            <SelectItem value="no-passion">Haven't found something I'm passionate about</SelectItem>
                            <SelectItem value="conflicting-interests">
                              Interested in multiple fields that seem unrelated
                            </SelectItem>
                            <SelectItem value="practical-concerns">Worried about job prospects or salary</SelectItem>
                            <SelectItem value="family-pressure">Family expectations differ from my interests</SelectItem>
                            <SelectItem value="unsure-abilities">
                              Not sure if I have the right skills or abilities
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="details">Tell us more about yourself (optional)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400">
                                  <HelpCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Share anything else that might help us understand your situation better
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Textarea
                          id="details"
                          placeholder="Share any additional information that might help us provide better recommendations. For example, your career goals, values, work preferences, or specific skills you'd like to use in your future career."
                          className="min-h-[120px]"
                          value={formData.goals.additionalInfo}
                          onChange={(e) => handleInputChange("goals", "additionalInfo", e.target.value)}
                        />
                      </div>
                    </div>

                    {errors.submit && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errors.submit}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => handleTabChange("preferences")}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Analyzing Your Profile...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Get Personalized Recommendations
                            <ArrowRight className="ml-2 h-5 w-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-4 text-center text-sm text-slate-500">
              <div className="mx-auto max-w-md flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-400" />
                <p>
                  Your data is only used to provide personalized recommendations and is never shared with third parties.
                </p>
              </div>
            </CardFooter>
          </Card>

          {/* Testimonials */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-center mb-8">What Students Say About Our Career Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                  </div>
                  <div>
                    <div className="font-medium">Jamie, 17</div>
                    <div className="text-sm text-slate-500">High School Junior</div>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">
                  "I had no idea what I wanted to do after high school. The assessment helped me discover my interest in
                  UX design, which combines my love for art and technology!"
                </p>
                <div className="flex">
                  <Badge className="bg-purple-100 text-purple-800">UX Design</Badge>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                  </div>
                  <div>
                    <div className="font-medium">Alex, 20</div>
                    <div className="text-sm text-slate-500">College Sophomore</div>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">
                  "I was torn between medicine and research. The assessment helped me discover biomedical engineering,
                  which perfectly combines both of my interests!"
                </p>
                <div className="flex">
                  <Badge className="bg-blue-100 text-blue-800">Biomedical Engineering</Badge>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <img src="/placeholder.svg?height=40&width=40" alt="Student" className="rounded-full" />
                  </div>
                  <div>
                    <div className="font-medium">Taylor, 19</div>
                    <div className="text-sm text-slate-500">College Freshman</div>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">
                  "I always loved helping people but wasn't sure how to turn that into a career. The assessment suggested
                  environmental law, which I'd never considered before!"
                </p>
                <div className="flex">
                  <Badge className="bg-green-100 text-green-800">Environmental Law</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

