import { Button } from '@/components/ui/Button';

export function ButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Variants</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Sizes</h2>
          <div className="flex gap-4 flex-wrap items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">States</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Combined Examples</h2>
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline" size="sm">
                Small Outline
              </Button>
              <Button variant="ghost" size="lg">
                Large Ghost
              </Button>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="ghost" disabled>
                Disabled Ghost
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Form Usage</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline" onClick={() => alert('Reset clicked!')}>
                Reset
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
