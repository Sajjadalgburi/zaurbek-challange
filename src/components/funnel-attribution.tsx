import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, ArrowUpRight, Eye, TrendingDown } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const performanceData = [
  { metric: 'View Rate', week1: 78, week2: 82, week3: 85, week4: 88 },
  { metric: 'Click Rate', week1: 12, week2: 15, week3: 18, week4: 22 },
  { metric: 'Conversion', week1: 3.2, week2: 4.1, week3: 4.8, week4: 5.3 },
];

const funnelStages = [
  { stage: 'Video Views', count: 89547, conversion: 100, color: '#ef4444', change: 12.3 },
  { stage: 'Landing Page', count: 3821, conversion: 4.3, color: '#f97316', change: -2.1 },
  { stage: 'Form Submitted', count: 1247, conversion: 32.6, color: '#eab308', change: 8.7 },
  { stage: 'Calls Booked', count: 394, conversion: 31.6, color: '#22c55e', change: 15.2 },
  { stage: 'Shows', count: 289, conversion: 73.4, color: '#3b82f6', change: 3.5 },
  { stage: 'Closed', count: 47, conversion: 16.3, color: '#8b5cf6', change: 22.4 },
];

function LoadingSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-16 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FunnelAttribution() {
  const { loading } = useSupabaseData();

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Funnel Attribution</h1>
        <p className="text-muted-foreground">
          Analyze your content performance and conversion funnel
        </p>
      </div>

      {/* Funnel Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Track visitors through each stage of your sales funnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelStages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div
                      className="w-4 h-4 rounded-full shadow-lg flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-lg">{stage.stage}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                        {stage.conversion}% conversion rate
                        <Badge variant={stage.change > 0 ? "default" : "destructive"} className="text-xs">
                          {stage.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stage.change > 0 ? '+' : ''}{stage.change}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold">{stage.count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">total</div>
                  </div>
                  
                  {/* Progress bar showing funnel drop-off */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg overflow-hidden">
                    <motion.div
                      className="h-full rounded-b-lg"
                      style={{ backgroundColor: stage.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.conversion}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Trends */}
      <div className="grid gap-6 md:grid-cols-2 min-w-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Trends</CardTitle>
              <CardDescription>
                Key metrics over the last 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  week1: { label: "Week 1", color: "hsl(var(--chart-1))" },
                  week2: { label: "Week 2", color: "hsl(var(--chart-2))" },
                  week3: { label: "Week 3", color: "hsl(var(--chart-3))" },
                  week4: { label: "Week 4", color: "hsl(var(--chart-4))" },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="week1" fill="var(--color-week1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="week2" fill="var(--color-week2)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="week3" fill="var(--color-week3)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="week4" fill="var(--color-week4)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Attribution Insights</CardTitle>
              <CardDescription>
                Key insights from funnel analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="font-medium">Top Performer</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Video views to landing page conversion improved by 12.3% this month
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Opportunity</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Show-up rate of 73.4% - opportunity to improve to 80%+ with better scheduling
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Traffic Source</span>
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  YouTube drives 95.6% of all traffic - consider diversifying channels
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <TrendingDown className="h-4 w-4" />
                  <span className="font-medium">Bottleneck</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Landing page conversion dropped 2.1% - review page performance
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}