import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Radiance Wellness Center collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-200 text-lg">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-gray prose-headings:font-display prose-headings:text-primary-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
            <p className="text-lg text-foreground-secondary leading-relaxed">
              At Radiance Wellness Center, we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your data when you use our services, website, and mobile
              application.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>Create an account or complete your profile</li>
              <li>Book appointments or purchase services</li>
              <li>Subscribe to a membership plan</li>
              <li>Purchase or redeem gift cards</li>
              <li>Contact us via email, phone, or our contact form</li>
              <li>Subscribe to our newsletter</li>
              <li>Leave reviews or provide feedback</li>
            </ul>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              This information may include your name, email address, phone
              number, date of birth, payment information, health and wellness
              preferences, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>Process and manage your bookings and appointments</li>
              <li>Manage your membership and account</li>
              <li>Process payments and send transaction confirmations</li>
              <li>
                Personalize your wellness experience based on your preferences
              </li>
              <li>
                Send you appointment reminders, service updates, and promotional
                communications
              </li>
              <li>Improve our services and develop new offerings</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>
                Comply with legal obligations and protect our rights
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              3. Payment Data
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              All online payments are processed securely through Paystack, a
              PCI-DSS compliant payment processor. We do not store your full
              credit card or debit card numbers on our servers. Paystack handles
              all payment data in accordance with their own privacy policy and
              industry-standard security protocols. We only retain a masked
              version of your card details (last 4 digits) and transaction
              references for record-keeping purposes.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              4. Information Sharing
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following limited
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>
                <strong>Service providers:</strong> With trusted third-party
                vendors who assist us in operating our business (payment
                processors, email services, analytics)
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law, court
                order, or governmental regulation
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with a merger,
                acquisition, or sale of assets
              </li>
              <li>
                <strong>With your consent:</strong> When you have given us
                explicit permission to share your information
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              5. Data Retention
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              policy. Typically, we retain account data for the duration of your
              active relationship with us plus an additional 3 years. Transaction
              records are retained for 7 years in accordance with Nigerian tax
              regulations. You may request deletion of your data at any time,
              subject to legal retention requirements.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              6. Your Rights
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              In accordance with the Nigeria Data Protection Regulation (NDPR),
              you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the
              details provided below.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              7. Cookies & Tracking
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>
                <strong>Essential cookies:</strong> Required for the website to
                function properly (authentication, session management)
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how
                visitors interact with our website to improve our services
              </li>
              <li>
                <strong>Marketing cookies:</strong> Used to deliver relevant
                advertisements and measure campaign effectiveness
              </li>
            </ul>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              You can manage your cookie preferences through your browser
              settings. Please note that disabling certain cookies may affect the
              functionality of our website.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              8. Contact Us
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none pl-0 space-y-2 text-foreground-secondary mt-4">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@radiancewellness.com">
                  privacy@radiancewellness.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+2348001234567">+234 800 123 4567</a>
              </li>
              <li>
                <strong>Address:</strong> 1 Setif Close, Adzope Crescent, Off
                Kumasi Crescent, Wuse 2, Abuja, Nigeria
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-foreground-muted">
                This privacy policy is subject to change. We will notify you of
                any material changes by posting the updated policy on our website
                and updating the "Last updated" date. Your continued use of our
                services after changes are posted constitutes your acceptance of
                the revised policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
