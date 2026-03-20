"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Clock } from "lucide-react";
import { Button, Input, Label, Card, CardContent } from "@radiance/ui";
import { AuthApiClient } from "@/infrastructure/api/auth.client";
import { useAuthStore } from "@/application/auth/auth.store";
import { useUserStore } from "@/application/user/user.store";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const fetchProfile = useUserStore((s) => s.fetchProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const expired = localStorage.getItem("radiance_session_expired");
    if (expired) {
      setSessionExpired(true);
      localStorage.removeItem("radiance_session_expired");
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => setSessionExpired(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await AuthApiClient.login(formData.email, formData.password);

      if (result.isError) {
        setError(result.errorMessage || "Login failed. Please try again.");
        return;
      }

      if (result.data) {
        setAuth(result.data);
        await fetchProfile();
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {sessionExpired && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Clock className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">Your session has expired. Please sign in again.</p>
          <button onClick={() => setSessionExpired(false)} className="ml-auto text-amber-600 hover:text-amber-800 text-sm">
            &times;
          </button>
        </div>
      )}
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900">
            Sign In
          </h2>
          <p className="text-sm text-foreground-secondary mt-1">
            Access the admin portal
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="admin@radiancewellness.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (error) setError(null);
                }}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (error) setError(null);
                }}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
  );
}
