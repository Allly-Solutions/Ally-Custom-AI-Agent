# AI Lead Dashboard

A comprehensive, responsive dashboard for monitoring AI Lead Capturing Agent performance with Azure Cosmos DB integration.

## 🎯 Features

### 📊 Dashboard Overview
- **Metrics Cards**: Total leads, qualified leads, disqualified leads, conversion rate, average lead score
- **Interactive Charts**: Leads over time, leads by channel, service interest analysis, sentiment trends
- **Real-time Analytics**: Drop-off rate tracking and performance monitoring

### 👥 Lead Management
- **Advanced Table View**: Searchable and filterable lead database
- **Lead Scoring**: Visual score indicators with progress bars
- **Status Management**: Qualified, Disqualified, and Pending lead classification
- **Conversation Tracking**: Full chat transcript viewer with sentiment analysis

### 💬 Conversation Analysis
- **Chat Transcripts**: Detailed conversation history with timestamps
- **Sentiment Analysis**: Color-coded sentiment tracking (positive, neutral, negative)
- **Drop-off Detection**: Identify where leads abandon the conversation
- **Entity Extraction**: Automatic extraction of name, email, phone, budget, and service interests

### ⚙️ Configuration
- **Lead Qualification**: Customizable budget thresholds and timeline criteria
- **API Integration**: Support for LangChain, Azure, and CRM connections
- **Email & Calendar**: Integration with popular providers

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom design system
- **Charts**: Recharts for interactive data visualization
- **Routing**: React Router for navigation
- **State Management**: React Query for API state management
- **Backend**: Azure Cosmos DB integration (via REST API)

## 🎨 Design System

The dashboard uses a modern white/grey aesthetic with:
- **Primary Colors**: Professional blue (#4F8EF7)
- **Status Colors**: Green for qualified, red for disqualified, orange for pending
- **Semantic Tokens**: Consistent design system with HSL colors
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Hover effects and transition animations

## 📊 Data Structure

### Lead Document (Azure Cosmos DB)
```json
{
  "id": "lead_123",
  "name": "John Miller",
  "email": "john.miller@example.com",
  "phone": "+1 555-234-7890",
  "location": "New York, USA",
  "company": "Miller Solutions",
  "industry": "IT Services",
  "service_interest": "Website Development",
  "budget": 5000,
  "timeline": "2 weeks",
  "score": 85,
  "status": "Qualified",
  "lead_source": "Website Chat",
  "created_at": "2025-08-16T10:00:00Z"
}
```

### Conversation Document
```json
{
  "id": "conv_456",
  "lead_id": "lead_123",
  "messages": [
    {
      "role": "agent|user",
      "text": "Message content",
      "timestamp": "2025-08-16T09:00:00Z"
    }
  ],
  "sentiment": {
    "positive": 3,
    "neutral": 1,
    "negative": 0
  }
}
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔗 API Integration

The dashboard expects these REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get paginated leads with filters |
| GET | `/api/leads/:id` | Get single lead details |
| GET | `/api/conversations/:leadId` | Get conversation for a lead |
| GET | `/api/analytics` | Get analytics data |
| GET | `/api/analytics/dashboard` | Get dashboard metrics |
| POST | `/api/settings` | Update settings |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

## 🔐 Backend Integration

### Option 1: Azure Cosmos DB (Your Current Setup)
Connect your existing Azure Cosmos DB backend by implementing the API endpoints above. The frontend is designed to work with your data structure.

### Option 2: Lovable + Supabase Integration (Recommended)
For a fully integrated solution, consider using Lovable's native Supabase integration:

1. Click the green **Supabase** button in the top right
2. Connect to Supabase for automatic backend setup
3. Get authentication, database, and API functionality out of the box

[Learn more about Supabase integration](https://docs.lovable.dev/integrations/supabase/)

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Desktop**: Full sidebar navigation with detailed tables
- **Tablet**: Collapsible sidebar with optimized charts
- **Mobile**: Bottom navigation with stacked components

## 🎯 Key Features

- ✅ Real-time lead tracking and analytics
- ✅ Advanced filtering and search capabilities
- ✅ Sentiment analysis visualization
- ✅ Conversion rate optimization tools
- ✅ Mobile-responsive design
- ✅ Dark/light mode support
- ✅ Export capabilities
- ✅ API-ready architecture

## 🚀 Deployment

Deploy your dashboard easily:

1. **Via Lovable**: Click **Publish** in the top right
2. **Custom Domain**: Connect your domain in Project Settings
3. **Environment Setup**: Configure your API endpoints

## 📈 Analytics & Insights

Track key metrics:
- Lead conversion rates
- Channel performance
- Sentiment trends
- Drop-off analysis
- Time-based analytics

Built with ❤️ using Lovable - The AI-powered web development platform.