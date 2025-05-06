'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, FileText, Shield } from "lucide-react"; // Keep only used icons
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout"; // Import the layout
import { HrProfessionalModel } from "@/components/hr-professional-model"; // Import the 3D HR professional model
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Spline from '@splinetool/react-spline/next';

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Make sure component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Add custom styling for feature cards
  useEffect(() => {
    if (!mounted) return;
    
    // Define color variations for each card based on theme
    const isDark = theme === 'dark';
    
    // Base colors from user request
    const BASE_LIGHT = '#A020F0'; // Same purple for both themes
    const BASE_DARK = '#A020F0';  // Dark theme base purple
    
    // Card-specific color variations
    const COLORS = {
      interviews: {
        light: BASE_LIGHT,
        dark: BASE_DARK
      },
      skills: {
        light: '#9013FE', // Slightly darker for light theme
        dark: '#9013FE'   // Slightly darker for dark theme
      }, 
      analytics: {
        light: '#B24BFF', // Slightly lighter for light theme
        dark: '#B24BFF'   // Slightly lighter for dark theme
      }
    };
    
    // Add custom CSS for card animations
    const style = document.createElement('style');
    style.innerHTML = `
      .feature-card {
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        border: 1px solid #e2e8f0;
        cursor: pointer;
        --mouseX: 50%;
        --mouseY: 50%;
      }
      
      .feature-card:hover {
        transform: translateY(-12px);
        border-color: transparent;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      
      .feature-card::before {
        content: "";
        position: absolute;
        top: var(--mouseY);
        left: var(--mouseX);
        width: 0;
        height: 0;
        z-index: -1;
        transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
        opacity: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        pointer-events: none;
      }
      
      .feature-card.hovered::before {
        width: 300%;
        height: 300%;
        opacity: 0.95;
        transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      .feature-card .card-title,
      .feature-card .card-content p,
      .feature-card .card-icon-inner {
        transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      .feature-card:hover .card-title {
        color: #ffffff;
        transform: translateY(-3px);
        position: relative;
        z-index: 2;
      }
      
      .feature-card:hover .card-content p {
        color: rgba(255, 255, 255, 0.9) !important;
        position: relative;
        z-index: 2;
        transform: translateY(-2px);
      }
      
      .feature-card:hover .card-icon {
        background-color: rgba(255, 255, 255, 0.15);
        transform: scale(1.1);
        transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      .feature-card:hover .card-icon-inner {
        color: #ffffff;
        transform: rotateY(360deg);
        transition: transform 2.5s cubic-bezier(0.19, 1, 0.22, 1), color 1.5s ease;
      }
      
      /* Theme-based card colors */
      .card-interviews::before {
        background: ${isDark ? COLORS.interviews.dark : COLORS.interviews.light};
        box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.2);
      }
      
      .card-skills::before {
        background: ${isDark ? COLORS.skills.dark : COLORS.skills.light};
        box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.2);
      }
      
      .card-analytics::before {
        background: ${isDark ? COLORS.analytics.dark : COLORS.analytics.light};
        box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.2);
      }
      
      /* Card appear animation when page loads */
      @keyframes cardAppear {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      .feature-card:nth-child(1) {
        animation: cardAppear 1.0s 0.2s forwards ease-out;
        opacity: 0;
      }
      
      .feature-card:nth-child(2) {
        animation: cardAppear 1.0s 0.4s forwards ease-out;
        opacity: 0;
      }
      
      .feature-card:nth-child(3) {
        animation: cardAppear 1.0s 0.6s forwards ease-out;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for mouse interactions
    setTimeout(() => {
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', ((e: MouseEvent) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          card.classList.add('hovered');
          
          // Set cursor position as CSS variables
          (card as HTMLElement).style.setProperty('--mouseX', `${x}px`);
          (card as HTMLElement).style.setProperty('--mouseY', `${y}px`);
        }) as EventListener);
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('hovered');
        });
      });
    }, 1000); // Delay to ensure cards are in the DOM
    
    return () => {
      document.head.removeChild(style);
      // Clean up event listeners
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [mounted, theme]);

  // If not mounted yet, render a placeholder
  if (!mounted) {
    return (
      <MainLayout>
        <div className="h-screen"></div>
      </MainLayout>
    );
  }

  return (
    <MainLayout> {/* Wrap content with MainLayout */}
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  The Modern Interview Platform
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Streamline assessments, evaluate candidates effectively, and build better teams with FortiTwin.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" asChild>
                      <Link href="/signup">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" asChild>
                      {/* Link to features section on the same page */}
                      <Link href="#features">Learn More</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="flex justify-center items-center h-[500px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden' }}>
                  <Spline
                    scene="https://prod.spline.design/qIjHRYzrDY-SIfdj/scene.splinecode" 
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                {/* Decorative element that helps minimize watermark visibility */}
                <div className="absolute bottom-0 right-0 bg-gradient-to-t from-background to-transparent h-12 w-full opacity-80 pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section (ID matches link from Hero) */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FortiTwin?</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful features designed for efficient and fair candidate evaluation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <Card className="feature-card card-interviews text-center">
                <CardHeader>
                  <div className="card-icon mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Video className="card-icon-inner h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="card-title">AI-Powered Interviews</CardTitle>
                </CardHeader>
                <CardContent className="card-content">
                  <p className="text-muted-foreground">Conduct structured interviews using text or video with our intelligent AI.</p>
                </CardContent>
              </Card>
              {/* Feature Card 2 */}
              <Card className="feature-card card-skills text-center">
                <CardHeader>
                  <div className="card-icon mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <FileText className="card-icon-inner h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="card-title">Skills Assessments</CardTitle>
                </CardHeader>
                <CardContent className="card-content">
                  <p className="text-muted-foreground">Evaluate technical and soft skills with customizable assessments.</p>
                </CardContent>
              </Card>
              {/* Feature Card 3 */}
              <Card className="feature-card card-analytics text-center">
                <CardHeader>
                  <div className="card-icon mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="card-icon-inner h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="card-title">Data & Analytics</CardTitle>
                </CardHeader>
                <CardContent className="card-content">
                  <p className="text-muted-foreground">Gain insights into candidate performance and streamline decision-making.</p>
                </CardContent>
              </Card>
            </div>
             <div className="text-center mt-12">
               <Button variant="outline" asChild>
                 <Link href="/features">See All Features</Link>
               </Button>
            </div>
          </div>
        </section>

         {/* Call to Action Section */}
         <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
               Ready to Improve Your Hiring?
            </h2>
             <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
               Start your free trial today and discover a better way to assess candidates.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                 Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
    </MainLayout>
  );
}