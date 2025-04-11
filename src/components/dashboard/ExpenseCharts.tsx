
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { teamSpending, dailyExpenses } from '@/lib/data';

const ExpenseCharts = () => {
  // Filter and prepare team spending data
  const teamData = teamSpending.filter(item => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].includes(item.month));
  
  // Group data by month
  const groupedTeamData = teamData.reduce((acc, item) => {
    const existingMonth = acc.find(group => group.month === item.month);
    if (existingMonth) {
      existingMonth[item.team] = item.amount;
    } else {
      const newMonth: any = { month: item.month };
      newMonth[item.team] = item.amount;
      acc.push(newMonth);
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <Card className="glass-card h-72">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Monthly Report</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={groupedTeamData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, 'Amount']}
                contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#333', borderRadius: '8px' }}
              />
              <Bar dataKey="Marketing" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Sales" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card h-72">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Day-by-Day Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyExpenses}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, 'Amount']}
                contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#333', borderRadius: '8px' }}
              />
              <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseCharts;
