import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Users, CheckCircle2, XCircle, Search, Download, Store, Eye, UserCheck, Trash2 } from 'lucide-react';
import { mockRegistrants, mockEvents, mockSubEvents, Registrant } from '../../lib/mockData';
import { toast } from 'sonner';

export default function RegistrantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [checkedInFilter, setCheckedInFilter] = useState<string>('all');
  const [registrants, setRegistrants] = useState<Registrant[]>(mockRegistrants);
  const [selectedRegistrant, setSelectedRegistrant] = useState<Registrant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredRegistrants = registrants.filter(reg => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEvent = selectedEvent === 'all' || reg.eventId === selectedEvent;
    
    const matchesCheckedIn = 
      checkedInFilter === 'all' ||
      (checkedInFilter === 'checked-in' && reg.checkedIn) ||
      (checkedInFilter === 'not-checked-in' && !reg.checkedIn);
    
    return matchesSearch && matchesEvent && matchesCheckedIn;
  });

  const totalRegistrants = registrants.length;
  const checkedInCount = registrants.filter(r => r.checkedIn).length;
  const notCheckedInCount = totalRegistrants - checkedInCount;
  const avgBoothsVisited = Math.round(
    registrants.reduce((acc, r) => acc + r.boothsVisited.length, 0) / totalRegistrants
  ) || 0;

  const handleCheckIn = (registrantId: string) => {
    setRegistrants(prev => prev.map(reg => 
      reg.id === registrantId ? { ...reg, checkedIn: true } : reg
    ));
    toast.success('Registrant checked in successfully');
  };

  const handleDelete = (registrantId: string) => {
    if (confirm('Are you sure you want to delete this registrant?')) {
      setRegistrants(prev => prev.filter(reg => reg.id !== registrantId));
      toast.success('Registrant deleted successfully');
    }
  };

  const handleViewDetails = (registrant: Registrant) => {
    setSelectedRegistrant(registrant);
    setIsDetailsOpen(true);
  };

  const getBoothStatus = (registrant: Registrant) => {
    const visited = registrant.boothsVisited.length;
    const selected = registrant.selectedSubEvents.length;
    
    if (selected === 0) return { status: 'Pending', variant: 'outline' as const };
    if (visited === selected) return { status: 'Complete', variant: 'default' as const };
    if (visited > 0) return { status: 'In Progress', variant: 'secondary' as const };
    return { status: 'Pending', variant: 'outline' as const };
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Position', 'Event', 'Checked In', 'Booths Visited'];
    const rows = filteredRegistrants.map(reg => {
      const event = mockEvents.find(e => e.id === reg.eventId);
      return [
        reg.name,
        reg.email,
        reg.phone,
        reg.company,
        reg.position,
        event?.title || 'N/A',
        reg.checkedIn ? 'Yes' : 'No',
        reg.boothsVisited.length
      ];
    });
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrants.csv';
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Registrants List</h1>
            <p className="text-gray-600">View and manage event registrations</p>
          </div>
          <Button onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Registrants"
            value={totalRegistrants}
            icon={Users}
          />
          <StatsCard
            title="Checked In"
            value={checkedInCount}
            icon={CheckCircle2}
          />
          <StatsCard
            title="Not Checked In"
            value={notCheckedInCount}
            icon={XCircle}
          />
          <StatsCard
            title="Avg Booths Visited"
            value={avgBoothsVisited}
            icon={Store}
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
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
              <div>
                <Select value={checkedInFilter} onValueChange={setCheckedInFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by check-in" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="not-checked-in">Not Checked In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registrants Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Registrants ({filteredRegistrants.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Booths</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrants.map(registrant => {
                    const event = mockEvents.find(e => e.id === registrant.eventId);
                    const boothStatus = getBoothStatus(registrant);
                    
                    return (
                      <TableRow key={registrant.id}>
                        <TableCell>
                          <div className="min-w-32">{registrant.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600 min-w-48">{registrant.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="min-w-44">{event?.title || 'N/A'}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-600 min-w-32">{registrant.company || 'N/A'}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-600 min-w-16">
                            {registrant.boothsVisited.length} / {registrant.selectedSubEvents.length}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-48">
                            <Badge 
                              variant={boothStatus.variant}
                              className={
                                boothStatus.status === 'Complete' ? 'bg-green-100 text-green-800 border-green-300' :
                                boothStatus.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                'bg-gray-100 text-gray-800 border-gray-300'
                              }
                            >
                              {boothStatus.status}
                            </Badge>
                            {registrant.checkedIn ? (
                              <Badge className="bg-green-600 hover:bg-green-700">
                                Checked In
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                                Not Checked In
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(registrant)}
                              className="h-8 w-8 text-gray-600 hover:text-gray-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!registrant.checkedIn && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCheckIn(registrant.id)}
                                className="h-8 w-8 text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(registrant.id)}
                              className="h-8 w-8 text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl" aria-describedby="registrant-details-description">
            <DialogHeader>
              <DialogTitle>Registrant Details</DialogTitle>
            </DialogHeader>
            <p id="registrant-details-description" className="sr-only">
              View detailed information about the registrant
            </p>
            {selectedRegistrant && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Name</label>
                    <div className="text-gray-900">{selectedRegistrant.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Email</label>
                    <div className="text-gray-900">{selectedRegistrant.email}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Phone</label>
                    <div className="text-gray-900">{selectedRegistrant.phone}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Company</label>
                    <div className="text-gray-900">{selectedRegistrant.company}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Position</label>
                    <div className="text-gray-900">{selectedRegistrant.position}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Event</label>
                    <div className="text-gray-900">
                      {mockEvents.find(e => e.id === selectedRegistrant.eventId)?.title || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">QR Code</label>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {selectedRegistrant.qrCode}
                    </code>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Check-in Status</label>
                    <div>
                      {selectedRegistrant.checkedIn ? (
                        <Badge className="bg-green-600">Checked In</Badge>
                      ) : (
                        <Badge variant="secondary">Not Checked In</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-2">Selected Booths</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegistrant.selectedSubEvents.length > 0 ? (
                      selectedRegistrant.selectedSubEvents.map(id => {
                        const booth = mockSubEvents.find(se => se.id === id);
                        return (
                          <Badge key={id} variant="outline">
                            {booth?.title || 'Unknown'}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-sm text-gray-400">No booths selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-2">Booths Visited</label>
                  {selectedRegistrant.boothsVisited.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRegistrant.boothsVisited.map((visit, index) => {
                        const booth = mockSubEvents.find(se => se.id === visit.boothId);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <div className="text-sm">{booth?.title || 'Unknown Booth'}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(visit.visitedAt).toLocaleString()}
                              </div>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No booths visited yet</div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  {!selectedRegistrant.checkedIn && (
                    <Button 
                      onClick={() => {
                        handleCheckIn(selectedRegistrant.id);
                        setIsDetailsOpen(false);
                      }}
                      className="flex-1"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Check In Now
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => setIsDetailsOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
