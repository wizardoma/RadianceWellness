import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Policy",
  description:
    "Understand our booking, cancellation, and rescheduling policies at Radiance Wellness Spa.",
};

export default function BookingPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Booking Policy
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
              At Radiance Wellness Spa, we want every visit to be seamless and
              enjoyable. Please review our booking policy below to understand how
              reservations, cancellations, and rescheduling work. By making a
              booking with us, you agree to the terms outlined in this policy.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              1. Booking & Confirmation
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Bookings can be made through our website, mobile app, by phone
              (+234 803 311 8603), via WhatsApp, or by emailing
              bookings@radiancewellness.com. We recommend booking at least 24
              hours in advance to ensure availability, especially during
              weekends and peak periods.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Once your booking is confirmed, you will receive a confirmation
              email and/or SMS with your appointment details, including the date,
              time, service, and assigned therapist (where applicable). Please
              review your confirmation carefully and contact us immediately if
              any details are incorrect.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              A booking is only considered confirmed once you receive an official
              confirmation from us. Submitting a booking request does not
              guarantee availability.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              2. Cancellation Policy
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We understand that plans change. We kindly request at least{" "}
              <strong>24 hours notice</strong> for all cancellations. Our
              cancellation terms are as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
              <li>
                <strong>More than 24 hours before appointment:</strong> Full
                refund or free rescheduling, no cancellation fee
              </li>
              <li>
                <strong>12 to 24 hours before appointment:</strong> 25%
                cancellation fee applies; the remainder will be refunded or
                credited to your account
              </li>
              <li>
                <strong>Less than 12 hours before appointment:</strong> 50%
                cancellation fee applies
              </li>
              <li>
                <strong>No-show (no cancellation):</strong> Full charge of the
                booked service amount
              </li>
            </ul>
            <p className="text-foreground-secondary leading-relaxed mt-4">
              Cancellations can be made through your online account, by phone, or
              by emailing us. Cancellation fees may be waived in cases of
              documented emergencies at the discretion of our management.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              3. Rescheduling
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We are happy to reschedule your appointment free of charge if you
              provide at least 24 hours notice. Rescheduling requests made within
              24 hours of the appointment are treated as a cancellation and
              re-booking, and the standard cancellation fees outlined above may
              apply.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              You may reschedule up to two times per booking. After the second
              reschedule, the booking will be treated as a cancellation if you
              need to change the date or time again. Rescheduled appointments are
              subject to availability.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              4. Late Arrivals
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We ask all guests to arrive at least{" "}
              <strong>15 minutes before</strong> their scheduled appointment to
              allow time for check-in, changing, and relaxation before your
              treatment begins.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              If you arrive late, we will do our best to accommodate you.
              However, your session may be shortened to avoid delays for
              subsequent guests. The full service charge will still apply
              regardless of the shortened duration. Arrivals more than 20
              minutes late may result in the booking being treated as a no-show.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              5. No-Show Policy
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              If you fail to arrive for your scheduled appointment without prior
              notice, this will be recorded as a no-show. No-shows are charged
              the full service amount. Repeated no-shows (3 or more within a
              6-month period) may result in the requirement to prepay for future
              bookings.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              6. Group Bookings
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Group bookings (5 or more guests) require a{" "}
              <strong>30% non-refundable deposit</strong> at the time of booking
              to secure the reservation. The remaining balance is due 48 hours
              before the scheduled date.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Group cancellations require at least 72 hours notice. Cancellations
              within 72 hours will forfeit the deposit. Changes to group size
              (reducing participants) must be communicated at least 48 hours
              before the booking. We offer special group packages for bridal
              parties, corporate wellness days, birthday celebrations, and other
              special events - please{" "}
              <Link href="/contact">contact us</Link> for custom quotes.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">
              7. Special Requests
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              We welcome special requests and will do our best to accommodate
              them. These may include therapist preferences, specific room
              requests, dietary requirements (for retreat packages), or
              accessibility needs. Please communicate any special requests at the
              time of booking.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              While we strive to fulfill all requests, they are subject to
              availability and cannot be guaranteed. We are committed to
              providing accessible services and will work with you to ensure a
              comfortable experience regardless of any physical limitations.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              If you have any allergies, medical conditions, or health concerns
              that may affect your treatment, please inform us during booking or
              before your session begins. This helps our therapists customize
              your experience safely and effectively.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-foreground-muted">
                This booking policy is subject to change. Any updates will be
                posted on our website. Existing confirmed bookings will be
                honored under the policy in effect at the time of booking. For
                questions about this policy, please{" "}
                <Link href="/contact">contact us</Link> or call +234 800 123
                4567.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
