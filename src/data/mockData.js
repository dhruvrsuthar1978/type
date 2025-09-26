// Mock data for TypeAware application

export const userStats = {
  messagesScanned: 12847,
  threatsDetected: 234,
  reportsSubmitted: 89,
  accountCreated: '2024-01-15'
};

export const userAbuseHistory = [
  {
    id: 1,
    platform: 'Twitter',
    content: 'This is harassment content that was detected...',
    reason: 'Harassment',
    timestamp: '2024-01-20 14:30:00',
    status: 'Resolved'
  },
  {
    id: 2,
    platform: 'YouTube',
    content: 'Spam content that was flagged by the system...',
    reason: 'Spam',
    timestamp: '2024-01-19 09:15:00',
    status: 'Pending'
  },
  {
    id: 3,
    platform: 'Reddit',
    content: 'Hate speech detected in comment thread...',
    reason: 'Hate Speech',
    timestamp: '2024-01-18 16:45:00',
    status: 'Resolved'
  },
  {
    id: 4,
    platform: 'Facebook',
    content: 'Bullying behavior identified in group chat...',
    reason: 'Bullying',
    timestamp: '2024-01-17 11:20:00',
    status: 'Under Review'
  }
];

export const systemAnalytics = {
  totalUsers: 15420,
  totalReports: 8965,
  resolvedReports: 7234,
  pendingReports: 1731,
  platforms: {
    Twitter: 3567,
    YouTube: 2134,
    Reddit: 1876,
    Facebook: 1388
  },
  abuseTypes: {
    Harassment: 2847,
    Spam: 2156,
    'Hate Speech': 1934,
    Bullying: 1678,
    Threats: 350
  },
  monthlyGrowth: [
    { month: 'Jul', reports: 1200, users: 800 },
    { month: 'Aug', reports: 1450, users: 950 },
    { month: 'Sep', reports: 1680, users: 1200 },
    { month: 'Oct', reports: 1920, users: 1450 },
    { month: 'Nov', reports: 2234, users: 1650 },
    { month: 'Dec', reports: 2567, users: 1890 }
  ]
};

export const recentReports = [
  {
    id: 'RPT-2024-001',
    userUuid: 'user-abc123def456',
    platform: 'Twitter',
    content: 'You\'re such a loser, nobody likes you anyway',
    reason: 'Harassment',
    timestamp: '2024-01-20 15:45:00',
    status: 'Pending',
    severity: 'High'
  },
  {
    id: 'RPT-2024-002',
    userUuid: 'user-def789ghi012',
    platform: 'YouTube',
    content: 'Click here for free money!!! Limited time offer!!!',
    reason: 'Spam',
    timestamp: '2024-01-20 14:32:00',
    status: 'Under Review',
    severity: 'Medium'
  },
  {
    id: 'RPT-2024-003',
    userUuid: 'user-ghi345jkl678',
    platform: 'Reddit',
    content: 'People like you don\'t belong in our community',
    reason: 'Hate Speech',
    timestamp: '2024-01-20 13:18:00',
    status: 'Resolved',
    severity: 'High'
  },
  {
    id: 'RPT-2024-004',
    userUuid: 'user-jkl901mno234',
    platform: 'Facebook',
    content: 'I\'m going to make your life miserable at school',
    reason: 'Bullying',
    timestamp: '2024-01-20 12:05:00',
    status: 'Escalated',
    severity: 'Critical'
  },
  {
    id: 'RPT-2024-005',
    userUuid: 'user-mno567pqr890',
    platform: 'Discord',
    content: 'Meet me after school, you know what\'s coming',
    reason: 'Threats',
    timestamp: '2024-01-20 11:47:00',
    status: 'Critical',
    severity: 'Critical'
  }
];

export const flaggedUsers = [
  {
    uuid: 'user-abc123def456',
    reportsCount: 23,
    platforms: ['Twitter', 'Reddit'],
    lastActivity: '2024-01-20 15:45:00',
    riskLevel: 'High',
    status: 'Active'
  },
  {
    uuid: 'user-def789ghi012',
    reportsCount: 18,
    platforms: ['YouTube', 'Facebook'],
    lastActivity: '2024-01-20 14:32:00',
    riskLevel: 'Medium',
    status: 'Monitored'
  },
  {
    uuid: 'user-ghi345jkl678',
    reportsCount: 15,
    platforms: ['Reddit', 'Discord'],
    lastActivity: '2024-01-20 13:18:00',
    riskLevel: 'Medium',
    status: 'Warning Issued'
  },
  {
    uuid: 'user-jkl901mno234',
    reportsCount: 12,
    platforms: ['Facebook', 'Instagram'],
    lastActivity: '2024-01-20 12:05:00',
    riskLevel: 'Low',
    status: 'Under Review'
  },
  {
    uuid: 'user-mno567pqr890',
    reportsCount: 31,
    platforms: ['Discord', 'Twitter', 'YouTube'],
    lastActivity: '2024-01-20 11:47:00',
    riskLevel: 'Critical',
    status: 'Blocked'
  }
];