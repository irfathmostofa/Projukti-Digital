# MASTER PROMPT — PREMIUM DIGITAL AGENCY WEBSITE

## ROLE

Act as a **Senior Next.js Architect, Full-Stack Engineer, UI/UX Designer, SEO Specialist, Supabase Engineer, and Conversion Optimization Expert**.

Build a **production-ready, premium digital agency website with a dynamic CMS/admin dashboard**.

This is NOT a simple landing page.

The final product must be a complete business platform where an agency can showcase:

- Ready-made software products
- Custom software solutions
- Web development
- Mobile app development
- Digital marketing
- SEO
- E-commerce solutions
- Business automation
- UI/UX design
- Cloud/DevOps
- Other technology services

The website must be:

- Fully dynamic
- SEO-first
- Premium looking
- Highly responsive
- Fast
- Accessible
- Secure
- Conversion-focused
- Easy to manage from `/admin`
- Scalable for many products and services

---

# 1. TECHNOLOGY STACK

Use the following stack.

## Frontend

- Next.js latest stable version
- TypeScript
- App Router
- React
- Tailwind CSS
- shadcn/ui
- Lucide React
- Motion / Framer Motion for animations

Use Server Components by default.

Use Client Components only when interaction requires them.

## Backend / Database

Use:

- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security

Do NOT use:

- Prisma
- MongoDB
- Firebase
- Axios
- unnecessary backend frameworks
- unnecessary dependencies

Use native `fetch` when HTTP requests are needed.

---

# 2. EMAIL

Use EmailJS for the public contact form.

Required environment variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Also save every contact submission into Supabase.

---

# 3. WEBSITE ARCHITECTURE

The application has two main areas.

## Public Website

```text
/
├── /products
│   └── /products/[slug]
│
├── /services
│   └── /services/[slug]
│
├── /about
├── /testimonials
├── /contact
├── /privacy-policy
└── /terms-and-conditions
```

## Admin CMS

```text
/admin
├── /admin/login
├── /admin/dashboard
├── /admin/products
├── /admin/products/new
├── /admin/products/[id]/edit
├── /admin/services
├── /admin/services/new
├── /admin/services/[id]/edit
├── /admin/testimonials
├── /admin/testimonials/new
├── /admin/testimonials/[id]/edit
├── /admin/team
├── /admin/pages
├── /admin/leads
├── /admin/media
├── /admin/seo
└── /admin/settings
```

---

# 4. CRITICAL REQUIREMENT — EVERYTHING MUST BE DYNAMIC

Do NOT hardcode business content into React components.

The admin dashboard must be able to manage:

- Homepage content
- Hero
- Hero images
- Hero CTA
- Statistics
- Products
- Product descriptions
- Product features
- Product benefits
- Product screenshots
- Product pricing
- Product FAQs
- Product SEO
- Services
- Service descriptions
- Service features
- Service benefits
- Service process
- Service pricing
- Service FAQs
- Service SEO
- Testimonials
- Team members
- About page
- Contact information
- Social links
- Footer
- Navigation
- Floating contact buttons
- SEO defaults
- Open Graph images
- Analytics settings
- Privacy Policy
- Terms and Conditions

Admin must be able to update the public website without editing source code.

---

# 5. DESIGN DIRECTION

The website must look like a **premium modern technology and digital marketing agency**.

Design characteristics:

- Premium
- Minimal
- Modern
- Professional
- Clean
- Confident
- Conversion-focused
- Strong typography
- Excellent spacing
- Strong visual hierarchy
- High-quality cards
- Subtle gradients where appropriate
- Professional imagery
- Elegant animations

Avoid:

- Generic AI website appearance
- Excessive gradients
- Excessive glassmorphism
- Excessive animations
- Huge unnecessary text
- Clutter
- Poor spacing
- Template-like sections

The final website should look like a real agency website that could be presented to high-value clients.

---

# 6. PUBLIC NAVBAR

Create a responsive navigation.

Example:

```text
Logo

Home
Products
Services
About
Testimonials
Contact

[Let's Talk]
```

Products and Services can have dropdown or mega-menu navigation.

Navbar must:

- Be responsive
- Become sticky on scroll
- Have smooth transitions
- Work on mobile
- Have accessible keyboard navigation

---

# 7. HOMEPAGE

Create a highly professional dynamic homepage.

Recommended structure:

```text
Hero
↓
Statistics
↓
Featured Products
↓
Services
↓
Why Choose Us
↓
Process
↓
Testimonials
↓
CTA
↓
Footer
```

Every section must be dynamic.

Admin should be able to:

