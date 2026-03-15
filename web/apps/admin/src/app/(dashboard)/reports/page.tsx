"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Sparkles, Download, Star, Clock } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const dateRangeOptions = ["This Month", "Last Month", "This Quarter", "This Year"] as const;
type DateRange = (typeof dateRangeOptions)[number];

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

const revenueByCategoryData = [
  { category: "Services", amount: 12500000, color: "bg-primary-500" },
  { category: "Products", amount: 2800000, color: "bg-accent-500" },
  { category: "Memberships", amount: 1450000, color: "bg-purple-500" },
  { category: "Accommodations", amount: 850000, color: "bg-green-500" },
];

const paymentMethodsData = [
  { method: "Card", percentage: 65, color: "bg-primary-500" },
  { method: "Bank Transfer", percentage: 25, color: "bg-accent-500" },
  { method: "Cash", percentage: 10, color: "bg-gray-400" },
];

const dailyRevenueData = [
  { date: "Mar 1", services: 420000, products: 85000, total: 505000 },
  { date: "Mar 2", services: 380000, products: 62000, total: 442000 },
  { date: "Mar 3", services: 510000, products: 120000, total: 630000 },
  { date: "Mar 4", services: 290000, products: 45000, total: 335000 },
  { date: "Mar 5", services: 475000, products: 98000, total: 573000 },
  { date: "Mar 6", services: 560000, products: 134000, total: 694000 },
  { date: "Mar 7", services: 440000, products: 72000, total: 512000 },
];

const bookingsByServiceType = [
  { service: "Massage Therapy", count: 485 },
  { service: "Facials", count: 312 },
  { service: "Body Treatments", count: 198 },
  { service: "Hammam", count: 156 },
  { service: "Nail Services", count: 94 },
];

const peakHoursData = [
  { hour: "8AM", mon: 2, tue: 1, wed: 2, thu: 1, fri: 3, sat: 3, sun: 2 },
  { hour: "9AM", mon: 3, tue: 3, wed: 2, thu: 3, fri: 3, sat: 4, sun: 3 },
  { hour: "10AM", mon: 4, tue: 4, wed: 4, thu: 4, fri: 5, sat: 5, sun: 4 },
  { hour: "11AM", mon: 5, tue: 5, wed: 4, thu: 5, fri: 5, sat: 5, sun: 4 },
  { hour: "12PM", mon: 3, tue: 3, wed: 3, thu: 3, fri: 4, sat: 4, sun: 3 },
  { hour: "1PM", mon: 2, tue: 2, wed: 3, thu: 2, fri: 3, sat: 4, sun: 3 },
  { hour: "2PM", mon: 4, tue: 4, wed: 4, thu: 4, fri: 5, sat: 5, sun: 4 },
  { hour: "3PM", mon: 5, tue: 5, wed: 5, thu: 5, fri: 5, sat: 5, sun: 4 },
  { hour: "4PM", mon: 4, tue: 4, wed: 4, thu: 4, fri: 5, sat: 4, sun: 3 },
  { hour: "5PM", mon: 3, tue: 3, wed: 3, thu: 3, fri: 4, sat: 3, sun: 2 },
  { hour: "6PM", mon: 2, tue: 2, wed: 2, thu: 2, fri: 3, sat: 2, sun: 1 },
];

const topCustomersData = [
  { name: "Amina Bello", visits: 24, totalSpent: 1850000, lastVisit: "Mar 12, 2026" },
  { name: "Chidinma Okafor", visits: 18, totalSpent: 1420000, lastVisit: "Mar 14, 2026" },
  { name: "Fatima Abdullahi", visits: 16, totalSpent: 1180000, lastVisit: "Mar 10, 2026" },
  { name: "Grace Eze", visits: 14, totalSpent: 980000, lastVisit: "Mar 8, 2026" },
  { name: "Halima Yusuf", visits: 12, totalSpent: 850000, lastVisit: "Mar 13, 2026" },
];

