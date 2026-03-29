import { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: `Terms of Service - ${COMPANY.name}`,
  description: `Terms of service for ${COMPANY.name}. Conditions governing the use of our website and plumbing services.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the {COMPANY.name} website and services, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use our
            website or services.
          </p>

          <h2>2. Services</h2>
          <p>
            {COMPANY.name} provides professional plumbing services in the Greater Toronto Area.
            Services include but are not limited to: emergency plumbing repairs, bathroom and kitchen
            plumbing, drain cleaning, fixture installation, and general plumbing maintenance.
          </p>

          <h2>3. Quotes and Pricing</h2>
          <ul>
            <li>Online quotes are estimates based on the information you provide.</li>
            <li>Final pricing may vary based on the actual scope of work and on-site assessment.</li>
            <li>Quotes are valid for 30 days from the date of issuance.</li>
            <li>Additional work beyond the original scope will be quoted separately before proceeding.</li>
          </ul>

          <h2>4. Scheduling and Cancellation</h2>
          <ul>
            <li>Service appointments are subject to availability.</li>
            <li>We ask for at least 24 hours notice for cancellations or rescheduling.</li>
            <li>Emergency services are available 24/7 and may incur additional charges.</li>
          </ul>

          <h2>5. Payment</h2>
          <p>
            Payment terms will be communicated at the time of service. We accept various forms of
            payment as discussed with our team.
          </p>

          <h2>6. Warranty</h2>
          <p>
            We stand behind the quality of our work. Specific warranty terms will be provided with
            each service and may vary depending on the type of work performed.
          </p>

          <h2>7. Liability</h2>
          <p>
            {COMPANY.name} maintains appropriate insurance coverage. Our liability is limited to the
            scope of services provided. We are not liable for pre-existing conditions or issues not
            related to our work.
          </p>

          <h2>8. Website Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any unlawful purpose</li>
            <li>Submit false or misleading information</li>
            <li>Attempt to interfere with the website&apos;s operation</li>
            <li>Use automated systems to access the website without permission</li>
          </ul>

          <h2>9. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Changes will be posted on this page with an
            updated revision date. Continued use of our services constitutes acceptance of the
            revised terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at:
          </p>
          <ul>
            <li>Email: {COMPANY.email}</li>
            <li>Phone: {COMPANY.phoneFormatted}</li>
            <li>Address: {COMPANY.address.full}</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