- Enable/disable sections
- Edit content
- Change images
- Change buttons
- Change section ordering where practical

---

# 8. HERO SECTION

Create a premium hero section.

Example:

```text
Build Smarter.
Grow Faster.

We build powerful software products, custom digital solutions,
and data-driven marketing systems for modern businesses.

[Explore Products]
[Start Your Project]
```

This is example content only.

Do not hardcode it.

Admin must manage:

- Badge
- Heading
- Description
- Primary CTA
- Secondary CTA
- Hero image
- Background
- Supporting text
- Statistics

---

# 9. HERO ANIMATION

The homepage hero should have a polished entrance animation.

Sequence:

```text
Badge
↓
Heading
↓
Description
↓
CTA buttons
↓
Hero visual
```

Use subtle staggered animation.

Suggested timing:

```text
Badge       0ms
Heading     100ms
Description 200ms
CTA         300ms
Visual      400ms
```

Keep the overall animation under approximately one second.

Use:

- Fade
- Translate
- Scale
- Mask reveal

Do not use distracting character-by-character effects unless appropriate.

---

# 10. HERO BACKGROUND

Add a subtle modern animated background.

Possible:

- Animated grid
- Soft gradient
- Floating shapes
- Abstract blobs
- Light particles
- Moving lines

Keep the animation extremely subtle.

Do not make the website look like a gaming website.

---

# 11. STATISTICS

Create a dynamic statistics section.

Example:

```text
50+
Projects Delivered

30+
Happy Clients

5+
Years Experience

99%
Client Satisfaction
```

Admin controls:

- Number
- Label
- Icon
- Ordering
- Visibility

Numbers should animate when entering the viewport.

---

# 12. FEATURED PRODUCTS

Show products dynamically.

Only products marked:

```text
is_featured = true
```

should appear.

Product cards should contain:

- Image
- Name
- Short description
- Category
- Starting price
- CTA

Cards should have subtle hover animations.

---

# 13. PRODUCT SYSTEM

Create:

```text
/products
/products/[slug]
```

Products are completely dynamic.

## Products table

Use appropriate fields:

```text
id
name
slug
short_description
description
category
price
pricing_type
thumbnail
hero_image
demo_url
video_url
documentation_url
technologies
benefits
is_featured
is_active
sort_order
seo_title
seo_description
seo_keywords
canonical_url
og_image
created_at
updated_at
```

Use JSONB only where appropriate.

---

# 14. PRODUCT LISTING

Create:

```text
/products
```

Features:

- Search
- Category filtering
- Featured products
- Pagination
- Responsive cards
- SEO-friendly URLs

Important product content must be server-rendered.

Do not download all products to the browser.

---

# 15. PRODUCT DETAIL PAGE

Create:

```text
/products/[slug]
```

Structure:

```text
Breadcrumb
↓
Hero
↓
Product Overview
↓
Benefits
↓
Features
↓
Screenshots
↓
How It Works
↓
Technologies
↓
Pricing
↓
FAQ
↓
Related Products
↓
CTA
```

Every section must be dynamic.

---

# 16. PRODUCT FEATURES

Create:

```text
product_features
```

Fields:

```text
id
product_id
title
description
icon
sort_order
is_active
created_at
updated_at
```

Admin can:

- Add
- Edit
- Delete
- Reorder
- Publish/unpublish

---

# 17. PRODUCT FAQ — REQUIRED

Every product MUST have its own FAQ system.

Do NOT hardcode FAQs.

Create a shared:

```text
faqs
```

table.

Fields:

```text
id
question
answer
product_id
service_id
sort_order
is_active
created_at
updated_at
```

An FAQ must belong to exactly one:

```text
Product
OR
Service
```

Never both.

---

# 18. PRODUCT FAQ ADMIN

Inside:

```text
/admin/products/[id]/edit
```

provide an FAQ management section.

Admin can:

- Add FAQ
- Edit FAQ
- Delete FAQ
- Reorder FAQ
- Enable/disable FAQ

---

# 19. PRODUCT FAQ FRONTEND

Every product page must display its FAQ section if active FAQs exist.

Use an accessible accordion.

Example:

```text
Frequently Asked Questions

What is this product?
+

Does it support multiple branches?
+

Can the product be customized?
+
```

If the product has no active FAQs:

Do NOT render the FAQ section.

---

# 20. SERVICE SYSTEM

Create:

```text
/services
/services/[slug]
```

Services are fully dynamic.

Example seed services:

```text
Custom Software Development
Web Development
Mobile App Development
Digital Marketing
SEO
E-commerce Development
Business Automation
UI/UX Design
Cloud & DevOps
```

