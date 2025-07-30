import React, { useState, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);
const AccordionItemContext = createContext<{ value: string } | undefined>(undefined);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within an AccordionItem');
  }
  return context;
}

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({ children, type = 'single', defaultValue, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);

      if (type === 'single') {
        if (newSet.has(value)) {
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(value);
        }
      } else {
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }
      }

      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('divide-y divide-gray-200 border border-gray-200 rounded-lg', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.has(value);

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn('', className)} data-value={value} data-state={isOpen ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { toggleItem, openItems } = useAccordion();
  const { value } = useAccordionItem();
  const isOpen = openItems.has(value);

  return (
    <button
      className={cn(
        'flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
        className
      )}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <span className="text-sm font-medium text-gray-900">{children}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 text-gray-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = useAccordion();
  const { value } = useAccordionItem();
  const isOpen = openItems.has(value);

  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <div className="overflow-hidden">
        <div className={cn('px-6 pb-4 pt-0 text-sm text-gray-600', className)}>{children}</div>
      </div>
    </div>
  );
}
