
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Receipt, FileBarChart, Plane } from 'lucide-react';
import { toast } from 'sonner';
import NewExpenseModal from '@/components/NewExpenseModal';
import ReceiptUploadModal from '@/components/ReceiptUploadModal';
import CreateReportModal from '@/components/CreateReportModal';
import CreateTripModal from '@/components/CreateTripModal';
import { addExpense } from '@/lib/data';
import { Expense } from '@/types/expense';

const QuickAccess = () => {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [receiptUploadOpen, setReceiptUploadOpen] = useState(false);
  const [createReportOpen, setCreateReportOpen] = useState(false);
  const [createTripOpen, setCreateTripOpen] = useState(false);

  const handleNewExpense = () => {
    setNewExpenseOpen(true);
    toast.success('Creating new expense...', {
      description: 'New expense form will open'
    });
  };

  const handleAddReceipt = () => {
    setReceiptUploadOpen(true);
    toast.success('Adding receipt...', {
      description: 'Receipt upload screen will open'
    });
  };

  const handleCreateReport = () => {
    setCreateReportOpen(true);
    toast.success('Creating report...', {
      description: 'Report generation wizard will start'
    });
  };

  const handleCreateTrip = () => {
    setCreateTripOpen(true);
    toast.success('Creating trip...', {
      description: 'Trip creation form will open'
    });
  };
  
  const handleAddExpense = (newExpense: Expense) => {
    addExpense(newExpense);
  };

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <QuickAccessButton 
              icon={<PlusCircle className="text-pink-400" />}
              label="New expense"
              onClick={handleNewExpense}
              color="bg-pink-950/40"
            />
            <QuickAccessButton 
              icon={<Receipt className="text-blue-400" />}
              label="Add receipt"
              onClick={handleAddReceipt}
              color="bg-blue-950/40"
            />
            <QuickAccessButton 
              icon={<FileBarChart className="text-green-400" />}
              label="Create report"
              onClick={handleCreateReport}
              color="bg-green-950/40"
            />
            <QuickAccessButton 
              icon={<Plane className="text-purple-400" />}
              label="Create trip"
              onClick={handleCreateTrip}
              color="bg-purple-950/40"
            />
          </div>
        </CardContent>
      </Card>
      
      <NewExpenseModal 
        open={newExpenseOpen} 
        onOpenChange={setNewExpenseOpen} 
        onAddExpense={handleAddExpense} 
      />
      
      <ReceiptUploadModal 
        open={receiptUploadOpen} 
        onOpenChange={setReceiptUploadOpen} 
      />
      
      <CreateReportModal 
        open={createReportOpen} 
        onOpenChange={setCreateReportOpen} 
      />
      
      <CreateTripModal 
        open={createTripOpen} 
        onOpenChange={setCreateTripOpen} 
      />
    </>
  );
};

interface QuickAccessButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const QuickAccessButton = ({ icon, label, onClick, color }: QuickAccessButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className={`flex flex-col items-center justify-center h-24 gap-2 ${color} border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105`}
      onClick={onClick}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-xs font-normal">{label}</span>
    </Button>
  );
};

export default QuickAccess;
