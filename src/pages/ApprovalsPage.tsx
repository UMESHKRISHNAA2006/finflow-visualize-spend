
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  IndianRupee,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { generateId, formatDate } from '@/lib/utils';

interface Approval {
  id: string;
  title: string;
  amount: number;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}

const ApprovalsPage = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [activeTab, setActiveTab] = useState('pending');

  // Generate some fake approval data when component mounts
  useEffect(() => {
    const categories = ['Travel', 'Office Supplies', 'Food', 'Entertainment', 'Miscellaneous'];
    const names = ["Ananya Sharma", "Rajesh Kumar", "Priya Patel", "Vikram Singh", "Neha Gupta"];
    const titles = [
      "Chennai client visit expenses", 
      "Office supplies restock", 
      "Team lunch meetup", 
      "Marketing event expenses", 
      "Annual conference registration",
      "Quarterly department dinner",
      "Software subscription renewal"
    ];
    
    const fakeApprovals: Approval[] = Array.from({ length: 10 }, (_, i) => {
      // Create dates within the last 14 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 14));
      
      return {
        id: generateId(),
        title: titles[Math.floor(Math.random() * titles.length)],
        amount: Math.floor(Math.random() * 15000) + 2000,
        submittedBy: names[Math.floor(Math.random() * names.length)],
        submittedDate: date.toISOString(),
        status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected',
        category: categories[Math.floor(Math.random() * categories.length)],
      };
    });
    
    setApprovals(fakeApprovals);
  }, []);

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(approval => 
      approval.id === id 
        ? { ...approval, status: 'approved' } 
        : approval
    ));
    toast.success('Expense approved successfully');
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(approval => 
      approval.id === id 
        ? { ...approval, status: 'rejected' } 
        : approval
    ));
    toast.error('Expense rejected');
  };

  const handleAddDemoApproval = () => {
    const categories = ['Travel', 'Office Supplies', 'Food', 'Entertainment', 'Miscellaneous'];
    const newApproval: Approval = {
      id: generateId(),
      title: `Expense Request ${Math.floor(Math.random() * 1000)}`,
      amount: Math.floor(Math.random() * 10000) + 1000,
      submittedBy: 'Team Member',
      submittedDate: new Date().toISOString(),
      status: 'pending',
      category: categories[Math.floor(Math.random() * categories.length)],
    };

    setApprovals([...approvals, newApproval]);
    toast.info('Demo approval added for testing');
  };

  const filteredApprovals = approvals.filter(approval => 
    activeTab === 'all' || approval.status === activeTab
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-slate-900">
      <AppSidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Approvals</h1>
            <p className="text-muted-foreground">Manage expense approvals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              onClick={handleAddDemoApproval}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              Add Demo Approval
            </Button>
          </div>
        </header>
        
        <Tabs defaultValue="pending" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="pending" className="data-[state=active]:bg-primary">
              <Clock className="mr-2 h-4 w-4" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-primary">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-primary">
              <XCircle className="mr-2 h-4 w-4" />
              Rejected
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-primary">
              All
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Pending Expense Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApprovals.map(approval => (
                      <ApprovalCard 
                        key={approval.id} 
                        approval={approval} 
                        onApprove={handleApprove} 
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No approvals to display</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeTab === 'pending' 
                        ? 'All caught up! No pending approvals.' 
                        : `No ${activeTab} approvals found.`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Approved Expense Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApprovals.map(approval => (
                      <ApprovalCard 
                        key={approval.id} 
                        approval={approval} 
                        onApprove={handleApprove} 
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No approvals to display</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Rejected Expense Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApprovals.map(approval => (
                      <ApprovalCard 
                        key={approval.id} 
                        approval={approval} 
                        onApprove={handleApprove} 
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No approvals to display</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>All Expense Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApprovals.map(approval => (
                      <ApprovalCard 
                        key={approval.id} 
                        approval={approval} 
                        onApprove={handleApprove} 
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No approvals to display</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ApprovalCardProps {
  approval: Approval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApprovalCard = ({ approval, onApprove, onReject }: ApprovalCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{approval.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <IndianRupee className="h-3 w-3 text-green-400" />
            <span className="text-sm font-medium">{approval.amount.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Submitted by {approval.submittedBy} on {formatDate(approval.submittedDate)}
          </p>
          <div className="mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-white/10">{approval.category}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {approval.status === 'pending' ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-green-950/30 hover:bg-green-900/50 border-green-700/30"
                onClick={() => onApprove(approval.id)}
              >
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-red-950/30 hover:bg-red-900/50 border-red-700/30"
                onClick={() => onReject(approval.id)}
              >
                <XCircle className="h-4 w-4 text-red-400" />
              </Button>
            </>
          ) : (
            <div className={`py-1 px-3 rounded-full text-xs ${
              approval.status === 'approved' 
                ? 'bg-green-950/30 text-green-400' 
                : 'bg-red-950/30 text-red-400'
            }`}>
              {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalsPage;
