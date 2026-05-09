import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, MapPin, Users, Clock, ArrowRight, User } from 'lucide-react';
import { mockEvents, mockSubEvents, mockSchedule, mockSponsors, mockSpeakers, SubEvent } from '../../lib/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function EventDetail() {
  const { id } = useParams();
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(null);

  const event = mockEvents.find(e => e.id === id);
  const subEvents = mockSubEvents.filter(se => se.eventId === id);
  const schedule = mockSchedule.filter(s => s.eventId === id);
  const sponsors = mockSponsors.filter(s => s.eventId === id);
  const speakers = mockSpeakers.filter(s => s.eventId === id);

  if (!event) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl mb-4">Event not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const sponsorsByTier = {
    platinum: sponsors.filter(s => s.tier === 'platinum'),
    gold: sponsors.filter(s => s.tier === 'gold'),
    silver: sponsors.filter(s => s.tier === 'silver'),
    bronze: sponsors.filter(s => s.tier === 'bronze'),
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-end pb-12">
            <div className="text-white">
              <Badge className="bg-blue-600 mb-4">{event.category}</Badge>
              <h1 className="text-5xl mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{event.registered} / {event.capacity} registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="booths">Booths & Exhibitions</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                </TabsList>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-8">
                  <div>
                    <h2 className="text-3xl mb-4">About This Event</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {event.fullDescription}
                    </p>
                  </div>

                  {/* Sponsors Section */}
                  {sponsors.length > 0 && (
                    <div>
                      <h3 className="text-2xl mb-6">Our Sponsors</h3>
                      
                      {sponsorsByTier.platinum.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-lg mb-4 text-amber-600">Platinum Sponsors</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {sponsorsByTier.platinum.map(sponsor => (
                              <Card key={sponsor.id}>
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <ImageWithFallback
                                      src={sponsor.logo}
                                      alt={sponsor.name}
                                      className="w-20 h-20 object-contain flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h5 className="mb-2 break-words">{sponsor.name}</h5>
                                      <p className="text-sm text-gray-600 line-clamp-2">{sponsor.description}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {sponsorsByTier.gold.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-lg mb-4 text-yellow-600">Gold Sponsors</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            {sponsorsByTier.gold.map(sponsor => (
                              <Card key={sponsor.id}>
                                <CardContent className="p-5 text-center">
                                  <ImageWithFallback
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="w-16 h-16 object-contain mx-auto mb-3"
                                  />
                                  <h5 className="text-sm break-words">{sponsor.name}</h5>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* Schedule Tab */}
                <TabsContent value="schedule">
                  <h2 className="text-3xl mb-6">Event Schedule</h2>
                  <div className="space-y-4">
                    {schedule.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="text-center min-w-24 flex-shrink-0">
                              <div className="text-2xl text-blue-600">{item.time}</div>
                            </div>
                            <div className="flex-1 border-l-2 border-blue-600 pl-6 min-w-0">
                              <h3 className="text-xl mb-2 break-words">{item.title}</h3>
                              <p className="text-gray-600 mb-3">{item.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                                {item.speaker && (
                                  <div className="flex items-center gap-1.5">
                                    <User className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{item.speaker}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Booths Tab */}
                <TabsContent value="booths">
                  <h2 className="text-3xl mb-6">Booths & Exhibitions</h2>
                  <p className="text-gray-600 mb-8">
                    Explore our exhibition booths and connect with leading companies and investment opportunities.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {subEvents.map(subEvent => (
                      <Card 
                        key={subEvent.id} 
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedSubEvent(subEvent)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <ImageWithFallback
                              src={subEvent.logo}
                              alt={subEvent.company}
                              className="w-16 h-16 rounded object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl mb-2 break-words">{subEvent.title}</h3>
                              <p className="text-sm text-gray-600">{subEvent.company}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize mb-3">{subEvent.type}</Badge>
                          <p className="text-gray-700 mb-4 line-clamp-2">{subEvent.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{subEvent.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="h-4 w-4 flex-shrink-0" />
                              <span>{subEvent.attendeesCount}/{subEvent.capacity}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            View Details <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Speakers Tab */}
                <TabsContent value="speakers">
                  <h2 className="text-3xl mb-6">Featured Speakers</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {speakers.map(speaker => (
                      <Card key={speaker.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4 mb-4">
                            <ImageWithFallback
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl mb-2 break-words">{speaker.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">{speaker.title}</p>
                              <p className="text-sm text-gray-500">{speaker.company}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="mb-3">{speaker.topic}</Badge>
                          <p className="text-gray-700 line-clamp-3">{speaker.bio}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Event Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Category</div>
                      <Badge>{event.category}</Badge>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Capacity</div>
                      <div>{event.capacity} attendees</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Registered</div>
                      <div>{event.registered} people</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Exhibition Booths</div>
                      <div>{subEvents.length} booths</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Registration Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Register for This Event</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Price</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Spots Left</span>
                      <span>{event.capacity - event.registered}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge className="bg-green-600">Open</Badge>
                    </div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to={`/events/${event.id}/register`}>
                      Register Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Event Modal */}
      <Dialog open={selectedSubEvent !== null} onOpenChange={() => setSelectedSubEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="booth-details-description">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedSubEvent?.title}
            </DialogTitle>
          </DialogHeader>
          <p id="booth-details-description" className="sr-only">
            Detailed information about the booth or exhibition
          </p>
          {selectedSubEvent && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4 pb-6 border-b">
                <ImageWithFallback
                  src={selectedSubEvent.logo}
                  alt={selectedSubEvent.company}
                  className="w-20 h-20 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl mb-2 break-words">{selectedSubEvent.title}</h4>
                  <p className="text-gray-600 mb-2">{selectedSubEvent.company}</p>
                  <Badge className="capitalize">{selectedSubEvent.type}</Badge>
                </div>
              </div>

              {/* Information Grid */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Description</label>
                  <p className="text-gray-800 leading-relaxed">{selectedSubEvent.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Location</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{selectedSubEvent.location}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Capacity</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span>{selectedSubEvent.attendeesCount} / {selectedSubEvent.capacity} attendees</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t">
                <Button asChild className="w-full" size="lg">
                  <Link to={`/events/${event.id}/register`}>
                    Register for This Event
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
