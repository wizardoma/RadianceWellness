"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Button, Input, Label } from "@radiance/ui";
import { AuthApiClient } from "@/infrastructure/api/auth.client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await AuthApiClient.forgotPassword(email);

    setIsLoading(false);

    if (result.isError) {
      setError(result.errorMessage);
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h1>
        <p className="text-foreground-secondary mb-6">
          We've sent a password reset link to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
        <p className="text-sm text-foreground-muted mb-8">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-primary-600 hover:underline"
          >
            try another email address
          </button>
        </p>
        <Button asChild className="w-full">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-foreground-secondary hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to sign in
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Forgot your password?
        </h1>
        <p className="text-foreground-secondary">
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Sending reset link...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-foreground-secondary">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
