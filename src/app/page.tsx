import Image from 'next/image'
import Link from 'next/link'
import { Search, BookOpen, Users, Target, Heart, Brain, Utensils, Dumbbell, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

export default function Index() {
  const wellnessCategories = [
    {
      id: 'mental-health',
      title: 'Mental Health',
      icon: Brain,
      description: 'Stress management, anxiety relief, and mental wellness',
      articleCount: 487,
      color: 'bg-secondary/20 hover:bg-secondary/30'
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      icon: Utensils,
      description: 'Science-based nutrition guidance and meal planning',
      articleCount: 623,
      color: 'bg-accent/20 hover:bg-accent/30'
    },
    {
      id: 'fitness',
      title: 'Fitness & Exercise',
      icon: Dumbbell,
      description: 'Evidence-based fitness routines and movement therapy',
      articleCount: 412,
      color: 'bg-primary/10 hover:bg-primary/20'
    },
    {
      id: 'autoimmune',
      title: 'Autoimmune Health',
      icon: Shield,
      description: 'Managing autoimmune conditions naturally',
      articleCount: 298,
      color: 'bg-secondary/20 hover:bg-secondary/30'
    },
    {
      id: 'holistic',
      title: 'Holistic Healing',
      icon: Heart,
      description: 'Integrative approaches to wellness and healing',
      articleCount: 356,
      color: 'bg-accent/20 hover:bg-accent/30'
    },
    {
      id: 'inflammation',
      title: 'Inflammatory Conditions',
      icon: Target,
      description: 'Natural anti-inflammatory strategies and treatments',
      articleCount: 267,
      color: 'bg-primary/10 hover:bg-primary/20'
    }
  ]

  const featuredContent = [
    {
      title: 'Complete Guide to Anti-Inflammatory Diet',
      description: 'Evidence-based nutrition strategies to reduce chronic inflammation',
      category: 'Nutrition',
      readTime: '12 min read',
      downloads: 1247
    },
    {
      title: 'Mindfulness for Autoimmune Conditions',
      description: 'How meditation and mindfulness can support immune system regulation',
      category: 'Mental Health',
      readTime: '8 min read',
      downloads: 892
    },
    {
      title: 'Exercise Therapy for Chronic Pain',
      description: 'Safe, effective movement strategies for pain management',
      category: 'Fitness',
      readTime: '15 min read',
      downloads: 1034
    }
  ]

  const trustMetrics = [
    { label: 'Expert Articles', value: '2,500+' },
    { label: 'Research Citations', value: '8,400+' },
    { label: 'Healthcare Professionals', value: '150+' },
    { label: 'Community Members', value: '25k+' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">Wellness Academy</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors">Resource Library</Link>
            <Link href="/assessment" className="text-foreground hover:text-primary transition-colors">Wellness Assessment</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Your Gateway to
                  <span className="text-primary block">Science-Backed</span>
                  <span className="text-accent">Wellness</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Discover comprehensive, evidence-based wellness resources crafted by healthcare professionals.
                  From mental health to nutrition, find your path to optimal wellbeing.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search wellness topics..."
                  className="pl-10 py-3 text-base"
                />
              </div>

              {/* Quick Access Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Mental Health
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Utensils className="w-4 h-4 mr-2" />
                  Nutrition
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Target className="w-4 h-4 mr-2" />
                  Assessment Tools
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/generated/wellness-hero.png"
                  alt="Wellness and mindfulness"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Wellness Topics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive deep into evidence-based wellness content across multiple health domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/resources?category=${category.id}`}>
                  <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${category.color} border-0`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        {category.articleCount} expert articles
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Most popular evidence-based guides and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredContent.map((content, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
                      {content.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{content.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{content.title}</CardTitle>
                  <CardDescription>{content.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{content.downloads} downloads</span>
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/resources">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore All Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Take our comprehensive wellness assessment to get personalized recommendations
              based on your unique health profile and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button size="lg" variant="secondary" className="bg-card text-card-foreground hover:bg-card/90">
                  <Target className="w-5 h-5 mr-2" />
                  Take Wellness Assessment
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-primary">Wellness Academy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering your journey to optimal health through evidence-based wellness resources.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/resources" className="hover:text-primary">All Articles</Link></li>
                <li><Link href="/resources?type=guides" className="hover:text-primary">Comprehensive Guides</Link></li>
                <li><Link href="/resources?type=tools" className="hover:text-primary">Interactive Tools</Link></li>
                <li><Link href="/resources?type=downloads" className="hover:text-primary">Downloads</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Health Topics</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/resources?category=mental-health" className="hover:text-primary">Mental Health</Link></li>
                <li><Link href="/resources?category=nutrition" className="hover:text-primary">Nutrition</Link></li>
                <li><Link href="/resources?category=fitness" className="hover:text-primary">Fitness</Link></li>
                <li><Link href="/resources?category=autoimmune" className="hover:text-primary">Autoimmune</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Wellness Academy. All rights reserved. Built with clinical expertise and scientific rigor.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}