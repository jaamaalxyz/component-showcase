# React Testing Best Practices Examples

This document demonstrates the testing patterns and best practices implemented in this project.

## 🧪 Testing Philosophy

We follow **user-centric testing** principles:

- Test behavior, not implementation
- Focus on what users see and do
- Ensure accessibility compliance
- Write maintainable, readable tests

## 📚 Core Testing Patterns

### 1. Component Rendering Tests

```tsx
it('renders with default props', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });

  expect(button).toBeInTheDocument();
});
```

### 2. User Interaction Tests

```tsx
it('handles click events', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 3. Accessibility Tests

```tsx
it('has no accessibility violations', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  await axeTest(container);
});
```

### 4. Keyboard Navigation Tests

```tsx
it('supports keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>Press me</Button>);

  const button = screen.getByRole('button');
  button.focus();
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});
```

## 🎯 Testing Strategies

### Component States

- Default state
- Loading state
- Error state
- Disabled state
- Focus state

### Variant Testing

- All visual variants
- All size variants
- Custom styling

### Integration Testing

- Form integration
- Router integration
- Context providers

### Error Boundaries

- Invalid props
- Missing context
- Malformed data

## 🔧 Test Utilities

### Custom Render

Our custom render function provides:

- Router context automatically
- Consistent test environment
- Easy provider wrapping

### Accessibility Helpers

- `axeTest()` - Automated a11y testing
- `expectToHaveAccessibleName()` - Name verification
- Screen reader simulation

### User Event Setup

Always use `userEvent.setup()` for realistic interactions:

```tsx
const user = userEvent.setup();
await user.click(element);
await user.keyboard('{Enter}');
await user.tab();
```

## 📊 Coverage Guidelines

We maintain **80%+ coverage** across:

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

Focus on meaningful coverage, not just numbers.

## 🚀 Performance Testing

- Use `vi.fn()` for mocks
- Clean up after each test automatically
- Optimize test setup and teardown
- Run related tests only in watch mode

## 🔍 Best Practices Summary

1. **Query by accessibility attributes first**
   - `getByRole()` > `getByLabelText()` > `getByText()`
2. **Use async/await for user interactions**
   - Always await user events
   - Use `waitFor()` for async updates
3. **Test the contract, not the implementation**
   - Focus on public API
   - Avoid testing internal state
4. **Write descriptive test names**
   - Describe the behavior being tested
   - Use "should" or "when" patterns
5. **Group related tests logically**
   - Use `describe` blocks effectively
   - Follow consistent naming patterns
