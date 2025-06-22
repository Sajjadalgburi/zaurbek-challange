import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Play, 
  Eye, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  ExternalLink,
  Trophy,
  Users,
  Phone,
  Target
} from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface VideoStats {
  shows: number;
  views: number;
  revenue: number;
  cancelled: number;
  callsBooked: number;
  callsClosed: number;
  callsAccepted: number;
  conversionRate: string;
}

interface VideoData {
  stats: VideoStats;
  title: string;
  reason: string;
  videoId: string;
  publishedAt: string;
}

interface VideoPerformanceData {
  top_videos: {
    videoOne?: VideoData;
    videoTwo?: VideoData;
    videoThree?: VideoData;
    videoFour?: VideoData;
    videoFive?: VideoData;
  };
  total_stats: VideoStats;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Total Stats Cards */}
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

      {/* Video Rankings */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex gap-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function VideoPerformance() {
  const { loading } = useSupabaseData();

  // Mock data for development
  const mockVideoData: VideoPerformanceData = {
    top_videos: {
      videoOne: {
        stats: {
          shows: 12,
          views: 31350,
          revenue: 11289,
          cancelled: 2,
          callsBooked: 14,
          callsClosed: 3,
          callsAccepted: 8,
          conversionRate: "21.43%"
        },
        title: "N8N ULTIMATE COURSE 8+ Hours (Sell $10k+ AI Workflows)",
        reason: "Highest overall revenue ($11,289), most views (31,350), and strong closing rate (3 closed calls). This video demonstrates the most commercial traction and engagement.",
        videoId: "JFRmgIGVuMY",
        publishedAt: "2025-06-18T05:30:00Z"
      },
      videoTwo: {
        stats: {
          shows: 8,
          views: 24120,
          revenue: 8450,
          cancelled: 1,
          callsBooked: 10,
          callsClosed: 2,
          callsAccepted: 6,
          conversionRate: "20.00%"
        },
        title: "How I Built a $50k/Month AI Automation Agency",
        reason: "Strong conversion rate (20%) and solid revenue generation. High engagement with business owners looking to scale.",
        videoId: "ABC123DEF45",
        publishedAt: "2025-06-15T10:00:00Z"
      },
      videoThree: {
        stats: {
          shows: 6,
          views: 18900,
          revenue: 6200,
          cancelled: 3,
          callsBooked: 9,
          callsClosed: 2,
          callsAccepted: 5,
          conversionRate: "22.22%"
        },
        title: "The $100k AI Funnel Blueprint (Step-by-Step)",
        reason: "Excellent conversion rate (22.22%) despite lower volume. Appeals to high-ticket prospects.",
        videoId: "XYZ789GHI01",
        publishedAt: "2025-06-12T14:30:00Z"
      },
      videoFour: {
        stats: {
          shows: 10,
          views: 22800,
          revenue: 5800,
          cancelled: 2,
          callsBooked: 12,
          callsClosed: 1,
          callsAccepted: 7,
          conversionRate: "8.33%"
        },
        title: "Why 99% of AI Agencies Fail (And How to Succeed)",
        reason: "High booking volume (12 calls) but lower conversion. Good for lead generation and brand awareness.",
        videoId: "DEF456JKL78",
        publishedAt: "2025-06-10T09:15:00Z"
      },
      videoFive: {
        stats: {
          shows: 5,
          views: 15600,
          revenue: 4100,
          cancelled: 1,
          callsBooked: 7,
          callsClosed: 1,
          callsAccepted: 4,
          conversionRate: "14.29%"
        },
        title: "My Secret to $10k Months with AI Automation",
        reason: "Consistent performance with good show-up rate. Attracts serious prospects interested in proven systems.",
        videoId: "GHI901MNO23",
        publishedAt: "2025-06-08T16:45:00Z"
      }
    },
    total_stats: {
      shows: 71,
      views: 87547,
      revenue: 25341,
      cancelled: 10,
      callsBooked: 81,
      callsClosed: 11,
      callsAccepted: 43,
      conversionRate: "13.58%"
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  const videoData = mockVideoData;
  const videos = Object.entries(videoData.top_videos).map(([key, video], index) => ({
    rank: index + 1,
    ...video
  }));

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500 text-yellow-50';
      case 2: return 'bg-gray-400 text-gray-50';
      case 3: return 'bg-amber-600 text-amber-50';
      default: return 'bg-blue-500 text-blue-50';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4" />;
    return <span className="font-bold text-sm">#{rank}</span>;
  };

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Performance</h1>
        <p className="text-muted-foreground">
          Track your top-performing YouTube videos and their impact on your funnel
        </p>
      </div>

      {/* Total Stats Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoData.total_stats.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all top videos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${videoData.total_stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Generated from video traffic
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Booked</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoData.total_stats.callsBooked}</div>
            <p className="text-xs text-muted-foreground">
              {videoData.total_stats.shows} shows ({((videoData.total_stats.shows / videoData.total_stats.callsBooked) * 100).toFixed(1)}% show rate)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoData.total_stats.conversionRate}</div>
            <p className="text-xs text-muted-foreground">
              {videoData.total_stats.callsClosed} closed from {videoData.total_stats.callsBooked} calls
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Videos Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Top Performing Videos
            </CardTitle>
            <CardDescription>
              Ranked by revenue generation and conversion performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.map((video, index) => (
                <motion.div
                  key={video.videoId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="flex items-center gap-4 p-6 border rounded-lg hover:bg-muted/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleVideoClick(video.videoId)}
                >
                  {/* Rank Badge */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getRankBadgeColor(video.rank)} shadow-lg`}>
                    {getRankIcon(video.rank)}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {video.reason}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{video.stats.views.toLocaleString()}</span>
                        <span className="text-muted-foreground">views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">${video.stats.revenue.toLocaleString()}</span>
                        <span className="text-muted-foreground">revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{video.stats.callsBooked}</span>
                        <span className="text-muted-foreground">calls</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{video.stats.conversionRate}</span>
                        <span className="text-muted-foreground">conversion</span>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>Shows: {video.stats.shows}</span>
                      <span>Closed: {video.stats.callsClosed}</span>
                      <span>Published: {new Date(video.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVideoClick(video.videoId);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Watch
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>
              Key takeaways from your top-performing content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">Top Performer</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                "{videos[0]?.title}" leads with ${videos[0]?.stats.revenue.toLocaleString()} revenue and {videos[0]?.stats.conversionRate} conversion rate
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Best Conversion</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Videos with "Blueprint" or "Step-by-Step" in titles show 18% higher conversion rates
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Users className="h-4 w-4" />
                <span className="font-medium">Audience Insight</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                Educational content (courses, tutorials) generates 2.3x more revenue than promotional videos
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}