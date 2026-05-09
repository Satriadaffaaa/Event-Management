import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { mockEvents, mockSubEvents } from '../../lib/mockData';
import { Calendar, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function EventRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSubEvents, setSelectedSubEvents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });

  const event = mockEvents.find(e => e.id === id);
  const subEvents = mockSubEvents.filter(se => se.eventId === id);

  if (!event) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl mb-4">Event not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </PublicLayout>
    );
  }

  const handleSubEventToggle = (subEventId: string) => {
    setSelectedSubEvents(prev => 
      prev.includes(subEventId)
        ? prev.filter(id => id !== subEventId)
        : [...prev, subEventId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would submit to a backend
    toast.success('Registration successful! Check your email for confirmation.');
    setTimeout(() => {
      navigate(`/events/${id}`);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-32 h-32 object-cover rounded-lg hidden md:block"
                />
                <div className="flex-1">
                  <h1 className="text-3xl mb-4">{event.title}</h1>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1-234-567-8900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booth Selection */}
            {subEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Booths to Visit</CardTitle>
                  <p className="text-sm text-gray-600">
                    Choose the exhibition booths you're interested in visiting
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subEvents.map(subEvent => (
                    <div
                      key={subEvent.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={subEvent.id}
                        checked={selectedSubEvents.includes(subEvent.id)}
                        onCheckedChange={() => handleSubEventToggle(subEvent.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 flex gap-4 min-w-0">
                        <ImageWithFallback
                          src={subEvent.logo}
                          alt={subEvent.company}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={subEvent.id} className="cursor-pointer">
                            <h4 className="mb-1 break-words">{subEvent.title}</h4>
                          </Label>
                          <p className="text-sm text-gray-600 mb-2">{subEvent.company}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{subEvent.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {selectedSubEvents.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          You've selected {selectedSubEvents.length} booth{selectedSubEvents.length !== 1 ? 's' : ''} to visit
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Terms and Submit */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to receive event updates and communications. I understand that my information will be used in accordance with the privacy policy.
                  </Label>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Complete Registration
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(`/events/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 text-center">
                  After registration, you'll receive a confirmation email with your QR code ticket
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
