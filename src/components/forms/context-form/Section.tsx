type SectionProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export function Section({ title, children, description }: SectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
