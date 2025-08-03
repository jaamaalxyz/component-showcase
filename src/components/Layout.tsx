import { Link, Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Component Showcase
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