These are examples only.

Admin must be able to create unlimited services.

---

# 21. SERVICES TABLE

Create:

```text
services
```

Fields:

```text
id
name
slug
short_description
description
category
hero_image
icon
benefits
technologies
is_featured
is_active
sort_order
seo_title
seo_description
seo_keywords
canonical_url
og_image
created_at
updated_at
```

---

# 22. SERVICE LISTING

Create:

```text
/services
```

Include:

- Service cards
- Featured services
- Search/filter where useful
- CTA

Use server rendering for SEO content.

---

# 23. SERVICE DETAIL PAGE

Create:

```text
/services/[slug]
```

Structure:

```text
Breadcrumb
↓
Hero
↓
Service Overview
↓
Problems We Solve
↓
Our Solution
↓
Benefits
↓
Features
↓
Technology
↓
Process
↓
Pricing / Packages
↓
FAQ
↓
Testimonials
↓
Related Services
↓
CTA
```

Everything must be dynamic.

---

# 24. SERVICE FEATURES

Create:

```text
service_features
```

Fields:

```text
id
service_id
title
description
icon
sort_order
is_active
created_at
updated_at
```

Admin manages them.

---

# 25. SERVICE FAQ — REQUIRED

Every service MUST have its own FAQ section.

Examples:

```text
How does your development process work?

How long does a typical project take?

Can you work with an existing system?

Do you provide ongoing maintenance?

How do you determine project pricing?

Can you create a custom solution?
```

These are examples only.

All FAQs must come from Supabase.

---

# 26. SERVICE FAQ ADMIN

Inside:

```text
/admin/services/[id]/edit
```

provide complete FAQ management.

Admin can:

- Add
- Edit
- Delete
- Reorder
- Enable/disable

---

# 27. REUSABLE FAQ COMPONENT

Create:

```text
components/shared/FAQSection.tsx
```

It must support:

```text
Product FAQs
Service FAQs
```

Use one reusable component instead of duplicating FAQ UI.

---

# 28. FAQ ANIMATION

FAQ accordion must animate smoothly.

Opening:

```text
Question
↓
Answer expands
```

Closing:

```text
Answer
↓
Collapses
```

Animate:

- Height
- Opacity
- Icon rotation

Plus icon should smoothly rotate to minus or close icon.

Maintain accessibility.

---

# 29. FAQ SEO STRUCTURED DATA

For every product/service page containing visible FAQs, generate:

```text
FAQPage
```

JSON-LD dynamically.

Only include:

- Active FAQs
- Visible FAQs
- FAQs belonging to the current page

The JSON-LD must match visible content.

---

# 30. ABOUT PAGE

Create:

```text
/about
```

Dynamic sections:

```text
Hero
Company Introduction
Mission
Vision
Values
Statistics
Team
Technology
Why Choose Us
CTA
```

---

# 31. TEAM

Create:

```text
team_members
```

Fields:

```text
id
name
designation
bio
photo
linkedin
github
sort_order
is_active
created_at
updated_at
```

Admin manages team members.

---

# 32. TESTIMONIALS

Create:

```text
/testimonials
```

Fields:

```text
id
client_name
designation
company
avatar
testimonial
rating
is_featured
is_active
sort_order
created_at
updated_at
```

Create:

- Homepage testimonial section
- Full testimonials page
- Admin CRUD

---

# 33. TESTIMONIAL ANIMATION

Testimonials should appear smoothly.

If carousel is used:

- Smooth transitions
- Mobile swipe
- Keyboard support
- Accessible controls
- Reasonable autoplay speed

Do not move content too quickly.

---

# 34. CONTACT PAGE

Create:

```text
/contact
```

Form:

```text
Name
Email
Phone
Company
Service
Budget
Message
Attachment
Privacy Consent
```

Flow:

```text
Validate
↓
EmailJS
↓
Supabase
↓
Success
```

Show professional loading, success, and error states.

---

# 35. CONTACT SUBMISSIONS

Create:

```text
contact_submissions
```

Fields:

```text
id
name
email
phone
company
service
budget
message
attachment_url
status
created_at
updated_at
```

Status:

```text
new
contacted
in_progress
converted
closed
```

---

# 36. EMAILJS

Use EmailJS for email delivery.

Required:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Email should contain:

```text
Name
Email
Phone
Company
Service
Budget
Message
```

---

# 37. FLOATING CONTACT BUTTONS

Create floating contact buttons for:

```text
WhatsApp
Phone
Email
Messenger
```

All values must be dynamic.

Admin can:

- Enable/disable buttons
- Change number
- Change email
- Change URL

