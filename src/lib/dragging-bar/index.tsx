import { useEffect, useRef, useState } from 'react';

interface DraggingBarProps {
  onChange: (val: number) => void;
  max?: number;
  min?: number;
  step?: number;
  label?: string;
}

export const DraggingBar = ({
  onChange,
  max = 300,
  min = 0,
  step = 10,
  label = 'Value',
}: DraggingBarProps) => {
  const [value, setValue] = useState(min + (max - min) * 0.1);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    if (!ref.current) return;
    const changeValue = (e: MouseEvent) => {
      if (!isDragging) return;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      const newValue = min + (percentage / 100) * (max - min);

      setValue(Math.round(newValue));
      onChange(Math.round(newValue));
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', changeValue);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', changeValue);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    let newValue = value;

    switch (e.key) {
      case 'ArrowLeft':
        newValue = Math.max(min, value - step);
        break;
      case 'ArrowRight':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {value}
        </span>
      </div>

      <div
        ref={ref}
        className="relative w-full h-6 bg-gray-200 rounded-full cursor-pointer group"
        role="slider"
        tabIndex={0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        onMouseDown={() => setIsDragging(true)}
        onKeyDown={handleKeyDown}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Progress bar */}
        <div
          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-150 ease-out"
          style={{ width: `${percentage}%` }}
        />

        {/* Handle */}
        <div
          className={`absolute top-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-150 ease-out cursor-grab ${
            isDragging
              ? 'scale-110 cursor-grabbing shadow-xl border-blue-600'
              : 'hover:scale-105 hover:shadow-md'
          }`}
          style={{ left: `calc(${percentage}% - 12px)` }}
          role="slider"
          tabIndex={0}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={`${label}: ${value}`}
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
        >
          <div className="absolute inset-1 bg-blue-500 rounded-full" />
        </div>

        {/* Track markers */}
        <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div key={mark} className="w-0.5 h-2 bg-gray-300 rounded-full opacity-60" />
          ))}
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
