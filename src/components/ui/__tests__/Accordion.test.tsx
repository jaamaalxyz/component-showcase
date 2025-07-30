import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/test/utils';
import { axeTest } from '@/test/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion';

describe('Accordion Component', () => {
  const TestAccordion = ({
    type = 'single',
    defaultValue,
  }: {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
  }) => (
    <Accordion type={type} {...(defaultValue !== undefined && { defaultValue })}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  describe('Rendering', () => {
    it('renders accordion with items', () => {
      render(<TestAccordion />);

      expect(screen.getByText('Trigger 1')).toBeInTheDocument();
      expect(screen.getByText('Trigger 2')).toBeInTheDocument();
    });

    it('applies custom className to accordion root', () => {
      render(
        <Accordion className="custom-accordion">
          <AccordionItem value="test">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const accordion = screen.getByText('Test').closest('[class*="custom-accordion"]');
      expect(accordion).toBeInTheDocument();
    });

    it('renders with default styling', () => {
      render(<TestAccordion />);

      const triggers = screen.getAllByRole('button');
      triggers.forEach((trigger) => {
        expect(trigger).toHaveClass('flex', 'w-full', 'items-center', 'justify-between');
      });
    });
  });

  describe('Single Accordion Behavior', () => {
    it('opens item when clicked', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      await user.click(trigger1);

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('closes item when clicked again', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" defaultValue="item-1" />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes other items when opening a new one', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="single" defaultValue="item-1" />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger2);

      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects defaultValue for single accordion', () => {
      render(<TestAccordion type="single" defaultValue="item-2" />);

      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Multiple Accordion Behavior', () => {
    it('allows multiple items to be open', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="multiple" />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });

      await user.click(trigger1);
      await user.click(trigger2);

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('can close items independently', async () => {
      const user = userEvent.setup();
      render(<TestAccordion type="multiple" defaultValue={['item-1', 'item-2']} />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger1);

      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects defaultValue array for multiple accordion', () => {
      render(<TestAccordion type="multiple" defaultValue={['item-1', 'item-2']} />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports Enter key to toggle items', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      trigger1.focus();

      await user.keyboard('{Enter}');
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Enter}');
      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    });

    it('supports Space key to toggle items', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      trigger1.focus();

      await user.keyboard(' ');
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    });

    it('maintains focus on trigger after activation', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      trigger1.focus();

      await user.keyboard('{Enter}');
      expect(trigger1).toHaveFocus();
    });
  });

  describe('Animation and States', () => {
    it('applies correct data-state attributes', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const item1 = trigger1.closest('[data-value="item-1"]');

      expect(item1).toHaveAttribute('data-state', 'closed');
      expect(trigger1).toHaveAttribute('data-state', 'closed');

      await user.click(trigger1);

      expect(item1).toHaveAttribute('data-state', 'open');
      expect(trigger1).toHaveAttribute('data-state', 'open');
    });

    it('rotates chevron icon when expanded', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const chevron = trigger1.querySelector('svg');

      expect(chevron).not.toHaveClass('rotate-180');

      await user.click(trigger1);

      await waitFor(() => {
        expect(chevron).toHaveClass('rotate-180');
      });
    });

    it('applies transition classes for smooth animation', () => {
      render(<TestAccordion defaultValue="item-1" />);

      const content = screen.getByText('Content 1').parentElement?.parentElement;
      expect(content).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });
  });

  describe('Content Rendering', () => {
    it('renders complex content correctly', () => {
      render(
        <Accordion type="single" defaultValue="complex">
          <AccordionItem value="complex">
            <AccordionTrigger>Complex Content</AccordionTrigger>
            <AccordionContent>
              <div>
                <h3>Title</h3>
                <p>Paragraph content</p>
                <button>Nested Button</button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Nested Button' })).toBeInTheDocument();
    });

    it('applies custom className to content', () => {
      render(
        <Accordion type="single" defaultValue="test">
          <AccordionItem value="test">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent className="custom-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const content = screen.getByText('Content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TestAccordion />);
      await axeTest(container);
    });

    it('has proper ARIA attributes', () => {
      render(<TestAccordion />);

      const triggers = screen.getAllByRole('button');
      triggers.forEach((trigger) => {
        expect(trigger).toHaveAttribute('aria-expanded');
      });
    });

    it('maintains proper focus management', async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      const trigger1 = screen.getByRole('button', { name: 'Trigger 1' });
      const trigger2 = screen.getByRole('button', { name: 'Trigger 2' });

      await user.tab();
      expect(trigger1).toHaveFocus();

      await user.tab();
      expect(trigger2).toHaveFocus();
    });

    it('supports screen readers with proper labeling', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="test">
            <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
            <AccordionContent>FAQ content here</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /frequently asked questions/i });
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('throws error when AccordionTrigger is used outside AccordionItem', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<AccordionTrigger>Invalid</AccordionTrigger>);
      }).toThrow();

      consoleSpy.mockRestore();
    });

    it('throws error when AccordionContent is used outside AccordionItem', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<AccordionContent>Invalid</AccordionContent>);
      }).toThrow();

      consoleSpy.mockRestore();
    });
  });
});