Buttons must:

- Work on mobile
- Have accessible labels
- Have tooltips
- Have smooth entrance animation
- Not block page content

Use only subtle pulse effects.

---

# 38. SITE SETTINGS

Create:

```text
site_settings
```

Manage:

### Company

```text
company_name
logo
favicon
tagline
description
email
phone
address
```

### Social

```text
facebook
linkedin
instagram
youtube
github
twitter
```

### Contact

```text
whatsapp
phone
email
messenger
```

### SEO

```text
default_title
default_description
default_keywords
default_og_image
```

### Analytics

```text
google_analytics_id
google_search_console_verification
meta_pixel_id
```

---

# 39. FOOTER

Dynamic footer containing:

```text
Logo
Company description
Products
Services
About
Testimonials
Contact
Social links
Phone
Email
Address
Privacy Policy
Terms
Copyright
```

---

# 40. ADMIN AUTHENTICATION

Use Supabase Auth.

Create:

```text
/admin/login
```

Do NOT create fake frontend password authentication.

Protect:

```text
/admin/*
```

Use proper authorization.

---

# 41. ADMIN DASHBOARD

Create a premium CMS dashboard.

Dashboard cards:

```text
Total Products
Active Products
Total Services
Active Services
Testimonials
Total Leads
New Leads
Featured Products
```

Also show recent leads.

---

# 42. ADMIN SIDEBAR

```text
Dashboard
Products
Services
Testimonials
Team
Pages
Leads
Media
SEO
Settings
```

Responsive on mobile.

---

# 43. ADMIN PRODUCT MANAGEMENT

Admin can:

- Create
- Edit
- Delete
- Publish
- Unpublish
- Feature
- Upload images
- Manage screenshots
- Manage features
- Manage pricing
- Manage FAQs
- Configure SEO
- Reorder

---

# 44. ADMIN SERVICE MANAGEMENT

Admin can:

- Create
- Edit
- Delete
- Publish
- Unpublish
- Feature
- Upload images
- Manage features
- Manage benefits
- Manage process
- Manage pricing
- Manage FAQs
- Configure SEO
- Reorder

---

# 45. ADMIN TESTIMONIAL MANAGEMENT

Admin can:

- Create
- Edit
- Delete
- Publish
- Unpublish
- Feature
- Upload avatar
- Set rating
- Reorder

---

# 46. ADMIN LEAD MANAGEMENT

Display:

```text
Name
Email
Phone
Company
Service
Budget
Message
Status
Date
```

Features:

- Search
- Filter
- Pagination
- Status update

---

# 47. SUPABASE STORAGE

Create buckets:

```text
website-assets
product-images
service-images
testimonial-images
team-images
```

Use Supabase Storage for images.

Use Next.js `Image`.

---

# 48. DATABASE TABLES

At minimum:

```text
site_settings
homepage_sections
products
product_features
services
service_features
faqs
testimonials
team_members
contact_submissions
navigation_items
admin_profiles
```

Use foreign keys.

Use proper relational design.

---

# 49. FAQ DATABASE CONSTRAINT

Each FAQ must belong to exactly one parent.

Valid:

```text
product_id = UUID
service_id = NULL
```

OR:

```text
product_id = NULL
service_id = UUID
```

Invalid:

```text
product_id = NULL
service_id = NULL
```

Invalid:

```text
product_id = UUID
service_id = UUID
```

Enforce this through database constraint and/or application validation.

---

# 50. RLS

Implement Supabase Row Level Security.

Public:

```text
Read published products
Read published services
Read active FAQs
Read active testimonials
Read public site settings
```

Admin:

```text
Create
Read
Update
Delete
```

Contact submissions must never be publicly readable.

---

# 51. SECURITY

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to the browser.

Use environment variables.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

---

# 52. SEO — HIGH PRIORITY

SEO is a core requirement.

Every public page must have:

- Unique title
- Unique description
- Canonical
- Open Graph
- Twitter card
- Proper headings
- Semantic HTML

Use Next.js Metadata API.

---

# 53. DYNAMIC PRODUCT SEO

Every product supports:

```text
seo_title
seo_description
seo_keywords
canonical_url
og_image
```

Use:

```typescript
generateMetadata();
```

for:

```text
/products/[slug]
```

---

# 54. DYNAMIC SERVICE SEO

Every service supports:

```text
seo_title
seo_description
seo_keywords
canonical_url
og_image
```

Use:

```typescript
generateMetadata();
```

for:

```text
/services/[slug]
```

---

# 55. SEO ADMIN

Product/service editor must contain:

