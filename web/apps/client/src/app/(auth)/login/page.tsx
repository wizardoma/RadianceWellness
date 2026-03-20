"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@radiance/ui";
import { AuthApiClient } from "@/infrastructure/api/auth.client";
import { useAuthStore } from "@/application/auth/auth.store";
import { useUserStore } from "@/application/user/user.store";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const fetchProfile = useUserStore((s) => s.fetchProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const [socialProvider, setSocialProvider] = useState("");

  // Check for session expired flag
  useEffect(() => {
    const expired = localStorage.getItem("radiance_session_expired");
    if (expired === "true") {
      setSessionExpired(true);
      localStorage.removeItem("radiance_session_expired");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await AuthApiClient.login(formData.email, formData.password);

    if (result.isError) {
      setError(result.errorMessage);
      setIsLoading(false);
      return;
    }

    if (result.data) {
      setAuth(result.data);
      await fetchProfile();
      router.push("/dashboard");
    }
  };

  const handleSocialLogin = (provider: string) => {
    setSocialProvider(provider);
    setSocialDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Welcome back
        </h1>
        <p className="text-foreground-secondary">
          Sign in to manage your bookings and wellness journey
        </p>
      </div>

      {/* Registration success message */}
      {searchParams.get("registered") && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Registration successful</p>
            <p className="text-sm text-green-700">{searchParams.get("registered")}</p>
          </div>
        </div>
      )}

      {/* Session expired toast */}
      {sessionExpired && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Session expired</p>
            <p className="text-sm text-amber-700">Please sign in again to continue.</p>
          </div>
        </div>
      )}

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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
          />
          <Label htmlFor="remember" className="ml-2 text-sm font-normal cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-foreground-muted">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => handleSocialLogin("Google")}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => handleSocialLogin("Apple")}
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Apple
        </Button>
      </div>

      {/* Social Login Coming Soon Dialog */}
      <Dialog open={socialDialogOpen} onOpenChange={setSocialDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              {socialProvider} sign-in is not yet available. We are working on integrating social login and it will be available soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSocialDialogOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="mt-8 text-center text-sm text-foreground-secondary">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
          Create account
        </Link>
      </p>
    </div>
  );
}
