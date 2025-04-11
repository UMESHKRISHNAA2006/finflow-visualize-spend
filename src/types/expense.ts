
export type ExpenseCategory = 
  | "Marketing"
  | "Office Supplies"
  | "Business Lunch"
  | "Travel Expenses"
  | "Client Dinner"
  | "Hotel"
  | "Other";

export type ExpenseStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Reimbursed";

export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  description: string;
  status: ExpenseStatus;
  employee: string;
  team?: string;
  receipt?: string;
}

export interface PendingTask {
  id: string;
  title: string;
  count: number;
  icon: string;
}

export interface TeamSpending {
  team: string;
  amount: number;
  month: string;
}

export interface DailyExpense {
  day: string;
  amount: number;
}