```text
SEO Title
Meta Description
Keywords
Canonical URL
OG Image
Index/Noindex
Follow/Nofollow
```

Provide useful character-count guidance.

---

# 56. SITEMAP

Create dynamic:

```text
/sitemap.xml
```

Include:

```text
Homepage
Products
Services
About
Testimonials
Contact
Published Products
Published Services
```

Only active/published pages.

---

# 57. ROBOTS

Create:

```text
/robots.txt
```

Allow public pages.

Disallow:

```text
/admin
```

---

# 58. STRUCTURED DATA

Implement JSON-LD where appropriate:

```text
Organization
WebSite
Product
Service
BreadcrumbList
FAQPage
```

Structured data must represent actual visible content.

---

# 59. BREADCRUMBS

Create dynamic breadcrumbs.

Example:

```text
Home → Products → Restaurant POS
```

Use BreadcrumbList schema.

---

# 60. INTERNAL LINKING

Product pages:

```text
Related Products
Related Services
Contact
```

Service pages:

```text
Related Services
Relevant Products
Testimonials
Contact
```

Homepage links to important products and services.

---

# 61. PERFORMANCE

Optimize:

- Core Web Vitals
- LCP
- CLS
- INP
- Image loading
- JavaScript bundle
- Code splitting
- Caching

Use Server Components by default.

Avoid unnecessary client rendering.

---

# 62. RESPONSIVE DESIGN

Support:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Mobile-first.

---

# 63. ACCESSIBILITY

Implement:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Accessible forms
- Visible focus states
- Alt text
- Accessible accordions
- Good color contrast

---

# 64. SMOOTH EXPERIENCE

The entire website must feel smooth.

Use:

- Smooth scrolling
- Page transitions
- Scroll reveal
- Staggered animations
- Hover micro-interactions
- Smooth accordions
- Animated counters
- Image reveals
- CTA animations
- Floating button animations

Animations must enhance UX, not distract.

---

# 65. PAGE TRANSITIONS

Use subtle transitions between routes.

Target:

```text
300ms–500ms
```

Do not delay navigation.

---

# 66. SCROLL REVEALS

Sections should smoothly reveal when entering the viewport.

Preferred:

```text
opacity: 0 → 1
translateY: 20px → 0
```

Duration:

```text
500ms–800ms
```

Use stagger for cards.

---

# 67. CARD HOVER

Product/service cards:

```text
translateY(-4px)
image scale(1.03)
shadow transition
icon movement
arrow movement
```

Keep subtle.

---

# 68. PROCESS ANIMATION

Process section should animate as the user scrolls.

Possible:

```text
Discovery
↓
Strategy
↓
Design
↓
Development
↓
Testing
↓
Launch
↓
Growth
```

Animate the progress line and individual steps.

---

# 69. IMAGE REVEALS

Use subtle:

```text
opacity
scale
mask/reveal
```

Avoid heavy parallax.

---

# 70. CTA ANIMATION

CTA sections should have:

- Scroll reveal
- Subtle animated background
- Button hover
- Icon movement

---

# 71. MOBILE ANIMATION

On mobile:

- Reduce complexity
- Disable cursor effects
- Reduce parallax
- Reduce background particles
- Reduce simultaneous animations

Prioritize smoothness.

---

# 72. REDUCED MOTION

Respect:

```text
prefers-reduced-motion
```

When enabled:

- Disable unnecessary animation
- Disable parallax
- Disable infinite animations
- Keep essential transitions only

---

# 73. ANIMATION SYSTEM

Create reusable animation utilities/components.

Example:

```text
components/animations/
├── FadeIn.tsx
├── FadeUp.tsx
├── FadeDown.tsx
├── ScaleIn.tsx
├── SlideLeft.tsx
├── SlideRight.tsx
├── Stagger.tsx
├── Reveal.tsx
└── PageTransition.tsx
```

Use reusable animation variants.

Do not duplicate animation configurations throughout the project.

---

# 74. ANIMATION TIMING

Use consistent timing:

```text
Fast: 150–200ms
Normal: 250–400ms
Medium: 400–600ms
Reveal: 600–900ms
```

Use natural easing.

Prefer:

```text
ease-out
ease-in-out
```

Avoid excessive bounce/elastic animations.

---

# 75. SEO + ANIMATION RULE

Important SEO content must already exist in the server-rendered HTML.

Do not:

- Hide SEO content until animation starts
- Load important content only after interaction
- Depend on client-side animation to render content

Animation is enhancement only.

---

# 76. LOADING STATES

Create polished skeleton loaders.

Use skeletons for:

