export interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'article' | 'guide' | 'tool' | 'download' | 'video' | 'audio'
  readTime?: string
  author: string
  downloads: number
  citations: number
  publishedDate: string
  tags: string[]
  featured: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// Generate comprehensive mock data representing 2,500+ resources
export const generateMockResources = (count: number = 100): Resource[] => {
  const categories = ['mental-health', 'nutrition', 'fitness', 'autoimmune', 'holistic', 'inflammation']
  const types: Resource['type'][] = ['article', 'guide', 'tool', 'download', 'video', 'audio']
  const difficulties: Resource['difficulty'][] = ['beginner', 'intermediate', 'advanced']

  const authors = [
    'Dr. Sarah Chen, RD', 'Dr. Michael Torres, PhD', 'Dr. Lisa Martinez, PT', 'Dr. Rachel Kim, MD',
    'Dr. James Wilson, LMFT', 'Dr. Emma Thompson, ND', 'Dr. Robert Singh, MD', 'Dr. Amanda Foster, PhD',
    'Dr. David Park, MD', 'Dr. Maria Rodriguez, RD', 'Dr. Jennifer Lee, PhD', 'Dr. Thomas Brown, PT',
    'Dr. Lisa Wang, MD', 'Dr. Carlos Mendez, LCSW', 'Dr. Elena Popov, ND', 'Dr. Mark Johnson, PhD'
  ]

  const titleTemplates = {
    'mental-health': [
      'Advanced Stress Management Techniques for {topic}',
      'Understanding Anxiety: A Comprehensive Guide to {topic}',
      'Mindfulness-Based Approaches to {topic}',
      'Cognitive Behavioral Strategies for {topic}',
      'The Science of Sleep and {topic}',
      'Building Resilience: {topic} in Daily Life',
      'Meditation Practices for {topic} Relief',
      'Neuroplasticity and {topic} Recovery'
    ],
    'nutrition': [
      'Anti-Inflammatory Diet Protocol for {topic}',
      'Micronutrient Optimization in {topic} Management',
      'Plant-Based Nutrition for {topic}',
      'The Gut-Brain Connection: {topic} and Digestive Health',
      'Therapeutic Nutrition for {topic}',
      'Evidence-Based Supplementation for {topic}',
      'Metabolic Approaches to {topic}',
      'Functional Foods in {topic} Treatment'
    ],
    'fitness': [
      'Exercise Therapy for {topic} Management',
      'Movement Patterns in {topic} Rehabilitation',
      'Strength Training Protocols for {topic}',
      'Cardiovascular Health and {topic}',
      'Flexibility and Mobility for {topic}',
      'High-Intensity Training Adaptations in {topic}',
      'Recovery Strategies for {topic}',
      'Biomechanics of {topic} Prevention'
    ],
    'autoimmune': [
      'Autoimmune Protocol Diet for {topic}',
      'Immune System Modulation in {topic}',
      'Environmental Triggers of {topic}',
      'Microbiome and {topic} Connection',
      'Stress-Induced {topic} Flares',
      'Functional Medicine Approach to {topic}',
      'Lifestyle Interventions for {topic}',
      'Biomarker Monitoring in {topic}'
    ],
    'holistic': [
      'Integrative Medicine Approaches to {topic}',
      'Traditional Healing Methods for {topic}',
      'Energy Medicine and {topic}',
      'Herbal Therapies in {topic} Management',
      'Mind-Body Techniques for {topic}',
      'Acupuncture and {topic} Relief',
      'Ayurvedic Principles for {topic}',
      'Spiritual Wellness in {topic} Healing'
    ],
    'inflammation': [
      'Chronic Inflammation Pathways in {topic}',
      'Natural Anti-Inflammatory Compounds for {topic}',
      'Inflammatory Biomarkers in {topic}',
      'Diet-Induced Inflammation and {topic}',
      'Exercise as Anti-Inflammatory Therapy for {topic}',
      'Stress-Related Inflammation in {topic}',
      'Omega-3 Fatty Acids in {topic} Management',
      'Polyphenols and {topic} Prevention'
    ]
  }

  const topics = [
    'chronic pain', 'arthritis', 'fibromyalgia', 'depression', 'anxiety', 'insomnia', 'ADHD',
    'diabetes', 'heart disease', 'obesity', 'hypertension', 'IBS', 'Crohn\'s disease',
    'lupus', 'multiple sclerosis', 'rheumatoid arthritis', 'thyroid disorders',
    'migraines', 'chronic fatigue', 'PCOS', 'endometriosis', 'osteoporosis'
  ]

  const tagsByCategory = {
    'mental-health': ['stress', 'anxiety', 'depression', 'mindfulness', 'meditation', 'sleep', 'resilience', 'therapy'],
    'nutrition': ['diet', 'supplements', 'gut-health', 'anti-inflammatory', 'micronutrients', 'metabolism', 'weight-loss', 'digestion'],
    'fitness': ['exercise', 'strength', 'cardio', 'flexibility', 'rehabilitation', 'movement', 'recovery', 'biomechanics'],
    'autoimmune': ['immune-system', 'inflammation', 'autoimmune-protocol', 'microbiome', 'triggers', 'biomarkers', 'flares'],
    'holistic': ['integrative', 'herbal', 'energy-medicine', 'acupuncture', 'ayurveda', 'traditional-healing', 'spiritual-wellness'],
    'inflammation': ['chronic-inflammation', 'anti-inflammatory', 'biomarkers', 'omega-3', 'polyphenols', 'inflammatory-foods']
  }

  const resources: Resource[] = []

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    const author = authors[Math.floor(Math.random() * authors.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]

    const titleTemplate = titleTemplates[category as keyof typeof titleTemplates][
      Math.floor(Math.random() * titleTemplates[category as keyof typeof titleTemplates].length)
    ]

    const title = titleTemplate.replace('{topic}', topic)

    const categoryTags = tagsByCategory[category as keyof typeof tagsByCategory]
    const selectedTags = categoryTags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 2)

    const readTimes = {
      article: ['3 min read', '5 min read', '8 min read', '12 min read', '15 min read'],
      guide: ['15 min read', '20 min read', '30 min read', '45 min read', '60 min read'],
      tool: undefined,
      download: undefined,
      video: ['10 min watch', '15 min watch', '25 min watch', '35 min watch', '45 min watch'],
      audio: ['20 min listen', '30 min listen', '45 min listen', '60 min listen']
    }

    const readTime = readTimes[type]
      ? readTimes[type]![Math.floor(Math.random() * readTimes[type]!.length)]
      : undefined

    const descriptions = [
      `Comprehensive evidence-based approach to understanding and managing ${topic} through proven clinical strategies and lifestyle interventions.`,
      `Latest research findings and practical applications for healthcare professionals treating ${topic} in clinical settings.`,
      `Step-by-step protocol for implementing therapeutic interventions targeting ${topic} with measurable outcomes.`,
      `Evidence-based recommendations for lifestyle modifications supporting ${topic} management and prevention.`,
      `Scientific review of current treatment modalities and emerging therapies for ${topic}.`,
      `Practical guide combining traditional wisdom with modern scientific understanding of ${topic}.`,
      `Clinical assessment tools and monitoring strategies for optimizing ${topic} treatment protocols.`,
      `Integrative approach to ${topic} incorporating multiple therapeutic modalities and patient-centered care.`
    ]

    const description = descriptions[Math.floor(Math.random() * descriptions.length)]

    const baseDownloads = type === 'tool' ? 800 : type === 'guide' ? 1200 : 400
    const downloads = Math.floor(Math.random() * 2000) + baseDownloads

    const citations = Math.floor(Math.random() * 150) + 10

    const publishedDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 2 * 24 * 60 * 60 * 1000)
    ).toISOString().split('T')[0]

    const featured = Math.random() < 0.15 // 15% featured

    resources.push({
      id: `resource-${i + 1}`,
      title,
      description,
      category,
      type,
      readTime,
      author,
      downloads,
      citations,
      publishedDate,
      tags: selectedTags,
      featured,
      difficulty
    })
  }

  return resources.sort((a, b) => {
    // Sort featured first, then by downloads
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.downloads - a.downloads
  })
}

