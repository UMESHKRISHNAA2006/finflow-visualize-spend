
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import NewExpenseModal from '@/components/NewExpenseModal';
import { toast } from 'sonner';
import { addExpense } from '@/lib/data';
import { Expense } from '@/types/expense';

const Index = () => {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);

  const handleNewExpense = () => {
    setNewExpenseOpen(true);
    toast.info('Opening new expense form');
  };
  
  const handleAddExpense = (newExpense: Expense) => {
    addExpense(newExpense);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-slate-900">
      <AppSidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Umesh</p>
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
          <Dashboard />
        </main>
      </div>
      <NewExpenseModal 
        open={newExpenseOpen} 
        onOpenChange={setNewExpenseOpen}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
};

export default Index;