- Products
- Services
- Testimonials
- Admin lists
- Dashboard cards

Do not create unnecessarily long loading animations.

---

# 77. ERROR STATES

Create:

```text
loading.tsx
error.tsx
not-found.tsx
```

where appropriate.

Use friendly messages.

---

# 78. 404 PAGE

Create a premium custom 404.

Example:

```text
Page Not Found

The page you're looking for doesn't exist.

[Back to Home]
```

---

# 79. SEARCH

Implement search for:

```text
Products
Services
```

Use efficient database queries.

---

# 80. PAGINATION

Use pagination for large datasets:

```text
Products
Services
Testimonials
Leads
Admin lists
```

---

# 81. CACHING / REVALIDATION

Use Next.js caching/revalidation appropriately.

When admin updates:

```text
Product
Service
FAQ
Testimonial
Homepage
Settings
```

the public website should update appropriately without requiring a full application rebuild.

---

# 82. SLUGS

Products and services must use unique SEO-friendly slugs.

Example:

```text
Restaurant POS System
→ restaurant-pos-system
```

```text
Digital Marketing
→ digital-marketing
```

---

# 83. IMAGE SEO

Every important image needs descriptive alt text.

Example:

```text
Restaurant POS dashboard showing sales and order management
```

Never use meaningless alt text.

---

# 84. ADMIN PAGE MANAGEMENT

Allow editing of:

```text
About
Privacy Policy
Terms and Conditions
```

through the CMS.

---

# 85. ANALYTICS

Allow admin configuration of:

```text
Google Analytics
Google Search Console verification
Meta Pixel
```

Only load analytics when configured.

---

# 86. PROJECT STRUCTURE

