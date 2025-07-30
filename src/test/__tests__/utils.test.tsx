import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Link } from 'react-router';

describe('Test Utils', () => {
  it('renders components with router context', () => {
    const TestComponent = () => (
      <div>
        <h1>Test Page</h1>
        <Link to="/about">About</Link>
      </div>
    );

    render(<TestComponent />);

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('custom matchers work correctly', () => {
    render(<button className="test-class">Click me</button>);
    const button = screen.getByRole('button');

    // Test our custom matcher exports
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
    expect(button).toHaveClass('test-class');
  });

  it('provides access to all testing library utilities', () => {
    render(
      <div>
        <input aria-label="Username" />
        <button>Submit</button>
      </div>
    );

    // Test that we have access to all the utilities we re-exported
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
