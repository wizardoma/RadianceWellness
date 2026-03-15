"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, Separator } from "@radiance/ui";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 sm:p-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-foreground-muted mb-8">Last updated: March 2026</p>

          <Separator className="mb-8" />

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Radiance Wellness Center website, mobile applications, or
                any of our services, you agree to be bound by these Terms of Service. If you do not
                agree with any part of these terms, you may not access or use our services. These
                terms apply to all visitors, users, clients, and members of Radiance Wellness
                Center.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                2. Services
              </h2>
              <p className="mb-3">
                Radiance Wellness Center provides spa, wellness, and accommodation services. By
                booking any service through our platform, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Booking:</strong> All bookings are subject to availability. A booking is
                  confirmed only after you receive a confirmation email or notification through our
                  platform.
                </li>
                <li>
                  <strong>Cancellation Policy:</strong> Cancellations must be made at least 24 hours
                  before the scheduled appointment time. Cancellations made less than 24 hours in
                  advance may be subject to a cancellation fee of up to 50% of the service cost.
                </li>
                <li>
                  <strong>No-Show Policy:</strong> Clients who fail to show up for a scheduled
                  appointment without prior notice will be charged the full service fee. Repeated
                  no-shows may result in a temporary suspension of booking privileges.
                </li>
                <li>
                  <strong>Late Arrivals:</strong> If you arrive late for your appointment, your
                  session may be shortened to accommodate subsequent bookings. The full fee will
                  still apply.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                3. Payments
              </h2>
              <p className="mb-3">
                All payments are processed securely through Paystack, our authorized payment
                processor. By making a payment, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All prices are displayed in Nigerian Naira (NGN) and are inclusive of applicable
                  taxes unless otherwise stated.
                </li>
                <li>
                  Payment is required at the time of booking to secure your appointment or
                  accommodation.
                </li>
                <li>
                  <strong>Refund Policy:</strong> Refund requests must be submitted within 48 hours
                  of the original transaction. Approved refunds will be processed to the original
                  payment method within 5-10 business days. Services already rendered are
                  non-refundable.
                </li>
                <li>
                  We reserve the right to modify our pricing at any time. Price changes will not
                  affect existing confirmed bookings.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                4. Accounts
              </h2>
              <p className="mb-3">
                When you create an account with Radiance Wellness Center, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Providing accurate, current, and complete information during registration and
                  keeping your profile up to date.
                </li>
                <li>
                  Maintaining the security and confidentiality of your account credentials. You
                  should not share your password with anyone.
                </li>
                <li>
                  All activities that occur under your account. You must notify us immediately of any
                  unauthorized use of your account.
                </li>
                <li>
                  We reserve the right to suspend or terminate accounts that violate these terms or
                  engage in fraudulent activity.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                5. Memberships
              </h2>
              <p className="mb-3">
                Radiance Wellness Center offers membership plans with exclusive benefits:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Auto-Renewal:</strong> Memberships are set to auto-renew at the end of
                  each billing cycle. You will be charged the applicable membership fee
                  automatically using your saved payment method.
                </li>
                <li>
                  <strong>Cancellation:</strong> You may cancel your membership at any time through
                  your account settings. Cancellation will take effect at the end of the current
                  billing period. No pro-rated refunds will be issued for partial months.
                </li>
                <li>
                  Membership benefits are non-transferable and are for the exclusive use of the
                  registered member.
                </li>
                <li>
                  We reserve the right to modify membership tiers, pricing, and benefits with 30
                  days advance notice to existing members.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                6. Gift Cards
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Gift cards purchased through Radiance Wellness Center are non-refundable and
                  cannot be exchanged for cash.
                </li>
                <li>
                  Gift cards are valid for 12 months from the date of purchase. Any unused balance
                  after the validity period will expire.
                </li>
                <li>
                  Gift cards can be applied to any services or accommodations offered by Radiance
                  Wellness Center.
                </li>
                <li>
                  Lost or stolen gift cards will not be replaced. Please treat your gift card like
                  cash.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                7. Privacy
              </h2>
              <p>
                Your privacy is important to us. Our collection, use, and protection of your
                personal information is governed by our{" "}
                <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
                , which forms an integral part of these Terms of Service. By using our services, you
                consent to the practices described in our Privacy Policy.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                8. Limitation of Liability
              </h2>
              <p className="mb-3">
                To the fullest extent permitted by applicable law:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Radiance Wellness Center shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages arising from your use of our services.
                </li>
                <li>
                  Our total liability for any claim arising from or related to our services shall
                  not exceed the amount you paid for the specific service giving rise to the claim.
                </li>
                <li>
                  We do not guarantee specific health outcomes from any of our wellness services.
                  Clients with medical conditions should consult their healthcare provider before
                  booking treatments.
                </li>
                <li>
                  We are not responsible for any personal items lost or damaged on our premises.
                </li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">
                9. Contact Information
              </h2>
              <p className="mb-3">
                If you have any questions or concerns about these Terms of Service, please contact
                us:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
                <p className="font-medium text-gray-900">Radiance Wellness Center</p>
                <p>123 Wellness Boulevard, Maitama District</p>
                <p>Abuja, FCT, Nigeria</p>
                <p>Email: legal@radiancewellness.ng</p>
                <p>Phone: +234 800 RADIANCE (723-4262)</p>
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
