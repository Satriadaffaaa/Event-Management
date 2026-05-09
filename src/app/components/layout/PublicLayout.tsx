import { Link } from 'react-router-dom';
import { Calendar, MapPin, Mail, Phone } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="text-xl">EventManager</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/#events" className="hover:text-blue-600 transition-colors">
                Events
              </Link>
              <Link to="/project-declaration" className="hover:text-blue-600 transition-colors">
                Project
              </Link>
              <Link to="/admin/login" className="hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-blue-400" />
                <span className="text-lg">EventManager</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your premier platform for discovering and managing professional events, conferences, and networking opportunities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/#events" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/project-declaration" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Project Declaration
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>info@eventmanager.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>123 Event Street, City</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to get updates about upcoming events and special offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} EventManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}