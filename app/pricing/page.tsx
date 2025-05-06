'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { MainLayout } from "@/components/layout/MainLayout";

// Define pricing tiers relevant to an interview platform
const tiers = [
  {
    name: 'Basic Interviewer',
    price: '19',
    description: 'Perfect for individuals or small teams getting started.',
    features: [
      'Up to 10 interviews/month',
      'Standard question library',
      'Basic reporting',
      'Email support',
    ],
  },
  {
    name: 'Pro Recruiter',
    price: '49',
    description: 'Ideal for growing teams needing more features.',
    features: [
      'Up to 50 interviews/month',
      'Custom question library',
      'AI-powered feedback (basic)',
      'Advanced reporting',
      'Priority email support',
      'ATS Integration (basic)',
    ],
    featured: true,
  },
  {
    name: 'Enterprise Hiring',
    price: 'Custom',
    description: 'For large organizations requiring tailored solutions.',
    features: [
      'Unlimited interviews',
      'Advanced AI feedback & bias detection',
      'Custom branding',
      'Dedicated account manager',
      'Premium support (24/7)',
      'Full API access & custom integrations',
    ],
  },
];

// FAQ Data
const faqs = [
  {
    question: "Can I try the platform before committing?",
    answer: "Absolutely! We offer a free trial period for you to explore the features of our Pro Recruiter plan. No credit card required to start."
  },
  {
    question: "How are interviews counted towards the monthly limit?",
    answer: "Each completed interview session with a candidate counts towards your monthly limit. You can monitor your usage in the dashboard."
  },
  {
    question: "What if I need more interviews than my plan allows?",
    answer: "You can easily upgrade your plan at any time. If you have specific needs or require a very high volume, our Enterprise plan offers unlimited interviews and custom solutions."
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include standard email support. The Pro Recruiter plan comes with priority email support, and the Enterprise Hiring plan includes a dedicated account manager and premium 24/7 support channels."
  }
];

export default function PricingPage() {
  return (
    <MainLayout>
      {/* Page Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pricing Plans
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the plan that best fits your hiring needs and scale.
        </motion.p>
      </div>

      {/* Pricing Tiers Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={cn(
                "bg-card border border-border rounded-2xl shadow-lg p-6 flex flex-col relative",
                tier.featured && "border-primary border-2 ring-2 ring-primary/30 bg-gradient-to-br from-card to-primary/5"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="pt-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  {tier.price === 'Custom' ? (
                    <span className="text-4xl font-bold text-foreground">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-foreground">
                        ${tier.price}
                      </span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground mb-6 min-h-[40px]">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex justify-center pt-6"> 
                  <Button
                     variant={tier.featured ? 'default' : 'outline'}
                     size="lg"
                     asChild
                  >
                    <Link href={tier.price === 'Custom' ? '#contact' : '/signup'}>
                       {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </Link>
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
             <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6 transition-shadow hover:shadow-md">
               <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-4">
                 {faq.question}
               </AccordionTrigger>
               <AccordionContent className="text-muted-foreground pt-0 pb-4 text-base">
                 {faq.answer}
               </AccordionContent>
             </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Call to Action Section */}
      <div id="contact" className="bg-muted/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Revolutionize Your Hiring?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get in touch with our sales team to discuss custom solutions or start your free trial today.
          </p>
          <div className="flex justify-center space-x-4">
             <Button size="lg" asChild>
               <Link href="/signup">Start Free Trial</Link>
            </Button>
             <Button size="lg" variant="outline" asChild>
               <Link href="#">Contact Sales</Link>{/* Link to contact form/modal */}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 