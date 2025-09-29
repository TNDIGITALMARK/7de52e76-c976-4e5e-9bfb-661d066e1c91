import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Simulate backlink generation process
    await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay

    // Generate mock backlinks based on the URL
    const backlinks = generateMockBacklinks(url)

    return NextResponse.json({
      success: true,
      url,
      backlinks,
      total: backlinks.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error generating backlinks:', error)
    return NextResponse.json(
      { error: 'Failed to generate backlinks' },
      { status: 500 }
    )
  }
}

function generateMockBacklinks(url: string) {
  const domain = extractDomain(url)

  const highAuthorityDomains = [
    'techcrunch.com',
    'forbes.com',
    'entrepreneur.com',
    'businessinsider.com',
    'huffpost.com',
    'medium.com',
    'reddit.com',
    'quora.com',
    'linkedin.com',
    'github.com',
    'stackoverflow.com',
    'dev.to',
    'hashnode.com',
    'producthunt.com',
    'hackernews.com',
    'webdesignerdepot.com',
    'smashingmagazine.com',
    'css-tricks.com',
    'codrops.com',
    'awwwards.com'
  ]

  const backlinkTypes = ['guest-post', 'resource-page', 'directory', 'citation', 'mention', 'review']
  const anchorTexts = [
    'visit website',
    'learn more',
    'click here',
    'official site',
    'read more',
    domain,
    `${domain} review`,
    `best ${domain.split('.')[0]}`,
    'comprehensive guide',
    'expert analysis',
    'detailed review',
    'industry leader'
  ]

  const statuses = ['active', 'pending', 'processing']

  // Generate 15-25 random backlinks
  const count = Math.floor(Math.random() * 11) + 15
  const backlinks = []

  for (let i = 0; i < count; i++) {
    const randomDomain = highAuthorityDomains[Math.floor(Math.random() * highAuthorityDomains.length)]
    const randomType = backlinkTypes[Math.floor(Math.random() * backlinkTypes.length)]
    const randomAnchor = anchorTexts[Math.floor(Math.random() * anchorTexts.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const domainAuthority = Math.floor(Math.random() * 50) + 30 // DA between 30-80

    backlinks.push({
      id: `bl_${Date.now()}_${i}`,
      domain: randomDomain,
      url: `https://${randomDomain}/article-${i + 1}`,
      domainAuthority,
      type: randomType,
      anchorText: randomAnchor,
      status: randomStatus,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 7 days
      indexedAt: randomStatus === 'active' ? new Date().toISOString() : null,
      targetUrl: url,
      metrics: {
        trustFlow: Math.floor(Math.random() * 40) + 20,
        citationFlow: Math.floor(Math.random() * 50) + 25,
        organicTraffic: Math.floor(Math.random() * 100000) + 5000
      },
      placement: {
        pageTitle: generatePageTitle(randomType, domain),
        section: randomType === 'guest-post' ? 'article-body' : 'resource-list',
        position: Math.floor(Math.random() * 10) + 1
      }
    })
  }

  return backlinks.sort((a, b) => b.domainAuthority - a.domainAuthority)
}

function extractDomain(url: string) {
  try {
    const urlObj = new URL(url.includes('://') ? url : `https://${url}`)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
  }
}

function generatePageTitle(type: string, domain: string) {
  const baseDomain = domain.split('.')[0]

  const titles = {
    'guest-post': [
      `Top 10 Tools for ${baseDomain} Users`,
      `How to Maximize Your ${baseDomain} Results`,
      `The Complete ${baseDomain} Guide for 2024`,
      `Best Practices for ${baseDomain} Implementation`
    ],
    'resource-page': [
      'Useful Resources and Tools',
      'Industry Links and References',
      'Recommended Websites',
      'Essential Online Resources'
    ],
    'directory': [
      'Business Directory Listing',
      'Company Profile Page',
      'Service Provider Listing',
      'Professional Directory'
    ],
    'citation': [
      'Industry Report 2024',
      'Market Analysis Summary',
      'Research Citations',
      'Source References'
    ],
    'mention': [
      'Industry News Update',
      'Company Spotlight',
      'Business Feature Article',
      'Market Trends Discussion'
    ],
    'review': [
      `${baseDomain} Review and Analysis`,
      `Comprehensive ${baseDomain} Evaluation`,
      `${baseDomain} Pros and Cons`,
      `Is ${baseDomain} Worth It?`
    ]
  }

  const categoryTitles = titles[type as keyof typeof titles] || titles['mention']
  return categoryTitles[Math.floor(Math.random() * categoryTitles.length)]
}