const customerAcquisitionData = [
  { month: "Oct", newCustomers: 42 },
  { month: "Nov", newCustomers: 56 },
  { month: "Dec", newCustomers: 38 },
  { month: "Jan", newCustomers: 64 },
  { month: "Feb", newCustomers: 71 },
  { month: "Mar", newCustomers: 48 },
];

const staffPerformanceData = [
  { name: "Ngozi Okonkwo", bookings: 142, revenue: 4260000, rating: 4.9, utilization: 92 },
  { name: "Aisha Mohammed", bookings: 128, revenue: 3840000, rating: 4.8, utilization: 88 },
  { name: "Blessing Adekunle", bookings: 115, revenue: 3450000, rating: 4.7, utilization: 84 },
  { name: "Emeka Nwosu", bookings: 98, revenue: 2940000, rating: 4.6, utilization: 78 },
  { name: "Funke Adeyemi", bookings: 87, revenue: 2610000, rating: 4.8, utilization: 72 },
];

function getHeatColor(intensity: number) {
  if (intensity >= 5) return "bg-primary-600 text-white";
  if (intensity >= 4) return "bg-primary-400 text-white";
  if (intensity >= 3) return "bg-primary-200 text-primary-800";
  if (intensity >= 2) return "bg-primary-100 text-primary-700";
  return "bg-gray-100 text-gray-600";
}

