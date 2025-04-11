
import React from 'react';
import PendingTasks from './PendingTasks';
import RecentExpenses from './RecentExpenses';
import QuickAccess from './QuickAccess';
import ExpenseCharts from './ExpenseCharts';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PendingTasks />
        <div className="md:col-span-2">
          <RecentExpenses />
        </div>
      </div>
      
      <QuickAccess />
      
      <ExpenseCharts />
    </div>
  );
};

export default Dashboard;
