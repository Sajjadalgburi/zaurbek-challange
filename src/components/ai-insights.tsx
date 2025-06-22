import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const insights = [
  {
    type: 'performance',
    title: 'Revenue Growth Opportunity',
    description: 'Your show-up rate is 73.4%. Increasing this to 80% could generate an additional $3,200/month.',
    impact: 'High',
    confidence: 92,
    action: 'Implement reminder sequences and calendar confirmations',
    icon: TrendingUp,
    color: 'green'
  },
  {
    type: 'bottleneck',
    title: 'Conversion Funnel Bottleneck',
    description: 'Only 4.3% of YouTube viewers visit your landing page. This is below industry average of 6-8%.',
    impact: 'High',
    confidence: 88,
    action: 'Add stronger CTAs in first 30 seconds of videos',
    icon: AlertTriangle,
    color: 'orange'
  },
  {
    type: 'optimization',
    title: 'Content Performance Pattern',
    description: 'Videos with "breakdown" or "step-by-step" in titles perform 34% better than generic titles.',
    impact: 'Medium',
    confidence: 95,
    action: 'Update upcoming video titles to include specific value propositions',
    icon: Lightbulb,
    color: 'blue'
  },
  {
    type: 'opportunity',
    title: 'Regional Expansion',
    description: 'North America shows highest conversion rates (18.2%) but only 20% of total traffic.',
    impact: 'Medium',
    confidence: 76,
    action: 'Create region-specific content and ads for North American audience',
    icon: Target,
    color: 'purple'
  }
];

const recommendations = [
  {
    priority: 1,
    title: 'Implement Call Reminder System',
    description: 'Add automated SMS and email reminders 24h and 2h before scheduled calls',
    estimatedImpact: '+$3,200/month',
    difficulty: 'Easy',
    timeframe: '1 week',
    status: 'recommended'
  },
  {
    priority: 2,
    title: 'Optimize Video CTAs',
    description: 'Add compelling call-to-action overlays at 30s, 3min, and end of videos',
    estimatedImpact: '+$1,800/month',
    difficulty: 'Medium',
    timeframe: '2 weeks',
    status: 'recommended'
  },
  {
    priority: 3,
    title: 'Landing Page A/B Test',
    description: 'Test headlines focusing on specific outcomes vs. general benefits',
    estimatedImpact: '+$1,200/month',
    difficulty: 'Medium',
    timeframe: '3 weeks',
    status: 'testing'
  },
  {
    priority: 4,
    title: 'Geographic Targeting Campaign',
    description: 'Launch targeted ads in North America to capitalize on higher conversion rates',
    estimatedImpact: '+$2,500/month',
    difficulty: 'Hard',
    timeframe: '4 weeks',
    status: 'planning'
  }
];

const monthlyPerformance = {
  summary: `Based on June 2025 data analysis, your coaching funnel shows strong performance with $25,341 in revenue from 81 booked calls. Key strengths include high YouTube engagement (89K views) and solid conversion rates (13.58%). Primary optimization opportunities lie in improving show-up rates and expanding successful content patterns.`,
  highlights: [
    'Revenue up 18.7% from last month',
    'YouTube views increased 12.3% (89K total)',
    'Conversion rate improved to 13.58%',
    'Show-up rate at 73.4% (industry avg: 75-80%)'
  ],
  concerns: [
    'Landing page conversion below industry average',
    'High dependency on YouTube traffic (95.6%)',
    'Show-up rate could be optimized'
  ]
};

function LoadingSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8" />
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AIInsights() {
  const { loading } = useSupabaseData();

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and recommendations for your coaching funnel
          </p>
        </div>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="insights" className="data-[state=active]:bg-background">Key Insights</TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-background">Recommendations</TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-background">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <insight.icon className={`h-5 w-5 text-${insight.color}-600`} />
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <Badge 
                        variant={insight.impact === 'High' ? 'destructive' : insight.impact === 'Medium' ? 'default' : 'secondary'}
                      >
                        {insight.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Sparkles className="h-4 w-4" />
                        Recommended Action
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.action}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prioritized Action Plan</CardTitle>
              <CardDescription>
                AI-generated recommendations ranked by impact and feasibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                        {rec.priority}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium">{rec.title}</h3>
                          <Badge 
                            variant={rec.status === 'recommended' ? 'default' : rec.status === 'testing' ? 'secondary' : 'outline'}
                          >
                            {rec.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {rec.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span>Impact: <strong className="text-green-600">{rec.estimatedImpact}</strong></span>
                          <span>Difficulty: <strong>{rec.difficulty}</strong></span>
                          <span>Timeline: <strong>{rec.timeframe}</strong></span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  June 2025 Performance Analysis
                </CardTitle>
                <CardDescription>
                  AI-generated insights from your monthly performance data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {monthlyPerformance.summary}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Wins
                    </h3>
                    <ul className="space-y-2">
                      {monthlyPerformance.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                          className="text-sm flex items-start gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {monthlyPerformance.concerns.map((concern, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                          className="text-sm flex items-start gap-2"
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          {concern}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Next Month Focus
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Prioritize implementing call reminders and optimizing video CTAs. These two changes alone 
                    could increase monthly revenue by $5,000+ while requiring minimal technical effort.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}