import { AuthForm } from '../components/forms/react-auth-form';

export function AuthFormPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Form</h1>
        <p className="text-lg text-gray-600 mb-6">
          A comprehensive authentication form component with advanced features including form
          validation, password strength indicators, accessibility support, and responsive design.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Features</h2>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Toggle between login and signup modes</li>
            <li>Real-time form validation with custom rules</li>
            <li>Password strength indicator with visual feedback</li>
            <li>Accessible form controls with ARIA attributes</li>
            <li>Password visibility toggle</li>
            <li>Loading states and error handling</li>
            <li>Responsive design with Tailwind CSS</li>
            <li>TypeScript support with comprehensive type definitions</li>
          </ul>
        </div>
      </div>

      <AuthForm />
    </div>
  );
}
