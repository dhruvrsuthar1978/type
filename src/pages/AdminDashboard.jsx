import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Shield, Users, Flag, TrendingUp, AlertTriangle, CheckCircle, Clock, Ban, Eye, Filter, Download, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { systemAnalytics, recentReports, flaggedUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const abuseTypeData = Object.entries(systemAnalytics.abuseTypes).map(([key, value]) => ({
    name: key,
    value: value
  }));

  const platformData = Object.entries(systemAnalytics.platforms).map(([key, value]) => ({
    name: key,
    value: value
  }));

  const COLORS = ['#4F46E5', '#059669', '#DC2626', '#D97706', '#7C3AED'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-security bg-security/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Under Review': return 'text-primary bg-primary/10';
      case 'Critical': return 'text-danger bg-danger/10';
      case 'Escalated': return 'text-purple-600 bg-purple-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-danger bg-danger/10';
      case 'High': return 'text-warning bg-warning/10';
      case 'Medium': return 'text-primary bg-primary/10';
      case 'Low': return 'text-security bg-security/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'Critical': return 'text-danger bg-danger/10';
      case 'High': return 'text-warning bg-warning/10';
      case 'Medium': return 'text-primary bg-primary/10';
      case 'Low': return 'text-security bg-security/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredReports = recentReports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = searchTerm === '' || 
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and content moderation tools. Welcome, {user?.name}!</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{systemAnalytics.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{systemAnalytics.totalReports.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
                  <Flag className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round((systemAnalytics.resolvedReports / systemAnalytics.totalReports) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-security/10 text-security flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                  <p className="text-2xl font-bold text-foreground">{systemAnalytics.pendingReports.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-danger/10 text-danger flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Abuse Types Chart */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Common Abuse Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={abuseTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-security" />
                Platform Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {platformData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span>{entry.name}</span>
                    </div>
                    <span className="font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Growth Trends */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Growth Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={systemAnalytics.monthlyGrowth}>
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
                      dataKey="reports" 
                      stroke="hsl(var(--danger))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--danger))', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports Section */}
        <Card className="mb-8 hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-danger" />
                Recent Flagged Content
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under review">Under Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="critical">Critical</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Report ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User UUID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Platform</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Content</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Severity</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {report.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {report.userUuid.substring(0, 12)}...
                        </span>
                      </td>
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
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Flagged Users Section */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-warning" />
              Most Flagged Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User UUID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Reports Count</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Platforms</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Risk Level</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Activity</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedUsers.map((user) => (
                    <tr key={user.uuid} className="border-b border-border hover:bg-muted/30 transition-smooth">
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {user.uuid.substring(0, 16)}...
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-foreground">{user.reportsCount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.platforms.map((platform, index) => (
                            <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                          {user.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(user.lastActivity).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
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

export default AdminDashboard;