Use a clean architecture similar to:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── services/
│   │   ├── about/
│   │   ├── testimonials/
│   │   └── contact/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── team/
│   │   ├── leads/
│   │   ├── media/
│   │   ├── seo/
│   │   └── settings/
│   │
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── public/
│   ├── admin/
│   ├── products/
│   ├── services/
│   ├── shared/
│   └── animations/
│
├── lib/
│   ├── supabase/
│   ├── emailjs/
│   ├── seo/
│   └── utils/
│
├── types/
└── hooks/
```

Adjust where appropriate for the chosen Next.js version.

---

# 87. REUSABLE COMPONENTS

Create reusable:

```text
Navbar
Footer
Hero
CTA
ProductCard
ServiceCard
TestimonialCard
FAQSection
Breadcrumb
FloatingContact
Search
Pagination
Filters
LoadingSkeleton
EmptyState
```

---

# 88. TYPESCRIPT

Create proper types for:

```text
Product
ProductFeature
Service
ServiceFeature
FAQ
Testimonial
TeamMember
ContactSubmission
SiteSettings
HomepageSection
```

Avoid `any`.

---

# 89. FORM VALIDATION

Validate:

- Name
- Email
- Phone
- Service
- Budget
- Message
- Privacy consent

Provide clear validation messages.

---

# 90. MEDIA MANAGEMENT

Admin media section should allow:

- Upload
- Preview
- Delete
- Copy URL

Use Supabase Storage.

---

# 91. SQL MIGRATIONS

All database changes must be represented through SQL migrations.

Create:

```text
supabase/migrations/
```

Do not rely only on manual dashboard configuration.

---

# 92. SEED DATA

Create realistic demo data.

## Products

At least:

```text
Restaurant POS System
School Management System
Inventory Management System
```

## Services

At least:

```text
Custom Software Development
Web Development
Mobile App Development
Digital Marketing
SEO
Business Automation
```

## FAQs

Every seeded product and every seeded service must have at least:

```text
4–6 FAQs
```

## Testimonials

At least:

```text
4 realistic demo testimonials
```

Clearly mark demo content so it can be replaced.

---

# 93. ENVIRONMENT FILE

Create:

```text
.env.example
```

with:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Do not commit `.env.local`.

---

# 94. README

Create a detailed README containing:

```text
Project Overview
Tech Stack
Installation
Environment Variables
Supabase Setup
Database Setup
Migration Instructions
Seed Instructions
Supabase Auth Setup
Storage Setup
EmailJS Setup
Admin Setup
Local Development
Production Build
Deployment
SEO Configuration
Analytics Configuration
Troubleshooting
```

---

# 95. DEVELOPMENT PHASES

## Phase 1 — Foundation

Build:

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- Supabase
- Architecture
- Environment setup

## Phase 2 — Database

Build:

- Tables
- Relationships
- SQL migrations
- RLS
- Storage
- Seed data

## Phase 3 — Authentication

Build:

- Supabase Auth
- Admin login
- Protected routes
- Authorization

## Phase 4 — CMS

Build:

- Dashboard
- Products CRUD
- Product features
- Product FAQs
- Services CRUD
- Service features
- Service FAQs
- Testimonials
- Team
- Pages
- Leads
- Media
- Settings

## Phase 5 — Public Website

Build:

- Homepage
- Products
- Product detail
- Services
- Service detail
- About
- Testimonials
- Contact
- Footer
- Floating buttons

## Phase 6 — Email

Build:

- EmailJS
- Contact submission
- Supabase lead storage
- Lead management

## Phase 7 — SEO

Build:

- Metadata
- Sitemap
- Robots
- Canonical
- Open Graph
- Twitter cards
- JSON-LD
- FAQ schema
- Breadcrumb schema
- Internal linking

## Phase 8 — Motion

Build:

- Page transitions
- Hero animations
- Scroll reveals
- Card interactions
- Counters
- Process animation
- FAQ animation
- Image reveals
- CTA animation
- Floating button animation

## Phase 9 — Optimization

Build:

- Core Web Vitals optimization
- Responsive optimization
- Accessibility
- Image optimization
- Caching
- Reduced-motion support

## Phase 10 — Testing

Test:

- Authentication
- RLS
- CRUD
- Products
- Services
- FAQs
- Testimonials
- Forms
- EmailJS
- Storage
- SEO
- Sitemap
- Robots
- JSON-LD
- Animations
- Reduced motion
- Mobile
- 404
- Loading states
- Error states
- Production build

---

# 96. COMPLETE USER JOURNEY

The final user experience should be:

```text
Visitor
↓
Premium Animated Homepage
↓
Explore Products / Services
↓
Product / Service Detail
↓
Features
↓
Benefits
↓
Pricing
↓
FAQ
↓
Testimonials
↓
CTA
↓
Contact Form
↓
EmailJS
↓
Supabase Lead
↓
Admin Dashboard
↓
Lead Management
```

Everything should work end-to-end.

---

# 97. CRITICAL DYNAMIC WORKFLOW TEST

Before considering the project complete, verify that an admin can create a completely new product.

Example:

```text
Product
├── Name
├── Slug
├── Description
├── Images
├── Features
├── Benefits
├── Pricing
├── Technologies
├── FAQs
└── SEO
```

After publishing, the website must automatically create:

```text
/products/[slug]
```

with:

```text
Dynamic content
Dynamic metadata
Features
Benefits
Pricing
FAQs
FAQ JSON-LD
Breadcrumbs
Related products
CTA
```

No source-code modification should be required.

---

# 98. SERVICE WORKFLOW TEST

Admin creates a new service:

```text
Service
├── Name
├── Slug
├── Description
├── Features
├── Benefits
├── Process
├── Pricing
├── FAQs
└── SEO
```

After publishing:

```text
/services/[slug]
```

must automatically display:

```text
Dynamic content
Dynamic metadata
Features
Benefits
Process
Pricing
FAQs
FAQ JSON-LD
Breadcrumbs
Testimonials
Related services
CTA
```

No source-code modification should be required.

---

# 99. FINAL ACCEPTANCE CRITERIA

The project is complete only when all of the following work:

### Public Website

- Homepage
- Products
- Product details
- Services
- Service details
- About
- Testimonials
- Contact
- Privacy Policy
- Terms

### Dynamic CMS

- Products CRUD
- Product features
- Product FAQs
- Services CRUD
- Service features
- Service FAQs
- Testimonials
- Team
- Pages
- Settings
- Leads
- Media
- SEO

### Contact

- Contact validation
- EmailJS
- Supabase lead storage
- Lead status management

### SEO

- Dynamic metadata
- Product metadata
- Service metadata
- Canonicals
- Sitemap
- Robots
- Open Graph
- Twitter cards
- JSON-LD
- Product schema
- Service schema
- FAQ schema
- Breadcrumb schema
- Internal linking

### UX

- Smooth scrolling
- Page transitions
- Hero animations
- Scroll reveal
- Card hover
- Animated statistics
- Process animation
- FAQ animation
- Image reveals
- CTA animation
- Floating contact animation
- Mobile animation optimization
- Reduced motion

### Technical

- TypeScript
- Supabase
- RLS
- Secure authentication
- Storage
- SQL migrations
- Error handling
- Loading states
- 404
- Responsive design
- Accessibility
- Performance optimization
- Production build

---

# 100. FINAL DEVELOPMENT PRINCIPLE

Do not build this as a static marketing template.

Build it as:

```text
Premium Agency Website
        +
