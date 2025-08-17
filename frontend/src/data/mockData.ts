import { Lead, Conversation, Analytics, DashboardMetrics, ChartDataPoint } from '@/types/lead';

// Mock leads data matching Azure Cosmos DB schema
export const mockLeads: Lead[] = [
  {
    id: "lead_001",
    name: "John Miller",
    email: "john.miller@example.com",
    phone: "+1 555-234-7890",
    location: "New York, USA",
    company: "Miller Solutions",
    industry: "IT Services",
    role: "CEO",
    service_interest: "Website Development",
    requirements: "E-commerce with payment gateway",
    budget: 5000,
    timeline: "2 weeks",
    decision_maker: true,
    score: 85,
    status: "Qualified",
    lead_source: "Website Chat",
    channel: "text",
    created_at: "2025-08-16T10:00:00Z"
  },
  {
    id: "lead_002",
    name: "Sarah Chen",
    email: "s.chen@techcorp.com",
    phone: "+1 555-987-6543",
    location: "San Francisco, USA",
    company: "TechCorp Inc",
    industry: "Technology",
    role: "Marketing Director",
    service_interest: "Mobile App",
    requirements: "iOS and Android app for customer engagement",
    budget: 15000,
    timeline: "3 months",
    decision_maker: false,
    score: 72,
    status: "Pending",
    lead_source: "LinkedIn Ad",
    channel: "text",
    created_at: "2025-08-15T14:30:00Z"
  },
  {
    id: "lead_003",
    name: "Michael Roberts",
    email: "mike.roberts@startup.io",
    phone: "+1 555-456-7890",
    location: "Austin, USA",
    company: "StartupFlow",
    industry: "Fintech",
    role: "Founder",
    service_interest: "MVP Development",
    requirements: "Full-stack web application with API integration",
    budget: 25000,
    timeline: "4 months",
    decision_maker: true,
    score: 92,
    status: "Qualified",
    lead_source: "Google Ad",
    channel: "text",
    created_at: "2025-08-14T09:15:00Z"
  },
  {
    id: "lead_004",
    name: "Emma Wilson",
    email: "emma.w@retailplus.com",
    phone: "+1 555-321-9876",
    location: "Chicago, USA",
    company: "RetailPlus",
    industry: "Retail",
    role: "Operations Manager",
    service_interest: "E-commerce Platform",
    requirements: "Multi-vendor marketplace with inventory management",
    budget: 3000,
    timeline: "1 week",
    decision_maker: false,
    score: 45,
    status: "Disqualified",
    lead_source: "Facebook Ad",
    channel: "text",
    created_at: "2025-08-13T16:45:00Z"
  },
  {
    id: "lead_005",
    name: "David Kim",
    email: "d.kim@healthtech.org",
    phone: "+1 555-654-3210",
    location: "Boston, USA",
    company: "HealthTech Solutions",
    industry: "Healthcare",
    role: "CTO",
    service_interest: "AI Integration",
    requirements: "Machine learning models for patient data analysis",
    budget: 35000,
    timeline: "6 months",
    decision_maker: true,
    score: 88,
    status: "Qualified",
    lead_source: "Referral",
    channel: "voice",
    created_at: "2025-08-12T11:20:00Z"
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "conv_001",
    lead_id: "lead_001",
    messages: [
      { role: "agent", text: "Hi there! I'm here to help you with your project needs. May I start by getting your name?", timestamp: "2025-08-16T09:00:00Z" },
      { role: "user", text: "Hi! I'm John Miller", timestamp: "2025-08-16T09:00:05Z" },
      { role: "agent", text: "Nice to meet you John! What kind of project are you looking to work on?", timestamp: "2025-08-16T09:00:10Z" },
      { role: "user", text: "I need an e-commerce website for my business", timestamp: "2025-08-16T09:00:15Z" },
      { role: "agent", text: "Excellent! Can you tell me more about your budget range for this project?", timestamp: "2025-08-16T09:00:20Z" },
      { role: "user", text: "I'm thinking around $5000", timestamp: "2025-08-16T09:00:25Z" }
    ],
    sentiment: {
      positive: 4,
      neutral: 2,
      negative: 0
    },
    drop_off_point: null,
    created_at: "2025-08-16T09:00:00Z"
  }
];

export const mockAnalytics: Analytics = {
  id: "analytics_2025_08_16",
  date: "2025-08-16",
  total_leads: 120,
  qualified_leads: 75,
  disqualified_leads: 25,
  avg_score: 72,
  drop_off_rate: 0.25,
  sentiment_summary: { positive: 90, neutral: 20, negative: 10 }
};

export const mockDashboardMetrics: DashboardMetrics = {
  total_leads: 120,
  qualified_leads: 75,
  disqualified_leads: 25,
  conversion_rate: 62.5,
  avg_lead_score: 72
};

export const mockLeadsOverTime: ChartDataPoint[] = [
  { name: 'Jan', value: 45, date: '2025-01' },
  { name: 'Feb', value: 52, date: '2025-02' },
  { name: 'Mar', value: 61, date: '2025-03' },
  { name: 'Apr', value: 58, date: '2025-04' },
  { name: 'May', value: 67, date: '2025-05' },
  { name: 'Jun', value: 72, date: '2025-06' },
  { name: 'Jul', value: 78, date: '2025-07' },
  { name: 'Aug', value: 85, date: '2025-08' }
];

export const mockLeadsByChannel: ChartDataPoint[] = [
  { name: 'Website Chat', value: 45 },
  { name: 'LinkedIn Ad', value: 32 },
  { name: 'Google Ad', value: 28 },
  { name: 'Facebook Ad', value: 15 },
  { name: 'Referral', value: 20 }
];

export const mockLeadsByService: ChartDataPoint[] = [
  { name: 'Website Development', value: 35 },
  { name: 'Mobile App', value: 28 },
  { name: 'E-commerce Platform', value: 22 },
  { name: 'AI Integration', value: 18 },
  { name: 'MVP Development', value: 17 }
];

export const mockSentimentTrends: ChartDataPoint[] = [
  { name: 'Week 1', value: 0.85 },
  { name: 'Week 2', value: 0.78 },
  { name: 'Week 3', value: 0.82 },
  { name: 'Week 4', value: 0.89 }
];

export const mockDropOffRate: ChartDataPoint[] = [
  { name: 'Name Collection', value: 5 },
  { name: 'Service Interest', value: 12 },
  { name: 'Budget Discussion', value: 25 },
  { name: 'Timeline Planning', value: 18 },
  { name: 'Contact Details', value: 8 }
];