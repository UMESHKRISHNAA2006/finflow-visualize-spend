
import { Expense, PendingTask, TeamSpending, DailyExpense } from "@/types/expense";
import { generateId } from "./utils";

// Generate random dates between two ranges
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Format a date to ISO string and get just the date part
const formatDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const pendingTasks: PendingTask[] = [
  {
    id: generateId(),
    title: "Pending Approvals",
    count: 14,
    icon: "check-circle"
  },
  {
    id: generateId(),
    title: "Submitted Expenses",
    count: 7,
    icon: "file-text"
  },
  {
    id: generateId(),
    title: "Expense Reports",
    count: 3,
    icon: "bar-chart"
  },
  {
    id: generateId(),
    title: "Trip Requests",
    count: 5,
    icon: "map"
  }
];

// Fake employees
const employees = [
  "Umesh Krishnaa", 
  "Ananya Sharma", 
  "Rajesh Kumar", 
  "Priya Patel", 
  "Vikram Singh", 
  "Neha Gupta", 
  "Suresh Verma"
];

// Fake expense categories
const expenseCategories = [
  "Office Supplies", 
  "Business Lunch", 
  "Travel Expenses", 
  "Client Dinner", 
  "Hotel", 
  "Taxi Fare",
  "Conference Fee"
];

// Fake status options
const statuses = ["Pending", "Approved", "Rejected", "Reimbursed"];

// Fake descriptions
const descriptions = [
  "Quarterly team lunch",
  "Client meeting expenses",
  "Office stationery supplies",
  "Business trip to Chennai",
  "Annual conference registration",
  "Team building event",
  "Software subscription",
  "Marketing materials",
  "Training workshop expenses",
  "Office equipment purchase"
];

// Generate random recent expenses
export let recentExpenses: Expense[] = Array.from({ length: 15 }, (_, i) => {
  const date = getRandomDate(new Date(2024, 0, 1), new Date());
  return {
    id: generateId(),
    amount: Math.floor(Math.random() * 20000) + 1000,
    date: formatDateString(date),
    category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)] as any,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)] as any,
    employee: employees[Math.floor(Math.random() * employees.length)],
    team: ["Marketing", "Engineering", "Finance", "HR", "Sales"][Math.floor(Math.random() * 5)]
  };
});

// Function to add new expense
export const addExpense = (expense: Expense) => {
  recentExpenses = [expense, ...recentExpenses];
  return recentExpenses;
};

// Generate team spending data
export const teamSpending: TeamSpending[] = [
  { team: "Engineering", amount: 187500, month: "April" },
  { team: "Marketing", amount: 125000, month: "April" },
  { team: "Finance", amount: 67000, month: "April" },
  { team: "Sales", amount: 145300, month: "April" },
  { team: "HR", amount: 43200, month: "April" }
];

// Generate daily expenses for the chart
export const dailyExpenses: DailyExpense[] = [
  { day: "01/04", amount: 12500 },
  { day: "02/04", amount: 8700 },
  { day: "03/04", amount: 15200 },
  { day: "04/04", amount: 6300 },
  { day: "05/04", amount: 9800 },
  { day: "06/04", amount: 4500 },
  { day: "07/04", amount: 11200 }
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Marketing':
      return 'bg-expense-marketing';
    case 'Pending':
      return 'bg-expense-pending';
    case 'Approved':
      return 'bg-green-700';
    case 'Rejected':
      return 'bg-red-700';
    case 'Reimbursed':
      return 'bg-blue-700';
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
