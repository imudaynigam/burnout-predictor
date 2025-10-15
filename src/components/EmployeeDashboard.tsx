import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  MessageCircle, 
  GitBranch,
  Clock,
  Heart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock data - in real app, this would come from API
const employeeData = {
  currentRisk: 'Medium',
  riskScore: 65,
  sentimentTrend: -12,
  productivityScore: 78,
  weeklyHours: 42,
  recommendations: [
    "Consider taking short breaks between tasks",
    "Your communication sentiment has been declining - reach out if you need support",
    "Great job maintaining consistent productivity!"
  ]
};

const weeklyMetrics = [
  { day: 'Mon', sentiment: 80, productivity: 85 },
  { day: 'Tue', sentiment: 75, productivity: 90 },
  { day: 'Wed', sentiment: 65, productivity: 75 },
  { day: 'Thu', sentiment: 60, productivity: 70 },
  { day: 'Fri', sentiment: 70, productivity: 80 },
];

export function EmployeeDashboard() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Low': return 'default';
      case 'Medium': return 'secondary';
      case 'High': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Wellness Dashboard</h1>
        <p className="text-muted-foreground">Track your burnout risk and wellness metrics</p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Risk Level</CardTitle>
            <AlertCircle className={`h-4 w-4 ${getRiskColor(employeeData.currentRisk)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(employeeData.currentRisk)}`}>
              {employeeData.currentRisk}
            </div>
            <Badge variant={getRiskBadgeVariant(employeeData.currentRisk)} className="mt-2">
              Score: {employeeData.riskScore}/100
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Trend</CardTitle>
            <MessageCircle className={`h-4 w-4 ${employeeData.sentimentTrend < 0 ? 'text-red-600' : 'text-green-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${employeeData.sentimentTrend < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {employeeData.sentimentTrend > 0 ? '+' : ''}{employeeData.sentimentTrend}%
              </div>
              {employeeData.sentimentTrend < 0 ? 
                <TrendingDown className="h-4 w-4 text-red-600" /> : 
                <TrendingUp className="h-4 w-4 text-green-600" />
              }
            </div>
            <p className="text-xs text-muted-foreground">vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{employeeData.productivityScore}</div>
            <Progress value={employeeData.productivityScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeData.weeklyHours}h</div>
            <p className="text-xs text-muted-foreground">
              {employeeData.weeklyHours > 40 ? 'Above average' : 'Within range'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Your sentiment and productivity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.day}</span>
                    <div className="flex space-x-4 text-xs">
                      <span className="text-blue-600">Sentiment: {metric.sentiment}%</span>
                      <span className="text-green-600">Productivity: {metric.productivity}%</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Progress value={metric.sentiment} className="h-1 flex-1" />
                    <Progress value={metric.productivity} className="h-1 flex-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Wellness Recommendations</span>
            </CardTitle>
            <CardDescription>AI-generated suggestions for your wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeeData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full">
                Schedule Check-in with Manager
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Your Risk Level</CardTitle>
          <CardDescription>Why your burnout risk is currently assessed as {employeeData.currentRisk}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
              <h4 className="font-medium mb-2">Current Assessment: Medium Risk</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your risk level increased this week due to:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 12% decrease in positive sentiment in communications</li>
                <li>• Irregular work patterns detected (working after 7 PM on 3 days)</li>
                <li>• Slight decrease in task completion velocity</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <h4 className="font-medium mb-2 text-green-800 dark:text-green-400">Positive Indicators</h4>
              <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                <li>• Maintaining consistent code quality</li>
                <li>• Regular participation in team communications</li>
                <li>• Taking lunch breaks consistently</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}