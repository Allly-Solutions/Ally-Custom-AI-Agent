// Type definitions for the Lead Dashboard
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  industry: string;
  role: string;
  service_interest: string;
  requirements: string;
  budget: number;
  timeline: string;
  decision_maker: boolean;
  score: number;
  status: 'Qualified' | 'Disqualified' | 'Pending';
  lead_source: string;
  channel: 'text' | 'voice' | 'email';
  created_at: string;
}

export interface Message {
  role: 'agent' | 'user';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  lead_id: string;
  messages: Message[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  drop_off_point: string | null;
  created_at: string;
}

export interface Analytics {
  id: string;
  date: string;
  total_leads: number;
  qualified_leads: number;
  disqualified_leads: number;
  avg_score: number;
  drop_off_rate: number;
  sentiment_summary: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface DashboardMetrics {
  total_leads: number;
  qualified_leads: number;
  disqualified_leads: number;
  conversion_rate: number;
  avg_lead_score: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface FilterOptions {
  status?: string[];
  channel?: string[];
  service_interest?: string[];
  date_range?: {
    start: string;
    end: string;
  };
}

export interface Settings {
  min_budget_threshold: number;
  max_acceptable_timeline: string;
  api_keys: {
    langchain: string;
    azure: string;
    crm: string;
  };
  email_integration: {
    enabled: boolean;
    provider: string;
  };
  calendar_integration: {
    enabled: boolean;
    provider: string;
  };
}