// Pre-generate a comprehensive dataset
export const mockResources = generateMockResources(2500)

// Export statistics for display
export const resourceStats = {
  totalResources: mockResources.length,
  totalDownloads: mockResources.reduce((sum, resource) => sum + resource.downloads, 0),
  totalCitations: mockResources.reduce((sum, resource) => sum + resource.citations, 0),
  categoryBreakdown: mockResources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1
    return acc
  }, {} as Record<string, number>),
  typeBreakdown: mockResources.reduce((acc, resource) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

export const featuredResources = mockResources.filter(r => r.featured).slice(0, 12)

export const getResourcesByCategory = (category: string, limit?: number) => {
  const filtered = category === 'all'
    ? mockResources
    : mockResources.filter(r => r.category === category)
  return limit ? filtered.slice(0, limit) : filtered
}

export const searchResources = (query: string, filters?: {
  category?: string
  type?: string
  difficulty?: string
  featured?: boolean
}) => {
  let results = mockResources

  // Apply text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    results = results.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      resource.author.toLowerCase().includes(searchTerm)
    )
  }

  // Apply filters
  if (filters?.category && filters.category !== 'all') {
    results = results.filter(r => r.category === filters.category)
  }

  if (filters?.type && filters.type !== 'all') {
    results = results.filter(r => r.type === filters.type)
  }

  if (filters?.difficulty && filters.difficulty !== 'all') {
    results = results.filter(r => r.difficulty === filters.difficulty)
  }

  if (filters?.featured) {
    results = results.filter(r => r.featured)
  }

  return results
}