"use client";

import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Sparkles } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const revenueData = [
  { month: "Jan", revenue: 2450000 },
  { month: "Feb", revenue: 2680000 },
  { month: "Mar", revenue: 2920000 },
  { month: "Apr", revenue: 2750000 },
  { month: "May", revenue: 3100000 },
  { month: "Jun", revenue: 3350000 },
];

const topServices = [
  { name: "Swedish Massage", bookings: 245, revenue: 6125000 },
  { name: "Deep Tissue Massage", bookings: 198, revenue: 7524000 },
  { name: "Hammam Experience", bookings: 156, revenue: 3120000 },
  { name: "Classic Facial", bookings: 134, revenue: 2412000 },
  { name: "Hot Stone Massage", bookings: 112, revenue: 3920000 },
];

export default function ReportsPage() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-foreground-secondary mt-1">
            Insights into your business performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button>
            Download Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(17250000)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last period
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last period
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">New Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">186</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last period
                </p>
              </div>
              <div className="p-3 bg-accent-100 rounded-xl">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Avg. Booking Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(28500)}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -3% from last period
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-gray-600">{data.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    >
                      <span className="text-xs text-white font-medium">
                        {formatCurrency(data.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.bookings} bookings</p>
                    </div>
                  </div>
                  <span className="font-semibold text-primary-600">
                    {formatCurrency(service.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
