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
import { Store, Users, TrendingUp, Plus, Edit, Trash2, Search } from 'lucide-react';
import { mockSubEvents, mockEvents, mockRegistrants, SubEvent } from '../../lib/mockData';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function SubEventsManagement() {
  const [subEvents, setSubEvents] = useState<SubEvent[]>(mockSubEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubEvent, setEditingSubEvent] = useState<SubEvent | null>(null);
  const [filterEventId, setFilterEventId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    eventId: '',
    title: '',
    company: '',
    type: 'booth' as 'booth' | 'workshop' | 'presentation',
    description: '',
    location: '',
    capacity: '',
    imageUrl: ''
  });

  // Filter by event and search
  let filteredSubEvents = filterEventId === 'all' ? subEvents : subEvents.filter(se => se.eventId === filterEventId);
  
  if (searchQuery) {
    filteredSubEvents = filteredSubEvents.filter(se =>
      se.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      se.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      se.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      se.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const totalBooths = subEvents.length;
  const totalVisits = mockRegistrants.reduce((acc, reg) => acc + reg.boothsVisited.length, 0);
  const avgVisitsPerBooth = Math.round(totalVisits / totalBooths) || 0;
  const activeBooths = subEvents.filter(se => se.attendeesCount > 0).length;

  // Get booth visit status
  const getBoothVisitStatus = (boothId: string) => {
    return mockRegistrants.filter(reg => 
      reg.boothsVisited.some(v => v.boothId === boothId)
    ).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubEvent) {
      setSubEvents(prev => prev.map(se => 
        se.id === editingSubEvent.id 
          ? { 
              ...se, 
              ...formData, 
              capacity: Number(formData.capacity),
              logo: formData.imageUrl || se.logo
            }
          : se
      ));
      toast.success('Booth updated successfully');
    } else {
      const newSubEvent: SubEvent = {
        id: String(subEvents.length + 1),
        ...formData,
        capacity: Number(formData.capacity),
        logo: formData.imageUrl || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
        category: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
        attendeesCount: 0
      };
      setSubEvents(prev => [...prev, newSubEvent]);
      toast.success('Booth created successfully');
    }
    
    resetForm();
  };

  const handleEdit = (subEvent: SubEvent) => {
    setEditingSubEvent(subEvent);
    setFormData({
      eventId: subEvent.eventId,
      title: subEvent.title,
      company: subEvent.company,
      type: subEvent.type,
      description: subEvent.description,
      location: subEvent.location,
      capacity: String(subEvent.capacity),
      imageUrl: subEvent.logo || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booth?')) {
      setSubEvents(prev => prev.filter(se => se.id !== id));
      toast.success('Booth deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      eventId: '',
      title: '',
      company: '',
      type: 'booth',
      description: '',
      location: '',
      capacity: '',
      imageUrl: ''
    });
    setEditingSubEvent(null);
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Booths & Sub-Events Management</h1>
            <p className="text-gray-600">Manage exhibition booths and sub-events</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Booths"
            value={totalBooths}
            icon={Store}
          />
          <StatsCard
            title="Active Booths"
            value={activeBooths}
            icon={Store}
          />
          <StatsCard
            title="Total Visits"
            value={totalVisits}
            icon={Users}
          />
          <StatsCard
            title="Avg Visits/Booth"
            value={avgVisitsPerBooth}
            icon={TrendingUp}
          />
        </div>

        {/* Booths Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Booths ({filteredSubEvents.length})</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search booths..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48"
                />
              </div>
              <Select value={filterEventId} onValueChange={setFilterEventId}>
                <SelectTrigger className="w-48">
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetForm()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Booth
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="booth-form-description">
                  <DialogHeader>
                    <DialogTitle>{editingSubEvent ? 'Edit Booth' : 'Create New Booth'}</DialogTitle>
                  </DialogHeader>
                  <p id="booth-form-description" className="sr-only">
                    {editingSubEvent ? 'Edit the booth details below' : 'Fill in the form to create a new booth'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="eventId">Event *</Label>
                      <Select
                        value={formData.eventId}
                        onValueChange={(value) => setFormData({ ...formData, eventId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEvents.map(event => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booth">Booth</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="presentation">Presentation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g., Hall A - Booth 12"
                          required
                        />
                      </div>
                    </div>

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
                      <Label htmlFor="imageUrl">Logo/Image URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional: Provide a URL for the booth/company logo</p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingSubEvent ? 'Update Booth' : 'Create Booth'}
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
                  <TableHead>Booth / Company</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubEvents.map(subEvent => {
                  const event = mockEvents.find(e => e.id === subEvent.eventId);
                  const visits = getBoothVisitStatus(subEvent.id);
                  return (
                    <TableRow key={subEvent.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={subEvent.logo}
                            alt={subEvent.company}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium">{subEvent.title}</div>
                            <div className="text-sm text-gray-500">{subEvent.company}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {event?.title || 'Unknown Event'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subEvent.type}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{subEvent.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={visits > 0 ? "default" : "secondary"}
                          className={visits > 0 ? "bg-green-600" : ""}
                        >
                          {visits} visits
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(subEvent)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(subEvent.id)}
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
