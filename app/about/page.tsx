'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Info, Linkedin } from 'lucide-react';
import { MainLayout } from "@/components/layout/MainLayout";

interface AboutSection {
  title: string;
  content: string | string[];
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Naveen Kumar E",
    role: "AIML Architect",
    bio: "Full-stack developer with expertise in React and Node.js. Passionate about creating scalable web applications.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGNX8JJiNq4RA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697901763919?e=1752105600&v=beta&t=AjkzANCQXK6xUAyR626Ow3CaIaC3LGE_NNSQhdLnvjM",
    linkedin: "https://www.linkedin.com/in/naveen-kumar-e-979880297/"
  },
  {
    name: "Raanesh U",
    role: "AIML Architect",
    bio: "Expert in system architecture and database optimization. Builds robust, scalable backend services.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQG1EXakfiQYiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1711986747949?e=1752105600&v=beta&t=2ZG8yCan57vZPKTCgpiwxemFG5NP5s3coRiL_L5PkAs",
    linkedin: "https://www.linkedin.com/in/raanesh-u-2a1923300/"
  },
  {
    name: "Oswald Shilo",
    role: "Full Stack Developer",
    bio: "Creates beautiful, intuitive interfaces with a focus on accessibility and user experience.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHQh_R4QdtW7Q/profile-displayphoto-shrink_400_400/B4EZZokq5YHYAk-/0/1745511166259?e=1752105600&v=beta&t=JXuWkmRVmMXbK4IdZlGkYirsiPe-s2TAeFHNFhannfg",
    linkedin: "https://www.linkedin.com/in/oswaldshilo/"
  },
  
  {
    name: "K.Leka Sri",
    role: "Database Architect",
    bio: "Specializes in machine learning algorithms and natural language processing for interview analysis.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQG9NLXbyGYzdQ/profile-displayphoto-shrink_400_400/B56ZYQohBjGoAg-/0/1744035782641?e=1752105600&v=beta&t=mx7AL4908vNjmOxgQwbWcOj7YbbfR6ye0cEHeQpQoKc",
    linkedin: "https://www.linkedin.com/in/k-leka-sri-33262b287/"
  },
  {
    name: "Ranjith Ganesh B",
    role: "Full Stack Developer",
    bio: "Ensures smooth deployment pipelines and infrastructure management across all our services.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGACxxSvDxKyA/profile-displayphoto-shrink_400_400/B56ZTOV_hcGUAk-/0/1738628661078?e=1752105600&v=beta&t=kXX2x4VtRXegWxtQDjHzzduQ9K6pRhywNNzOqNQCPOo",
    linkedin: "https://www.linkedin.com/in/ranjithganeshb/"
  },
  {
    name: "Divya Shree",
    role: "UI/UX Designer",
    bio: "Bridges the gap between technical implementation and business requirements, guiding product vision.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQG8mTlvOZlVUg/profile-displayphoto-shrink_400_400/B56ZQIVE8tH0Ak-/0/1735306531897?e=1752105600&v=beta&t=whwAwTP_otjHJUPcAlqblewT9W05UjXvuCGbNfmp93w",
    linkedin: "https://www.linkedin.com/in/divyashree-v-1245a71b8/"
  }
];

const aboutSections: AboutSection[] = [
  {
    title: "Our Mission",
    content: "At Fortitwin, our mission is to reshape the hiring landscape by delivering an AI-powered interviewing platform that champions fairness, transparency, and integrity. We are committed to eliminating unconscious bias and preventing dishonest practices, ensuring that every candidate is evaluated purely on merit. With Fortitwin, organizations can build stronger, more diverse teams—backed by ethical, intelligent technology."
  },
  {
    title: "Why Choose Us?",
    content: [
      "Unbiased Evaluations: Fortitwin's AI assesses candidates based on skills and responses—without influence from gender, background, or other biases.",
      "Advanced Anti-Cheating Measures: We use behavioral monitoring and intelligent response tracking to detect inconsistencies and prevent cheating.",
      "Smart Analytics: Get real-time insights into candidate performance and decision-making metrics to support fair hiring.",
      "Scalable Screening: Interview hundreds or thousands of applicants efficiently, without sacrificing accuracy.",
      "Customizable Workflows: Tailor interviews to match your role requirements, cultural values, and assessment needs.",
      "Security First: Fortitwin ensures secure handling of sensitive data with compliance to modern privacy standards."
    ]
  }
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Info className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn more about our mission and team.
            </p>
          </motion.div>

          <div className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-semibold prose-headings:text-primary 
                        prose-a:text-primary hover:prose-a:text-primary/80">
            {aboutSections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                {typeof section.content === 'string' ? (
                  <p className="text-foreground/80">{section.content}</p>
                ) : (
                  <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Team Section */}
          <motion.div 
            className="mt-24 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <div className="inline-block bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-md mb-3">
                      <p className="text-primary text-sm font-medium">{member.role}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                    
                    <a href={member.linkedin} 
                       className="flex items-center space-x-2 text-white bg-primary hover:bg-primary/90 transition-colors w-fit px-3 py-1.5 rounded-md"
                       target="_blank" 
                       rel="noopener noreferrer">
                      <Linkedin size={16} />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-20">
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
