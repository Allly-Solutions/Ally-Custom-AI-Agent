import { useState } from 'react';
import {  MetricsCardsChat } from '@/components/dashboard/MetricsCards';
import { MetricsCardsVoice } from '@/components/dashboard/MetricsCardsVoice';
import { LeadsChart } from '@/components/dashboard/LeadsChart';
import { DashboardPieChart } from '@/components/dashboard/PieChart';
import { DashboardBarChart } from '@/components/dashboard/BarChart';
import LeadsTable from '@/components/leads/LeadsTable';
import { ConversationModal } from '@/components/conversations/ConversationModal';
import {
  mockDashboardMetrics,
  mockLeadsOverTime,
  mockLeadsByChannel,
  mockLeadsByService,
  mockSentimentTrends,
  mockDropOffRate,
  mockLeads,
  mockConversations
} from '@/data/mockData';
 

export default function Dashboard() {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false);

  const handleViewConversation = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsConversationModalOpen(true);
  };

  const selectedConversation = mockConversations.find(
    conv => conv.lead_id === selectedLeadId
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Lead Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your AI agent's performance and lead capture analytics
        </p>
      </div>

      <h1 className='font-bold'>Ally Chat</h1>
      {/* Metrics Cards */}
      <MetricsCardsChat/>

      {/* <h1 className='font-bold'>Ally Voice</h1>
      <MetricsCardsVoice metrics={mockDashboardMetrics}/> */}

      {/* Charts Section */}
      {/* <div className="grid gap-6 md:grid-cols-2">
        <LeadsChart data={mockLeadsOverTime} title="Leads Over Time" />
        <DashboardPieChart data={mockLeadsByChannel} title="Leads by Channel" />
        <DashboardBarChart data={mockLeadsByService} title="Leads by Service Interest" />
        <DashboardBarChart 
          data={mockDropOffRate} 
          title="Drop-off Rate by Question" 
          color="hsl(var(--destructive))" 
        />
      </div> */}

       
      {/* <div className="grid gap-6">
        <LeadsChart data={mockSentimentTrends} title="Sentiment Trends" />
      </div> */}

       
      <LeadsTable/>

      
      {/* <ConversationModal
        conversation={selectedConversation || null}
        isOpen={isConversationModalOpen}
        onClose={() => setIsConversationModalOpen(false)}
      /> */}
    </div>
  );
}