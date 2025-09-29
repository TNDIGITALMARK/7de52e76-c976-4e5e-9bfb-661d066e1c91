'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Link as LinkIcon,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Backlink {
  id: string
  domain: string
  url: string
  domainAuthority: number
  type: string
  anchorText: string
  status: 'active' | 'pending' | 'processing'
  createdAt: string
  indexedAt: string | null
  targetUrl: string
  metrics: {
    trustFlow: number
    citationFlow: number
    organicTraffic: number
  }
  placement: {
    pageTitle: string
    section: string
    position: number
  }
}

export default function Dashboard() {
  const [backlinks, setBacklinks] = useState<Backlink[]>([])
  const [filteredBacklinks, setFilteredBacklinks] = useState<Backlink[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  // Mock data - in real app this would come from API/database
  useEffect(() => {
    const mockBacklinks: Backlink[] = [
      {
        id: 'bl_1',
        domain: 'techcrunch.com',
        url: 'https://techcrunch.com/article-1',
        domainAuthority: 92,
        type: 'guest-post',
        anchorText: 'innovative solution',
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        indexedAt: '2024-01-16T08:15:00Z',
        targetUrl: 'https://example.com',
        metrics: {
          trustFlow: 85,
          citationFlow: 88,
          organicTraffic: 2500000
        },
        placement: {
          pageTitle: 'Top 10 Innovation Tools for 2024',
          section: 'article-body',
          position: 3
        }
      },
      {
        id: 'bl_2',
        domain: 'forbes.com',
        url: 'https://forbes.com/business-review',
        domainAuthority: 94,
        type: 'citation',
        anchorText: 'industry leader',
        status: 'active',
        createdAt: '2024-01-14T14:20:00Z',
        indexedAt: '2024-01-15T09:30:00Z',
        targetUrl: 'https://example.com',
        metrics: {
          trustFlow: 90,
          citationFlow: 92,
          organicTraffic: 3200000
        },
        placement: {
          pageTitle: 'Market Analysis Report 2024',
          section: 'references',
          position: 1
        }
      },
      {
        id: 'bl_3',
        domain: 'medium.com',
        url: 'https://medium.com/tech-insights',
        domainAuthority: 78,
        type: 'mention',
        anchorText: 'check out this platform',
        status: 'pending',
        createdAt: '2024-01-13T16:45:00Z',
        indexedAt: null,
        targetUrl: 'https://example.com',
        metrics: {
          trustFlow: 72,
          citationFlow: 75,
          organicTraffic: 850000
        },
        placement: {
          pageTitle: 'The Future of Digital Platforms',
          section: 'article-body',
          position: 5
        }
      }
    ]
    setBacklinks(mockBacklinks)
    setFilteredBacklinks(mockBacklinks)
  }, [])

  useEffect(() => {
    let filtered = backlinks

    if (searchTerm) {
      filtered = filtered.filter(link =>
        link.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.anchorText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.placement.pageTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(link => link.status === statusFilter)
    }

    setFilteredBacklinks(filtered)
  }, [searchTerm, statusFilter, backlinks])

  const stats = {
    total: backlinks.length,
    active: backlinks.filter(link => link.status === 'active').length,
    pending: backlinks.filter(link => link.status === 'pending').length,
    processing: backlinks.filter(link => link.status === 'processing').length,
    avgDomainAuthority: Math.round(backlinks.reduce((sum, link) => sum + link.domainAuthority, 0) / backlinks.length || 0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
            <span className="font-bold text-xl text-primary">LinkForge Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate More
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Backlinks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round((stats.active / stats.total) * 100) || 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Domain Authority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.avgDomainAuthority}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Backlink Management</CardTitle>
            <CardDescription>Monitor and manage your generated backlinks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search backlinks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Backlinks Table */}
            <div className="space-y-4">
              {filteredBacklinks.map((backlink) => (
                <div key={backlink.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          DA {backlink.domainAuthority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(backlink.status)}`}>
                          {backlink.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {backlink.type}
                        </Badge>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-foreground">{backlink.domain}</h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{backlink.placement.pageTitle}</p>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Anchor text: </span>
                        <span className="font-medium">"{backlink.anchorText}"</span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>TF: {backlink.metrics.trustFlow}</span>
                        <span>CF: {backlink.metrics.citationFlow}</span>
                        <span>Traffic: {(backlink.metrics.organicTraffic / 1000000).toFixed(1)}M</span>
                        <span>Created: {new Date(backlink.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusIcon(backlink.status)}
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBacklinks.length === 0 && (
              <div className="text-center py-12">
                <LinkIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No backlinks found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Generate your first backlinks to see them here.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="domains">Top Domains</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Rate Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>This Week</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} />
                    <div className="flex justify-between text-sm">
                      <span>Last Week</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} />
                    <div className="flex justify-between text-sm">
                      <span>Month Avg</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Backlink Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Guest Posts</span>
                      <Badge variant="secondary">45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Citations</span>
                      <Badge variant="secondary">30%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resource Pages</span>
                      <Badge variant="secondary">15%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mentions</span>
                      <Badge variant="secondary">10%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed performance analytics for your backlinks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>Performance analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Domains</CardTitle>
                <CardDescription>Domains with the highest authority and success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {backlinks
                    .sort((a, b) => b.domainAuthority - a.domainAuthority)
                    .slice(0, 5)
                    .map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">DA {link.domainAuthority}</Badge>
                          <span className="font-medium">{link.domain}</span>
                        </div>
                        <Badge className={getStatusColor(link.status)}>
                          {link.status}
                        </Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}