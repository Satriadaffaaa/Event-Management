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
import { Clock, Calendar, MapPin, Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import { mockSchedule, mockEvents, Schedule } from '../../lib/mockData';
import { toast } from 'sonner';

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedule);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [filterEventId, setFilterEventId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    eventId: '',
    time: '',
    title: '',
    description: '',
    speaker: '',
    location: ''
  });

  // Filter by event and search
  let filteredSchedules = filterEventId === 'all' ? schedules : schedules.filter(s => s.eventId === filterEventId);
  
  if (searchQuery) {
    filteredSchedules = filteredSchedules.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const totalSchedules = schedules.length;
  const uniqueEvents = new Set(schedules.map(s => s.eventId)).size;
  const avgPerEvent = Math.round(schedules.length / uniqueEvents) || 0;
  const withSpeakers = schedules.filter(s => s.speaker).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSchedule) {
      setSchedules(prev => prev.map(s => 
        s.id === editingSchedule.id 
          ? { ...s, ...formData }
          : s
      ));
      toast.success('Schedule updated successfully');
    } else {
      const newSchedule: Schedule = {
        id: String(schedules.length + 1),
        ...formData
      };
      setSchedules(prev => [...prev, newSchedule]);
      toast.success('Schedule item added successfully');
    }
    
    resetForm();
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      eventId: schedule.eventId,
      time: schedule.time,
      title: schedule.title,
      description: schedule.description,
      speaker: schedule.speaker || '',
      location: schedule.location
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this schedule item?')) {
      setSchedules(prev => prev.filter(s => s.id !== id));
      toast.success('Schedule item deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      eventId: '',
      time: '',
      title: '',
      description: '',
      speaker: '',
      location: ''
    });
    setEditingSchedule(null);
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Schedule Management</h1>
            <p className="text-gray-600">Manage event schedules and timelines</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Schedule Items"
            value={totalSchedules}
            icon={Clock}
          />
          <StatsCard
            title="Events Scheduled"
            value={uniqueEvents}
            icon={Calendar}
          />
          <StatsCard
            title="Avg Items/Event"
            value={avgPerEvent}
            icon={Clock}
          />
          <StatsCard
            title="With Speakers"
            value={withSpeakers}
            icon={Users}
          />
        </div>

        {/* Schedule Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Schedule ({filteredSchedules.length})</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search schedule..."
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
                    Add Schedule Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="schedule-form-description">
                  <DialogHeader>
                    <DialogTitle>{editingSchedule ? 'Edit Schedule Item' : 'Add New Schedule Item'}</DialogTitle>
                  </DialogHeader>
                  <p id="schedule-form-description" className="sr-only">
                    {editingSchedule ? 'Edit the schedule details below' : 'Fill in the form to add a new schedule item'}
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
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          placeholder="e.g., 09:00 AM - 10:00 AM"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g., Main Hall"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Opening Keynote"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="speaker">Speaker (Optional)</Label>
                      <Input
                        id="speaker"
                        value={formData.speaker}
                        onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                        placeholder="Speaker name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        placeholder="Brief description of the session"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingSchedule ? 'Update Schedule' : 'Add Schedule Item'}
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
                  <TableHead>Time</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Speaker</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.map(schedule => {
                  const event = mockEvents.find(e => e.id === schedule.eventId);
                  return (
                    <TableRow key={schedule.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{schedule.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{schedule.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {schedule.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event?.title || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {schedule.speaker || (
                          <span className="text-gray-400">No speaker</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {schedule.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(schedule)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(schedule.id)}
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
