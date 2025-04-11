
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MapPin, CalendarIcon, Clock, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { generateId, formatDate } from '@/lib/utils';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  budget: number;
}

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  // Generate fake trip data when component loads
  useEffect(() => {
    // Cities in India for destinations
    const cities = [
      'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
      'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
    ];
    
    // Business purposes
    const purposes = [
      'Client Meeting', 'Conference', 'Team Offsite', 
      'Branch Visit', 'Product Launch', 'Training Workshop',
      'Sales Pitch', 'Industry Summit', 'Partner Meeting'
    ];
    
    // Generate random date within a range
    const getRandomDate = (start: Date, end: Date) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    
    // Format date to ISO string, but just take the date part
    const formatDateString = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Current date
    const now = new Date();
    
    // Create 3 upcoming trips
    const upcomingTrips = Array.from({ length: 3 }, () => {
      const startDate = getRandomDate(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5), 
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
      );
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 2); // 2-7 day trip
      
      return {
        id: generateId(),
        destination: cities[Math.floor(Math.random() * cities.length)],
        startDate: formatDateString(startDate),
        endDate: formatDateString(endDate),
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: 'upcoming' as const,
        budget: Math.floor(Math.random() * 70000) + 20000 // 20k-90k budget
      };
    });
    
    // Create 2 ongoing trips
    const ongoingTrips = Array.from({ length: 2 }, () => {
      const startDate = getRandomDate(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3), 
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      );
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 2);
      
      return {
        id: generateId(),
        destination: cities[Math.floor(Math.random() * cities.length)],
        startDate: formatDateString(startDate),
        endDate: formatDateString(endDate),
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: 'ongoing' as const,
        budget: Math.floor(Math.random() * 50000) + 15000 // 15k-65k budget
      };
    });
    
    // Create 4 completed trips
    const completedTrips = Array.from({ length: 4 }, () => {
      const startDate = getRandomDate(
        new Date(now.getFullYear(), now.getMonth() - 3, 1), 
        new Date(now.getFullYear(), now.getMonth() - 1, 15)
      );
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 2);
      
      return {
        id: generateId(),
        destination: cities[Math.floor(Math.random() * cities.length)],
        startDate: formatDateString(startDate),
        endDate: formatDateString(endDate),
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: 'completed' as const,
        budget: Math.floor(Math.random() * 40000) + 10000 // 10k-50k budget
      };
    });
    
    // Combine all trips
    setTrips([...upcomingTrips, ...ongoingTrips, ...completedTrips]);
  }, []);

  const handleCreateTrip = () => {
    const newTrip: Trip = {
      id: generateId(),
      destination: 'New Destination',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      purpose: 'Business Trip',
      status: 'upcoming',
      budget: 25000
    };

    setTrips([...trips, newTrip]);
    toast.success('Trip created successfully');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-slate-900">
      <AppSidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Business Trips</h1>
            <p className="text-muted-foreground">Plan and manage your business travels</p>
          </div>
          <Button 
            onClick={handleCreateTrip}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </header>
        
        <main className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-blue-400" />
                  <span>Upcoming Trips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trips.filter(trip => trip.status === 'upcoming').length > 0 ? (
                  trips
                    .filter(trip => trip.status === 'upcoming')
                    .map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No upcoming trips</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-green-400" />
                  <span>Ongoing Trips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trips.filter(trip => trip.status === 'ongoing').length > 0 ? (
                  trips
                    .filter(trip => trip.status === 'ongoing')
                    .map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No ongoing trips</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="text-purple-400" />
                  <span>Completed Trips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trips.filter(trip => trip.status === 'completed').length > 0 ? (
                  trips
                    .filter(trip => trip.status === 'completed')
                    .map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No completed trips</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className="p-4 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{trip.destination}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{trip.purpose}</p>
        </div>
        <div className="flex items-center">
          <IndianRupee className="h-3 w-3 mr-1 text-green-400" />
          <span className="text-sm font-medium">{trip.budget.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
