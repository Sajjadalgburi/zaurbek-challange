import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedMetricCard } from '@/components/animated-metric-card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Bar, Line } from 'recharts';
import { 
  Eye, 
  Users, 
  Phone, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Youtube,
  Globe,
  UserCheck,
  MapPin
} from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useState } from 'react';

function LoadingSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

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

export function OverviewDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const { statistics, aggregatedData, loading, error, getPercentageChange } = useSupabaseData(timeRange);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        Error loading data: {error}
      </div>
    );
  }

  if (!statistics || !aggregatedData) {
    return (
      <div className="text-center p-8">
        No data available
      </div>
    );
  }

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      default: return 'Last 30 days';
    }
  };

  const getTimeRangeDescription = (range: string) => {
    switch (range) {
      case '7d': return 'Data aggregated from the last 7 days';
      case '30d': return 'Data aggregated from the last 30 days';
      default: return 'Data aggregated from the last 30 days';
    }
  };

  // Calculate conversion funnel data for area chart
  const funnelData = [
    { 
      stage: 'YouTube Views', 
      value: aggregatedData.totalViews, 
      percentage: 100,
      color: '#ef4444'
    },
    { 
      stage: 'Website Visitors', 
      value: aggregatedData.totalWebsiteVisitors, 
      percentage: (aggregatedData.totalWebsiteVisitors / aggregatedData.totalViews) * 100,
      color: '#f97316'
    },
    { 
      stage: 'Calls Booked', 
      value: aggregatedData.totalCalls, 
      percentage: (aggregatedData.totalCalls / aggregatedData.totalViews) * 100,
      color: '#eab308'
    },
    { 
      stage: 'Shows', 
      value: aggregatedData.totalShows, 
      percentage: (aggregatedData.totalShows / aggregatedData.totalViews) * 100,
      color: '#22c55e'
    },
    { 
      stage: 'Closed', 
      value: Math.round(aggregatedData.totalCalls * (aggregatedData.avgConversionRate / 100)), 
      percentage: (Math.round(aggregatedData.totalCalls * (aggregatedData.avgConversionRate / 100)) / aggregatedData.totalViews) * 100,
      color: '#3b82f6'
    },
  ];

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground">
            {getTimeRangeDescription(timeRange)}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatedMetricCard
          title={`YouTube Views (${timeRange})`}
          value={aggregatedData.totalViews.toLocaleString()}
          description={`Total video views in ${getTimeRangeLabel(timeRange).toLowerCase()}`}
          change={getPercentageChange('totalViews')}
          icon={<Youtube />}
          delay={0}
        />
        <AnimatedMetricCard
          title="Website Visitors"
          value={aggregatedData.totalWebsiteVisitors.toLocaleString()}
          description="Unique visitors to landing page"
          change={getPercentageChange('totalWebsiteVisitors')}
          icon={<Globe />}
          delay={0.1}
        />
        <AnimatedMetricCard
          title="Calls Booked"
          value={aggregatedData.totalCalls.toLocaleString()}
          description="Total discovery calls scheduled"
          change={getPercentageChange('totalCalls')}
          icon={<Calendar />}
          delay={0.2}
        />
        <AnimatedMetricCard
          title="Show-Up Rate"
          value={`${((aggregatedData.totalShows / aggregatedData.totalCalls) * 100).toFixed(1)}%`}
          description={`${aggregatedData.totalShows} shows out of ${aggregatedData.totalCalls} booked`}
          change={getPercentageChange('totalShows')}
          icon={<UserCheck />}
          delay={0.3}
        />
      </motion.div>

      {/* Revenue & Conversion Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <AnimatedMetricCard
          title="Total Revenue"
          value={`$${aggregatedData.totalRevenue.toLocaleString()}`}
          description={`Revenue generated in ${getTimeRangeLabel(timeRange).toLowerCase()}`}
          change={getPercentageChange('totalRevenue')}
          icon={<DollarSign />}
          delay={0.4}
        />
        <AnimatedMetricCard
          title="Avg Conversion Rate"
          value={`${aggregatedData.avgConversionRate.toFixed(1)}%`}
          description="Average calls closed to revenue"
          change={getPercentageChange('avgConversionRate')}
          icon={<TrendingUp />}
          delay={0.5}
        />
        <AnimatedMetricCard
          title="Calls Closed"
          value={Math.round(aggregatedData.totalCalls * (aggregatedData.avgConversionRate / 100))}
          description={`Estimated from ${aggregatedData.totalCalls} total calls`}
          change={getPercentageChange('totalCalls')}
          icon={<Phone />}
          delay={0.6}
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 min-w-0">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>
                Daily metrics over {getTimeRangeLabel(timeRange).toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--chart-1))",
                  },
                  calls: {
                    label: "Calls Booked",
                    color: "hsl(var(--chart-2))",
                  },
                  shows: {
                    label: "Shows",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={aggregatedData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                    <Line yAxisId="right" type="monotone" dataKey="calls" stroke="var(--color-calls)" strokeWidth={3} />
                    <Line yAxisId="right" type="monotone" dataKey="shows" stroke="var(--color-shows)" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="min-w-0"
        >
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                Journey from views to closed deals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Count",
                    color: "hsl(var(--chart-1))",
                  },
                  percentage: {
                    label: "Conversion %",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={funnelData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [
                        name === 'value' ? value.toLocaleString() : `${value.toFixed(1)}%`,
                        name === 'value' ? 'Count' : 'Conversion Rate'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--chart-1))" 
                      fillOpacity={1} 
                      fill="url(#colorValue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Regional Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="w-full"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Performance
            </CardTitle>
            <CardDescription>
              Client distribution across different regions ({getTimeRangeLabel(timeRange).toLowerCase()})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(aggregatedData.regionData)
                .sort(([,a], [,b]) => b - a)
                .map(([region, count], index) => {
                  const maxCount = Math.max(...Object.values(aggregatedData.regionData));
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  const totalVisitors = Object.values(aggregatedData.regionData).reduce((a, b) => a + b, 0);
                  
                  return (
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                      className="relative text-center p-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl hover:from-primary/10 hover:via-primary/15 hover:to-primary/10 transition-all duration-300 border border-primary/20 shadow-sm hover:shadow-md"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">{count}</div>
                      <div className="text-sm text-muted-foreground font-medium mb-3">{region}</div>
                      <div className="w-full bg-muted rounded-full h-2 mb-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {totalVisitors > 0 ? ((count / totalVisitors) * 100).toFixed(1) : 0}% of total
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}