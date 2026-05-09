import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Store, 
  AlertCircle,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockEvents, mockRegistrants, mockSubEvents } from '../../lib/mockData';

export default function AdminDashboard() {
  const totalEvents = mockEvents.length;
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').length;
  const totalRegistrants = mockRegistrants.length;
  const totalSubEvents = mockSubEvents.length;

  // Calculate registration trend (mock calculation)
  const registrationTrend = 12.5;

  // Top visited booths
  const boothVisits = mockSubEvents.map(booth => ({
    ...booth,
    visits: mockRegistrants.reduce((acc, reg) => {
      return acc + reg.boothsVisited.filter(v => v.boothId === booth.id).length;
    }, 0)
  })).sort((a, b) => b.visits - a.visits).slice(0, 3);

  // Recent registrations
  const recentRegistrants = [...mockRegistrants]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, 5);

  // Events needing attention
  const eventsNeedingAttention = mockEvents.filter(e => {
    const spotsLeft = e.capacity - e.registered;
    const fillRate = (e.registered / e.capacity) * 100;
    return spotsLeft < 50 || fillRate < 30;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your events.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Events"
            value={totalEvents}
            icon={Calendar}
            description={`${upcomingEvents} upcoming`}
          />
          <StatsCard
            title="Total Registrants"
            value={totalRegistrants}
            icon={Users}
            trend={{ value: registrationTrend, isPositive: true }}
          />
          <StatsCard
            title="Event Capacity"
            value={`${Math.round((mockEvents.reduce((acc, e) => acc + e.registered, 0) / mockEvents.reduce((acc, e) => acc + e.capacity, 0)) * 100)}%`}
            icon={TrendingUp}
            description="Average fill rate"
          />
          <StatsCard
            title="Active Booths"
            value={totalSubEvents}
            icon={Store}
            description="Exhibition booths"
          />
        </div>

        {/* Attention Required - Moved to prominent position */}
        {eventsNeedingAttention.length > 0 && (
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <AlertCircle className="h-5 w-5" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {eventsNeedingAttention.map(event => {
                  const spotsLeft = event.capacity - event.registered;
                  const fillRate = (event.registered / event.capacity) * 100;
                  return (
                    <div key={event.id} className="bg-white border-l-4 border-orange-500 rounded p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium mb-1">{event.title}</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {fillRate < 30 ? (
                              <span className="text-orange-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                Low registration: {Math.round(fillRate)}% filled
                              </span>
                            ) : (
                              <span className="text-orange-600 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                Almost full: {spotsLeft} spots left
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button asChild size="sm" className="w-full">
                        <Link to={`/admin/events`}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button asChild className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/events">
                  <Plus className="h-5 w-5" />
                  <span>Create Event</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/sub-events">
                  <Store className="h-5 w-5" />
                  <span>Add Booth</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/registrants">
                  <Users className="h-5 w-5" />
                  <span>View Registrants</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link to="/admin/scanner">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Scan QR Code</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Registration Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Registration Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map(event => {
                  const fillRate = (event.registered / event.capacity) * 100;
                  return (
                    <div key={event.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{event.title}</span>
                        <span className="text-sm text-gray-600">{Math.round(fillRate)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            fillRate > 80 ? 'bg-green-600' : fillRate > 50 ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Visited Booths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Top Visited Booths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {boothVisits.map((booth, index) => (
                  <div key={booth.id} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1">{booth.title}</div>
                      <div className="text-xs text-gray-600">{booth.company}</div>
                    </div>
                    <div className="text-sm">
                      <Badge variant="outline">{booth.visits} visits</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrants.map(registrant => (
                  <div key={registrant.id} className="flex items-start gap-3">
                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{registrant.name} registered</p>
                      <p className="text-xs text-gray-600">
                        {new Date(registrant.registeredAt).toLocaleDateString()} • {registrant.company}
                      </p>
                    </div>
                    {registrant.checkedIn ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
