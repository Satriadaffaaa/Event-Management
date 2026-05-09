import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import EventDetail from './pages/public/EventDetail';
import EventRegistration from './pages/public/EventRegistration';
import ProjectDeclaration from './pages/public/ProjectDeclaration';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventsManagement from './pages/admin/EventsManagement';
import SubEventsManagement from './pages/admin/SubEventsManagement';
import SpeakersManagement from './pages/admin/SpeakersManagement';
import SponsorsManagement from './pages/admin/SponsorsManagement';
import ScheduleManagement from './pages/admin/ScheduleManagement';
import RegistrantsList from './pages/admin/RegistrantsList';
import QRScanner from './pages/admin/QRScanner';
import Analytics from './pages/admin/Analytics';
import RoleManagement from './pages/admin/RoleManagement';
import AccountManagement from './pages/admin/AccountManagement';
import MenuManagement from './pages/admin/MenuManagement';
import PermissionManagement from './pages/admin/PermissionManagement';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/project-declaration" element={<ProjectDeclaration />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <EventsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sub-events"
          element={
            <ProtectedRoute>
              <SubEventsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/speakers"
          element={
            <ProtectedRoute>
              <SpeakersManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sponsors"
          element={
            <ProtectedRoute>
              <SponsorsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedule"
          element={
            <ProtectedRoute>
              <ScheduleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/registrants"
          element={
            <ProtectedRoute>
              <RegistrantsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/scanner"
          element={
            <ProtectedRoute>
              <QRScanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <ProtectedRoute>
              <RoleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/accounts"
          element={
            <ProtectedRoute>
              <AccountManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menus"
          element={
            <ProtectedRoute>
              <MenuManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/permissions"
          element={
            <ProtectedRoute>
              <PermissionManagement />
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}