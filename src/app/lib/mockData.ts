export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  image: string;
  status: 'draft' | 'upcoming' | 'ongoing' | 'completed';
  category: string;
  featured: boolean;
}

export interface SubEvent {
  id: string;
  eventId: string;
  title: string;
  company: string;
  type: 'booth' | 'workshop' | 'presentation';
  description: string;
  location: string;
  capacity: number;
  logo: string;
  category: string;
  attendeesCount: number;
}

export interface Speaker {
  id: string;
  eventId: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  topic: string;
}

export interface Sponsor {
  id: string;
  eventId: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  logo: string;
  website: string;
  description: string;
}

export interface Schedule {
  id: string;
  eventId: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  location: string;
}

export interface Registrant {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  selectedSubEvents: string[];
  registeredAt: string;
  checkedIn: boolean;
  qrCode: string;
  boothsVisited: { boothId: string; visitedAt: string }[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  eventIds: string[];
  subEventIds: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Menu {
  id: string;
  name: string;
  path: string;
  icon: string;
  parentId: string | null;
  order: number;
}

export interface Permission {
  id: string;
  roleId: string;
  menuId: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'Join us for the biggest tech conference of the year',
    fullDescription: 'Tech Summit 2025 is the premier technology conference bringing together industry leaders, innovators, and professionals from around the world. Experience cutting-edge presentations, networking opportunities, and explore the latest technological advancements.',
    date: '2025-11-15',
    time: '09:00 AM',
    location: 'Convention Center, Downtown',
    capacity: 500,
    registered: 342,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'upcoming',
    category: 'Technology',
    featured: true
  },
  {
    id: '2',
    title: 'Business Innovation Forum',
    description: 'Discover the future of business and innovation',
    fullDescription: 'The Business Innovation Forum is designed to inspire and educate business professionals about the latest trends in innovation, entrepreneurship, and digital transformation.',
    date: '2025-12-20',
    time: '10:00 AM',
    location: 'Grand Hotel Ballroom',
    capacity: 300,
    registered: 156,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    status: 'upcoming',
    category: 'Business',
    featured: true
  },
  {
    id: '3',
    title: 'Healthcare Expo 2025',
    description: 'Advancing healthcare through technology and innovation',
    fullDescription: 'Healthcare Expo 2025 showcases the latest medical technologies, healthcare solutions, and innovations that are transforming patient care and medical practices.',
    date: '2025-10-25',
    time: '08:30 AM',
    location: 'Medical Conference Center',
    capacity: 400,
    registered: 387,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
    status: 'ongoing',
    category: 'Healthcare',
    featured: false
  }
];

export const mockSubEvents: SubEvent[] = [
  {
    id: '1',
    eventId: '1',
    title: 'AI Innovation Showcase',
    company: 'TechCorp Industries',
    type: 'booth',
    description: 'Experience the latest AI technologies and discover how machine learning can transform your business. Our experts will demonstrate real-world applications and answer your questions.',
    location: 'Hall A, Booth 101',
    capacity: 50,
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    category: 'Artificial Intelligence',
    attendeesCount: 45
  },
  {
    id: '2',
    eventId: '1',
    title: 'Cloud Computing Workshop',
    company: 'CloudNet Solutions',
    type: 'workshop',
    description: 'Join our interactive workshop to learn about scalable cloud solutions. Participants will get hands-on experience deploying applications to the cloud.',
    location: 'Workshop Room B',
    capacity: 40,
    logo: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200',
    category: 'Cloud Technology',
    attendeesCount: 38
  },
  {
    id: '3',
    eventId: '1',
    title: 'Cybersecurity Best Practices',
    company: 'SecureShield Inc',
    type: 'presentation',
    description: 'An in-depth presentation covering the latest cybersecurity threats and best practices for protecting your business. Free security assessments available.',
    location: 'Auditorium C',
    capacity: 100,
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200',
    category: 'Security',
    attendeesCount: 52
  },
  {
    id: '4',
    eventId: '2',
    title: 'Investment Opportunities Booth',
    company: 'Capital Ventures',
    type: 'booth',
    description: 'Meet with our panel of investors and explore funding opportunities. Schedule one-on-one meetings to pitch your startup ideas.',
    location: 'Hall B, Booth 205',
    capacity: 30,
    logo: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=200',
    category: 'Investment',
    attendeesCount: 28
  },
  {
    id: '5',
    eventId: '2',
    title: 'Business Analytics Platform Demo',
    company: 'DataInsights Pro',
    type: 'booth',
    description: 'Live demonstrations of our powerful analytics platform. See how data insights can transform your business decisions. Special pricing for event attendees.',
    location: 'Hall B, Booth 210',
    capacity: 35,
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
    category: 'Analytics',
    attendeesCount: 31
  }
];

export const mockSpeakers: Speaker[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Chief Technology Officer',
    company: 'InnovateTech',
    bio: 'Dr. Johnson is a renowned AI researcher with over 15 years of experience in machine learning and artificial intelligence.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    topic: 'The Future of AI in Enterprise'
  },
  {
    id: '2',
    eventId: '1',
    name: 'Michael Chen',
    title: 'Director of Cloud Architecture',
    company: 'CloudScale',
    bio: 'Michael has led cloud transformation initiatives for Fortune 500 companies and is an expert in distributed systems.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    topic: 'Building Scalable Cloud Infrastructure'
  },
  {
    id: '3',
    eventId: '2',
    name: 'Emily Rodriguez',
    title: 'CEO & Founder',
    company: 'StartupHub',
    bio: 'Emily is a serial entrepreneur who has founded three successful startups and now helps other entrepreneurs succeed.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    topic: 'From Idea to IPO: The Startup Journey'
  }
];

