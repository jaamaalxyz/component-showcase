import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function AccordionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual feedback submission
    // eslint-disable-next-line no-console
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback! We will get back to you soon.');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      description: '',
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Accordion Component</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Single Accordion (GitHub FAQ Style)</h2>
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is GitHub?</AccordionTrigger>
              <AccordionContent>
                GitHub is a platform for version control and collaboration. It lets you and others
                work together on projects from anywhere. GitHub uses Git, a distributed version
                control system, to track changes in source code during software development.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I create a repository?</AccordionTrigger>
              <AccordionContent>
                Short answer: Click the &ldquo;+&rdquo; icon and select &ldquo;New
                repository&rdquo;.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are GitHub Actions?</AccordionTrigger>
              <AccordionContent>
                GitHub Actions is a CI/CD platform that allows you to automate your build, test, and
                deployment pipeline. You can create workflows that build and test every pull request
                to your repository, or deploy merged pull requests to production.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Multiple Accordion</h2>
          <Accordion type="multiple" defaultValue={['faq-1', 'faq-2']}>
            <AccordionItem value="faq-1">
              <AccordionTrigger>Can I have multiple items open?</AccordionTrigger>
              <AccordionContent>
                Yes! This accordion allows multiple items to be open simultaneously. You can expand
                and collapse items independently of each other.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How does the animation work?</AccordionTrigger>
              <AccordionContent>
                The accordion uses CSS transitions with max-height and opacity changes to create
                smooth expand/collapse animations. The chevron icon also rotates 180 degrees when
                expanded.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes, the accordion follows accessibility best practices including proper ARIA
                attributes (aria-expanded), keyboard navigation support, and focus management with
                visible focus indicators.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Product FAQ with Interactive Form</h2>
          <Accordion type="single">
            <AccordionItem value="pricing">
              <AccordionTrigger>What are your pricing plans?</AccordionTrigger>
              <AccordionContent>
                We offer three pricing tiers: Free (for individuals), Pro ($10/month for small
                teams), and Enterprise (custom pricing for large organizations). Each plan includes
                different features and usage limits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>What support do you provide?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Free users get community support through our forums. Pro users receive email
                    support with 24-hour response time. Enterprise customers get dedicated support
                    with phone and priority assistance.
                  </p>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Submit Feedback</h4>
                    <form onSubmit={handleSave} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                          placeholder="Please describe your issue or feedback..."
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button type="submit" size="sm">
                          Save
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                          Reset
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="integrations">
              <AccordionTrigger>What integrations are available?</AccordionTrigger>
              <AccordionContent>
                We integrate with popular tools including Slack, Discord, Zoom, Google Workspace,
                Microsoft 365, Jira, Trello, and many more. Our API also allows custom integrations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>How do you handle security?</AccordionTrigger>
              <AccordionContent>
                We use industry-standard security practices including SSL encryption, regular
                security audits, two-factor authentication, and comply with SOC 2 Type II and GDPR
                requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Nested Content Example</h2>
          <Accordion type="single">
            <AccordionItem value="features">
              <AccordionTrigger>What features are included?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Our platform includes a comprehensive set of features:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Real-time collaboration tools</li>
                    <li>Advanced analytics and reporting</li>
                    <li>Custom workflow automation</li>
                    <li>Third-party integrations</li>
                    <li>24/7 monitoring and alerts</li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm font-medium text-gray-900 mb-2">Pro Tip:</p>
                    <p className="text-sm text-gray-600">
                      You can customize your dashboard to show only the features you use most
                      frequently.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}
