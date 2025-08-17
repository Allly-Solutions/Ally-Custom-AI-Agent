import { TrendingUp, Users, UserCheck, UserX, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardMetrics } from '@/types/lead';

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

export function MetricsCardsVoice({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: 'Total Leads',
      value: metrics.total_leads.toString(),
      icon: Users,
      trend: '+12%',
      description: 'from last month'
    },
    {
      title: 'Qualified Leads',
      value: metrics.qualified_leads.toString(),
      icon: UserCheck,
      trend: '+8%',
      description: 'from last month',
      className: 'text-success'
    },
    {
      title: 'Disqualified',
      value: metrics.disqualified_leads.toString(),
      icon: UserX,
      trend: '-3%',
      description: 'from last month',
      className: 'text-destructive'
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversion_rate.toFixed(1)}%`,
      icon: Target,
      trend: '+2.1%',
      description: 'from last month',
      className: 'text-primary'
    },
    {
      title: 'Avg Lead Score',
      value: metrics.avg_lead_score.toString(),
      icon: TrendingUp,
      trend: '+5.2%',
      description: 'from last month',
      className: 'text-warning'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.className || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className={`${card.trend.startsWith('+') ? 'text-success' : 'text-destructive'} font-medium mr-1`}>
                  {card.trend}
                </span>
                {card.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}