export const mockSponsors: Sponsor[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Microsoft',
    tier: 'platinum',
    logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200',
    website: 'https://microsoft.com',
    description: 'Leading technology company providing cloud computing and software solutions'
  },
  {
    id: '2',
    eventId: '1',
    name: 'Google Cloud',
    tier: 'gold',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200',
    website: 'https://cloud.google.com',
    description: 'Cloud computing services and infrastructure'
  },
  {
    id: '3',
    eventId: '2',
    name: 'AWS',
    tier: 'platinum',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200',
    website: 'https://aws.amazon.com',
    description: 'Comprehensive cloud computing platform'
  }
];

export const mockSchedule: Schedule[] = [
  {
    id: '1',
    eventId: '1',
    time: '09:00 AM - 10:00 AM',
    title: 'Opening Keynote',
    description: 'Welcome address and overview of the summit',
    speaker: 'Dr. Sarah Johnson',
    location: 'Main Auditorium'
  },
  {
    id: '2',
    eventId: '1',
    time: '10:30 AM - 12:00 PM',
    title: 'AI Workshop',
    description: 'Hands-on workshop on implementing AI solutions',
    speaker: 'Dr. Sarah Johnson',
    location: 'Workshop Room A'
  },
  {
    id: '3',
    eventId: '1',
    time: '02:00 PM - 03:30 PM',
    title: 'Cloud Infrastructure Panel',
    description: 'Expert panel discussion on cloud technologies',
    speaker: 'Michael Chen',
    location: 'Conference Hall B'
  },
  {
    id: '4',
    eventId: '2',
    time: '10:00 AM - 11:30 AM',
    title: 'Startup Success Stories',
    description: 'Learn from successful entrepreneurs',
    speaker: 'Emily Rodriguez',
    location: 'Main Stage'
  }
];

export const mockRegistrants: Registrant[] = [
  {
    id: '1',
    eventId: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-234-567-8900',
    company: 'Tech Solutions Inc',
    position: 'Software Engineer',
    selectedSubEvents: ['1', '2'],
    registeredAt: '2025-10-01T10:30:00Z',
    checkedIn: true,
    qrCode: 'QR001',
    boothsVisited: [
      { boothId: '1', visitedAt: '2025-10-15T09:45:00Z' },
      { boothId: '2', visitedAt: '2025-10-15T11:20:00Z' }
    ]
  },
  {
    id: '2',
    eventId: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-234-567-8901',
    company: 'Innovation Labs',
    position: 'Product Manager',
    selectedSubEvents: ['1', '3'],
    registeredAt: '2025-10-02T14:15:00Z',
    checkedIn: true,
    qrCode: 'QR002',
    boothsVisited: [
      { boothId: '1', visitedAt: '2025-10-15T10:30:00Z' }
    ]
  },
  {
    id: '3',
    eventId: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1-234-567-8902',
    company: 'Startup Ventures',
    position: 'CEO',
    selectedSubEvents: ['4'],
    registeredAt: '2025-10-05T09:00:00Z',
    checkedIn: false,
    qrCode: 'QR003',
    boothsVisited: []
  }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Event Manager',
    description: 'Can manage events, booths, and attendees',
    createdAt: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Booth Organizer',
    description: 'Manages specific booths and sub-events',
    createdAt: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to dashboard',
    createdAt: '2025-01-04T00:00:00Z'
  }
];

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@eventmanager.com',
    password: 'admin123',
    roleId: '1',
    eventIds: ['1', '2'],
    subEventIds: [],
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'john@eventmanager.com',
    password: 'password123',
    roleId: '2',
    eventIds: ['1'],
    subEventIds: [],
    status: 'active',
    createdAt: '2025-01-05T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sarah Booth',
    email: 'sarah@eventmanager.com',
    password: 'password123',
    roleId: '3',
    eventIds: ['1'],
    subEventIds: ['1', '2'],
    status: 'active',
    createdAt: '2025-01-06T00:00:00Z'
  }
];

