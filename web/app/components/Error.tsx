import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from "next/link"

interface CareerDataErrorProps {
  onRetry?: () => void
  errorMessage?: string
}

export function CareerDataError({
  onRetry,
  errorMessage = "We couldn't load your career roadmap data.",
}: CareerDataErrorProps) {
    
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="max-w-md w-full shadow-lg border-slate-200">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Data Unavailable</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-slate-600">{errorMessage}</p>
            <p className="text-slate-500 text-sm">
              This could be due to a network issue or our servers might be experiencing high traffic.
            </p>
            
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-br from-slate-50 to-slate-100 px-3 text-xs text-slate-500">
                  WHAT YOU CAN DO
                </span>
              </div>
            </div>
            
            <ul className="text-sm text-slate-600 space-y-2 text-left">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs">1</span>
                </span>
                Check your internet connection and try again
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs">2</span>
                </span>
                Return to the assessment page and resubmit your information
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs">3</span>
                </span>
                If the problem persists, try again later
              </li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          {onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessment
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  )
}