export default function ReportsPage() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxCategoryRevenue = Math.max(...revenueByCategoryData.map(d => d.amount));
  const maxBookingsByService = Math.max(...bookingsByServiceType.map(d => d.count));
  const maxAcquisition = Math.max(...customerAcquisitionData.map(d => d.newCustomers));

  const [dateRange, setDateRange] = useState<DateRange>("This Month");
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setIsDownloaded(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDownloaded(false);
    setDownloadDialogOpen(false);
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {dateRangeOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setDateRange(option)}
                  className={dateRange === option ? "bg-primary-50 font-medium" : ""}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setDownloadDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Download Report Dialog */}
      <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select defaultValue="revenue">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                  <SelectItem value="staff">Staff Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateFrom">From</Label>
                <Input id="dateFrom" type="date" defaultValue="2026-03-01" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="dateTo">To</Label>
                <Input id="dateTo" type="date" defaultValue="2026-03-15" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Format</Label>
              <RadioGroup value={reportFormat} onValueChange={setReportFormat} className="flex gap-6 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="format-pdf" />
                  <Label htmlFor="format-pdf" className="font-normal cursor-pointer">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="format-csv" />
                  <Label htmlFor="format-csv" className="font-normal cursor-pointer">CSV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="format-excel" />
                  <Label htmlFor="format-excel" className="font-normal cursor-pointer">Excel</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDownloadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport} disabled={isGenerating || isDownloaded}>
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Generating...
                </>
              ) : isDownloaded ? (
                "Downloaded! \u2713"
              ) : (
                "Generate & Download"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="overview" className="flex-shrink-0">Overview</TabsTrigger>
          <TabsTrigger value="revenue" className="flex-shrink-0">Revenue</TabsTrigger>
          <TabsTrigger value="bookings" className="flex-shrink-0">Bookings</TabsTrigger>
          <TabsTrigger value="customers" className="flex-shrink-0">Customers</TabsTrigger>
          <TabsTrigger value="staff" className="flex-shrink-0">Staff Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
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
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByCategoryData.map((item) => (
                    <div key={item.category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-gray-600">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${(item.amount / maxCategoryRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(revenueByCategoryData.reduce((sum, d) => sum + d.amount, 0))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Stacked bar */}
                  <div className="flex h-8 rounded-full overflow-hidden">
                    {paymentMethodsData.map((method) => (
                      <div
                        key={method.method}
                        className={`${method.color} flex items-center justify-center`}
                        style={{ width: `${method.percentage}%` }}
                      >
                        <span className="text-xs text-white font-medium">{method.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="space-y-3">
                    {paymentMethodsData.map((method) => (
                      <div key={method.method} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${method.color}`} />
                          <span className="text-sm font-medium">{method.method}</span>
                        </div>
                        <span className="text-sm text-gray-600">{method.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Revenue Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue - March 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Services</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Products</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyRevenueData.map((day) => (
                      <tr key={day.date} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{day.date}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(day.services)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(day.products)}</td>
                        <td className="py-3 px-4 text-right font-semibold">{formatCurrency(day.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200">
                      <td className="py-3 px-4 font-bold">Total</td>
                      <td className="py-3 px-4 text-right font-bold">
                        {formatCurrency(dailyRevenueData.reduce((sum, d) => sum + d.services, 0))}
                      </td>
                      <td className="py-3 px-4 text-right font-bold">
                        {formatCurrency(dailyRevenueData.reduce((sum, d) => sum + d.products, 0))}
                      </td>
                      <td className="py-3 px-4 text-right font-bold">
                        {formatCurrency(dailyRevenueData.reduce((sum, d) => sum + d.total, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="mt-6 space-y-6">
          {/* Booking Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-foreground-muted">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-foreground-muted">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">1,089</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-foreground-muted">Cancelled</p>
                <p className="text-3xl font-bold text-red-600 mt-1">98</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-foreground-muted">No-shows</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">58</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bookings by Service Type */}
            <Card>
              <CardHeader>
                <CardTitle>Bookings by Service Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingsByServiceType.map((item) => (
                    <div key={item.service} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.service}</span>
                        <span className="text-gray-600">{item.count} bookings</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                          style={{ width: `${(item.count / maxBookingsByService) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Peak Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="py-1 px-1 text-left font-medium text-gray-500 w-12"></th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Mon</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Tue</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Wed</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Thu</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Fri</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Sat</th>
                        <th className="py-1 px-1 text-center font-medium text-gray-500">Sun</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peakHoursData.map((row) => (
                        <tr key={row.hour}>
                          <td className="py-1 px-1 text-gray-500 font-medium">{row.hour}</td>
                          {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map(
                            (val, i) => (
                              <td key={i} className="py-1 px-1">
                                <div
                                  className={`w-full h-7 rounded flex items-center justify-center font-medium ${getHeatColor(val)}`}
                                >
                                  {val}
                                </div>
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 justify-end">
                    <span>Low</span>
                    <div className="flex gap-0.5">
                      <div className="w-5 h-3 rounded bg-gray-100" />
                      <div className="w-5 h-3 rounded bg-primary-100" />
                      <div className="w-5 h-3 rounded bg-primary-200" />
                      <div className="w-5 h-3 rounded bg-primary-400" />
                      <div className="w-5 h-3 rounded bg-primary-600" />
                    </div>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="mt-6 space-y-6">
          {/* New vs Returning */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">New Customers</p>
                    <p className="text-3xl font-bold text-primary-600 mt-1">186</p>
                    <p className="text-sm text-gray-500 mt-1">32% of total</p>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: "32%" }} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Returning Customers</p>
                    <p className="text-3xl font-bold text-accent-600 mt-1">396</p>
                    <p className="text-sm text-gray-500 mt-1">68% of total</p>
                  </div>
                  <div className="p-3 bg-accent-100 rounded-xl">
                    <Users className="h-6 w-6 text-accent-600" />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: "68%" }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Visits</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Total Spent</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomersData.map((customer) => (
                      <tr key={customer.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4 text-center">{customer.visits}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(customer.totalSpent)}</td>
                        <td className="py-3 px-4 text-right text-gray-500">{customer.lastVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Customer Acquisition Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {customerAcquisitionData.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">{item.newCustomers}</span>
                    <div
                      className="w-full bg-gradient-to-t from-accent-500 to-accent-400 rounded-t-md transition-all"
                      style={{ height: `${(item.newCustomers / maxAcquisition) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Performance Tab */}
        <TabsContent value="staff" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Staff Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Bookings</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Revenue Generated</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Rating</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffPerformanceData.map((staff) => (
                      <tr key={staff.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-sm">
                              {staff.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="font-medium">{staff.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">{staff.bookings}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(staff.revenue)}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{staff.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  staff.utilization >= 85
                                    ? "bg-green-500"
                                    : staff.utilization >= 70
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${staff.utilization}%` }}
                              />
                            </div>
                            <span className="text-sm">{staff.utilization}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
