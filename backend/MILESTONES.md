# Radiance Wellness Spa Backend — Development Milestones

## Overview

Backend development for Radiance Wellness Spa, organized into 12 milestones. Each milestone builds on the previous and produces testable, working functionality.

**Tech Stack:** Spring Boot 4, Java 21, PostgreSQL 16, Redis, JWT Authentication, Paystack Payment Gateway
**Port:** 8080 | **Database:** radiance_wellness
**Base Package:** `com.zaidom.radiancewellness`

---

## Milestone 1: Bootstrap

**Goal:** Initialize the Spring Boot 4 project with all infrastructure, configuration, and base patterns.

**Deliverables:**
- Maven project (pom.xml) with all core dependencies (Spring Boot 4, Spring Data JPA, Spring Security, PostgreSQL, Redis, Lombok, MapStruct, Jackson, Validation, Mail, OpenAPI)
- Package structure: `com.zaidom.radiancewellness.{domain,application,infrastructure,presentation}`
- BaseEntity with custom ID generator (RW-prefixed), audit fields (createdAt, updatedAt, createdBy), soft delete (deletedAt)
- API response wrapper (ApiResponse, PaginatedApiResponse, ApiResponseUtils)
- Exception hierarchy (ResourceNotFoundException, DuplicateResourceException, UnauthorizedException, BadRequestException, PaymentException) + GlobalExceptionHandler
- SecurityConfig (CORS for localhost:3000-3003 + production domains, CSRF disabled, stateless sessions, public/private route patterns)
- SwaggerConfig (OpenAPI 3.0 docs with JWT bearer auth)
- LoggingFilter, AsyncConfig, JacksonConfig (JavaTimeModule, Naira currency serializer)
- application.yml + application-dev.yml + application-test.yml + application-prod.yml
- Docker Compose (PostgreSQL 16 + Redis 7)
- Dockerfile (multi-stage build)
- CLAUDE.md with project conventions and rules

**Tests:** `mvn clean compile` passes, app starts on port 8080, Swagger UI loads at /swagger-ui.html, health endpoint responds at /actuator/health.

---

## Milestone 2: Domain Entities & Repositories

**Goal:** Define all JPA entities, enums, and repositories matching the complete data model.

**Entities (25+):**
- **Core:** User (admin/staff), Customer, CustomerPreference
- **Services:** ServiceCategory (Spa, Treatments, Gym, Salon), Service, ServiceAddOn, ServiceStaff
- **Bookings:** Booking, BookingAddOn, BookingNote (service notes)
- **Accommodations:** Accommodation, AccommodationBooking, AccommodationAmenity
- **Staff:** Staff, StaffSchedule, StaffScheduleException, TimeOffRequest
- **Payments:** Payment, Refund, Invoice, InvoiceLineItem
- **Memberships:** MembershipPlan, MembershipBenefit, CustomerMembership, LoyaltyPoints, PointsTransaction
- **Commerce:** Product, ProductCategory, ProductOrder, OrderItem, InventoryItem, InventoryMovement, PurchaseOrder, PurchaseOrderItem, Supplier
- **Marketing:** PromoCode, GiftCard, Referral, Campaign
- **System:** Notification, AuditLog, BusinessSetting, OperatingHours, RefreshToken

