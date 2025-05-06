'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, ListChecks, CalendarClock, BarChartHorizontal } from "lucide-react"; // Updated icons
import { Progress } from "@/components/ui/progress"; // Added Progress import

// Sample Data for Candidate Analytics
const candidateAnalytics = {
  currentStage: "Assessment Pending",
  assessmentsCompleted: 1,
  totalAssessments: 2,
  avgTimeToCompleteAssessment: "35 min",
  upcomingInterview: "May 25, 2024 - Text Interview",
  progressPercent: 66, // Example progress (2 out of 3 stages: Applied -> Assessment -> Interview)
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 mb-6">
         {/* Updated Title for Candidate POV */}
         <h1 className="font-semibold text-2xl md:text-3xl">My Application Analytics</h1>
         <p className="text-muted-foreground">
           Insights into your application progress and activities.
         </p>
      </div>

      {/* Updated Grid for Candidate Analytics Cards */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {/* Card 1: Current Stage */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Current Stage</CardTitle>
             <Activity className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-xl font-bold">{candidateAnalytics.currentStage}</div>
             <p className="text-xs text-muted-foreground">Your current step in the process</p>
           </CardContent>
         </Card>

         {/* Card 2: Assessments Completed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
             <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
             <div className="text-2xl font-bold">
               {candidateAnalytics.assessmentsCompleted} / {candidateAnalytics.totalAssessments}
             </div>
             <p className="text-xs text-muted-foreground">Required skills assessments</p>
            </CardContent>
          </Card>

          {/* Card 3: Avg. Assessment Time */}
          <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Avg. Assessment Time</CardTitle>
             <Clock className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
            <CardContent>
             <div className="text-2xl font-bold">{candidateAnalytics.avgTimeToCompleteAssessment}</div>
             <p className="text-xs text-muted-foreground">Average time per assessment</p>
            </CardContent>
          </Card>

         {/* Card 4: Upcoming Interview/Event */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Next Step</CardTitle>
             <CalendarClock className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
            <CardContent>
             <div className="text-lg font-bold">{candidateAnalytics.upcomingInterview}</div>
              <p className="text-xs text-muted-foreground">Your next scheduled event</p>
            </CardContent>
          </Card>
       </div>

        {/* Updated Placeholder for larger charts */}
       <div className="grid gap-4 mt-8 md:grid-cols-2">
          {/* Application Progress */}
          <Card>
            <CardHeader>
               <CardTitle>Application Progress</CardTitle>
               <CardDescription>Your journey through the hiring stages.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <Progress value={candidateAnalytics.progressPercent} className="w-full" />
               <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Applied</span>
                  <span>Assessment</span>
                  <span>Interview</span>
                  <span>Offer</span>
               </div>
                {/* Placeholder for a more detailed timeline component */}
               <div className="h-[150px] flex items-center justify-center border rounded-lg mt-4">
                 <p className="text-muted-foreground">[Timeline Visualization Placeholder]</p>
               </div>
            </CardContent>
         </Card>

          {/* Placeholder for Assessment Score breakdown or feedback */}
          <Card>
            <CardHeader>
               <CardTitle>Assessment Results</CardTitle>
               <CardDescription>Summary of your assessment performance (if available).</CardDescription>
            </CardHeader>
            <CardContent className="h-[260px] flex items-center justify-center border rounded-lg">
               <p className="text-muted-foreground">[Assessment Score Chart Placeholder]</p>
             </CardContent>
          </Card>
       </div>
     </div>
  );
} 