export const mockMenus: Menu[] = [
  { id: '1', name: 'Dashboard', path: '/admin', icon: 'LayoutDashboard', parentId: null, order: 1 },
  { id: '2', name: 'Events', path: '/admin/events', icon: 'Calendar', parentId: null, order: 2 },
  { id: '3', name: 'Booths', path: '/admin/booths', icon: 'Store', parentId: null, order: 3 },
  { id: '4', name: 'Speakers', path: '/admin/speakers', icon: 'Users', parentId: null, order: 4 },
  { id: '5', name: 'Sponsors', path: '/admin/sponsors', icon: 'Award', parentId: null, order: 5 },
  { id: '6', name: 'Schedule', path: '/admin/schedule', icon: 'Clock', parentId: null, order: 6 },
  { id: '7', name: 'Registrants', path: '/admin/registrants', icon: 'UserCheck', parentId: null, order: 7 },
  { id: '8', name: 'Analytics', path: '/admin/analytics', icon: 'BarChart', parentId: null, order: 8 },
  { id: '9', name: 'QR Scanner', path: '/admin/qr-scanner', icon: 'QrCode', parentId: null, order: 9 },
  { id: '10', name: 'Account Management', path: '#', icon: 'Settings', parentId: null, order: 10 },
  { id: '11', name: 'Roles', path: '/admin/roles', icon: 'Shield', parentId: '10', order: 1 },
  { id: '12', name: 'Accounts', path: '/admin/accounts', icon: 'Users', parentId: '10', order: 2 },
  { id: '13', name: 'Menus', path: '/admin/menus', icon: 'Menu', parentId: '10', order: 3 },
  { id: '14', name: 'Permissions', path: '/admin/permissions', icon: 'Lock', parentId: '10', order: 4 }
];

export const mockPermissions: Permission[] = [
  // Super Admin - Full access to all menus
  { id: '1', roleId: '1', menuId: '1', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '2', roleId: '1', menuId: '2', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '3', roleId: '1', menuId: '3', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '4', roleId: '1', menuId: '4', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '5', roleId: '1', menuId: '5', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '6', roleId: '1', menuId: '6', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '7', roleId: '1', menuId: '7', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '8', roleId: '1', menuId: '8', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '9', roleId: '1', menuId: '9', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '10', roleId: '1', menuId: '11', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '11', roleId: '1', menuId: '12', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '12', roleId: '1', menuId: '13', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '13', roleId: '1', menuId: '14', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  
  // Event Manager - Can manage events, booths, speakers, schedule, registrants
  { id: '14', roleId: '2', menuId: '1', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '15', roleId: '2', menuId: '2', canCreate: true, canRead: true, canUpdate: true, canDelete: false },
  { id: '16', roleId: '2', menuId: '3', canCreate: true, canRead: true, canUpdate: true, canDelete: false },
  { id: '17', roleId: '2', menuId: '4', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '18', roleId: '2', menuId: '6', canCreate: true, canRead: true, canUpdate: true, canDelete: true },
  { id: '19', roleId: '2', menuId: '7', canCreate: false, canRead: true, canUpdate: true, canDelete: false },
  { id: '20', roleId: '2', menuId: '8', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  
  // Booth Organizer - Can only manage assigned booths
  { id: '21', roleId: '3', menuId: '1', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '22', roleId: '3', menuId: '3', canCreate: false, canRead: true, canUpdate: true, canDelete: false },
  { id: '23', roleId: '3', menuId: '7', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '24', roleId: '3', menuId: '9', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  
  // Viewer - Read-only access
  { id: '25', roleId: '4', menuId: '1', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '26', roleId: '4', menuId: '2', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '27', roleId: '4', menuId: '3', canCreate: false, canRead: true, canUpdate: false, canDelete: false },
  { id: '28', roleId: '4', menuId: '8', canCreate: false, canRead: true, canUpdate: false, canDelete: false }
];
