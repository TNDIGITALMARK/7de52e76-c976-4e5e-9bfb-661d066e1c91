'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, TrendingUp, BarChart3, Link as LinkIcon, Globe, Target, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function BacklinkGenerator() {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResults, setGenerationResults] = useState<any[]>([])
  const router = useRouter()

  const handleGenerate = async () => {
    if (!url) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-backlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await response.json()
      setGenerationResults(data.backlinks || [])

      // After successful generation, redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error generating backlinks:', error)
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
      }, 2000)
    }
  }

  const features = [
    {
      icon: LinkIcon,
      title: 'High Authority Sites',
      description: 'Generate backlinks from domains with DA 30+ for maximum SEO impact',
      count: '500+'
    },
    {
      icon: Target,
      title: 'Niche Targeting',
      description: 'AI-powered niche matching to ensure relevant backlink placement',
      count: '95%'
    },
    {
      icon: TrendingUp,
      title: 'Fast Generation',
      description: 'Generate up to 1000 backlinks in under 10 minutes',
      count: '<10min'
    },
    {
      icon: BarChart3,
      title: 'Success Tracking',
      description: 'Real-time monitoring of backlink status and indexation',
      count: '24/7'
    }
  ]

  const sampleBacklinks = [
    {
      domain: 'techblog.com',
      da: 45,
      status: 'active',
      anchor: 'best practices',
      type: 'guest-post'
    },
    {
      domain: 'industryreview.net',
      da: 38,
      status: 'pending',
      anchor: 'expert guide',
      type: 'resource-page'
    },
    {
      domain: 'newsportal.org',
      da: 52,
      status: 'active',
      anchor: 'comprehensive analysis',
      type: 'citation'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/generated/linkforge-logo.png"
              alt="LinkForge"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-primary">LinkForge</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#generator" className="text-foreground hover:text-primary transition-colors">Generator</a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
            <a href="#analytics" className="text-foreground hover:text-primary transition-colors">Analytics</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="generator" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Generate
                  <span className="text-primary block">High-Quality</span>
                  <span className="text-accent">Backlinks</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Boost your SEO rankings with our automated backlink generation system.
                  Create hundreds of quality backlinks from high authority domains in minutes.
                </p>
              </div>

              {/* URL Input */}
              <div className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Enter your website URL (e.g., https://yoursite.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 py-3 text-base"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!url || isGenerating}
                  size="lg"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Generating Backlinks...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Generate Backlinks
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.5M+</div>
                  <div className="text-sm text-muted-foreground">Backlinks Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">45+</div>
                  <div className="text-sm text-muted-foreground">Average Domain Authority</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Generation Progress */}
              {isGenerating && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Generating Backlinks</CardTitle>
                    <CardDescription>Processing your URL and finding opportunities...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={75} />
                      <div className="text-sm text-muted-foreground">
                        Finding high authority domains... 75% complete
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sample Results */}
              {!isGenerating && generationResults.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sample Results</CardTitle>
                    <CardDescription>Example of backlinks you might get</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleBacklinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={link.status === 'active' ? 'default' : 'secondary'}>
                              DA {link.da}
                            </Badge>
                            <div>
                              <div className="font-medium text-sm">{link.domain}</div>
                              <div className="text-xs text-muted-foreground">"{link.anchor}"</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {link.status === 'active' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose LinkForge?
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced backlink generation with industry-leading results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-accent mb-2">{feature.count}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Boost Your Rankings?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join thousands of websites already benefiting from our automated backlink generation system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-card text-card-foreground hover:bg-card/90">
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="/generated/linkforge-logo.png"
              alt="LinkForge"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-lg text-primary">LinkForge</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Professional backlink generation for serious SEO results
          </p>
          <div className="text-xs text-muted-foreground">
            © 2024 LinkForge. All rights reserved. Built for SEO professionals.
          </div>
        </div>
      </footer>
    </div>
  )
}