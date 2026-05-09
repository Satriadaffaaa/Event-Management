import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Store, 
  CheckCircle2
} from 'lucide-react';
import { mockEvents, mockSubEvents, mockSponsors, mockRegistrants } from '../../lib/mockData';

export default function Analytics() {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  // Filter data based on selected event
  const filteredSubEvents = selectedEvent === 'all' 
    ? mockSubEvents 
    : mockSubEvents.filter(se => se.eventId === selectedEvent);
  
  const filteredSponsors = selectedEvent === 'all'
    ? mockSponsors
    : mockSponsors.filter(s => s.eventId === selectedEvent);
  
  const filteredRegistrants = selectedEvent === 'all'
    ? mockRegistrants
    : mockRegistrants.filter(r => r.eventId === selectedEvent);

  // Calculate key stats
  const totalRegistrants = filteredRegistrants.length;
  const checkedInCount = filteredRegistrants.filter(r => r.checkedIn).length;
  const checkedInRate = totalRegistrants > 0 ? Math.round((checkedInCount / totalRegistrants) * 100) : 0;
  
  const totalBoothVisits = filteredRegistrants.reduce((acc, r) => acc + r.boothsVisited.length, 0);
  const avgBoothVisitsPerRegistrant = totalRegistrants > 0 ? (totalBoothVisits / totalRegistrants).toFixed(1) : '0';

  // Event capacity analysis
  const events = selectedEvent === 'all' ? mockEvents : mockEvents.filter(e => e.id === selectedEvent);
  const totalCapacity = events.reduce((acc, e) => acc + e.capacity, 0);
  const totalRegistered = events.reduce((acc, e) => acc + e.registered, 0);
  const avgFillRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;

  // Sponsor tier breakdown
  const sponsorsByTier = {
    platinum: filteredSponsors.filter(s => s.tier === 'platinum').length,
    gold: filteredSponsors.filter(s => s.tier === 'gold').length,
    silver: filteredSponsors.filter(s => s.tier === 'silver').length,
    bronze: filteredSponsors.filter(s => s.tier === 'bronze').length,
  };
  const totalSponsors = Object.values(sponsorsByTier).reduce((a, b) => a + b, 0);

  // Top booths by visits
  const boothStats = filteredSubEvents.map(booth => ({
    ...booth,
    visits: filteredRegistrants.reduce((acc, reg) => {
      return acc + reg.boothsVisited.filter(v => v.boothId === booth.id).length;
    }, 0),
    interested: filteredRegistrants.filter(r => r.selectedSubEvents.includes(booth.id)).length
  })).sort((a, b) => b.visits - a.visits);

  // Event performance
  const eventPerformance = events.map(event => {
    const eventRegistrants = mockRegistrants.filter(r => r.eventId === event.id);
    const eventBooths = mockSubEvents.filter(se => se.eventId === event.id);
    
    return {
      ...event,
      registrantsCount: eventRegistrants.length,
      fillRate: event.capacity > 0 ? Math.round((event.registered / event.capacity) * 100) : 0,
      boothsCount: eventBooths.length,
      checkedInCount: eventRegistrants.filter(r => r.checkedIn).length
    };
  }).sort((a, b) => b.registrantsCount - a.registrantsCount);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Key performance metrics and insights</p>
          </div>
          <div className="w-64">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {mockEvents.map(event => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics - Only 4 most important stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Registrants"
            value={totalRegistrants}
            icon={Users}
            description={`${checkedInCount} checked in`}
          />
          <StatsCard
            title="Check-In Rate"
            value={`${checkedInRate}%`}
            icon={CheckCircle2}
            description="Attendance rate"
          />
          <StatsCard
            title="Avg Fill Rate"
            value={`${avgFillRate}%`}
            icon={TrendingUp}
            description={`${totalRegistered} / ${totalCapacity} capacity`}
          />
          <StatsCard
            title="Avg Booth Visits"
            value={avgBoothVisitsPerRegistrant}
            icon={Store}
            description="Per registrant"
          />
        </div>

        {/* Event Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Event Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventPerformance.map(event => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="mb-1">{event.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge className={
                          event.status === 'draft' ? 'bg-gray-400' :
                          event.status === 'upcoming' ? 'bg-blue-600' :
                          event.status === 'ongoing' ? 'bg-green-600' :
                          'bg-gray-600'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl">{event.fillRate}%</div>
                      <div className="text-sm text-gray-600">Fill Rate</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-600 mb-1">Registrants</div>
                      <div className="text-lg">{event.registrantsCount}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-600 mb-1">Capacity</div>
                      <div className="text-lg">{event.capacity}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-600 mb-1">Checked In</div>
                      <div className="text-lg">{event.checkedInCount}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-gray-600 mb-1">Booths</div>
                      <div className="text-lg">{event.boothsCount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Booths */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Booths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {boothStats.slice(0, 5).map((booth, index) => (
                  <div key={booth.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 
                      'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1">{booth.title}</div>
                      <div className="text-xs text-gray-600">{booth.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{booth.visits} visits</div>
                      <div className="text-xs text-gray-600">{booth.interested} interested</div>
                    </div>
                  </div>
                ))}
                {boothStats.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No booth data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sponsor Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sponsor Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Platinum</span>
                    <Badge className="bg-purple-600">{sponsorsByTier.platinum}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${totalSponsors > 0 ? (sponsorsByTier.platinum / totalSponsors) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Gold</span>
                    <Badge className="bg-yellow-600">{sponsorsByTier.gold}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${totalSponsors > 0 ? (sponsorsByTier.gold / totalSponsors) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Silver</span>
                    <Badge className="bg-gray-400">{sponsorsByTier.silver}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full" 
                      style={{ width: `${totalSponsors > 0 ? (sponsorsByTier.silver / totalSponsors) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Bronze</span>
                    <Badge className="bg-orange-700">{sponsorsByTier.bronze}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-700 h-2 rounded-full" 
                      style={{ width: `${totalSponsors > 0 ? (sponsorsByTier.bronze / totalSponsors) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {totalSponsors === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No sponsor data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
