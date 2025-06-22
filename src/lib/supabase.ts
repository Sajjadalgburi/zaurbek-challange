import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      statistics: {
        Row: {
          id: string;
          total_stats: any;
          total_youtube_stats_in_30_days: any;
          visitors_by_region: any;
          website_visitors: number;
          all_time_views: number;
          all_time_subs: number;
          date: string;
          created_at: string;
        };
        Insert: {
          total_stats: any;
          total_youtube_stats_in_30_days: any;
          visitors_by_region: any;
          website_visitors: number;
          all_time_views: number;
          all_time_subs: number;
          date: string;
        };
        Update: {
          total_stats?: any;
          total_youtube_stats_in_30_days?: any;
          visitors_by_region?: any;
          website_visitors?: number;
          all_time_views?: number;
          all_time_subs?: number;
          date?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          views: number;
          leads_generated: number;
          booked_calls: number;
          revenue: number;
          conversion_rate: number;
          created_at: string;
        };
        Insert: {
          title: string;
          views: number;
          leads_generated: number;
          booked_calls: number;
          revenue: number;
          conversion_rate: number;
        };
        Update: {
          title?: string;
          views?: number;
          leads_generated?: number;
          booked_calls?: number;
          revenue?: number;
          conversion_rate?: number;
        };
      };
    };
  };
};