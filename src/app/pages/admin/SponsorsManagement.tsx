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
import { Award, TrendingUp, Calendar, Plus, Edit, Trash2, Search, Trophy } from 'lucide-react';
import { mockSponsors, mockEvents, Sponsor } from '../../lib/mockData';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function SponsorsManagement() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [filterEventId, setFilterEventId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    eventId: '',
    name: '',
    tier: 'bronze' as 'platinum' | 'gold' | 'silver' | 'bronze',
    website: '',
    description: '',
    imageUrl: ''
  });

  // Filter by event and search
  let filteredSponsors = filterEventId === 'all' ? sponsors : sponsors.filter(s => s.eventId === filterEventId);
  
  if (searchQuery) {
    filteredSponsors = filteredSponsors.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const totalSponsors = sponsors.length;
  const platinumSponsors = sponsors.filter(s => s.tier === 'platinum').length;
  const goldSponsors = sponsors.filter(s => s.tier === 'gold').length;
  const uniqueEvents = new Set(sponsors.map(s => s.eventId)).size;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSponsor) {
      setSponsors(prev => prev.map(s => 
        s.id === editingSponsor.id 
          ? { 
              ...s, 
              ...formData,
              logo: formData.imageUrl || s.logo
            }
          : s
      ));
      toast.success('Sponsor updated successfully');
    } else {
      const newSponsor: Sponsor = {
        id: String(sponsors.length + 1),
        ...formData,
        logo: formData.imageUrl || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200'
      };
      setSponsors(prev => [...prev, newSponsor]);
      toast.success('Sponsor added successfully');
    }
    
    resetForm();
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      eventId: sponsor.eventId,
      name: sponsor.name,
      tier: sponsor.tier,
      website: sponsor.website,
      description: sponsor.description,
      imageUrl: sponsor.logo || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this sponsor?')) {
      setSponsors(prev => prev.filter(s => s.id !== id));
      toast.success('Sponsor deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      eventId: '',
      name: '',
      tier: 'bronze',
      website: '',
      description: '',
      imageUrl: ''
    });
    setEditingSponsor(null);
    setIsDialogOpen(false);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-gray-800 text-white';
      case 'gold': return 'bg-yellow-500 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-orange-700 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Sponsors Management</h1>
            <p className="text-gray-600">Manage event sponsors and partnerships</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Sponsors"
            value={totalSponsors}
            icon={Award}
          />
          <StatsCard
            title="Platinum Tier"
            value={platinumSponsors}
            icon={Trophy}
          />
          <StatsCard
            title="Gold Tier"
            value={goldSponsors}
            icon={Award}
          />
          <StatsCard
            title="Events Sponsored"
            value={uniqueEvents}
            icon={Calendar}
          />
        </div>

        {/* Sponsors Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sponsors ({filteredSponsors.length})</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sponsors..."
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
                    Add Sponsor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="sponsor-form-description">
                  <DialogHeader>
                    <DialogTitle>{editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}</DialogTitle>
                  </DialogHeader>
                  <p id="sponsor-form-description" className="sr-only">
                    {editingSponsor ? 'Edit the sponsor details below' : 'Fill in the form to add a new sponsor'}
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
                      <Label htmlFor="name">Sponsor Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tier">Sponsorship Tier *</Label>
                        <Select
                          value={formData.tier}
                          onValueChange={(value) => setFormData({ ...formData, tier: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="platinum">Platinum</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="bronze">Bronze</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">Logo URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://example.com/logo.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional: Provide a URL for the sponsor's logo</p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        placeholder="Brief description of the sponsor"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
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
                  <TableHead>Sponsor</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSponsors.map(sponsor => {
                  const event = mockEvents.find(e => e.id === sponsor.eventId);
                  return (
                    <TableRow key={sponsor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span className="font-medium">{sponsor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event?.title || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierColor(sponsor.tier)}>
                          {sponsor.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sponsor.website ? (
                          <a 
                            href={sponsor.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Visit Website
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No website</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(sponsor)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(sponsor.id)}
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
