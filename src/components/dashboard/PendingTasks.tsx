
import React from 'react';
import { 
  CheckCircle, 
  Plane, 
  FileText, 
  Calendar, 
  CreditCard 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pendingTasks } from '@/lib/data';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'check-circle':
      return <CheckCircle size={16} />;
    case 'plane':
      return <Plane size={16} />;
    case 'file-text':
      return <FileText size={16} />;
    case 'calendar':
      return <Calendar size={16} />;
    case 'credit-card':
      return <CreditCard size={16} />;
    default:
      return <FileText size={16} />;
  }
};

const PendingTasks = () => {
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {pendingTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-2 hover:bg-white/5 rounded-md transition-all-200"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-md text-purple-400">
                  {getIconComponent(task.icon)}
                </div>
                <span className="text-sm">{task.title}</span>
              </div>
              <span className="font-medium text-sm">{task.count}</span>
            </div>
          ))}
          
          <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="font-semibold">€0.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTasks;
