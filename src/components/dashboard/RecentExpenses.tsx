
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { recentExpenses } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const RecentExpenses = () => {
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Subject</TableHead>
              <TableHead className="text-xs">Employee</TableHead>
              <TableHead className="text-xs">Team</TableHead>
              <TableHead className="text-xs text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium text-sm">{expense.category}</TableCell>
                <TableCell className="text-sm">{expense.employee}</TableCell>
                <TableCell>
                  <Badge 
                    className={`${expense.team === 'Marketing' ? 'bg-expense-marketing' : 
                               expense.team === 'Travel' ? 'bg-expense-travel' : 
                               'bg-expense-pending'} text-xs font-normal`}
                  >
                    {expense.team}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
