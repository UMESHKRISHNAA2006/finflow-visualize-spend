
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MapPin, CalendarIcon, Clock, BadgeIndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { generateId } from '@/lib/utils';

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
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{trip.purpose}</p>
        </div>
        <div className="flex items-center">
          <BadgeIndianRupee className="h-3 w-3 mr-1 text-green-400" />
          <span className="text-sm font-medium">{trip.budget.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
