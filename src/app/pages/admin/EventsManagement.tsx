import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { Calendar, Users, TrendingUp, Plus, Edit, Trash2, Eye, Star, Search, Download } from 'lucide-react';
import { mockEvents, Event } from '../../lib/mockData';
import { toast } from 'sonner';

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: '',
    status: 'draft' as 'draft' | 'upcoming' | 'ongoing' | 'completed',
    featured: false
  });

  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length && filteredEvents.length > 0) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(e => e.id));
    }
  };

  const toggleSelectEvent = (id: string) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(prev => prev.filter(eId => eId !== id));
    } else {
      setSelectedEvents(prev => [...prev, id]);
    }
  };

  const handleExport = () => {
    const eventsToExport = selectedEvents.length > 0 
      ? filteredEvents.filter(e => selectedEvents.includes(e.id))
      : filteredEvents;

    if (eventsToExport.length === 0) {
      toast.error('No events to export');
      return;
    }

    const headers = ['ID', 'Title', 'Category', 'Date', 'Time', 'Location', 'Capacity', 'Registered', 'Status', 'Featured'];
    
    const csvRows = eventsToExport.map(e => [
      e.id,
      `"${e.title.replace(/"/g, '""')}"`,
      `"${e.category}"`,
      e.date,
      e.time,
      `"${e.location.replace(/"/g, '""')}"`,
      e.capacity,
      e.registered,
      e.status,
      e.featured ? 'Yes' : 'No'
    ]);

    const csvContent = [headers.join(','), ...csvRows.map(row => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `events_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Exported ${eventsToExport.length} events successfully`);
    }
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const totalRegistrants = events.reduce((acc, e) => acc + e.registered, 0);
  const avgFillRate = Math.round((events.reduce((acc, e) => acc + (e.registered / e.capacity), 0) / events.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { 
              ...event, 
              ...formData,
              capacity: Number(formData.capacity)
            }
          : event
      ));
      toast.success('Event updated successfully');
    } else {
      const newEvent: Event = {
        id: String(Date.now()),
        ...formData,
        capacity: Number(formData.capacity),
        registered: 0,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      };
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event created successfully');
    }
    
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      fullDescription: event.fullDescription,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: String(event.capacity),
      category: event.category,
      status: event.status,
      featured: event.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
      toast.success('Event deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      category: '',
      status: 'draft',
      featured: false
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Events Management</h1>
            <p className="text-gray-600">Create and manage your events</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Events"
            value={totalEvents}
            icon={Calendar}
          />
          <StatsCard
            title="Upcoming Events"
            value={upcomingEvents}
            icon={Calendar}
          />
          <StatsCard
            title="Total Registrants"
            value={totalRegistrants}
            icon={Users}
          />
          <StatsCard
            title="Avg Fill Rate"
            value={`${avgFillRate}%`}
            icon={TrendingUp}
          />
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Events ({filteredEvents.length})</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export {selectedEvents.length > 0 ? `(${selectedEvents.length})` : 'All'}
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetForm()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="event-form-description">
                  <DialogHeader>
                    <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                  </DialogHeader>
                  <p id="event-form-description" className="sr-only">
                    {editingEvent ? 'Edit the event details below' : 'Fill in the form to create a new event'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Short Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="fullDescription">Full Description</Label>
                      <Textarea
                        id="fullDescription"
                        value={formData.fullDescription}
                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          placeholder="e.g., 09:00 AM"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacity *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Technology"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                      />
                      <label htmlFor="featured" className="text-sm cursor-pointer">
                        Feature this event on homepage
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingEvent ? 'Update Event' : 'Create Event'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={filteredEvents.length > 0 && selectedEvents.length === filteredEvents.length}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map(event => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => toggleSelectEvent(event.id)}
                        aria-label={`Select ${event.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {event.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(event.date).toLocaleDateString()}</div>
                        <div className="text-gray-500">{event.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{event.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{event.registered} / {event.capacity}</div>
                        <div className="text-gray-500">
                          {Math.round((event.registered / event.capacity) * 100)}% filled
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(event)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(event.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-900 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
