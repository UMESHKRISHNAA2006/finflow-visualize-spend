
import { Expense, PendingTask, TeamSpending, DailyExpense } from "@/types/expense";

export const pendingTasks: PendingTask[] = [];

export const recentExpenses: Expense[] = [];

export const teamSpending: TeamSpending[] = [];

export const dailyExpenses: DailyExpense[] = [];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Marketing':
      return 'bg-expense-marketing';
    case 'Pending':
      return 'bg-expense-pending';
    case 'Travel':
      return 'bg-expense-travel';
    default:
      return 'bg-gray-500';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Office Supplies':
      return 'briefcase';
    case 'Business Lunch':
      return 'utensils';
    case 'Travel Expenses':
      return 'plane';
    case 'Client Dinner':
      return 'users';
    case 'Hotel':
      return 'hotel';
    default:
      return 'receipt';
  }
};
