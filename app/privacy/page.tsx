import { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: `Privacy Policy - ${COMPANY.name}`,
  description: `Privacy policy for ${COMPANY.name}. How we collect, use, and protect your personal information under PIPEDA.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>

          <h2>1. Introduction</h2>
          <p>
            {COMPANY.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting
            your personal information and your right to privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website or use
            our services, in compliance with the Personal Information Protection and Electronic
            Documents Act (PIPEDA).
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide when you:</p>
          <ul>
            <li>Request a quote through our online form</li>
            <li>Contact us by phone, email, or other communication methods</li>
            <li>Schedule a service appointment</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Property address and type</li>
            <li>Description of plumbing issues and uploaded photographs</li>
            <li>Service preferences and scheduling information</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Process and respond to your quote requests</li>
            <li>Schedule and deliver plumbing services</li>
            <li>Communicate with you about your service requests</li>
            <li>Send service confirmations and follow-up communications</li>
            <li>Improve our services and website</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing
            purposes. We may share your information only with:
          </p>
          <ul>
            <li>Service providers who assist in operating our website and business (e.g., email services)</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes
            for which it was collected, or as required by law.
          </p>

          <h2>7. Your Rights Under PIPEDA</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information we hold</li>
            <li>Request correction of inaccurate information</li>
            <li>Withdraw consent for the use of your information</li>
            <li>File a complaint with the Privacy Commissioner of Canada</li>
          </ul>

          <h2>8. Cookies</h2>
          <p>
            Our website may use essential cookies to ensure proper functionality. We do not use
            tracking cookies for advertising purposes.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy rights,
            please contact us at:
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