**Enums:**
- BookingStatus (PENDING, CONFIRMED, CHECKED_IN, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW)
- PaymentStatus (PENDING, SUCCESSFUL, FAILED, REFUNDED, PARTIAL)
- PaymentMethod (CARD, BANK_TRANSFER, CASH, USSD, GIFT_CARD)
- MembershipTier (SILVER, GOLD, PLATINUM)
- MembershipStatus (ACTIVE, PAUSED, CANCELLED, EXPIRED)
- OrderStatus (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- UserRole (SUPER_ADMIN, ADMIN, MANAGER, RECEPTIONIST, ACCOUNTANT, MARKETING)
- StaffRole (THERAPIST, SENIOR_THERAPIST, BEAUTY_SPECIALIST, NAIL_TECHNICIAN, FITNESS_TRAINER, RECEPTIONIST)
- TimeOffStatus (PENDING, APPROVED, REJECTED)
- NotificationType (BOOKING, PAYMENT, MEMBERSHIP, PROMOTION, SYSTEM, INVENTORY)

**Repositories:** 25+ repositories with custom queries, pagination support, and indexed queries.

**Tests:** App starts, all tables auto-created in PostgreSQL, no Hibernate errors, entity relationships verified.

---

## Milestone 3: Authentication & Authorization

**Goal:** Implement JWT-based authentication with role-based access control for both admin and customer portals.

**Deliverables:**
- JwtProvider (HMAC SHA-256, 15-min access token, 7-day refresh token)
- JwtAuthenticationFilter + SecurityContextUtil (extract authenticated user)
- **Admin Auth:** POST /api/v1/admin/auth/login, /refresh, /logout
- **Customer Auth:** POST /api/v1/auth/register, /login, /refresh, /logout, /forgot-password, /reset-password
- LoginUseCase (account lockout: 5 attempts, 15-min lock)
- RegisterUseCase (customer registration with email verification placeholder)
- RefreshTokenUseCase (token rotation)
- Role-based method security (@PreAuthorize annotations)
- DataSeeder: Admin user (admin@radiancewellness.com), sample staff, sample customer
- Password policy: minimum 8 chars, 1 uppercase, 1 number

**Tests (35+):**
- JwtProviderTest: generate/validate, extract claims, expired/malformed/tampered tokens
- AdminAuthControllerTest: login, lockout, refresh, logout, protected endpoints
- CustomerAuthControllerTest: register, login, forgot-password, reset-password, refresh, profile access
- RoleBasedAccessTest: admin-only endpoints reject customer tokens, staff endpoints reject customer tokens

---

## Milestone 4: Service & Category Management

**Goal:** Full CRUD for service categories, services, and add-ons. Public read + admin write.

**Endpoints:**
- Public: GET /api/v1/services, GET /api/v1/services/{id}, GET /api/v1/services/categories, GET /api/v1/services/search
- Admin: POST/PUT/DELETE /api/v1/admin/services, POST/PUT/DELETE /api/v1/admin/categories, POST/PUT/DELETE /api/v1/admin/add-ons

**Deliverables:**
- ServiceCategory CRUD (Spa, Treatments, Gym, Salon) with icons, descriptions, ordering
- Service CRUD with variable pricing (duration→price map), images, ratings, popularity flags
- ServiceAddOn CRUD with applicable service associations
- Public service search (by name, category, price range, duration)
- Service availability check (based on staff schedules)
- Seed data: all 40 services from mock-data with correct categories and pricing

**Tests:**
- Public listing returns all active services with pagination
- Category filtering works
- Service search by name, price range, duration
- Admin can CRUD services with validation
- Admin can manage categories and add-ons
- Non-admin cannot create/update/delete services

---

## Milestone 5: Customer & Staff Management

**Goal:** Customer profiles, staff management, schedules, and assignments.

**Endpoints:**
- Customer: GET /api/v1/users/profile, PATCH /api/v1/users/profile, GET /api/v1/users/preferences
- Admin Customers: CRUD /api/v1/admin/customers, /import, /export, /{id}/bookings, /{id}/payments
- Admin Staff: CRUD /api/v1/admin/staff, /{id}/schedule, /{id}/time-off, /{id}/performance
- Staff Portal: GET /api/v1/staff/me, /schedule, /bookings, /profile

**Deliverables:**
- Customer profile management (personal info, preferences, communication settings)
- Customer tagging (VIP, Regular, etc.) and segmentation
- Staff CRUD with role, specialties, services they can perform
- Staff schedule management (default weekly + exceptions)
- Time off request/approval workflow
- Staff-service assignment (which staff can perform which services)
- Staff performance metrics (bookings count, revenue, rating, utilization)
- Customer import from CSV, export to CSV

**Tests:**
- Customer can view/update own profile
- Admin CRUD for customers with pagination and filters
- Admin CRUD for staff with role assignment
- Staff schedule management (default hours, exceptions, time off)
- Role-based access: staff sees only own data, admin sees all
- Customer import/export

---

## Milestone 6: Booking System

**Goal:** Complete booking flow for services — create, reschedule, cancel, check-in, complete.

**Endpoints:**
- Customer: POST /api/v1/bookings, GET /api/v1/bookings, GET /{id}, PATCH /{id} (reschedule), DELETE /{id} (cancel)
- Admin: GET /api/v1/admin/bookings, POST (manual), PATCH /{id}, /check-in, /complete, /no-show, /reassign, /calendar

**Deliverables:**
- Booking creation flow: service selection → date/time → staff assignment → add-ons → price calculation → booking creation
- Automatic staff assignment (or manual by admin)
- Slot availability calculation (based on staff schedules, existing bookings, buffer time, service duration)
- Booking status lifecycle: PENDING → CONFIRMED → CHECKED_IN → IN_PROGRESS → COMPLETED
- Cancellation with configurable policy (free window, late cancellation fee)
- Rescheduling with availability check
- Price calculation: base price + add-ons - membership discount + VAT (7.5%)
- Booking notes (service notes by staff after completion)
- Calendar view data (bookings by date range, staff, service)
- Walk-in booking flow

**Business Rules:**
- Minimum booking notice (configurable, default 2 hours)
- Maximum advance booking (configurable, default 30 days)
- Buffer time between appointments (configurable, default 15 minutes)
- No double-booking for same staff at same time
- Membership discount auto-applied (Silver 10%, Gold 15%, Platinum 20%)

**Tests (30+):**
- Customer can create a booking with valid data
- Booking calculates correct price (with add-ons, membership discount, VAT)
- Cannot book unavailable time slot
- Cannot double-book same staff
- Customer can reschedule within policy
- Customer can cancel with refund (free cancellation window)
- Late cancellation applies fee
- Admin can create walk-in booking
- Admin can check-in, start, complete a booking
- Admin can reassign staff
- Staff can add service notes to completed bookings
- Calendar data returns correct bookings for date range
- Buffer time enforced between bookings

---

## Milestone 7: Payment Integration (Paystack)

**Goal:** Integrate Paystack for payment processing — initialize, verify, webhooks, refunds.

**Endpoints:**
- POST /api/v1/payments/initialize — Start Paystack transaction
- GET /api/v1/payments/verify/{reference} — Verify payment
- POST /api/v1/payments/webhook — Paystack webhook handler
- GET /api/v1/payments/{id} — Payment details
- POST /api/v1/admin/payments/{id}/refund — Process refund

**Deliverables:**
- PaystackClient (HTTP client for Paystack API: initialize, verify, refund, list banks)
- Payment initialization (generate reference, Paystack redirect URL)
- Webhook handler (verify signature, update booking/order status)
- Payment verification flow (callback verification)
- Refund processing (full/partial through Paystack)
- Invoice generation (PDF invoice with line items, VAT breakdown)
- Transaction logging (all payment events stored)
- Supported methods: Card, Bank Transfer, USSD
- Settlement tracking

**Business Rules:**
- VAT 7.5% on all transactions
- Payment required before booking confirmation (or pay-at-center option)
- Refund policy: full refund if cancelled within free window, partial otherwise
- Webhook signature verification for security

**Tests:**
- Initialize payment returns Paystack URL
- Successful payment webhook updates booking to CONFIRMED
- Failed payment webhook keeps booking as PENDING
- Verify endpoint confirms or rejects payment
- Refund creates Paystack refund and updates records
- Invoice generation produces correct PDF
- Webhook rejects invalid signatures

---

## Milestone 8: Accommodation Bookings

**Goal:** Accommodation management, availability, and booking with check-in/check-out flow.

**Endpoints:**
- Public: GET /api/v1/accommodations, GET /{id}, GET /{id}/availability
- Customer: POST /api/v1/accommodations/{id}/bookings
- Admin: CRUD /api/v1/admin/accommodations, /availability, /sync-airbnb, /check-in, /check-out

**Deliverables:**
- Accommodation CRUD (Premium + Standard apartments with amenities, images, pricing tiers)
- Availability calendar (date range checking with blocked dates)
- Accommodation booking flow: select apartment → dates → guest details → deposit payment → confirmation
- Pricing: nightly/weekly/monthly rates, cleaning fee, security deposit
- Check-in/check-out processing
- Airbnb iCal sync (two-way calendar sync, 15-min auto-sync)
- Blocked dates management
- Add-on spa services during stay

**Business Rules:**
- Minimum/maximum stay configurable per apartment
- Check-in 3:00 PM, Check-out 11:00 AM (configurable)
- Deposit: 50% at booking (or 100% for short notice)
- No overlap with existing bookings or Airbnb reservations

**Tests:**
- Accommodation listing with availability status
- Date availability check returns correct available dates
- Cannot book overlapping dates
- Deposit payment initializes correctly
- Check-in/check-out flow updates status
- Airbnb sync blocks dates correctly
- Weekly/monthly rate applied for longer stays

---

## Milestone 9: Memberships & Loyalty

**Goal:** Membership plans, subscriptions, loyalty points, and benefits tracking.

**Endpoints:**
- Public: GET /api/v1/memberships (plan info)
- Customer: POST /subscribe, GET /my-membership, PATCH /upgrade, POST /pause, POST /cancel, GET /points, POST /redeem
- Admin: CRUD /api/v1/admin/memberships, /members, /usage

**Deliverables:**
- Membership plan management (Silver ₦25K/mo, Gold ₦45K/mo, Platinum ₦75K/mo)
- Benefits definition (service discounts, free sessions, priority booking, etc.)
- Subscription lifecycle: subscribe → active → renewal → pause/cancel/expire
- Auto-renewal with Paystack recurring charges
- Plan upgrade/downgrade with prorated billing
- Loyalty points system (earn on bookings, redeem for discounts/services)
- Points transaction history
- Benefit usage tracking (monthly limits)
- Membership discount auto-application at checkout

**Business Rules:**
- Silver: 10% off services, 5% off products, 1 free sauna/month
- Gold: 15% off services, 10% off products, 2 free saunas/month, 1 free massage/quarter
- Platinum: 20% off services, 15% off products, unlimited sauna, 1 free premium massage/month
- Points: 1 point per ₦100 spent, redemption tiers at 1000/2000/3000 points
- Auto-renewal 3 days before expiry with 7-day advance email reminder
- Pause: max 30 days, 1 pause per quarter

**Tests:**
- Customer can subscribe to a plan
- Correct discount applied at booking checkout
- Points earned on completed bookings
- Points redeemed for rewards
- Membership upgrade prorates correctly
- Pause/resume works within limits
- Expired membership blocks benefits

---

## Milestone 10: Products, Inventory & Orders

**Goal:** Product shop, cart, checkout, order management, and inventory tracking.

**Endpoints:**
- Public: GET /api/v1/products, GET /{id}, GET /categories
- Customer: POST /cart, GET /cart, DELETE /cart/{id}, POST /orders, GET /orders, GET /orders/{id}
- Admin: CRUD /api/v1/admin/products, /categories, /orders, /inventory, /suppliers, /purchase-orders

**Deliverables:**
- Product catalog CRUD (name, description, price, images, stock, SKU, category)
- Product categories management
- Shopping cart (session-based or user-bound)
- Order creation from cart with Paystack payment
- Order status lifecycle: PENDING → PROCESSING → SHIPPED/READY_FOR_PICKUP → DELIVERED → COMPLETED
- Delivery options: pickup at center (free), delivery (₦2,500 or free above ₦20,000)
- Inventory management (stock levels, reorder alerts, movements)
- Purchase order workflow (create → approve → order → receive)
- Supplier management
- Low stock alerts
- Automatic stock deduction on order fulfillment

**Tests:**
- Product listing with category filtering and search
- Cart operations (add, remove, update quantity)
- Order creation charges correct amount via Paystack
- Order status updates reflected in customer view
- Stock decrements on order fulfillment
- Low stock alerts generated when below reorder level
- Purchase order workflow

---

## Milestone 11: Marketing, Notifications & Communications

**Goal:** Promo codes, gift cards, referrals, email/SMS notifications, and campaign management.

**Endpoints:**
- Customer: POST /promo-codes/validate, POST /gift-cards/purchase, POST /gift-cards/redeem, GET /referral-code, POST /referral
- Admin: CRUD /api/v1/admin/promo-codes, /gift-cards, /referrals, /campaigns, /notifications

**Deliverables:**
- Promo code engine (percentage/fixed discount, min spend, date range, usage limits, service restrictions)
- Gift card system (purchase, send via email, balance tracking, redemption at checkout)
- Referral program (unique codes, reward on successful referral booking, tracking)
- Email service integration (SendGrid/Mailgun for transactional emails)
- SMS integration (Termii for booking confirmations, reminders, OTP)
- Notification system (in-app + email + SMS based on preferences)
- Automated notifications: booking confirmation, 24hr reminder, 2hr reminder, payment receipt, review request, membership renewal
- Campaign management (email/SMS/WhatsApp broadcast to segments)

**Tests:**
- Promo code validation applies correct discount
- Promo code rejects expired/used/invalid codes
- Gift card purchase creates card with balance
- Gift card redemption deducts balance correctly
- Referral code generates unique link
- Referral reward credited after referred booking completes
- Email sent on booking confirmation
- SMS sent as booking reminder
- Notification preferences respected

---

## Milestone 12: Reports, Dashboard & Deployment

**Goal:** Dashboard analytics, reporting engine, audit logging, and production deployment.

**Endpoints:**
- Admin: GET /api/v1/admin/dashboard/stats, /activity, /alerts
- Reports: GET /api/v1/admin/reports/revenue, /bookings, /customers, /staff, /products, /inventory
- Export: POST /api/v1/admin/reports/export (CSV/PDF)
- Audit: GET /api/v1/admin/audit-log
- Settings: CRUD /api/v1/admin/settings/{section}

**Deliverables:**
- Dashboard stats API (today's bookings, revenue, new customers, occupancy rate, pending confirmations)
- Activity feed (recent bookings, payments, registrations)
- Revenue reports (by period, category, service, payment method)
- Booking reports (by status, service, staff, time)
- Customer reports (new vs returning, top customers, segments)
- Staff performance reports (bookings, revenue, rating, utilization)
- Product sales reports
- Inventory reports (stock levels, movements, low stock)
- CSV export for all reports
- Audit logging (all admin actions with user, timestamp, IP, action, entity)
- Business settings API (operating hours, booking rules, payment config, notification templates)
- Production Docker Compose (Spring Boot + PostgreSQL + Redis)
- application-prod.yml with environment variables
- Health check and monitoring (/actuator endpoints)
- Seed data for demo (admin user, 40 services, 2 apartments, sample customers, sample bookings)
- API documentation (Swagger) complete with all endpoints

**Tests:**
- Dashboard stats return correct counts
- Revenue report matches sum of transactions
- Booking report filters work correctly
- CSV export produces valid file with correct data
- Audit log records all admin actions
- Settings CRUD works for all sections
- E2E flow: register → browse services → book → pay → complete → review
- Docker build succeeds, app starts with prod profile
- All previous milestone tests pass (regression)

---

## Appendix: Entity Relationship Summary

```
Customer ─┬── Booking ──── BookingAddOn
           │        └──── BookingNote
           │        └──── Payment
           ├── CustomerMembership ──── MembershipPlan
           ├── LoyaltyPoints ──── PointsTransaction
           ├── ProductOrder ──── OrderItem ──── Product
           ├── GiftCard
           └── Review

Service ──── ServiceCategory
         └── ServiceAddOn
         └── ServiceStaff ──── Staff

Staff ──── StaffSchedule
       └── StaffScheduleException
       └── TimeOffRequest

Accommodation ──── AccommodationBooking
              └── AccommodationAmenity

InventoryItem ──── InventoryMovement
              └── PurchaseOrderItem ──── PurchaseOrder ──── Supplier

PromoCode, Campaign, Referral, Notification, AuditLog, BusinessSetting
```

---

## Appendix: Port & URL Configuration

| Service | Port | URL |
|---|---|---|
| Backend API | 8080 | http://localhost:8080/api/v1 |
| Swagger UI | 8080 | http://localhost:8080/swagger-ui.html |
| PostgreSQL | 5432 | jdbc:postgresql://localhost:5432/radiance_wellness |
| Redis | 6379 | redis://localhost:6379 |
| Landing Page | 3000 | http://localhost:3000 |
| Client App | 3001 | http://localhost:3001 |
| Admin App | 3002 | http://localhost:3002 |
| Mobile Preview | 3003 | http://localhost:3003 |
