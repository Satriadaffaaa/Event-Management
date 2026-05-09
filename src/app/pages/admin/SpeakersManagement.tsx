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
import { User, Users, Calendar, Plus, Edit, Trash2, Search, Mic } from 'lucide-react';
import { mockSpeakers, mockEvents, Speaker } from '../../lib/mockData';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function SpeakersManagement() {
  const [speakers, setSpeakers] = useState<Speaker[]>(mockSpeakers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [filterEventId, setFilterEventId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    eventId: '',
    name: '',
    title: '',
    company: '',
    bio: '',
    topic: '',
    imageUrl: ''
  });

  // Filter by event and search
  let filteredSpeakers = filterEventId === 'all' ? speakers : speakers.filter(s => s.eventId === filterEventId);
  
  if (searchQuery) {
    filteredSpeakers = filteredSpeakers.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const totalSpeakers = speakers.length;
  const uniqueEvents = new Set(speakers.map(s => s.eventId)).size;
  const avgSpeakersPerEvent = Math.round(speakers.length / uniqueEvents) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSpeaker) {
      setSpeakers(prev => prev.map(s => 
        s.id === editingSpeaker.id 
          ? { 
              ...s, 
              ...formData,
              image: formData.imageUrl || s.image
            }
          : s
      ));
      toast.success('Speaker updated successfully');
    } else {
      const newSpeaker: Speaker = {
        id: String(speakers.length + 1),
        ...formData,
        image: formData.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      };
      setSpeakers(prev => [...prev, newSpeaker]);
      toast.success('Speaker added successfully');
    }
    
    resetForm();
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      eventId: speaker.eventId,
      name: speaker.name,
      title: speaker.title,
      company: speaker.company,
      bio: speaker.bio,
      topic: speaker.topic,
      imageUrl: speaker.image || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this speaker?')) {
      setSpeakers(prev => prev.filter(s => s.id !== id));
      toast.success('Speaker deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      eventId: '',
      name: '',
      title: '',
      company: '',
      bio: '',
      topic: '',
      imageUrl: ''
    });
    setEditingSpeaker(null);
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Speakers Management</h1>
            <p className="text-gray-600">Manage event speakers and presenters</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Speakers"
            value={totalSpeakers}
            icon={Users}
          />
          <StatsCard
            title="Events with Speakers"
            value={uniqueEvents}
            icon={Calendar}
          />
          <StatsCard
            title="Avg Speakers/Event"
            value={avgSpeakersPerEvent}
            icon={Mic}
          />
          <StatsCard
            title="Filtered Speakers"
            value={filteredSpeakers.length}
            icon={User}
          />
        </div>

        {/* Speakers Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Speakers ({filteredSpeakers.length})</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search speakers..."
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
                    Add Speaker
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="speaker-form-description">
                  <DialogHeader>
                    <DialogTitle>{editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}</DialogTitle>
                  </DialogHeader>
                  <p id="speaker-form-description" className="sr-only">
                    {editingSpeaker ? 'Edit the speaker details below' : 'Fill in the form to add a new speaker'}
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

                    <div>
                      <Label htmlFor="name">Speaker Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g., CEO"
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

                    <div>
                      <Label htmlFor="topic">Topic *</Label>
                      <Input
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="e.g., Future of AI in Business"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">Photo URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional: Provide a URL for the speaker's photo</p>
                    </div>

                    <div>
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        placeholder="Brief bio of the speaker"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingSpeaker ? 'Update Speaker' : 'Add Speaker'}
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
                  <TableHead>Speaker</TableHead>
                  <TableHead>Title & Company</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSpeakers.map(speaker => {
                  const event = mockEvents.find(e => e.id === speaker.eventId);
                  return (
                    <TableRow key={speaker.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium">{speaker.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{speaker.title}</div>
                          <div className="text-sm text-gray-500">{speaker.company}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event?.title || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs truncate">
                        {speaker.topic}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(speaker)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(speaker.id)}
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
