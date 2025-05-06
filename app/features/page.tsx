'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Settings, BarChart2, Users, Smile, Database } from 'lucide-react'; // Example icons
import type React from 'react';
import { MainLayout } from "@/components/layout/MainLayout"; // Import layout

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  alignLeft?: boolean;
}

const features: Omit<FeatureProps, 'alignLeft'>[] = [
  {
    icon: MessageSquare,
    title: 'Seamless Interview Experience',
    description: 'Conduct smooth, structured interviews with our intuitive platform. Guide conversations, take notes, and score candidates consistently.',
  },
  {
    icon: Settings,
    title: 'Customizable Question Libraries',
    description: 'Build and manage your own question sets tailored to specific roles and competencies. Ensure fairness and relevance in every interview.',
  },
  {
    icon: BarChart2,
    title: 'Insightful Analytics & Reporting',
    description: 'Track key hiring metrics, compare candidates objectively, and identify bottlenecks in your process with comprehensive dashboards.',
  },
  {
    icon: Users,
    title: 'Collaborative Hiring Tools',
    description: 'Invite team members, share feedback asynchronously, and make collective hiring decisions faster and more efficiently.',
  },
  {
    icon: Smile,
    title: 'Enhanced Candidate Experience',
    description: 'Provide a professional and engaging interview experience for candidates, reflecting positively on your employer brand.',
  },
  {
    icon: Database,
    title: 'Simple ATS Integration',
    description: 'Connect seamlessly with your existing Applicant Tracking System to streamline workflows and keep all candidate data synchronized.',
  },
];

const FeatureSection: React.FC<FeatureProps> = ({ icon: Icon, title, description, alignLeft = false }) => {
  const contentOrder = alignLeft ? 'md:flex-row' : 'md:flex-row-reverse';
  const textAlign = alignLeft ? 'md:text-left' : 'md:text-right';
  const itemAlign = alignLeft ? 'md:items-start' : 'md:items-end';
  const iconAlign = alignLeft ? 'md:mr-16' : 'md:ml-16';

  return (
    <motion.div
      className={`flex flex-col ${contentOrder} items-center gap-8 md:gap-12 py-16 md:py-24 px-4 md:px-0`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`flex-shrink-0 ${iconAlign}`}>
        <div className="p-5 bg-primary/10 rounded-2xl shadow-sm">
          <Icon className="w-16 h-16 text-primary dark:text-white/90" />
        </div>
      </div>
      <div className={`flex-1 flex flex-col ${textAlign} ${itemAlign}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function FeaturesPage() {
  return (
    <MainLayout> {/* Wrap with MainLayout */}
      {/* Page Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Platform Features
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore the core functionalities that make our interview platform powerful and easy to use.
        </motion.p>
      </div>

      {/* Alternating Feature Sections Wrapper */}
      <div className="container mx-auto sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <div key={feature.title} className={index % 2 !== 0 ? 'bg-muted/30' : 'bg-background'}>
             <div className="container mx-auto max-w-6xl">
                <FeatureSection
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  alignLeft={index % 2 === 0}
               />
             </div>
          </div>
        ))}
      </div>

       {/* Call to Action Section */}
      <div id="cta" className="bg-muted/50 mt-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Streamline Your Interviews?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the difference with a structured and collaborative hiring process.
          </p>
          <div className="flex justify-center space-x-4">
             <Button size="lg" asChild>
               <Link href="/signup">Start Free Trial</Link>
            </Button>
             <Button size="lg" variant="outline" asChild>
               <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Close MainLayout */}
    </MainLayout>
  );
}