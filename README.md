# Event Management Web Application

A comprehensive event management platform with separate interfaces for attendees and administrators.

## Features

### Public Interface
- 🎯 Landing page with featured events
- 📅 Detailed event information pages
- 🎫 Event registration with booth selection
- 📱 Responsive design for all devices
- 🏢 Exhibition booth showcase with modals

### Admin Panel
- 📊 Analytics dashboard with real-time stats
- 📝 Full CRUD for events, speakers, sponsors, and schedules
- 🏪 Booth/sub-event management with visit tracking
- 👥 Registrant management with search and filters
- 📱 QR code scanner for check-ins and booth visits
- 📈 Export functionality for registrant data

## Quick Start

### Access the Application

**Public Pages:**
- Home: `/`
- Event Details: `/events/1`, `/events/2`, `/events/3`
- Registration: `/events/1/register`

**Admin Panel:**
- Login: `/admin/login`
  - Username: `admin`
  - Password: `admin`
- Dashboard: `/admin/dashboard` (after login)

### Admin Features Tour

1. **Login** at `/admin/login` with credentials above
2. **Dashboard** - View analytics and quick actions
3. **Events** - Create and manage main events
4. **Sub-Events/Booths** - Add exhibition booths (select event first)
5. **Speakers** - Add speakers (select event first)
6. **Sponsors** - Add sponsors with tier selection (select event first)
7. **Schedule** - Create event schedules (select event first)
8. **Registrants** - View and filter registrations
9. **QR Scanner** - Scan codes: QR-1-001, QR-1-002, QR-1-003

### Key Admin Workflows

**Create a Complete Event:**
1. Go to Events → Create Event
2. Go to Speakers → Add Speaker → Select your event
3. Go to Sponsors → Add Sponsor → Select your event
4. Go to Schedule → Add Schedule Item → Select your event
5. Go to Sub-Events → Add Booth → Select your event

**Track Attendance:**
1. Go to QR Scanner
2. Select "Check-In" mode
3. Enter QR code (e.g., QR-1-001)
4. Switch to "Booth Visit" mode
5. Select a booth from dropdown
6. Scan QR code again to track booth visit

## Data Structure

The application uses mock data with the following structure:
- **Events**: Main events with capacity, dates, locations
- **Sub-Events**: Exhibition booths with company information
- **Speakers**: Event speakers with bios and topics
- **Sponsors**: Tiered sponsors (Platinum, Gold, Silver, Bronze)
- **Schedule**: Time-based event activities
- **Registrants**: Attendee information with booth selections

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Project Structure

```
/
├── App.tsx                      # Main app with routing
├── lib/
│   └── mockData.ts             # Mock database
├── components/
│   ├── layout/                 # Layout components
│   ├── ui/                     # UI components
│   └── StatsCard.tsx           # Stats display component
├── pages/
│   ├── public/                 # Public pages
│   │   ├── LandingPage.tsx
│   │   ├── EventDetail.tsx
│   │   └── EventRegistration.tsx
│   └── admin/                  # Admin pages
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── EventsManagement.tsx
│       ├── SubEventsManagement.tsx
│       ├── SpeakersManagement.tsx
│       ├── SponsorsManagement.tsx
│       ├── ScheduleManagement.tsx
│       ├── RegistrantsList.tsx
│       └── QRScanner.tsx
└── README.md                    # This file
```

---

**Status**: ✅ Complete and ready for use or further development

**Demo Credentials**: admin / admin

**Demo QR Codes**: QR-1-001, QR-1-002, QR-1-003