Dynamic Product Platform
        +
Dynamic Service Platform
        +
SEO Content Platform
        +
Lead Generation System
        +
Lightweight CMS
        +
Premium Motion Design
```

The final result should feel:

```text
Premium
Modern
Technical
Trustworthy
Smooth
Fast
Professional
Conversion-focused
SEO-friendly
Scalable
```

The website should be impressive from the **first page load**, but animations must never compromise:

```text
SEO
Performance
Accessibility
Usability
Mobile experience
```

The final application must be production-ready and maintainable by a professional software engineer.

---

# PROJECT SETUP GUIDE

## Project Overview

A production-ready premium digital agency website with a dynamic CMS/admin dashboard. The platform lets an agency showcase ready-made software products, custom solutions, web/mobile development, digital marketing, SEO, e-commerce, and business automation — all managed through an authenticated admin panel.

## Tech Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Motion (framer-motion successor) for animations
- Supabase: PostgreSQL, Auth, Storage, RLS
- EmailJS for the contact form
- lucide-react icons

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Supabase anon (public) key |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL base (defaults to localhost:3000) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | No | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | No | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | No | EmailJS public key |
| `REVALIDATE_SECRET` | No | Guard for `POST /api/revalidate` |

\* Without the two Supabase variables the site runs in **demo mode** using local seed data (`lib/data/demo.ts`) so you can preview the design and all pages without a database. Admin auth requires a configured Supabase.

## Supabase Setup

1. Create a project at https://supabase.com
2. Open the SQL Editor and run the migrations in order:
   - `supabase/migrations/20260101000000_init.sql` — schema, RLS, helper functions
   - `supabase/migrations/20260101000001_storage.sql` — storage buckets + policies
   - `supabase/migrations/20260101000002_seed.sql` — demo seed data
3. Copy the project URL and anon key from **Project Settings > API** into `.env.local`.

See `docs/SEED_DATA.md` for details about the seeded content.

## Supabase Auth Setup

1. In the dashboard, enable **Email** provider under Auth > Providers.
2. The `admin_profiles` table maps `auth.users` to admin/editor roles. Insert the first admin manually:

```sql
insert into public.admin_profiles (user_id, email, role)
values (
  (select id from auth.users where email = 'you@example.com' limit 1),
  'you@example.com',
  'admin'
);
```

3. Sign in at `/admin/login` and manage everything from the sidebar.

## Storage Setup

Run `20260101000001_storage.sql` to create the `website-assets`, `product-images`, `service-images`, `testimonial-images`, and `team-images` buckets (public read, admin-only writes). Uploads happen in the admin **Media** page.

## EmailJS Setup

1. Create an account and a service at https://emailjs.com.
2. Create an email template matching the contact form fields (name, email, phone, service, budget, message).
3. Set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

## Admin Setup

- Admin area: `/admin` (redirects to `/admin/dashboard`).
- CRUD pages for products, services, FAQs, testimonials, team, navigation, media.
- Single-record forms for SEO settings and site settings.
- Leads are collected from the contact form and listed under `/admin/leads`.
- Content changes revalidate the public site automatically; `POST /api/revalidate` supports on-demand revalidation with `?secret=<REVALIDATE_SECRET>`.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
npm run lint
npm run build
```

## Deployment

Deploy to Vercel (or any Node.js host):

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables from `.env.local` in the Vercel project settings.
3. Vercel sets `NEXT_PUBLIC_VERCEL_URL` automatically as a fallback for canonical URLs.
4. Deploy. Migrations run once against your Supabase project as described above.

## SEO Configuration

Default titles, descriptions, keywords, OG image, Google Analytics, Search Console verification, and Meta Pixel are configurable under `/admin/seo` (stored in `site_settings`). Per-page metadata, Open Graph, JSON-LD (Organization, Website, Product, Service, FAQ, Breadcrumb), `sitemap.xml`, and `robots.txt` are generated automatically.

## Analytics Configuration

- Google Analytics: set `google_analytics_id` in `/admin/seo` — gtag is injected in the root layout.
- Meta Pixel: set `meta_pixel_id` in `/admin/seo` — the pixel is injected in the root layout.

## Troubleshooting

- **Blank page / admin redirects to login**: Supabase env vars are missing or the user has no `admin_profiles` row.
- **Uploads fail in Media**: confirm the signed-in user is in `admin_profiles` (storage policies require `public.is_admin()`).
- **Contact form emails not sent**: EmailJS vars unset (form still saves the submission to Supabase).
- **Demo data shows instead of real data**: `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` not set, or migrations not applied.
# Projukti-Digital
