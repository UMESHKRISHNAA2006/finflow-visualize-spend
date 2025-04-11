
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ReceiptUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReceiptUploadModal = ({ open, onOpenChange }: ReceiptUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [expenseId, setExpenseId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a receipt image",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would upload the file to storage
    console.log({
      file,
      expenseId,
      category,
      date: date ? format(date, 'yyyy-MM-dd') : '',
    });
    
    toast({
      title: "Receipt uploaded",
      description: "Your receipt has been successfully uploaded",
    });
    
    // Reset form
    setFile(null);
    setExpenseId('');
    setCategory('');
    setDate(new Date());
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-gradient">Upload Receipt</DialogTitle>
          <DialogDescription>
            Attach a receipt to your expense for easier tracking
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Receipt Image</Label>
            <div className="border-2 border-dashed border-white/20 rounded-md p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <Input 
                id="file" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('file')?.click()}
              >
                Select file
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expenseId">Related Expense (Optional)</Label>
            <Select value={expenseId} onValueChange={setExpenseId}>
              <SelectTrigger>
                <SelectValue placeholder="Link to an expense" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent1">Business Lunch - ₹1,200</SelectItem>
                <SelectItem value="recent2">Office Supplies - ₹3,500</SelectItem>
                <SelectItem value="recent3">Hotel Stay - ₹12,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                <SelectItem value="Business Lunch">Business Lunch</SelectItem>
                <SelectItem value="Travel Expenses">Travel Expenses</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Receipt Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              Upload Receipt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptUploadModal;
