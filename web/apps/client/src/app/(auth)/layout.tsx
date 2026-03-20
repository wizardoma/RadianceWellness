"use client";

import Link from "next/link";
import { LogoIcon } from "@radiance/ui";
import { useRedirectIfAuthenticated } from "@/application/hooks/useAuthGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ready = useRedirectIfAuthenticated();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-1">
              <LogoIcon size={40} />
            </div>
            <span className="font-display text-2xl font-semibold text-white">
              Radiance
            </span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            Your Wellness Journey<br />
            <span className="text-accent-300">Starts Here</span>
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Book premium spa treatments, manage your appointments, and enjoy exclusive
            member benefits all in one place.
          </p>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-primary-200 text-sm">Premium Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5,000+</div>
              <div className="text-primary-200 text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9</div>
              <div className="text-primary-200 text-sm">Rating</div>
            </div>
          </div>
        </div>

        <div className="text-primary-200 text-sm">
          &copy; {new Date().getFullYear()} Radiance Wellness Spa
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <LogoIcon size={40} />
              <span className="font-display text-xl font-semibold text-primary-700">
                Radiance
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
