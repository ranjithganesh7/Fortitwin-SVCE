"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Home, Download, Share } from "lucide-react"
import { ReportChart } from "@/components/report-chart"
import { useRef, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ReportPage() {
  const reportRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generatePDF = async () => {
    if (!reportRef.current) return
    
    try {
      setIsGenerating(true)
      
      // Dynamically import the html2canvas and jsPDF libraries
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')
      
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Calculate dimensions to fit the content in the PDF
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0
      
      // Add image to first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      // Add new pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save('FortiTwin_Report.pdf')
      
      toast({
        title: "Success!",
        description: "Your report has been downloaded.",
        duration: 3000
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 3000
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">FortiTwin Report</h1>
          <Link href="/">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        <div ref={reportRef}>
          <Card className="bg-white text-black mb-8">
            <CardHeader className="border-b border-gray-100 pb-6">
              <CardTitle className="text-2xl text-center">Interview Analysis</CardTitle>
              <p className="text-center text-gray-600 mt-2">Based on your responses from April 13, 2025</p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Strengths</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Problem Solving</p>
                        <p className="text-gray-600 text-sm">
                          Demonstrated strong analytical thinking and creative solutions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Adaptability</p>
                        <p className="text-gray-600 text-sm">Showed flexibility when facing unexpected challenges</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Communication</p>
                        <p className="text-gray-600 text-sm">Clear and concise expression of complex ideas</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Growth Areas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-gray-200 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Emotional Regulation</p>
                        <p className="text-gray-600 text-sm">
                          Consider techniques for managing stress in high-pressure situations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-200 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Delegation</p>
                        <p className="text-gray-600 text-sm">
                          Opportunity to trust team members with more responsibilities
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Personality Profile</h3>
                <div className="h-64">
                  <ReportChart />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-semibold mb-4">Final Assessment</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Score</span>
                    <span className="text-xl font-bold">87/100</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-black h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                </div>
                <p className="text-gray-700">
                  You demonstrated strong communication skills and problem-solving abilities throughout the interview.
                  Your responses showed depth of thought and self-awareness. With some focus on the growth areas
                  identified, you have excellent potential for leadership roles that require both empathy and analytical
                  thinking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            className="bg-white text-black hover:bg-gray-100"
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}