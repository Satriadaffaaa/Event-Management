import PublicLayout from "../../components/layout/PublicLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  FileText,
  Target,
  Lightbulb,
  Users,
  Palette,
  Code,
  TrendingUp,
  Shield,
  CheckCircle2,
  Circle,
  ArrowRight,
  MousePointer,
  Search,
  UserCheck,
  QrCode,
  BarChart3,
} from "lucide-react";

export default function ProjectDeclaration() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Project Documentation
            </Badge>
            <h1 className="text-5xl lg:text-6xl mb-6">
              EventHub Pro
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Comprehensive Event Management Platform
            </p>
            <p className="text-lg text-blue-200">
              A unified platform that empowers event organizers with comprehensive management tools while delivering a seamless, intuitive experience for attendees.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Project Overview</h2>
              <p className="text-xl text-gray-600">
                Understanding the problem and our solution
              </p>
            </div>

            {/* Background */}
            <Card className="mb-8 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  Background
                </h3>
                <p className="text-gray-700 mb-4">
                  Event organizers today face significant challenges in managing complex events with multiple sub-events, booths, speakers, and attendees. Traditional methods involving spreadsheets, manual check-ins, and disconnected tools lead to inefficiencies, poor attendee experiences, and difficulty in tracking engagement metrics.
                </p>
                <p className="text-gray-700">
                  Event attendees, on the other hand, struggle to discover relevant events, understand schedules, and efficiently register for sessions that matter to them.
                </p>
              </CardContent>
            </Card>

            {/* Problems */}
            <Card className="border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 flex items-center gap-2">
                  <Target className="h-6 w-6 text-red-600" />
                  Key Problems We're Solving
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-red-700">For Event Organizers:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Managing events with disconnected tools (spreadsheets, email, paper)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Manual check-ins causing long queues and delays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>No visibility into booth engagement and attendee behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Difficulty tracking speakers, sponsors, and schedules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Limited post-event analytics and insights</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-red-700">For Event Attendees:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Hard to discover relevant events in one place</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Complex registration processes with multiple forms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Unclear event schedules and session information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>No personalized agenda for selected sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 flex-shrink-0">❌</span>
                        <span>Paper tickets and manual check-ins are time-consuming</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Solution */}
                <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="mb-3 text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Our Solution
                  </h4>
                  <p className="text-gray-700">
                    <strong>EventHub Pro</strong> is a unified platform that bridges this gap by providing comprehensive management tools for organizers while delivering a seamless, intuitive experience for attendees. From event creation to post-event analytics, everything is managed in one place with powerful automation, real-time insights, and QR-based engagement tracking.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Vision & Mission</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    Vision
                  </h3>
                  <p className="text-gray-700">
                    To become the leading all-in-one event management platform that transforms how events are organized, experienced, and measured—making every event more engaging, data-driven, and successful.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-500" />
                    Mission
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Empower event organizers with powerful management tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Provide intuitive platform for attendees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Enable data-driven decision making</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Streamline event lifecycle from planning to analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features by Role */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Core Features by Role</h2>
              <p className="text-xl text-gray-600">
                Tailored capabilities for every user type
              </p>
            </div>

            {/* Public Users */}
            <Card className="mb-6 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Public Users (Event Attendees)</h3>
                    <p className="text-sm text-gray-500">No login required</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Browse featured and published events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">View event details with tabs (About/Schedule/Booths/Speakers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Register for events with sub-event/booth selection</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Receive unique QR code for check-in</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Track booth visits via QR scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">View personalized event agenda</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Super Admin */}
            <Card className="mb-6 border-purple-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Super Admin</h3>
                    <p className="text-sm text-gray-500">Full system access & control</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>User Management:</strong> Create/edit/delete admin accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Role Assignment:</strong> Assign Super Admin, Admin, Organizer, Viewer roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Full CRUD:</strong> All events, speakers, sponsors, booths, schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Global Analytics:</strong> System-wide metrics and insights</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Registrant Management:</strong> View/edit/delete all registrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>QR Scanner:</strong> Check-in attendees and track booth visits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Export Data:</strong> Download reports for all events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>System Configuration:</strong> Manage platform settings</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Admin */}
            <Card className="mb-6 border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Admin</h3>
                    <p className="text-sm text-gray-500">Full event management access</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Event CRUD:</strong> Create, edit, delete, publish/draft events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Content Management:</strong> Speakers, sponsors, booths, schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Registrant Access:</strong> View/search/filter all registrations</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Analytics Dashboard:</strong> Event performance metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>QR Scanner:</strong> Check-in and booth tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Data Export:</strong> Download attendee and analytics data</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card className="mb-6 border-amber-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Organizer</h3>
                    <p className="text-sm text-gray-500">Limited to assigned events</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Limited Event CRUD:</strong> Edit assigned events only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Content Updates:</strong> Update speakers, sponsors, schedules for assigned events</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Registrant View:</strong> See registrations for assigned events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>QR Scanner:</strong> Check-in attendees for assigned events</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Viewer */}
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Viewer</h3>
                    <p className="text-sm text-gray-500">Read-only access</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>View-Only:</strong> Read all event data without edit permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Analytics Access:</strong> View reports and metrics</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Registrant List:</strong> View registrations (no edit/delete)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700"><strong>Dashboard:</strong> Monitor event statistics</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Flow & Journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <MousePointer className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">User Flow & Journey</h2>
              <p className="text-xl text-gray-600">
                Real-world scenarios showing how users interact with the platform
              </p>
            </div>

            {/* Event Attendee Journey */}
            <div className="mb-12">
              <Card className="border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl">🎭 Happy Path: Event Attendee</h3>
                      <p className="text-sm text-gray-600">Scenario: Sarah wants to attend a tech conference and visit specific booths</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <Search className="h-4 w-4 text-blue-600" />
                          Discovery (Landing Page)
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Visits EventHub Pro homepage</li>
                          <li>• Sees featured "Tech Summit 2025" in hero section</li>
                          <li>• Clicks "View Details" button</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          Exploration (Event Detail Page)
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>About Tab:</strong> Reads event description, notes date/time</li>
                          <li>• <strong>Schedule Tab:</strong> Reviews agenda, interested in "AI Panel" at 2 PM</li>
                          <li>• <strong>Booths Tab:</strong> Finds 3 exhibitors (TechCorp, AI Labs, Cloud Co)</li>
                          <li>• <strong>Speakers Tab:</strong> Recognizes keynote speaker, gets excited</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                          Registration
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clicks "Register Now" button</li>
                          <li>• Fills form: name, email, phone</li>
                          <li>• Selects sub-events: "AI Panel Discussion", "Networking Lunch"</li>
                          <li>• Selects booths: TechCorp, AI Labs, Cloud Co</li>
                          <li>• Submits registration</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Confirmation
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Receives success message with QR code displayed</li>
                          <li>• QR code also sent to email</li>
                          <li>• Saves QR code to phone</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          5
                        </div>
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-blue-600" />
                          Event Day - Check-in
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Arrives at venue</li>
                          <li>• Shows QR code to organizer with scanner</li>
                          <li>• Organizer scans → Status updates to "Checked In"</li>
                          <li>• Receives welcome packet</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          ✓
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          Event Day - Booth Visits
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Visits TechCorp booth</li>
                          <li>• Booth staff scans her QR code → Visit recorded</li>
                          <li>• Repeats at AI Labs and Cloud Co booths</li>
                          <li>• <strong>Result:</strong> Sarah visited 3/3 planned booths ✨</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event Organizer Journey */}
            <div>
              <Card className="border-green-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl">🎯 Happy Path: Event Organizer</h3>
                      <p className="text-sm text-gray-600">Scenario: Mike is organizing a product launch event with multiple sessions and sponsor booths</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Login & Dashboard</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Logs into admin panel</li>
                          <li>• Dashboard shows: 5 active events, 234 registrations</li>
                          <li>• Attention section: "Product Launch 2025 has 0 speakers"</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Create Event (Draft)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clicks "Create Event"</li>
                          <li>• Name: "Product Launch 2025"</li>
                          <li>• Date: Jan 15, 2025 | Venue: Convention Center Hall A</li>
                          <li>• Status: "Draft" (test before publishing)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Add Speakers & Schedule</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Adds keynote: John Doe, CEO with bio and photo</li>
                          <li>• Adds 2 more panelists</li>
                          <li>• Creates schedule: Registration, Keynote, Demo, Lunch, Panel</li>
                          <li>• Links speakers to sessions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Add Booths & Sponsors</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Creates 6 sponsor booths (capacity: 50 visitors each)</li>
                          <li>• Adds Platinum sponsor: TechVendor Inc with logo</li>
                          <li>• Adds 3 Gold sponsors</li>
                          <li>• Links all to "Product Launch 2025"</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          5
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Publish Event</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Returns to Events management</li>
                          <li>• Changes status from "Draft" to "Published"</li>
                          <li>• Event now visible on public site ✨</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          6
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2">Monitor Registrations</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Sees 45 registrations in 2 days</li>
                          <li>• Searches for "Sarah Johnson"</li>
                          <li>• Views her booth selections</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          7
                        </div>
                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="mb-2 flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-green-600" />
                          Event Day - Check-ins
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Uses mobile QR Scanner</li>
                          <li>• Scans attendee QR codes as they arrive</li>
                          <li>• Dashboard updates in real-time</li>
                          <li>• Check-in rate: 78% (35/45 attendees)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          ✓
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                          Post-Event Analytics
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Total Registrations: 45</li>
                          <li>• Check-in Rate: 78%</li>
                          <li>• Most visited booth: TechVendor (42 visits)</li>
                          <li>• Exports registrant data for follow-up emails</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                    Attendee Journey Insights
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>6 simple steps</strong> from discovery to booth visits</li>
                    <li>• <strong>Tab-based exploration</strong> for organized information</li>
                    <li>• <strong>QR code automation</strong> eliminates manual processes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-green-600" />
                    Organizer Journey Insights
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Draft-to-publish workflow</strong> for safe testing</li>
                    <li>• <strong>Real-time monitoring</strong> of registrations and check-ins</li>
                    <li>• <strong>Post-event analytics</strong> for data-driven decisions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Unique Selling Points</h2>
              <p className="text-xl text-gray-600">
                What makes EventHub Pro stand out from the competition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Unified Platform",
                  description: "Complete end-to-end solution from creation to analytics",
                  color: "blue",
                },
                {
                  icon: Users,
                  title: "Booth Tracking",
                  description: "Detailed booth-level engagement with QR technology",
                  color: "green",
                },
                {
                  icon: Shield,
                  title: "RBAC Built-in",
                  description: "Enterprise-grade access control from day one",
                  color: "purple",
                },
                {
                  icon: FileText,
                  title: "Event Filtering",
                  description: "Intelligent filtering prevents multi-event confusion",
                  color: "orange",
                },
                {
                  icon: TrendingUp,
                  title: "Attention Alerts",
                  description: "Proactive dashboard highlights critical items",
                  color: "red",
                },
                {
                  icon: Palette,
                  title: "Visual-First",
                  description: "Comprehensive image support for all entities",
                  color: "pink",
                },
              ].map((usp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`bg-${usp.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <usp.icon className={`h-6 w-6 text-${usp.color}-600`} />
                    </div>
                    <h3 className="text-xl mb-2">{usp.title}</h3>
                    <p className="text-gray-600 text-sm">{usp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Palette className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">UI/UX Design Strategy</h2>
              <p className="text-xl text-gray-600">
                Clarity, consistency, and accessibility at the core
              </p>
            </div>

            {/* Core Principles */}
            <div className="mb-12">
              <h3 className="text-2xl mb-6 text-center">Design Philosophy</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Clarity Over Complexity",
                    description: "Immediately understandable interfaces",
                  },
                  {
                    title: "Consistency is King",
                    description: "Standardized layouts and interactions",
                  },
                  {
                    title: "Data-Driven Design",
                    description: "Surface actionable insights prominently",
                  },
                  {
                    title: "Accessibility First",
                    description: "WCAG 2.1 AA compliant design",
                  },
                ].map((principle, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <h3 className="mb-2">{principle.title}</h3>
                      <p className="text-sm text-gray-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Approach Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Admin Panel Approach
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Standardized Layout:</strong> All 13 pages follow same structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Action-Oriented:</strong> Primary actions always visible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Contextual Filtering:</strong> Event-specific dropdowns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Inline Editing:</strong> Quick edits without full modals</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-8">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Public Interface Approach
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Visual-First:</strong> Large hero images and photography</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Progressive Info:</strong> Broad to specific drill-down</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Low-Friction:</strong> Minimal steps to registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Mobile-Responsive:</strong> Beautiful on all devices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Color Palette */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6">Color Palette & Psychology</h3>
                
                {/* Brand Colors */}
                <div className="mb-8">
                  <h4 className="mb-4 text-slate-700">Brand Colors</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="bg-blue-600 h-24 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Primary</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Blue 600</span>
                          <span className="text-gray-500 ml-2">#2563eb</span>
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Usage:</strong> Primary buttons, links, active states, clickable elements
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Psychology:</strong> Trust, professionalism, technology
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-800 h-24 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Secondary</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Slate 800</span>
                          <span className="text-gray-500 ml-2">#1e293b</span>
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Usage:</strong> Headers, headings, important text, admin panel sidebar
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Psychology:</strong> Sophistication, authority, stability
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-amber-500 h-24 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Accent</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Amber 500</span>
                          <span className="text-gray-500 ml-2">#f59e0b</span>
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          <strong>Usage:</strong> Featured badges, highlights, high-priority CTAs
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Psychology:</strong> Energy, attention, warmth
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Semantic Colors */}
                <div className="mb-6">
                  <h4 className="mb-4 text-slate-700">Semantic Colors</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="bg-emerald-500 h-20 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Success</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Emerald 500</span>
                          <span className="text-gray-500 ml-2">#10b981</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Success messages, positive metrics, completed status
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-amber-500 h-20 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Warning</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Amber 500</span>
                          <span className="text-gray-500 ml-2">#f59e0b</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Warnings, draft status, attention needed
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-red-500 h-20 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Error</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Red 500</span>
                          <span className="text-gray-500 ml-2">#ef4444</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Errors, critical alerts, deletion actions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Neutral Colors */}
                <div className="mb-6">
                  <h4 className="mb-4 text-slate-700">Neutral Colors</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="bg-slate-50 h-16 rounded-lg shadow-sm border-2 border-slate-200 flex items-center justify-center">
                        <span className="text-slate-700">Background</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Slate 50</span>
                          <span className="text-gray-500 ml-2">#f8fafc</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Page backgrounds, alternate sections
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white h-16 rounded-lg shadow-sm border-2 border-slate-200 flex items-center justify-center">
                        <span className="text-slate-700">Surface</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">White</span>
                          <span className="text-gray-500 ml-2">#ffffff</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Cards, modals, main content areas
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-900 h-16 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-white">Text</span>
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Slate 900</span>
                          <span className="text-gray-500 ml-2">#0f172a</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          Primary text, headings, body content
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Guidelines */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm mb-2">
                      <strong className="text-blue-700">Usage Guidelines:</strong>
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Use Primary (Blue) for all clickable elements</li>
                      <li>• Reserve Accent (Amber) for high-priority CTAs</li>
                      <li>• Semantic colors for consistent feedback</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm mb-2">
                      <strong className="text-green-700">Accessibility:</strong>
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Maintain 4.5:1 contrast ratio minimum (WCAG AA)</li>
                      <li>• Never use color as the only indicator</li>
                      <li>• Test with color blindness simulators</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6">Typography System</h3>
                
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="mb-4">Font Stack</h4>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500 mb-2">Headings & Body</div>
                        <div className="text-2xl mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Inter, system-ui, sans-serif
                        </div>
                        <p className="text-xs text-gray-600">
                          Excellent legibility, professional, modern, optimized for screens
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500 mb-2">Monospace (Codes/IDs)</div>
                        <div className="text-lg mb-1" style={{ fontFamily: "'Courier New', monospace" }}>
                          'Courier New', monospace
                        </div>
                        <p className="text-xs text-gray-600">
                          Clear distinction for technical data
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4">Typography Scale</h4>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl">H1</span>
                        <span className="text-sm text-gray-600">Page titles, defined in globals.css</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl">H2</span>
                        <span className="text-sm text-gray-600">Section headers</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl">H3</span>
                        <span className="text-sm text-gray-600">Card titles, subsections</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-base">Body</span>
                        <span className="text-sm text-gray-600">Optimal readability</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm text-gray-500">Small</span>
                        <span className="text-xs text-gray-600">Captions, secondary info</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-700">
                    <strong>Typography Rules:</strong> Never use custom Tailwind font size/weight classes unless explicitly changing from defaults. 
                    Rely on semantic HTML elements to automatically apply correct typography. Use font weight for hierarchy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tone of Voice */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6">Tone of Voice</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Admin Panel Voice
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Professional but Approachable</p>
                        <p className="text-gray-600 text-xs">
                          ✅ "Create Your First Event"<br/>
                          ❌ "Add Event Entity"
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Action-Oriented</p>
                        <p className="text-gray-600 text-xs">
                          Use clear verbs: Create, Edit, Delete, Export
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Helpful</p>
                        <p className="text-gray-600 text-xs">
                          Provide context in empty states: "No events yet. Create one to get started!"
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Transparent</p>
                        <p className="text-gray-600 text-xs">
                          Clear error messages and success confirmations
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Public Interface Voice
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Welcoming & Inclusive</p>
                        <p className="text-gray-600 text-xs">
                          ✅ "Join us"<br/>
                          ❌ "Register now"
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Informative</p>
                        <p className="text-gray-600 text-xs">
                          Clear, concise event descriptions without jargon
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Encouraging</p>
                        <p className="text-gray-600 text-xs">
                          ✅ "Select the sessions that interest you"<br/>
                          ❌ "Choose options"
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Respectful</p>
                        <p className="text-gray-600 text-xs">
                          Acknowledge user time and preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>General Guidelines:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use active voice ("You can edit this event") over passive voice</li>
                    <li>• Avoid technical jargon unless in technical contexts</li>
                    <li>• Be concise: respect user attention</li>
                    <li>• Provide reassurance before destructive actions ("This cannot be undone")</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Library */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Component Library</h2>
              <p className="text-xl text-gray-600">
                Reusable, consistent components across the platform
              </p>
            </div>

            {/* Layout Components */}
            <div className="mb-8">
              <h3 className="text-2xl mb-4">Layout Components</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">AdminLayout</h4>
                        <p className="text-xs text-gray-500">Consistent admin panel structure</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Fixed sidebar navigation with logout</li>
                      <li>• Role badge display (Super Admin, Admin, etc.)</li>
                      <li>• Consistent page padding & max-width</li>
                      <li>• Used across all 13 admin pages</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded">
                        <Code className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">PublicLayout</h4>
                        <p className="text-xs text-gray-500">Public-facing page structure</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Top navbar with logo & navigation</li>
                      <li>• Footer with social links & copyright</li>
                      <li>• Responsive mobile menu</li>
                      <li>• Used for landing, event details, registration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Custom Components */}
            <div className="mb-8">
              <h3 className="text-2xl mb-4">Custom Components</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">StatsCard</h4>
                        <p className="text-xs text-gray-500">Metric display component</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Title, value, icon display</li>
                      <li>• Optional trend indicator</li>
                      <li>• Optional description</li>
                      <li>• Used in all admin pages</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-amber-100 p-2 rounded">
                        <FileText className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">ImageWithFallback</h4>
                        <p className="text-xs text-gray-500">Smart image handling</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Auto fallback on error</li>
                      <li>• Alt text support</li>
                      <li>• Responsive sizing</li>
                      <li>• Used for all user images</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-pink-100 p-2 rounded">
                        <CheckCircle2 className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">StatusBadge</h4>
                        <p className="text-xs text-gray-500">Visual status indicators</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Color-coded statuses</li>
                      <li>• Draft/Published for events</li>
                      <li>• Active/Inactive for users</li>
                      <li>• Checked In/Pending</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* UI Component Categories */}
            <div className="mb-8">
              <h3 className="text-2xl mb-4">shadcn/ui Component Library</h3>
              <p className="text-sm text-gray-600 mb-6">
                We use a comprehensive set of accessible, customizable UI components based on Radix UI primitives.
              </p>

              <div className="grid md:grid-cols-4 gap-6">
                {/* Data Display */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-3 text-blue-600">Data Display</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>Table:</strong> Registrants, events list</li>
                      <li>• <strong>Card:</strong> Event cards, stats</li>
                      <li>• <strong>Badge:</strong> Status indicators</li>
                      <li>• <strong>Avatar:</strong> User photos</li>
                      <li>• <strong>Chart:</strong> Analytics graphs</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Forms & Input */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-3 text-green-600">Forms & Input</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>Input:</strong> Text fields</li>
                      <li>• <strong>Textarea:</strong> Descriptions</li>
                      <li>• <strong>Select:</strong> Dropdowns</li>
                      <li>• <strong>Checkbox:</strong> Multi-select</li>
                      <li>• <strong>Calendar:</strong> Date picker</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-3 text-purple-600">Navigation</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>Tabs:</strong> Event detail tabs</li>
                      <li>• <strong>Breadcrumb:</strong> Page hierarchy</li>
                      <li>• <strong>Pagination:</strong> Data tables</li>
                      <li>• <strong>Dropdown:</strong> Action menus</li>
                      <li>• <strong>Sidebar:</strong> Admin nav</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Feedback */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-3 text-amber-600">Feedback</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• <strong>Dialog:</strong> Confirmations</li>
                      <li>• <strong>Alert:</strong> Warnings</li>
                      <li>• <strong>Toast:</strong> Success messages</li>
                      <li>• <strong>Tooltip:</strong> Help text</li>
                      <li>• <strong>Progress:</strong> Loading states</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Component Guidelines */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-4">Component Usage Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Best Practices
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✅ Always use existing components before creating new ones</li>
                      <li>✅ Keep component props simple and focused</li>
                      <li>✅ Use TypeScript interfaces for prop validation</li>
                      <li>✅ Follow the single responsibility principle</li>
                      <li>✅ Maintain consistent styling with Tailwind</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Accessibility Standards
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Keyboard navigation support on all interactive elements</li>
                      <li>• ARIA labels for screen readers</li>
                      <li>• Focus indicators visible on tab navigation</li>
                      <li>• Minimum 4.5:1 color contrast ratios</li>
                      <li>• Semantic HTML elements (buttons, inputs, forms)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Technical Architecture</h2>
              <p className="text-xl text-gray-600">
                Built with modern, scalable technologies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Frontend</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      React 18+ with TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      Tailwind CSS 4.0
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      Lucide React Icons
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      React Router
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Backend</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Supabase (PostgreSQL)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Real-time subscriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Row Level Security
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Supabase Auth
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Security</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      HTTPS Only
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      JWT Token Auth
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      RBAC Authorization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      SQL Injection Protection
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl mb-4">Project Status & Roadmap</h2>
              <p className="text-xl text-gray-600">
                Track our progress and future plans
              </p>
            </div>

            {/* Current Progress */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6">✅ Completed Milestones</h3>
                <div className="space-y-4">
                  {[
                    "M1-M4: Core admin panel with 13 standardized management pages",
                    "M5: Role-Based Access Control (RBAC) system implementation",
                    "M6: Analytics dashboard with KPIs and attention alerts",
                    "M7: Image management for events, speakers, sponsors, and booths",
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{milestone}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6">🎯 In Progress & Planned</h3>
                <div className="space-y-4">
                  {[
                    "M8: Public interface (Landing page, event details, registration)",
                    "M9: QR system (Generation, scanning, check-in/booth tracking)",
                    "M10: Testing, polish, and MVP launch",
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Circle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{milestone}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Future Roadmap */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Phase 2: Enhanced Engagement</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Email notifications & reminders</li>
                    <li>• Native mobile app (iOS/Android)</li>
                    <li>• Networking features & messaging</li>
                    <li>• Gamification & leaderboards</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Phase 3: Advanced Analytics</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Predictive analytics & forecasting</li>
                    <li>• AI-powered insights</li>
                    <li>• Custom report builder</li>
                    <li>• Multi-event comparisons</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Phase 4: Enterprise Features</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• White-label solution</li>
                    <li>• CRM & email integrations</li>
                    <li>• Multi-language support</li>
                    <li>• Payment & ticketing system</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Phase 5: Virtual & Hybrid</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Live streaming integration</li>
                    <li>• Virtual booth experiences</li>
                    <li>• Hybrid event support</li>
                    <li>• On-demand content library</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">
            Ready to Transform Your Event Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in revolutionizing the event industry with EventHub Pro
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/admin/login"
              className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Access Admin Panel
            </a>
            <a
              href="/"
              className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              View Public Events
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}