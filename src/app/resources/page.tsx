'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Download, BookOpen, Clock, User, ChevronDown, Grid, List, Heart, Brain, Utensils, Dumbbell, Shield, Target, FileText, Video, Headphones } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Resource, mockResources, searchResources, resourceStats } from '@/lib/mock-data'

const categories = [
  { id: 'all', name: 'All Categories', icon: Target },
  { id: 'mental-health', name: 'Mental Health', icon: Brain },
  { id: 'nutrition', name: 'Nutrition', icon: Utensils },
  { id: 'fitness', name: 'Fitness & Exercise', icon: Dumbbell },
  { id: 'autoimmune', name: 'Autoimmune Health', icon: Shield },
  { id: 'holistic', name: 'Holistic Healing', icon: Heart },
  { id: 'inflammation', name: 'Inflammatory Conditions', icon: Target }
]

const resourceTypes = [
  { id: 'all', name: 'All Types', icon: FileText },
  { id: 'article', name: 'Articles', icon: FileText },
  { id: 'guide', name: 'Guides', icon: BookOpen },
  { id: 'tool', name: 'Interactive Tools', icon: Target },
  { id: 'download', name: 'Downloads', icon: Download },
  { id: 'video', name: 'Videos', icon: Video },
  { id: 'audio', name: 'Audio', icon: Headphones }
]

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFeatured, setShowFeatured] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources)

  useEffect(() => {
    let filtered = searchResources(searchQuery, {
      category: selectedCategory,
      type: selectedType,
      difficulty: selectedDifficulty,
      featured: showFeatured
    })

    // Sort
    switch (sortBy) {
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case 'citations':
        filtered.sort((a, b) => b.citations - a.citations)
        break
      case 'date':
        filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        break
      case 'relevance':
      default:
        // Featured items first, then by downloads
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.downloads - a.downloads
        })
        break
    }

    // Limit to first 50 results for performance
    setFilteredResources(filtered.slice(0, 50))
  }, [searchQuery, selectedCategory, selectedType, selectedDifficulty, showFeatured, sortBy])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText
      case 'guide': return BookOpen
      case 'tool': return Target
      case 'download': return Download
      case 'video': return Video
      case 'audio': return Headphones
      default: return FileText
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">Wellness Academy</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/resources" className="text-primary font-medium">Resource Library</Link>
            <Link href="/assessment" className="text-foreground hover:text-primary transition-colors">Wellness Assessment</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Wellness Resource Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our comprehensive collection of evidence-based wellness resources.
            Filter by category, type, and difficulty to find exactly what you need for your health journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search resources, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-base"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Resource type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={showFeatured}
                onCheckedChange={(checked) => setShowFeatured(checked as boolean)}
              />
              <label htmlFor="featured" className="text-sm text-muted-foreground">
                Featured only
              </label>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex justify-between items-center">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="citations">Most Cited</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredResources.length} resources
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Resources Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type)
            const CategoryIcon = categories.find(cat => cat.id === resource.category)?.icon || Target

            return (
              <Card key={resource.id} className={`hover:shadow-lg transition-all duration-300 ${resource.featured ? 'ring-2 ring-accent/20' : ''} ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={viewMode === 'list' ? 'flex w-full' : ''}>
                  <CardHeader className={`${viewMode === 'list' ? 'flex-shrink-0 w-1/3' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TypeIcon className="w-4 h-4 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                        {resource.featured && (
                          <Badge variant="outline" className="text-xs border-accent text-accent">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="p-1 bg-secondary/10 rounded">
                        <CategoryIcon className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    {viewMode === 'grid' && (
                      <CardDescription className="line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className={`${viewMode === 'list' ? 'flex-1' : ''} space-y-4`}>
                    {viewMode === 'list' && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {resource.description}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {resource.author}
                        </span>
                        {resource.readTime && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.readTime}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Published {formatDate(resource.publishedDate)}</span>
                        <Badge variant="outline" className="text-xs">
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span>{resource.downloads} downloads</span>
                        <span>{resource.citations} citations</span>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Resource
                    </Button>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredResources.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Resources
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}