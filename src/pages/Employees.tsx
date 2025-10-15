import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  User,
  Calendar
} from 'lucide-react';

// Mock data - in real app, this would come from API
const employees = [
  {
    id: '1247',
    name: 'Employee #1247',
    department: 'Engineering',
    role: 'Senior Developer',
    riskLevel: 'High',
    riskScore: 85,
    lastActivity: '2 hours ago',
    sentimentTrend: -25,
    productivityScore: 45,
    recentChanges: ['Decreased productivity', 'Negative sentiment spike']
  },
  {
    id: '1089',
    name: 'Employee #1089',
    department: 'Design',
    role: 'UX Designer',
    riskLevel: 'Medium',
    riskScore: 65,
    lastActivity: '1 day ago',
    sentimentTrend: -8,
    productivityScore: 78,
    recentChanges: ['Irregular work patterns']
  },
  {
    id: '1156',
    name: 'Employee #1156',
    department: 'Engineering',
    role: 'Frontend Developer',
    riskLevel: 'Medium',
    riskScore: 62,
    lastActivity: '3 hours ago',
    sentimentTrend: -12,
    productivityScore: 72,
    recentChanges: ['Reduced communication', 'Late work hours']
  },
  {
    id: '1203',
    name: 'Employee #1203',
    department: 'Product',
    role: 'Product Manager',
    riskLevel: 'Low',
    riskScore: 28,
    lastActivity: '1 hour ago',
    sentimentTrend: 5,
    productivityScore: 92,
    recentChanges: ['Consistent performance']
  },
  {
    id: '1298',
    name: 'Employee #1298',
    department: 'Engineering',
    role: 'DevOps Engineer',
    riskLevel: 'Low',
    riskScore: 22,
    lastActivity: '30 minutes ago',
    sentimentTrend: 12,
    productivityScore: 88,
    recentChanges: ['Improved collaboration']
  }
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === 'all' || employee.riskLevel.toLowerCase() === filterRisk;
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesRisk && matchesDepartment;
  });

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

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Employee Details</h1>
        <p className="text-muted-foreground">Monitor individual team member burnout risks and trends</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Level</label>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger>
                  <SelectValue placeholder="All risk levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.role} • {employee.department}</CardDescription>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(employee.riskLevel)}>
                  {employee.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Risk Score */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Risk Score</span>
                  <span className={`text-sm font-bold ${getRiskColor(employee.riskLevel)}`}>
                    {employee.riskScore}/100
                  </span>
                </div>
                <Progress value={employee.riskScore} className="h-2" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">Sentiment</span>
                    {employee.sentimentTrend < 0 ? 
                      <TrendingDown className="h-3 w-3 text-red-600" /> : 
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    }
                  </div>
                  <p className={`text-sm ${employee.sentimentTrend < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {employee.sentimentTrend > 0 ? '+' : ''}{employee.sentimentTrend}%
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm font-medium">Productivity</span>
                  <p className="text-sm text-muted-foreground">{employee.productivityScore}%</p>
                </div>
              </div>

              {/* Recent Changes */}
              <div className="space-y-2">
                <span className="text-sm font-medium">Recent Changes</span>
                <div className="space-y-1">
                  {employee.recentChanges.map((change, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-600" />
                      <span className="text-xs text-muted-foreground">{change}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Last activity: {employee.lastActivity}</span>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No employees found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}