
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Filter, MoreHorizontal, FileText, IndianRupee } from 'lucide-react';
import { recentExpenses } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import NewExpenseModal from '@/components/NewExpenseModal';
import { toast } from 'sonner';

const ExpensesPage = () => {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expenses, setExpenses] = useState(recentExpenses);
  
  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense => 
    expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.employee?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewExpense = () => {
    setNewExpenseOpen(true);
    toast.info('Opening new expense form');
  };

  const handleFilterClick = () => {
    toast.info('Filter options', {
      description: 'Filter options will appear here'
    });
  };

  const handleExportClick = () => {
    toast.info('Export options', {
      description: 'Export to CSV/PDF options will appear here'
    });
  };

  const handleViewDetails = () => {
    toast.info('Viewing expense details');
  };

  const handleEdit = () => {
    toast.info('Editing expense');
  };

  const handleDownloadReceipt = () => {
    toast.info('Downloading receipt');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-slate-900">
      <AppSidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Expenses</h1>
            <p className="text-muted-foreground">Manage and track all expenses</p>
          </div>
          <Button 
            onClick={handleNewExpense}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </header>
        
        <main>
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Expenses</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search expenses..." 
                      className="pl-9 w-60" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={handleFilterClick}>
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleExportClick}>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((expense) => (
                        <TableRow key={expense.id} className="hover:bg-white/5">
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.employee}</TableCell>
                          <TableCell>{formatDate(expense.date)}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`${expense.status === 'Pending' ? 'bg-expense-pending' : 
                                        expense.status === 'Approved' ? 'bg-green-700' : 
                                        'bg-expense-travel'} text-xs font-normal`}
                            >
                              {expense.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center justify-end">
                              <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>{expense.amount.toLocaleString('en-IN')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDownloadReceipt}>Download Receipt</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No expenses found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <NewExpenseModal open={newExpenseOpen} onOpenChange={setNewExpenseOpen} />
    </div>
  );
};

export default ExpensesPage;
