'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Video, MessageSquare, FileText } from "lucide-react";

// Sample Data (Candidate POV)
const interviews = [
  { id: "INT-001", type: "Video", position: "Product Manager", date: "2024-05-20", status: "Completed", interviewer: "Dr. Evelyn Reed" },
  { id: "INT-002", type: "Video", position: "Software Engineer", date: "2024-05-22", status: "Scheduled", interviewer: "Mr. Ken Alvarez" },
  { id: "INT-003", type: "Text", position: "Software Engineer", date: "2024-05-25", status: "Scheduled", interviewer: "AI Assistant" },
  { id: "INT-004", type: "Assessment", position: "Software Engineer", date: "2024-05-18", status: "Completed", interviewer: "N/A" },
];


export default function InterviewsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>My Interviews & Assessments</CardTitle>
          <CardDescription>
            Review your scheduled and completed interview sessions and assessments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                 <TableHead className="hidden sm:table-cell">Type</TableHead>
                 <TableHead>Position</TableHead>
                 <TableHead>Date</TableHead>
                 <TableHead className="hidden md:table-cell">Interviewer/Platform</TableHead>
                 <TableHead className="text-right">Status</TableHead>
                 <TableHead><span className="sr-only">Actions</span></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {interviews.map((interview) => (
                 <TableRow key={interview.id}>
                  <TableCell className="hidden sm:table-cell">
                     <div className="flex items-center gap-2">
                       {interview.type === 'Video' && <Video className="h-4 w-4 text-muted-foreground" />}
                       {interview.type === 'Text' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                       {interview.type === 'Assessment' && <FileText className="h-4 w-4 text-muted-foreground" />}
                       <span>{interview.type}</span>
                      </div>
                   </TableCell>
                   <TableCell>
                     <div className="font-medium">{interview.position}</div>
                     <div className="text-sm text-muted-foreground sm:hidden flex items-center gap-1">
                       {interview.type === 'Video' && <Video className="h-3 w-3" />}
                       {interview.type === 'Text' && <MessageSquare className="h-3 w-3" />}
                       {interview.type === 'Assessment' && <FileText className="h-3 w-3" />} 
                       {interview.type}
                      </div>
                   </TableCell>
                   <TableCell>{interview.date}</TableCell>
                   <TableCell className="hidden md:table-cell">{interview.interviewer}</TableCell>
                   <TableCell className="text-right">
                      <Badge 
                        variant={interview.status === 'Completed' ? 'default' : interview.status === 'Scheduled' ? 'secondary' : 'outline'}
                        className={interview.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                      >
                         {interview.status}
                      </Badge>
                   </TableCell>
                   <TableCell className="text-right">
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button size="icon" variant="ghost">
                           <MoreHorizontal className="h-4 w-4" />
                           <span className="sr-only">Actions</span>
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         {interview.status === 'Scheduled' && <DropdownMenuItem onClick={() => console.log('Join Interview clicked')}>Join Interview</DropdownMenuItem>}
                         {interview.status === 'Scheduled' && <DropdownMenuItem onClick={() => console.log('Reschedule Request clicked')}>Reschedule Request</DropdownMenuItem>}
                         <DropdownMenuItem onClick={() => console.log('View Details clicked')}>View Details</DropdownMenuItem>
                         {interview.status === 'Completed' && <DropdownMenuItem onClick={() => console.log('View Feedback clicked')}>View Feedback</DropdownMenuItem>}
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </CardContent>
         <CardFooter>
          <div className="text-xs text-muted-foreground">
             Showing <strong>1-{interviews.length}</strong> of <strong>{interviews.length}</strong> sessions
           </div>
         </CardFooter>
       </Card>
     </div>
  );
} 