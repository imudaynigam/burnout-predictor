import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  MessageCircle,
  Users,
  Calendar,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

// Mock data - in real app, this would come from API
const insights = [
  {
    id: 1,
    title: "Team Communication Declining",
    description: "Team-wide communication frequency has decreased by 25% over the past two weeks",
    impact: "High",
    category: "Communication",
    icon: MessageCircle,
    trend: -25,
    affectedEmployees: 8,
    recommendations: [
      "Schedule weekly team check-ins",
      "Encourage informal communication channels",
      "Consider team building activities"
    ],
    priority: "urgent"
  },
  {
    id: 2,
    title: "After-Hours Work Pattern",
    description: "30% of team members are consistently working outside normal business hours",
    impact: "High",
    category: "Work-Life Balance",
    icon: Clock,
    trend: 30,
    affectedEmployees: 7,
    recommendations: [
      "Implement no-email-after-hours policy",
      "Review workload distribution",
      "Discuss time management strategies"
    ],
    priority: "urgent"
  },
  {
    id: 3,
    title: "Productivity Inconsistency",
    description: "Several team members showing irregular productivity patterns",
    impact: "Medium",
    category: "Performance",
    icon: TrendingDown,
    trend: -15,
    affectedEmployees: 5,
    recommendations: [
      "Provide productivity tools and training",
      "Identify and remove blockers",
      "Consider flexible work arrangements"
    ],
    priority: "medium"
  },
  {
    id: 4,
    title: "Positive Collaboration Increase",
    description: "Cross-team collaboration has improved by 18% this month",
    impact: "Low",
    category: "Collaboration",
    icon: TrendingUp,
    trend: 18,
    affectedEmployees: 12,
    recommendations: [
      "Celebrate and document successful collaboration patterns",
      "Share best practices with other teams",
      "Consider expanding cross-team initiatives"
    ],
    priority: "low"
  }
];

const teamMetrics = {
  avgRiskScore: 45,
  riskTrend: -8,
  satisfactionScore: 72,
  retentionRisk: 15,
  burnoutPrevention: 85
};

const actionItems = [
  {
    id: 1,
    task: "Schedule one-on-ones with high-risk employees",
    priority: "High",
    dueDate: "This Week",
    completed: false
  },
  {
    id: 2,
    task: "Review workload distribution across Engineering team",
    priority: "High", 
    dueDate: "Next Week",
    completed: false
  },
  {
    id: 3,
    task: "Implement team wellness check-in meetings",
    priority: "Medium",
    dueDate: "This Month",
    completed: true
  },
  {
    id: 4,
    task: "Analyze communication patterns for Design team",
    priority: "Medium",
    dueDate: "Next Week",
    completed: false
  }
];

export default function Insights() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Insights & Recommendations</h1>
        <p className="text-muted-foreground">Automated analysis and actionable recommendations for team wellness</p>
      </div>

      {/* Team Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.avgRiskScore}</div>
            <div className="flex items-center space-x-1 text-xs">
              {teamMetrics.riskTrend < 0 ? 
                <TrendingDown className="h-3 w-3 text-green-600" /> : 
                <TrendingUp className="h-3 w-3 text-red-600" />
              }
              <span className={teamMetrics.riskTrend < 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(teamMetrics.riskTrend)}% vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.satisfactionScore}%</div>
            <Progress value={teamMetrics.satisfactionScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{teamMetrics.retentionRisk}%</div>
            <p className="text-xs text-muted-foreground">3 employees at risk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prevention Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{teamMetrics.burnoutPrevention}%</div>
            <p className="text-xs text-muted-foreground">Burnout prevention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>AI-generated insights based on team data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            insight.priority === 'urgent' ? 'bg-red-100 dark:bg-red-950' : 
                            insight.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-950' : 
                            'bg-green-100 dark:bg-green-950'
                          }`}>
                            <insight.icon className={`h-4 w-4 ${getPriorityColor(insight.priority)}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{insight.title}</CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {insight.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant={getPriorityBadgeVariant(insight.priority)}>
                          {insight.impact} Impact
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Trend:</span>
                          <span className={insight.trend < 0 ? 'text-red-600' : 'text-green-600'}>
                            {insight.trend > 0 ? '+' : ''}{insight.trend}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{insight.affectedEmployees} affected</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium">Recommendations:</span>
                        <ul className="text-sm space-y-1">
                          {insight.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t flex justify-between">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          Create Action Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Recommended next steps based on insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div key={item.id} className={`p-3 rounded-lg border ${
                    item.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 
                    'bg-card'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {item.completed ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> :
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                        }
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.task}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            item.priority === 'High' ? 'destructive' : 'secondary'
                          } className="text-xs">
                            {item.priority}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{item.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Action Items
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}