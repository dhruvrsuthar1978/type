import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, Eye, Flag, Calendar, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userStats, userAbuseHistory } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  const monthlyActivity = [
    { month: 'Jul', scanned: 2100, detected: 45 },
    { month: 'Aug', scanned: 2400, detected: 52 },
    { month: 'Sep', scanned: 2800, detected: 38 },
    { month: 'Oct', scanned: 3200, detected: 41 },
    { month: 'Nov', scanned: 2900, detected: 29 },
    { month: 'Dec', scanned: 3100, detected: 33 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-security';
      case 'Pending': return 'text-warning';
      case 'Under Review': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Under Review': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's your TypeAware activity overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages Scanned</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.messagesScanned.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Threats Detected</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.threatsDetected}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports Submitted</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.reportsSubmitted}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-security/10 text-security flex items-center justify-center">
                  <Flag className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Age</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.floor((new Date() - new Date(userStats.accountCreated)) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Activity Chart */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Monthly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="scanned" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      name="Messages Scanned"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="detected" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                      name="Threats Detected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-security" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {userAbuseHistory.slice(0, 4).map((report) => (
                  <div key={report.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{report.platform}</p>
                        <div className={`flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)}
                          <span className="text-xs font-medium">{report.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {report.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-danger/10 text-danger px-2 py-1 rounded-full">
                          {report.reason}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(report.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full History */}
        <Card className="mt-8 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Abuse History
              </div>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Platform</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Content</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userAbuseHistory.map((report) => (
                    <tr key={report.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">{report.platform}</span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {report.content}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs bg-danger/10 text-danger px-2 py-1 rounded-full">
                          {report.reason}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)}
                          <span className="text-sm font-medium">{report.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;