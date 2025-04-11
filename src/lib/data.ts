
import { Expense, PendingTask, TeamSpending, DailyExpense } from "@/types/expense";

export const pendingTasks: PendingTask[] = [
  { id: "1", title: "Pending Approvals", count: 5, icon: "check-circle" },
  { id: "2", title: "New Trips Registered", count: 1, icon: "plane" },
  { id: "3", title: "Unreported Expenses", count: 3, icon: "file-text" },
  { id: "4", title: "Upcoming Expenses", count: 0, icon: "calendar" },
  { id: "5", title: "Unreported Advances", count: 0, icon: "credit-card" }
];

export const recentExpenses: Expense[] = [
  {
    id: "1",
    amount: 150.00,
    date: "2025-04-01",
    category: "Office Supplies",
    description: "Office supplies for Q2",
    status: "Pending",
    employee: "John Smith",
    team: "Marketing"
  },
  {
    id: "2",
    amount: 675.50,
    date: "2025-04-02",
    category: "Business Lunch",
    description: "Client meeting at restaurant",
    status: "Pending",
    employee: "Sarah Cole",
    team: "Sales"
  },
  {
    id: "3",
    amount: 1420.25,
    date: "2025-04-03",
    category: "Travel Expenses",
    description: "Flight to conference",
    status: "Approved",
    employee: "Mike Brown",
    team: "Marketing"
  },
  {
    id: "4",
    amount: 120.00,
    date: "2025-04-05",
    category: "Client Dinner",
    description: "Dinner with potential client",
    status: "Pending",
    employee: "Jennifer Lee",
    team: "Marketing"
  },
  {
    id: "5",
    amount: 275.75,
    date: "2025-04-07",
    category: "Hotel",
    description: "Accommodation during business trip",
    status: "Approved",
    employee: "David Wilson",
    team: "Travel"
  }
];

export const teamSpending: TeamSpending[] = [
  { team: "Marketing", amount: 3200, month: "Jan" },
  { team: "Sales", amount: 1800, month: "Jan" },
  { team: "Marketing", amount: 4500, month: "Feb" },
  { team: "Sales", amount: 2100, month: "Feb" },
  { team: "Marketing", amount: 4300, month: "Mar" },
  { team: "Sales", amount: 1700, month: "Mar" },
  { team: "Marketing", amount: 2900, month: "Apr" },
  { team: "Sales", amount: 3200, month: "Apr" },
  { team: "Marketing", amount: 4800, month: "May" },
  { team: "Sales", amount: 2200, month: "May" },
  { team: "Marketing", amount: 3600, month: "Jun" },
  { team: "Sales", amount: 2800, month: "Jun" },
];

export const dailyExpenses: DailyExpense[] = [
  { day: "Monday", amount: 350 },
  { day: "Tuesday", amount: 275 },
  { day: "Wednesday", amount: 620 },
  { day: "Thursday", amount: 750 },
  { day: "Friday", amount: 420 },
  { day: "Saturday", amount: 180 },
  { day: "Sunday", amount: 120 },
];

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
