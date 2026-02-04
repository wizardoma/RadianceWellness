"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Shield, Users, ArrowRight } from "lucide-react";
import { Button, Input, Label, Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent } from "@radiance/ui";

type UserRole = "admin" | "staff";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<UserRole>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Store role in localStorage for demo purposes
    localStorage.setItem("userRole", activeTab);
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl">
      <CardContent className="p-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UserRole)}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-gray-900">
                Admin Login
              </h2>
              <p className="text-sm text-foreground-secondary mt-1">
                Full access to manage the wellness center
              </p>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-gray-900">
                Staff Login
              </h2>
              <p className="text-sm text-foreground-secondary mt-1">
                Access your schedule and check-in customers
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder={activeTab === "admin" ? "admin@radiancewellness.com" : "staff@radiancewellness.com"}
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                Sign in as {activeTab === "admin" ? "Admin" : "Staff"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Demo hint */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700 text-center">
            <strong>Demo Mode:</strong> Enter any credentials to sign in as {activeTab}
          </p>
        </div>

        {/* Quick access cards */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setActiveTab("admin");
              setFormData({ email: "admin@demo.com", password: "demo123" });
            }}
            className="p-3 text-left border border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Shield className="h-5 w-5 text-primary-600 mb-1" />
            <p className="text-xs font-medium">Demo Admin</p>
            <p className="text-xs text-foreground-muted">Full access</p>
          </button>
          <button
            onClick={() => {
              setActiveTab("staff");
              setFormData({ email: "staff@demo.com", password: "demo123" });
            }}
            className="p-3 text-left border border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5 text-accent-600 mb-1" />
            <p className="text-xs font-medium">Demo Staff</p>
            <p className="text-xs text-foreground-muted">Limited access</p>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
