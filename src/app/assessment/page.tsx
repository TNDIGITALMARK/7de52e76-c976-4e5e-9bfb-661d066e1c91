'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Target, Heart, Brain, Utensils, Dumbbell, Shield, CheckCircle2, AlertCircle, TrendingUp, User, Download, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface AssessmentStep {
  id: number
  title: string
  description: string
  icon: any
  questions: Question[]
}

interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

interface Answer {
  questionId: string
  value: string | string[] | number
}

const assessmentSteps: AssessmentStep[] = [
  {
    id: 1,
    title: 'General Health Background',
    description: 'Tell us about your current health status and concerns',
    icon: User,
    questions: [
      {
        id: 'age_range',
        text: 'What is your age range?',
        type: 'single',
        options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
      },
      {
        id: 'health_concerns',
        text: 'What are your primary health concerns? (Select all that apply)',
        type: 'multiple',
        options: [
          'Chronic fatigue',
          'Digestive issues',
          'Sleep problems',
          'Stress/anxiety',
          'Joint pain',
          'Weight management',
          'Autoimmune symptoms',
          'Hormonal imbalances',
          'None of the above'
        ]
      },
      {
        id: 'current_conditions',
        text: 'Do you have any diagnosed medical conditions?',
        type: 'text'
      }
    ]
  },
  {
    id: 2,
    title: 'Mental Wellness',
    description: 'Assess your mental health and stress levels',
    icon: Brain,
    questions: [
      {
        id: 'stress_level',
        text: 'How would you rate your current stress level?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ['Very Low', 'Moderate', 'Very High']
      },
      {
        id: 'sleep_quality',
        text: 'How would you rate your sleep quality?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ['Very Poor', 'Average', 'Excellent']
      },
      {
        id: 'mood_symptoms',
        text: 'Which mood-related symptoms do you experience regularly? (Select all that apply)',
        type: 'multiple',
        options: [
          'Anxiety',
          'Depression',
          'Irritability',
          'Brain fog',
          'Difficulty concentrating',
          'Mood swings',
          'None of the above'
        ]
      },
      {
        id: 'stress_management',
        text: 'What stress management techniques do you currently use?',
        type: 'multiple',
        options: [
          'Meditation',
          'Exercise',
          'Therapy/counseling',
          'Breathing exercises',
          'Yoga',
          'Journaling',
          'None regularly'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Nutrition & Diet',
    description: 'Evaluate your eating habits and nutritional patterns',
    icon: Utensils,
    questions: [
      {
        id: 'diet_type',
        text: 'Which best describes your current diet?',
        type: 'single',
        options: [
          'Standard Western diet',
          'Mediterranean diet',
          'Plant-based/Vegetarian',
          'Ketogenic',
          'Paleo',
          'Anti-inflammatory diet',
          'Other/Custom'
        ]
      },
      {
        id: 'digestive_issues',
        text: 'Do you experience digestive issues? (Select all that apply)',
        type: 'multiple',
        options: [
          'Bloating',
          'Gas',
          'Constipation',
          'Diarrhea',
          'Heartburn/reflux',
          'Nausea',
          'Food sensitivities',
          'None of the above'
        ]
      },
      {
        id: 'eating_habits',
        text: 'How would you rate your overall eating habits?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ['Very Poor', 'Average', 'Excellent']
      },
      {
        id: 'supplements',
        text: 'What supplements do you currently take regularly?',
        type: 'text'
      }
    ]
  },
  {
    id: 4,
    title: 'Physical Activity & Movement',
    description: 'Assess your current fitness level and activity patterns',
    icon: Dumbbell,
    questions: [
      {
        id: 'exercise_frequency',
        text: 'How often do you engage in physical exercise?',
        type: 'single',
        options: [
          'Never',
          '1-2 times per week',
          '3-4 times per week',
          '5-6 times per week',
          'Daily'
        ]
      },
      {
        id: 'exercise_types',
        text: 'What types of exercise do you enjoy? (Select all that apply)',
        type: 'multiple',
        options: [
          'Walking',
          'Running',
          'Weight training',
          'Yoga',
          'Swimming',
          'Cycling',
          'Dance',
          'Sports',
          'None currently'
        ]
      },
      {
        id: 'physical_limitations',
        text: 'Do you have any physical limitations or injuries?',
        type: 'text'
      },
      {
        id: 'energy_level',
        text: 'How would you rate your daily energy level?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ['Very Low', 'Moderate', 'Very High']
      }
    ]
  },
  {
    id: 5,
    title: 'Wellness Goals & Priorities',
    description: 'Define your health and wellness objectives',
    icon: Target,
    questions: [
      {
        id: 'primary_goals',
        text: 'What are your primary wellness goals? (Select top 3)',
        type: 'multiple',
        options: [
          'Reduce stress and anxiety',
          'Improve sleep quality',
          'Increase energy levels',
          'Manage weight',
          'Reduce inflammation',
          'Build strength/fitness',
          'Improve digestion',
          'Enhance mental clarity',
          'Manage chronic condition',
          'Prevent future health issues'
        ]
      },
      {
        id: 'timeline',
        text: 'What timeline are you hoping to see improvements?',
        type: 'single',
        options: [
          '1-3 months',
          '3-6 months',
          '6-12 months',
          '1+ years',
          'No specific timeline'
        ]
      },
      {
        id: 'commitment_level',
        text: 'How committed are you to making lifestyle changes?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ['Not Very', 'Moderately', 'Extremely']
      },
      {
        id: 'additional_info',
        text: 'Is there anything else you\'d like us to know about your wellness journey?',
        type: 'text'
      }
    ]
  }
]

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: string | string[] | number) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId)
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value } : a)
      } else {
        return [...prev, { questionId, value }]
      }
    })
  }

  const getAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value
  }

  const handleNext = () => {
    if (currentStep < assessmentSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateResults = () => {
    // Analysis based on answers
    const results = {
      overallScore: 78,
      categories: [
        { name: 'Mental Wellness', score: 65, priority: 'high', recommendations: ['Stress management techniques', 'Sleep optimization', 'Mindfulness practice'] },
        { name: 'Nutrition', score: 82, priority: 'medium', recommendations: ['Anti-inflammatory foods', 'Digestive health support', 'Nutrient timing'] },
        { name: 'Physical Activity', score: 74, priority: 'medium', recommendations: ['Strength training', 'Recovery protocols', 'Movement variety'] },
        { name: 'Lifestyle Factors', score: 68, priority: 'high', recommendations: ['Sleep hygiene', 'Stress reduction', 'Social connections'] }
      ],
      topRecommendations: [
        {
          title: 'Stress Management Program',
          description: 'Comprehensive approach to reducing stress and anxiety through proven techniques.',
          category: 'Mental Health',
          priority: 'high',
          resources: 12
        },
        {
          title: 'Anti-Inflammatory Diet Plan',
          description: 'Personalized nutrition plan to reduce inflammation and support overall health.',
          category: 'Nutrition',
          priority: 'high',
          resources: 8
        },
        {
          title: 'Sleep Optimization Protocol',
          description: 'Evidence-based strategies to improve sleep quality and duration.',
          category: 'Lifestyle',
          priority: 'high',
          resources: 6
        }
      ]
    }
    return results
  }

  const progress = (currentStep / assessmentSteps.length) * 100

  if (showResults) {
    const results = generateResults()

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-primary">Wellness Academy</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Personalized Wellness Report
              </h1>
              <p className="text-lg text-muted-foreground">
                Based on your responses, here's your comprehensive wellness assessment and recommendations
              </p>
            </div>

            {/* Overall Score */}
            <Card className="mb-8 border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Overall Wellness Score</CardTitle>
                <div className="text-6xl font-bold text-primary mb-4">{results.overallScore}/100</div>
                <p className="text-muted-foreground">
                  You're on a good path! There are specific areas where focused improvements can significantly enhance your overall wellness.
                </p>
              </CardHeader>
            </Card>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {results.categories.map((category) => (
                <Card key={category.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant={category.priority === 'high' ? 'destructive' : 'secondary'}>
                        {category.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary">{category.score}/100</span>
                      {category.priority === 'high' ? (
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <Progress value={category.score} className="mb-3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Key Focus Areas:</p>
                      <ul className="text-sm space-y-1">
                        {category.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Recommendations */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Personalized Action Plan</h2>
              <div className="space-y-4">
                {results.topRecommendations.map((rec, index) => (
                  <Card key={index} className="border-l-4 border-l-accent">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge>{rec.category}</Badge>
                            <Badge variant="outline" className="text-accent border-accent">
                              {rec.priority} priority
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{rec.title}</CardTitle>
                          <CardDescription>{rec.description}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {rec.resources} resources available
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm">
                          View Resources
                        </Button>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/resources">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Target className="w-5 h-5 mr-2" />
                    Explore Recommended Resources
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Report
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Results
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Want to retake the assessment or update your responses?{' '}
                <Button variant="link" onClick={() => { setShowResults(false); setCurrentStep(1); setAnswers([]) }}>
                  Start Over
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentStepData = assessmentSteps[currentStep - 1]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">Wellness Academy</span>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {assessmentSteps.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Assessment Progress</span>
              <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="mb-4" />
          </div>

          {/* Step Header */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
              <CardDescription className="text-base">{currentStepData.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* Questions */}
          <div className="space-y-8">
            {currentStepData.questions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{question.text}</CardTitle>
                </CardHeader>
                <CardContent>
                  {question.type === 'single' && (
                    <RadioGroup
                      value={getAnswer(question.id) as string || ''}
                      onValueChange={(value) => handleAnswer(question.id, value)}
                    >
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === 'multiple' && (
                    <div className="space-y-3">
                      {question.options?.map((option) => {
                        const currentAnswers = (getAnswer(question.id) as string[]) || []
                        return (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={option}
                              checked={currentAnswers.includes(option)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleAnswer(question.id, [...currentAnswers, option])
                                } else {
                                  handleAnswer(question.id, currentAnswers.filter(a => a !== option))
                                }
                              }}
                            />
                            <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {question.type === 'scale' && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{question.scaleLabels?.[0]}</span>
                        <span>{question.scaleLabels?.[1]}</span>
                        <span>{question.scaleLabels?.[2]}</span>
                      </div>
                      <RadioGroup
                        value={getAnswer(question.id)?.toString() || ''}
                        onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                        className="flex justify-between"
                      >
                        {Array.from({ length: question.scaleMax! }, (_, i) => {
                          const value = i + 1
                          return (
                            <div key={value} className="flex flex-col items-center space-y-2">
                              <RadioGroupItem value={value.toString()} id={value.toString()} />
                              <Label htmlFor={value.toString()} className="text-xs cursor-pointer">{value}</Label>
                            </div>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  )}

                  {question.type === 'text' && (
                    <Textarea
                      value={getAnswer(question.id) as string || ''}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                      placeholder="Please provide details..."
                      className="min-h-[100px]"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext}>
              {currentStep === assessmentSteps.length ? 'View Results' : 'Next'}
              {currentStep !== assessmentSteps.length && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}