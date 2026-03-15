import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using Radiance Wellness Spa services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
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
              Welcome to Radiance Wellness Spa. These Terms of Service
              ("Terms") govern your use of our website, mobile application,
              and services. By accessing or using our services, you agree to be
              bound by these Terms. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              By creating an account, making a booking, purchasing services, or
              otherwise using Radiance Wellness Spa's services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms and our{" "}
              <Link href="/policies/privacy">Privacy Policy</Link>. If you do
              not agree to these Terms, please do not use our services.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              You must be at least 18 years of age to use our services
              independently. Guests under 18 must be accompanied by a parent or
              legal guardian. Certain services may have additional age
              restrictions.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              2. Our Services
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Radiance Wellness Spa provides spa, wellness, fitness, beauty,
              and accommodation services at our facility in Wuse 2, Abuja,
              Nigeria. Service descriptions, availability, and pricing are
              subject to change without prior notice. We reserve the right to
              modify, suspend, or discontinue any service at our discretion.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              While we strive to provide accurate descriptions and imagery of
              our services, actual experiences may vary. We do not guarantee
              specific health outcomes from any of our wellness services.
              Clients with medical conditions should consult their healthcare
              provider before using our services.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              3. Payments & Pricing
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              All prices are listed in Nigerian Naira (NGN) and are inclusive of
              applicable taxes unless otherwise stated. We reserve the right to
              update pricing at any time. Price changes will not affect existing
              confirmed bookings.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Payments can be made via cash, debit/credit cards, bank transfer,
              or online through Paystack. Online payments are subject to
              Paystack's terms of service. Full payment is required at the time
              of service unless otherwise arranged through a membership or
              package plan.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              For group bookings and accommodation reservations, a deposit of
              30% is required at the time of booking. The remaining balance is
              due upon arrival or before the service date.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              4. Accounts
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              When you create an account with us, you are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. You agree to
              provide accurate, current, and complete information during
              registration and to update your information as needed.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate
              these Terms, provide false information, or engage in abusive
              behavior toward our staff or other guests. You may delete your
              account at any time by contacting our support team.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              5. Memberships
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Membership plans are billed on a recurring monthly basis.
              Membership benefits and pricing vary by tier (Serenity, Harmony,
              Radiance Elite). Detailed plan information is available on our
              pricing page.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Memberships are personal and non-transferable. You may upgrade,
              downgrade, or cancel your membership at any time. Cancellations
              require 30 days notice before the next billing cycle. Membership
              benefits remain active until the end of the current paid period.
              No refunds are issued for partial billing periods.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              6. Gift Cards
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Gift cards purchased from Radiance Wellness Spa are
              non-refundable and cannot be exchanged for cash. Gift cards are
              valid for 12 months from the date of purchase. The balance can be
              used toward any service or product at our facility. Gift cards may
              be transferred to another person but cannot be resold. Lost or
              stolen gift cards will not be replaced.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Radiance Wellness Spa and its staff shall not be held liable for
              any indirect, incidental, consequential, or punitive damages
              arising from your use of our services. Our total liability for any
              claim shall not exceed the amount you paid for the specific service
              giving rise to the claim.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              We are not responsible for any loss, damage, or theft of personal
              belongings brought onto our premises. Lockers are provided for your
              convenience, and we encourage guests to secure their valuables. By
              participating in fitness, wellness, or spa activities, you
              acknowledge the inherent risks and assume responsibility for your
              own health and safety.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              8. Contact
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              If you have any questions or concerns about these Terms of Service,
              please contact us:
            </p>
            <ul className="list-none pl-0 space-y-2 text-foreground-secondary mt-4">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:legal@radiancewellness.com">
                  legal@radiancewellness.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+2348033118603">+234 803 311 8603</a>
              </li>
              <li>
                <strong>Address:</strong> 1 Setif Close, Adzope Crescent, Off
                Kumasi Crescent, Wuse 2, Abuja, Nigeria
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-foreground-muted">
                These Terms of Service are governed by and construed in
                accordance with the laws of the Federal Republic of Nigeria. Any
                disputes arising from these Terms shall be resolved in the courts
                of the Federal Capital Territory, Abuja. We reserve the right to
                update these Terms at any time. Continued use of our services
                constitutes acceptance of updated Terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
