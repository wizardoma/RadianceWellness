"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, Separator } from "@radiance/ui";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-foreground-muted mb-8">Last updated: March 2026</p>

          <Separator className="mb-8" />

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              At Radiance Wellness Spa, we are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we
              collect, use, store, and protect your data when you use our website, applications, and
              services.
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                We collect the following types of personal information when you interact with our
                services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Details:</strong> Full name, email address, phone number, and
                  date of birth provided during account registration.
                </li>
                <li>
                  <strong>Booking History:</strong> Records of services booked, appointment dates
                  and times, service preferences, and therapist preferences.
                </li>
                <li>
                  <strong>Health Information:</strong> Any health-related information you voluntarily
                  provide to help us customize your wellness experience (e.g., allergies, medical
                  conditions, or treatment preferences).
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our website
                  and app, including pages visited, features used, and device information.
                </li>
                <li>
                  <strong>Communication Records:</strong> Records of correspondence between you and
                  our team, including customer support inquiries.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Booking Management:</strong> To process, confirm, and manage your service
                  bookings and accommodation reservations.
                </li>
                <li>
                  <strong>Communications:</strong> To send booking confirmations, appointment
                  reminders, service updates, and respond to your inquiries.
                </li>
                <li>
                  <strong>Personalization:</strong> To tailor our services and recommendations based
                  on your preferences and booking history.
                </li>
                <li>
                  <strong>Service Improvements:</strong> To analyze usage patterns and feedback to
                  improve our services, website, and overall client experience.
                </li>
                <li>
                  <strong>Marketing:</strong> With your consent, to send promotional offers,
                  wellness tips, and information about new services. You can opt out at any time.
                </li>
                <li>
                  <strong>Membership Management:</strong> To manage your membership benefits,
                  rewards points, and subscription renewals.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                3. Payment Information
              </h2>
              <p>
                All payment transactions are processed securely through Paystack, our authorized
                third-party payment processor. Radiance Wellness Spa does not store, process, or
                have access to your full credit card or debit card details. Paystack handles all
                payment data in compliance with PCI DSS (Payment Card Industry Data Security
                Standards). We only retain a record of the transaction amount, date, and a masked
                reference for your booking records.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                4. Data Sharing
              </h2>
              <p className="mb-3">
                We respect your privacy and are committed to transparency about how your data is
                shared:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>We do not sell your data.</strong> Your personal information is never sold,
                  rented, or traded to third parties for marketing purposes.
                </li>
                <li>
                  <strong>Payment Processors:</strong> We share necessary transaction data with
                  Paystack to process your payments securely.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share limited information with trusted
                  service providers who assist in operating our platform (e.g., email delivery,
                  analytics), under strict confidentiality agreements.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required
                  by law, court order, or government regulation, or if necessary to protect the
                  rights and safety of Radiance Wellness Spa and its clients.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                5. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as your account is active or as
                needed to provide you with our services. Booking history and transaction records are
                retained for a period of 3 years for accounting and legal compliance purposes. If
                you request account deletion, we will remove your personal data within 30 days,
                except for information we are legally required to retain. Anonymized and aggregated
                data may be retained indefinitely for analytical purposes.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                6. Your Rights
              </h2>
              <p className="mb-3">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access:</strong> You can request a copy of the personal data we hold about
                  you at any time through your account settings or by contacting us.
                </li>
                <li>
                  <strong>Correction:</strong> You can update or correct your personal information
                  through your profile settings, or by contacting our support team.
                </li>
                <li>
                  <strong>Deletion:</strong> You can request the deletion of your account and
                  personal data. We will process your request within 30 days, subject to legal
                  retention requirements.
                </li>
                <li>
                  <strong>Data Portability:</strong> You can request a machine-readable export of
                  your personal data.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can unsubscribe from marketing communications at any
                  time using the unsubscribe link in our emails or through your account settings.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                7. Cookies
              </h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing
                experience. Cookies help us remember your preferences, understand how you use our
                site, and provide relevant content. Essential cookies are required for the website to
                function properly. Analytics cookies help us understand site usage and improve our
                services. You can manage your cookie preferences through your browser settings. Note
                that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                8. Contact
              </h2>
              <p className="mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                how we handle your personal data, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                <p className="font-medium text-gray-900">Radiance Wellness Spa</p>
                <p>123 Wellness Boulevard, Maitama District</p>
                <p>Abuja, FCT, Nigeria</p>
                <p>Email: privacy@radiancewellness.ng</p>
                <p>Phone: +234 800 RADIANCE (723-4262)</p>
                <p>Data Protection Officer: dpo@radiancewellness.ng</p>
              </div>
            </section>
          </div>

          <Separator className="my-8" />

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/register">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
