import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Calendar,
  MessageCircle,
  GitBranch
} from 'lucide-react';

// Mock data - in real app, this would come from API
const teamOverview = {
  totalEmployees: 24,
  lowRisk: 18,
  mediumRisk: 4,
  highRisk: 2,
};

const recentAlerts = [
  {
    id: 1,
    employee: "Employee #1247",
    risk: "High",
    reason: "Significant drop in productivity and negative sentiment increase",
    date: "2 hours ago"
  },
  {
    id: 2,
    employee: "Employee #1089",
    risk: "Medium",
    reason: "Irregular work patterns detected",
    date: "1 day ago"
  },
  {
    id: 3,
    employee: "Employee #1156",
    risk: "Medium",
    reason: "Decreased communication activity",
    date: "2 days ago"
  }
];

const insights = [
  {
    title: "Team Sentiment Declining",
    description: "Overall team sentiment has decreased by 15% this week",
    impact: "medium",
    icon: TrendingDown
  },
  {
    title: "Increased After-Hours Activity",
    description: "3 employees showing activity outside normal work hours",
    impact: "high",
    icon: Calendar
  },
  {
    title: "Communication Patterns",
    description: "Team communication frequency down 20% from last month",
    impact: "medium",
    icon: MessageCircle
  }
];

export function ManagerDashboard() {
  const riskPercentages = {
    low: Math.round((teamOverview.lowRisk / teamOverview.totalEmployees) * 100),
    medium: Math.round((teamOverview.mediumRisk / teamOverview.totalEmployees) * 100),
    high: Math.round((teamOverview.highRisk / teamOverview.totalEmployees) * 100),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Team Overview</h1>
        <p className="text-muted-foreground">Monitor your team's burnout risk levels and wellness insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamOverview.totalEmployees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{teamOverview.lowRisk}</div>
            <p className="text-xs text-muted-foreground">{riskPercentages.low}% of team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{teamOverview.mediumRisk}</div>
            <p className="text-xs text-muted-foreground">{riskPercentages.medium}% of team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{teamOverview.highRisk}</div>
            <p className="text-xs text-muted-foreground">{riskPercentages.high}% of team</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Current burnout risk levels across your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Low Risk</span>
                <span className="text-sm text-muted-foreground">{teamOverview.lowRisk} employees</span>
              </div>
              <Progress value={riskPercentages.low} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Medium Risk</span>
                <span className="text-sm text-muted-foreground">{teamOverview.mediumRisk} employees</span>
              </div>
              <Progress value={riskPercentages.medium} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">High Risk</span>
                <span className="text-sm text-muted-foreground">{teamOverview.highRisk} employees</span>
              </div>
              <Progress value={riskPercentages.high} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest burnout risk notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <AlertTriangle className={`h-4 w-4 mt-1 ${
                    alert.risk === 'High' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.employee}</p>
                      <Badge variant={alert.risk === 'High' ? 'destructive' : 'secondary'}>
                        {alert.risk} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.reason}</p>
                    <p className="text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>Automated analysis and recommendations for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center space-x-2 mb-2">
                  <insight.icon className={`h-5 w-5 ${
                    insight.impact === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}