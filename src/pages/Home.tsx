import { Link } from 'react-router';

export function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Component Showcase</h1>

      <p className="text-lg text-gray-600 mb-8">
        This is a showcase repository where I create and demonstrate various React components with
        different use cases and usage patterns.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-3">Button Component</h2>
          <p className="text-gray-600 mb-4">
            A versatile button component with multiple variants, sizes, and styling options built
            with class-variance-authority.
          </p>
          <Link
            to="/button"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View Button Examples →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-3">Accordion Component</h2>
          <p className="text-gray-600 mb-4">
            An accessible accordion component with single and multiple expansion modes, smooth
            animations, and keyboard navigation.
          </p>
          <Link
            to="/accordion"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View Accordion Examples →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-3">Context Form Component</h2>
          <p className="text-gray-600 mb-4">
            A versatile context form component with various input fields, validation, and submission
            handling.
          </p>
          <Link
            to="/context-form"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View Context Form Examples →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-3">Authentication Form</h2>
          <p className="text-gray-600 mb-4">
            A comprehensive authentication form with advanced validation, password strength
            indicators, and accessibility features for login and signup flows.
          </p>
          <Link
            to="/auth-form"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View Auth Form Examples →
          </Link>
        </div>
      </div>
    </div>
  );
}
