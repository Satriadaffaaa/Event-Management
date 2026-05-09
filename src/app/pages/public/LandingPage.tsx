import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { mockEvents } from "../../lib/mockData";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function LandingPage() {
  const upcomingEvents = mockEvents.filter(
    (e) => e.status === "upcoming",
  );
  const featuredEvents = mockEvents.filter(
    (e) => e.featured && e.status !== "draft",
  );

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Welcome to EventManager
            </Badge>
            <h1 className="text-5xl lg:text-6xl mb-6">
              Discover Amazing Events & Expand Your Network
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals at
              industry-leading conferences, exhibitions, and
              networking events. Register now and take your
              career to the next level.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="#events">Explore Events</a>
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Featured Events Cards */}
          {featuredEvents.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Award className="h-5 w-5 text-yellow-400" />
                <h2 className="text-2xl">Featured Events</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {featuredEvents.slice(0, 2).map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all"
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-2">
                        {event.title}
                      </h3>
                      <p className="text-blue-100 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(
                              event.date,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.registered} registered
                          </span>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="bg-white text-blue-600 hover:bg-gray-100"
                      >
                        <Link to={`/events/${event.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-1">500+</div>
              <div className="text-sm text-blue-100">
                Events Hosted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">50K+</div>
              <div className="text-sm text-blue-100">
                Attendees
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">200+</div>
              <div className="text-sm text-blue-100">
                Companies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">
              Why Choose EventManager?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless event
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">
                  Easy Registration
                </h3>
                <p className="text-gray-600">
                  Simple and quick event registration process
                  with instant confirmation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl mb-3">
                  Networking Opportunities
                </h3>
                <p className="text-gray-600">
                  Connect with industry leaders and expand your
                  professional network
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl mb-3">
                  Premium Content
                </h3>
                <p className="text-gray-600">
                  Access to exclusive sessions, workshops, and
                  exhibition booths
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl mb-2">Upcoming Events</h2>
              <p className="text-xl text-gray-600">
                Don't miss out on these amazing opportunities
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600">
                    {event.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(
                          event.date,
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registered} / {event.capacity}{" "}
                        registered
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to={`/events/${event.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1"
                    >
                      <Link to={`/events/${event.id}/register`}>
                        Register
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">
            Ready to Join the Next Event?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Register now and be part of the most exciting events
            in your industry
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <a href="#events">Browse All Events</a>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}