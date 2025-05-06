'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, UserPlus, MessageCircle, CalendarCheck2, BarChartHorizontal, Settings } from 'lucide-react';
import { MainLayout } from "@/components/layout/MainLayout";

export default function HowItWorksPage() {
  return (
    <MainLayout>
       <div className="py-16 md:py-24">
         <div className="container mx-auto px-4 max-w-3xl">
           <motion.div
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
           >
             <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
               How Our Platform Works
             </h1>
             <p className="text-xl text-muted-foreground">
               A step-by-step guide to leveraging our interview platform.
             </p>
           </motion.div>

           <div className="prose prose-lg dark:prose-invert max-w-none 
                         prose-headings:font-semibold prose-headings:text-primary 
                         prose-a:text-primary hover:prose-a:text-primary/80 
                         prose-li:my-1">
             
             <section className="mb-12 pb-8 border-b border-border/50">
               <h2 className="flex items-center mb-4"><UserPlus className="w-7 h-7 mr-3 text-primary"/>Step 1: Set Up Your Account & Team</h2>
               <p className="text-foreground/80">Getting started is simple. Sign up for an account, invite your team members, and configure basic company settings. Assign roles and permissions to ensure everyone has the access they need.</p>
             </section>

             <section className="mb-12 pb-8 border-b border-border/50">
               <h2 className="flex items-center mb-4"><FileText className="w-7 h-7 mr-3 text-primary"/>Step 2: Create Interview Templates</h2>
               <p className="text-foreground/80">Define structured interview processes by creating templates. Add specific questions, scoring rubrics, and required competencies for different roles. Use our standard library or build your own from scratch.</p>
               <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground/80">
                 <li>Define stages (e.g., Screening, Technical, Cultural Fit).</li>
                 <li>Assign questions and skills to each stage.</li>
                 <li>Set up scoring criteria for consistent evaluation.</li>
               </ul>
             </section>
             
              <section className="mb-12 pb-8 border-b border-border/50">
                <h2 className="flex items-center mb-4"><CalendarCheck2 className="w-7 h-7 mr-3 text-primary"/>Step 3: Schedule & Invite Candidates</h2>
               <p className="text-foreground/80">Link job postings or manually add candidates. Send out invitations with clear instructions and scheduling options. Candidates can easily book slots that work for them and your team.</p>
             </section>

             <section className="mb-12 pb-8 border-b border-border/50">
               <h2 className="flex items-center mb-4"><MessageCircle className="w-7 h-7 mr-3 text-primary"/>Step 4: Conduct Structured Interviews</h2>
               <p className="text-foreground/80">Use the platform during the interview to follow your template. Access candidate information, guide the conversation with your predefined questions, take notes in real-time, and score responses against the rubric.</p>
             </section>

             <section className="mb-12 pb-8 border-b border-border/50"> 
               <h2 className="flex items-center mb-4"><BarChartHorizontal className="w-7 h-7 mr-3 text-primary"/>Step 5: Review & Analyze Results</h2>
               <p className="text-foreground/80">After the interview, review scores and feedback collaboratively. Compare candidates side-by-side based on objective data. Generate reports to track hiring progress and identify top performers.</p>
             </section>
             
             <section className="mb-12">
               <h2 className="flex items-center mb-4"><Settings className="w-7 h-7 mr-3 text-primary"/>Step 6: Integrate (Optional)</h2>
               <p className="text-foreground/80">Connect our platform to your existing ATS or HRIS system to automatically sync candidate data, interview status, and feedback, ensuring a seamless end-to-end hiring workflow.</p>
             </section>
           </div>

            <div className="text-center mt-20">
               <Button size="lg" asChild>
                  <Link href="/signup">Get Started Now</Link>
               </Button>
            </div>

         </div>
       </div>
    </MainLayout>
  );
} 