
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Receipt, FileBarChart, Plane } from 'lucide-react';

const QuickAccess = () => {
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <QuickAccessButton 
            icon={<PlusCircle className="text-pink-400" />}
            label="New expense"
            onClick={() => {}}
            color="bg-pink-950/40"
          />
          <QuickAccessButton 
            icon={<Receipt className="text-blue-400" />}
            label="Add receipt"
            onClick={() => {}}
            color="bg-blue-950/40"
          />
          <QuickAccessButton 
            icon={<FileBarChart className="text-green-400" />}
            label="Create report"
            onClick={() => {}}
            color="bg-green-950/40"
          />
          <QuickAccessButton 
            icon={<Plane className="text-purple-400" />}
            label="Create trip"
            onClick={() => {}}
            color="bg-purple-950/40"
          />
        </div>
      </CardContent>
    </Card>
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
