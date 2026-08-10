-- =============================================================
-- DEMO SEED DATA
-- Clearly marked as demo content — replace via the admin CMS.
-- =============================================================

-- Site settings -------------------------------------------------
insert into public.site_settings (company_name, tagline, description, email, phone, address,
  linkedin, twitter, whatsapp, messenger,
  default_title, default_description, default_keywords, default_og_image)
values (
  'Nexus Digital',
  'We build software that grows businesses',
  'Nexus Digital is a full-service technology and digital marketing agency. We design, build, and scale software products, web platforms, and growth systems for modern businesses.',
  'hello@nexusdigital.com',
  '+1 (555) 010-2030',
  '500 Innovation Drive, San Francisco, CA 94107',
  'https://linkedin.com/company/nexusdigital',
  'https://twitter.com/nexusdigital',
  '+15550102030',
  'https://m.me/nexusdigital',
  'Nexus Digital — Premium Software & Digital Marketing Agency',
  'Nexus Digital builds powerful software products, custom digital solutions, and data-driven marketing systems for modern businesses.',
  'software agency, digital marketing, web development, mobile apps, e-commerce, SEO',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
)
on conflict (id) do nothing;

-- Homepage sections ---------------------------------------------
insert into public.homepage_sections (key, title, subtitle, content, is_enabled, sort_order) values
('hero', 'Build Smarter. Grow Faster.', 'We build powerful software products, custom digital solutions, and data-driven marketing systems for modern businesses.', '{"badge":"Trusted by 30+ growing companies","primaryCta":{"label":"Explore Products","url":"/products"},"secondaryCta":{"label":"Start Your Project","url":"/contact"}}', true, 10),
('statistics', 'Numbers that matter', 'A track record built on results.', null, true, 20),
('featured_products', 'Featured Products', 'Ready-made software products you can deploy in days, not months.', null, true, 30),
('services', 'What We Do', 'End-to-end technology and marketing services under one roof.', null, true, 40),
('why_choose_us', 'Why Choose Us', 'We combine engineering depth with marketing insight to build software that performs.', '{"points":["Senior engineers only","Transparent pricing","On-time delivery","Long-term partnership","Post-launch support","Results-focused"]}', true, 50),
('process', 'How We Work', 'A proven process that turns ideas into shipped products.', null, true, 60),
('testimonials', 'What Our Clients Say', 'Real results from real partnerships.', null, true, 70),
('cta', 'Ready to build something great?', 'Let us help you turn your idea into a product your customers love.', '{"primaryCta":{"label":"Get in Touch","url":"/contact"},"secondaryCta":{"label":"View Our Work","url":"/products"}}', true, 80)
on conflict (key) do nothing;

-- Navigation ----------------------------------------------------
insert into public.navigation_items (label, url, sort_order, is_active) values
('Home', '/', 10, true),
('Products', '/products', 20, true),
('Services', '/services', 30, true),
('About', '/about', 40, true),
('Testimonials', '/testimonials', 50, true),
('Contact', '/contact', 60, true);

-- Products ------------------------------------------------------
insert into public.products (name, slug, short_description, description, category, price, pricing_type,
  thumbnail, hero_image, demo_url, technologies, benefits, is_featured, is_active, sort_order,
  seo_title, seo_description, seo_keywords)
values
(
  'Restaurant POS System',
  'restaurant-pos-system',
  'A complete point-of-sale and restaurant management platform with orders, billing, inventory, and live analytics.',
  'The Restaurant POS System is an all-in-one platform built for restaurants, cafés, and cloud kitchens. It streamlines order taking at the counter, on tables, and online, syncs inventory in real time, and gives owners a live financial dashboard.',
  'POS & Retail',
  '$499',
  'one-time',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9',
  'https://demo.nexusdigital.com/restaurant-pos',
  array['React','Next.js','PostgreSQL','Node.js','Stripe','Redis'],
  array['Faster table turn-around','Live sales & profit analytics','Automated inventory re-ordering','Offline-ready ordering'],
  true, true, 10,
  'Restaurant POS System | Nexus Digital',
  'Cloud-based restaurant POS with orders, billing, inventory and live analytics for restaurants, cafés and cloud kitchens.',
  'restaurant pos, point of sale, restaurant management, cloud kitchen software'
),
(
  'School Management System',
  'school-management-system',
  'One platform to manage students, teachers, attendance, fees, exams, and parent communication.',
  'The School Management System digitizes the entire school workflow — admissions, attendance, timetables, exams, fee collection, and parent messaging — into a single secure dashboard.',
  'Education',
  '$799',
  'one-time',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  null,
  array['Next.js','PostgreSQL','Node.js','WhatsApp API','SMS Gateway'],
  array['Automated attendance','Digital report cards','Fee tracking & reminders','Parent portal'],
  true, true, 20,
  'School Management System | Nexus Digital',
  'Manage students, teachers, attendance, fees, exams and parent communication from one school management platform.',
  'school management, school software, education ERP, attendance system'
),
(
  'Inventory Management System',
  'inventory-management-system',
  'Real-time inventory tracking, purchase orders, suppliers, and low-stock alerts for growing businesses.',
  'The Inventory Management System gives businesses full visibility over stock across multiple warehouses, with barcode scanning, supplier management, purchase orders, and automated low-stock alerts.',
  'Operations',
  '$399',
  'one-time',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  null,
  array['React','PostgreSQL','Node.js','Barcode SDK','Excel Import'],
  array['Multi-warehouse tracking','Smart re-order points','Supplier scorecards','Barcode scanning'],
  true, true, 30,
  'Inventory Management System | Nexus Digital',
  'Real-time inventory tracking with purchase orders, suppliers, barcode scanning and automated low-stock alerts.',
  'inventory management, stock control, warehouse management, supply chain'
);

-- Product features ----------------------------------------------
insert into public.product_features (product_id, title, description, icon, sort_order, is_active)
select p.id, f.title, f.description, f.icon, f.sort_order, true
from public.products p
cross join (
  values
    ('Table & QR Ordering','Customers order from their table via QR code, cutting wait times.','smartphone',1),
    ('Live Sales Dashboard','Monitor revenue, top items and busy hours in real time.','bar-chart',2),
    ('Automated Inventory','Stock levels update with every sale and auto-generate re-order lists.','package',3),
    ('Multi-branch Support','Manage unlimited outlets from one back office.','building-2',4),
    ('Staff & Roles','Granular permissions for cashiers, kitchen and managers.','users',5)
) as f(title, description, icon, sort_order)
where p.slug = 'restaurant-pos-system';

insert into public.product_features (product_id, title, description, icon, sort_order, is_active)
select p.id, f.title, f.description, f.icon, f.sort_order, true
from public.products p
cross join (
  values
    ('Admissions Portal','Online applications, document upload and approval workflows.','file-text',1),
    ('Attendance Tracking','Biometric, card and mobile check-ins with instant alerts.','fingerprint',2),
    ('Exam & Grading Module','Create exams, auto-grade, and publish digital report cards.','clipboard-list',3),
    ('Fee Management','Collect fees online, track dues and send automatic reminders.','credit-card',4),
    ('Parent Communication','Bulk SMS, email and WhatsApp updates in one place.','message-square',5)
) as f(title, description, icon, sort_order)
where p.slug = 'school-management-system';

insert into public.product_features (product_id, title, description, icon, sort_order, is_active)
select p.id, f.title, f.description, f.icon, f.sort_order, true
from public.products p
cross join (
  values
    ('Multi-warehouse','Track stock across multiple locations with easy transfers.','warehouse',1),
    ('Barcode Scanning','Mobile-first scanning for fast receiving and dispatch.','scan-line',2),
    ('Smart Re-ordering','Set minimum levels and get automated purchase suggestions.','bell-ring',3),
    ('Supplier Management','Compare suppliers, track lead times and rate performance.','truck',4),
    ('Excel Import / Export','Migrate your existing data in minutes.','table',5)
) as f(title, description, icon, sort_order)
where p.slug = 'inventory-management-system';

-- Services ------------------------------------------------------
insert into public.services (name, slug, short_description, description, category, icon,
  hero_image, technologies, benefits, process, pricing, is_featured, is_active, sort_order,
  seo_title, seo_description, seo_keywords)
values
(
  'Custom Software Development',
  'custom-software-development',
  'Tailored software built around your exact business processes and growth goals.',
  'We design and build bespoke web and desktop applications that automate your operations, connect your tools, and scale with your business. From concept to deployment, our senior engineers own the full product lifecycle.',
  'Engineering',
  'code-2',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  array['Next.js','React','Node.js','Python','PostgreSQL','AWS'],
  array['Software built around your workflow','Own your source code','Scale as you grow','Ongoing support & maintenance'],
  jsonb_build_array(
    jsonb_build_object('title','Discovery','description','We map your processes, goals and constraints.'),
    jsonb_build_object('title','Strategy','description','We define the architecture, roadmap and success metrics.'),
    jsonb_build_object('title','Design','description','We prototype the UX and visual direction.'),
    jsonb_build_object('title','Development','description','We build in weekly sprints with demos.'),
    jsonb_build_object('title','Testing','description','Automated and manual QA before launch.'),
    jsonb_build_object('title','Launch & Growth','description','We deploy, monitor and iterate.'),
    jsonb_build_object('title','Support','description','Ongoing maintenance and feature releases.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','Starter','price','$5,000+','description','MVP or small internal tool','features',jsonb_build_array('1 feature set','2 weeks','1 revision cycle')),
    jsonb_build_object('name','Growth','price','$15,000+','description','Full product or platform','features',jsonb_build_array('Up to 3 feature sets','6-10 weeks','QA + deployment')),
    jsonb_build_object('name','Enterprise','price','Custom','description','Complex, multi-system solutions','features',jsonb_build_array('Dedicated team','Long-term roadmap','SLA & support'))
  ),
  true, true, 10,
  'Custom Software Development Company | Nexus Digital',
  'Bespoke software development tailored to your business. Design, build, and scale custom applications with our senior engineering team.',
  'custom software, bespoke development, software agency, custom applications'
),
(
  'Web Development',
  'web-development',
  'High-performance, SEO-first websites and web apps that convert visitors into customers.',
  'We build fast, accessible, and beautifully designed websites and web applications using modern frameworks. Every build is performance-optimized, SEO-ready, and built to convert.',
  'Engineering',
  'globe',
  'https://images.unsplash.com/photo-1547658719-da2b51169166',
  array['Next.js','React','Tailwind CSS','TypeScript','Vercel'],
  array['Lightning-fast load times','SEO-first architecture','Accessible by default','CMS-backed content'],
  jsonb_build_array(
    jsonb_build_object('title','Discovery','description','Goals, audience and content strategy.'),
    jsonb_build_object('title','Design','description','Wireframes and premium visual design.'),
    jsonb_build_object('title','Build','description','Responsive, optimized development.'),
    jsonb_build_object('title','Launch','description','Deployment, analytics and handover.'),
    jsonb_build_object('title','Grow','description','Ongoing improvements and SEO.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','Landing Page','price','$1,500+','description','Single high-converting page','features',jsonb_build_array('1-2 weeks','SEO & analytics','CMS-ready')),
    jsonb_build_object('name','Company Website','price','$4,000+','description','Multi-page business site','features',jsonb_build_array('3-5 pages','Blog & CMS','Contact forms')),
    jsonb_build_object('name','Web Platform','price','$10,000+','description','Full application','features',jsonb_build_array('Auth & dashboards','Custom integrations','Scalable architecture'))
  ),
  true, true, 20,
  'Web Development Services | Nexus Digital',
  'High-performance, SEO-first web development. We build premium websites and web applications that convert visitors into customers.',
  'web development, website design, next.js development, web agency'
),
(
  'Mobile App Development',
  'mobile-app-development',
  'Native-quality iOS and Android apps that feel fast, reliable, and delightful.',
  'From MVP to million-user apps, we design and develop cross-platform and native mobile applications that users love. We handle store submission, analytics, and iterative releases.',
  'Engineering',
  'smartphone',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
  array['React Native','Flutter','Swift','Kotlin','Firebase'],
  array['One codebase, two platforms','Offline-first experiences','App store submission','Push notifications & analytics'],
  jsonb_build_array(
    jsonb_build_object('title','Discovery','description','User research and product definition.'),
    jsonb_build_object('title','UX/UI Design','description','App flows and high-fidelity designs.'),
    jsonb_build_object('title','Development','description','Cross-platform build in sprints.'),
    jsonb_build_object('title','Testing','description','Device matrix QA and beta testing.'),
    jsonb_build_object('title','Release','description','Store submission and launch.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','MVP','price','$8,000+','description','Core product to validate','features',jsonb_build_array('2 platforms','Core features','Store submission')),
    jsonb_build_object('name','Full App','price','$20,000+','description','Complete product experience','features',jsonb_build_array('Advanced features','Backend & admin','Analytics & push')),
    jsonb_build_object('name','Ongoing','price','$3,000/mo','description','Continuous improvement','features',jsonb_build_array('Dedicated team','Weekly releases','SLA'))
  ),
  true, true, 30,
  'Mobile App Development | Nexus Digital',
  'Native-quality iOS and Android app development from MVP to launch. Design, build, and scale mobile products your users love.',
  'mobile app development, ios development, android development, react native'
),
(
  'Digital Marketing',
  'digital-marketing',
  'Data-driven campaigns that grow traffic, engagement, and revenue across every channel.',
  'Our growth team runs full-funnel digital marketing — from paid ads and email to content and social — backed by analytics and relentless experimentation.',
  'Marketing',
  'megaphone',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
  array['Google Ads','Meta Ads','GA4','HubSpot','Klaviyo'],
  array['Transparent reporting dashboards','Audience & funnel strategy','Creative that converts','Continuous A/B testing'],
  jsonb_build_array(
    jsonb_build_object('title','Audit','description','Channel and competitor analysis.'),
    jsonb_build_object('title','Strategy','description','Channel mix, budget and messaging.'),
    jsonb_build_object('title','Launch','description','Campaigns, creatives and landing pages.'),
    jsonb_build_object('title','Optimize','description','Weekly experimentation and scaling.'),
    jsonb_build_object('title','Report','description','Clear ROI dashboards.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','Starter','price','$800/mo','description','1 channel focus','features',jsonb_build_array('1 channel','Monthly report','Monthly strategy')),
    jsonb_build_object('name','Growth','price','$1,800/mo','description','Full-funnel marketing','features',jsonb_build_array('3+ channels','Creative production','Weekly optimization')),
    jsonb_build_object('name','Scale','price','$3,500/mo','description','Aggressive scaling','features',jsonb_build_array('All channels','Dedicated manager','Custom dashboards'))
  ),
  true, true, 40,
  'Digital Marketing Agency | Nexus Digital',
  'Data-driven digital marketing that grows traffic, engagement and revenue across paid, organic, email and social channels.',
  'digital marketing, SEO agency, google ads, social media marketing, growth marketing'
),
(
  'SEO',
  'seo',
  'Rank higher, get found, and win organic traffic that converts into qualified leads.',
  'We combine technical SEO, content strategy, and authority building to compound your organic visibility. Expect measurable rankings, indexed pages, and revenue growth.',
  'Marketing',
  'search',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
  array['Screaming Frog','Ahrefs','Google Search Console','Schema.org'],
  array['Technical SEO audits','Keyword & content strategy','Schema & structured data','Authority link building'],
  jsonb_build_array(
    jsonb_build_object('title','Audit','description','Full technical and content audit.'),
    jsonb_build_object('title','Roadmap','description','Prioritized fixes and content plan.'),
    jsonb_build_object('title','Execute','description','Technical fixes and content production.'),
    jsonb_build_object('title','Build','description','Digital PR and link building.'),
    jsonb_build_object('title','Report','description','Ranking and traffic tracking.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','One-Time Audit','price','$1,200','description','Full technical audit','features',jsonb_build_array('Technical review','Keyword research','Action plan')),
    jsonb_build_object('name','Monthly SEO','price','$1,500/mo','description','Ongoing optimization','features',jsonb_build_array('Technical fixes','4 articles/mo','Link building')),
    jsonb_build_object('name','Enterprise','price','$3,000/mo','description','Competitive markets','features',jsonb_build_array('Dedicated team','Advanced analytics','International SEO'))
  ),
  true, true, 50,
  'SEO Services & Agency | Nexus Digital',
  'Rank higher and win qualified organic traffic with technical SEO, content strategy and authority building.',
  'seo services, technical seo, content marketing, link building, seo agency'
),
(
  'E-commerce Development',
  'e-commerce-development',
  'Online stores engineered to sell — fast, secure, and effortless to manage.',
  'We build conversion-optimized e-commerce experiences on modern stacks, with payments, subscriptions, inventory, and marketing integrations out of the box.',
  'Engineering',
  'shopping-cart',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
  array['Next.js','Shopify','Stripe','Medusa','Sanity'],
  array['Conversion-optimized checkout','Multi-payment gateways','Subscription support','Inventory & shipping automation'],
  jsonb_build_array(
    jsonb_build_object('title','Discovery','description','Products, audience and metrics.'),
    jsonb_build_object('title','Design','description','Storefront and UX design.'),
    jsonb_build_object('title','Build','description','Catalog, checkout and integrations.'),
    jsonb_build_object('title','Launch','description','Payments, security and go-live.'),
    jsonb_build_object('title','Optimize','description','CRO and marketing setup.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','Starter Store','price','$3,000+','description','Launch your store','features',jsonb_build_array('Up to 50 products','Payment setup','Basic SEO')),
    jsonb_build_object('name','Growth Store','price','$8,000+','description','Scale with features','features',jsonb_build_array('Subscriptions','ERP integration','Advanced SEO')),
    jsonb_build_object('name','Custom Platform','price','$25,000+','description','Bespoke commerce','features',jsonb_build_array('Headless architecture','Custom logic','Dedicated team'))
  ),
  true, true, 60,
  'E-commerce Development | Nexus Digital',
  'Conversion-optimized online stores with payments, subscriptions, inventory and marketing built-in. Launch fast, sell more.',
  'ecommerce development, online store, shopify development, checkout optimization'
),
(
  'Business Automation',
  'business-automation',
  'Eliminate repetitive work and connect your tools into one smooth operating system.',
  'We build custom automations and internal tools that remove manual work, reduce errors, and let your team focus on high-value tasks. From simple workflows to full ERP integrations.',
  'Engineering',
  'workflow',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0',
  array['Zapier','Make','n8n','Python','Supabase','API Integrations'],
  array['Hours saved every week','Fewer human errors','Connected systems','Auditable workflows'],
  jsonb_build_array(
    jsonb_build_object('title','Analyze','description','Map your manual processes.'),
    jsonb_build_object('title','Design','description','Design the automated workflow.'),
    jsonb_build_object('title','Build','description','Integrate systems and logic.'),
    jsonb_build_object('title','Test','description','Edge cases and rollback plans.'),
    jsonb_build_object('title','Handover','description','Training and documentation.')
  ),
  jsonb_build_array(
    jsonb_build_object('name','Quick Win','price','$1,000+','description','Single workflow automated','features',jsonb_build_array('1 workflow','Integration setup','Documentation')),
    jsonb_build_object('name','Workflow Suite','price','$6,000+','description','Multiple connected automations','features',jsonb_build_array('Up to 5 workflows','Custom dashboard','Training')),
    jsonb_build_object('name','Full Automation','price','$15,000+','description','End-to-end operations','features',jsonb_build_array('Unlimited workflows','ERP/CRM integration','Dedicated support'))
  ),
  true, true, 70,
  'Business Automation Services | Nexus Digital',
  'Eliminate repetitive work and connect your tools with custom business automation and internal tools.',
  'business automation, workflow automation, process automation, integrations'
);

-- Service features ----------------------------------------------
insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Full Product Lifecycle','From discovery to launch, we own everything.','layers',1),
    ('Weekly Sprints','Demos and updates every single week.','calendar-check',2),
    ('Senior Engineers Only','No juniors learning on your budget.','graduation-cap',3),
    ('Own Your Code','You own the IP and the source code.','key',4),
    ('Post-launch Support','We stay after launch.','life-buoy',5)
) as f(title, description, icon, sort_order)
where s.slug = 'custom-software-development';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Core Web Vitals Optimized','Top scores for LCP, CLS and INP.','gauge',1),
    ('SEO-first Architecture','Built to rank from day one.','search',2),
    ('Accessible by Default','WCAG 2.1 AA compliance.','accessibility',3),
    ('CMS-backed','Edit content without a developer.','settings',4),
    ('Analytics Built In','Track every conversion.','line-chart',5)
) as f(title, description, icon, sort_order)
where s.slug = 'web-development';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Cross-platform','One codebase for iOS and Android.','smartphone',1),
    ('Offline-first','Works without a connection.','cloud-off',2),
    ('App Store Ready','Design that passes review first time.','badge-check',3),
    ('Push Notifications','Engage users with precision.','bell',4),
    ('Crash-free Releases','Continuous integration and testing.','shield-check',5)
) as f(title, description, icon, sort_order)
where s.slug = 'mobile-app-development';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Full-funnel Strategy','Top of funnel to retention.','filter',1),
    ('Creative Production','Ads and assets that convert.','palette',2),
    ('Real-time Analytics','Know what is working daily.','monitor',3),
    ('CRO Landing Pages','Pages built to turn clicks into customers.','mouse-pointer-click',4),
    ('Weekly Experiments','Test, learn, scale.','flask-conical',5)
) as f(title, description, icon, sort_order)
where s.slug = 'digital-marketing';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Technical SEO','Sites that crawl and index cleanly.','server',1),
    ('Content Strategy','Keywords mapped to buying intent.','file-text',2),
    ('Structured Data','Rich results and schema markup.','braces',3),
    ('Authority Building','Earned links that move rankings.','link',4),
    ('Local SEO','Win the map pack in your area.','map-pin',5)
) as f(title, description, icon, sort_order)
where s.slug = 'seo';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('High-converting Checkout','Remove friction, lift revenue.','shopping-cart',1),
    ('Secure Payments','PCI-compliant from the start.','lock',2),
    ('Subscriptions Built In','Recurring revenue out of the box.','repeat',3),
    ('Inventory Automation','Never oversell again.','package',4),
    ('Marketing Integrations','Email, ads, and analytics connected.','plug-zap',5)
) as f(title, description, icon, sort_order)
where s.slug = 'e-commerce-development';

insert into public.service_features (service_id, title, description, icon, sort_order, is_active)
select s.id, f.title, f.description, f.icon, f.sort_order, true
from public.services s
cross join (
  values
    ('Workflow Mapping','See where time is wasted.','map',1),
    ('System Integrations','Connect your SaaS stack.','plug',2),
    ('Custom Internal Tools','Dashboards and admin panels.','layout-dashboard',3),
    ('Error-proofing','Validation at every step.','shield-alert',4),
    ('Scale with You','Automations grow with your team.','trending-up',5)
) as f(title, description, icon, sort_order)
where s.slug = 'business-automation';

-- FAQs ----------------------------------------------------------
insert into public.faqs (question, answer, product_id, sort_order, is_active)
select f.question, f.answer, p.id, f.sort_order, true
from public.products p
cross join (
  values
    ('What is this product?','This is a ready-made software product built by our senior engineering team, fully customizable to your business.'),
    ('Can the product be customized?','Yes. Every product can be customized — branding, features, workflows and integrations are tailored to your requirements.'),
    ('Do you offer a demo?','Absolutely. Contact us and we will schedule a live walkthrough of the product.'),
    ('How long does deployment take?','Most products can be deployed within 1–3 weeks depending on customization.'),
    ('Is training included?','Yes, every deployment includes staff training and comprehensive documentation.'),
    ('Do you provide ongoing support?','We offer maintenance plans that cover updates, backups, and priority support.')
) as f(question, answer, sort_order)
where p.slug = 'restaurant-pos-system';

insert into public.faqs (question, answer, product_id, sort_order, is_active)
select f.question, f.answer, p.id, f.sort_order, true
from public.products p
cross join (
  values
    ('What is this product?','A complete school management platform covering admissions, attendance, exams, fees, and parent communication.'),
    ('Does it support multiple branches?','Yes, the system supports multiple campuses with centralized or per-branch control.'),
    ('Can it integrate with our existing system?','We can migrate data from spreadsheets or existing school software.'),
    ('Is it hosted on the cloud?','Yes, it is cloud-hosted with automatic backups and 99.9% uptime.'),
    ('Do you provide training for teachers?','Yes, we train staff on every module, plus provide video guides.'),
    ('How is data kept secure?','Data is encrypted at rest and in transit with role-based access controls.')
) as f(question, answer, sort_order)
where p.slug = 'school-management-system';

insert into public.faqs (question, answer, product_id, sort_order, is_active)
select f.question, f.answer, p.id, f.sort_order, true
from public.products p
cross join (
  values
    ('What is this product?','A real-time inventory management platform for businesses with single or multiple warehouses.'),
    ('Can I import my existing inventory?','Yes, we provide Excel import to migrate existing stock data in minutes.'),
    ('Does it support barcode scanning?','Yes, it works with USB, Bluetooth and mobile camera scanners.'),
    ('Will it alert me when stock is low?','Automatically. You set minimum levels and receive alerts and purchase suggestions.'),
    ('Can multiple users access it?','Yes, with role-based permissions for staff, managers and admins.'),
    ('Is it cloud-based?','Yes, accessible from any device with an internet connection.')
) as f(question, answer, sort_order)
where p.slug = 'inventory-management-system';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('How does your development process work?','We follow a sprint-based process: discovery, strategy, design, development, testing, launch, and growth. You see demos weekly.'),
    ('How long does a typical project take?','A typical custom application takes 6–12 weeks depending on scope. An MVP can be ready in as little as 2–3 weeks.'),
    ('Can you work with an existing system?','Yes. We regularly integrate with and extend existing systems and legacy platforms.'),
    ('Do you provide ongoing maintenance?','Yes, we offer flexible support and maintenance plans for every project we ship.'),
    ('How do you determine project pricing?','Pricing is based on scope, complexity, and timeline. We provide a fixed quote after discovery — no surprises.'),
    ('Can you create a custom solution?','Yes, custom software development is our core service. Everything is tailored to your processes.')
) as f(question, answer, sort_order)
where s.slug = 'custom-software-development';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('How long does a website take to build?','A landing page takes 1–2 weeks; a company website 3–5 weeks; a full platform 6+ weeks.'),
    ('Will my website be SEO ready?','Yes. Every build follows SEO-first architecture with metadata, structured data and fast load times.'),
    ('Can I edit content myself?','Yes, we build with a CMS so you can update content without touching code.'),
    ('Do you redesign existing websites?','Yes, we redesign and re-platform existing sites, preserving SEO value.'),
    ('Is hosting included?','We set up hosting on your preferred platform (Vercel, AWS, Netlify) and handle deployment.'),
    ('What if I need changes after launch?','We offer support plans for ongoing edits, features, and optimization.')
) as f(question, answer, sort_order)
where s.slug = 'web-development';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('Do you build for both iOS and Android?','Yes, we use cross-platform technology so one codebase powers both stores.'),
    ('How long does an MVP take?','A mobile MVP typically takes 4–8 weeks.'),
    ('Will you handle app store submission?','Yes, we manage both App Store and Google Play submission.'),
    ('Can you update my existing app?','Absolutely. We take over and improve existing apps, fixing issues and adding features.'),
    ('How much does app development cost?','MVP apps start at $8,000; full apps at $20,000+, depending on features.'),
    ('Do you include analytics and push notifications?','Yes, analytics, crash reporting and push notifications are included.')
) as f(question, answer, sort_order)
where s.slug = 'mobile-app-development';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('What channels do you manage?','Google Ads, Meta, LinkedIn, email, content, and SEO — whatever fits your goals.'),
    ('When will I see results?','Paid channels show results in 2–4 weeks; SEO compounds over 3–6 months.'),
    ('How do you report results?','You get a live dashboard plus a monthly report focused on revenue, not vanity metrics.'),
    ('Do you require a long-term contract?','No, we work month-to-month after the initial setup period.'),
    ('Can you work with my existing campaigns?','Yes, we audit and optimize campaigns you already run.'),
    ('What is your typical ad budget recommendation?','We recommend a minimum ad spend aligned to your revenue goals and will advise during strategy.')
) as f(question, answer, sort_order)
where s.slug = 'digital-marketing';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('How long until I rank on Google?','Most clients see meaningful movement in 3–6 months; competitive keywords take longer.'),
    ('Do you guarantee rankings?','We never guarantee specific rankings, but we guarantee execution and transparent reporting.'),
    ('What does an SEO audit include?','Technical crawl, on-page, content, backlinks, and keyword opportunity analysis.'),
    ('Do you write content too?','Yes, we provide SEO-optimized content as part of our monthly plans.'),
    ('Can you fix my penalized site?','Yes, we identify the cause and run a full recovery strategy.'),
    ('Is SEO a one-time service?','Ongoing SEO outperforms one-time fixes because competitors keep moving.')
) as f(question, answer, sort_order)
where s.slug = 'seo';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('Which platform do you recommend?','We recommend based on your catalog size, budget, and growth plans — Shopify, headless, or custom.'),
    ('Can you migrate my existing store?','Yes, we migrate products, customers, orders and SEO with zero downtime planning.'),
    ('Do you integrate payment gateways?','Stripe, PayPal, Razorpay, and regional gateways are all supported.'),
    ('Can I sell subscriptions?','Yes, we build subscription billing for products or services.'),
    ('Will my store be fast?','We optimize for sub-second loads on mobile and desktop.'),
    ('Do you provide training?','Yes, we train your team on managing products, orders, and the backend.')
) as f(question, answer, sort_order)
where s.slug = 'e-commerce-development';

insert into public.faqs (question, answer, service_id, sort_order, is_active)
select f.question, f.answer, s.id, f.sort_order, true
from public.services s
cross join (
  values
    ('What can I automate?','Almost anything: lead follow-ups, invoicing, reporting, data entry, approvals, and cross-system syncing.'),
    ('Do you work with my existing tools?','Yes, we connect whatever you use — CRM, accounting, spreadsheets, email, and more.'),
    ('How long does an automation take?','Quick wins take days; larger workflows take 2–4 weeks.'),
    ('Will it scale as we grow?','Yes, we build automations that handle volume growth without breaking.'),
    ('Is my data safe?','We follow least-privilege access and never store unnecessary data.'),
    ('Do you provide documentation?','Every automation ships with documentation and training for your team.')
) as f(question, answer, sort_order)
where s.slug = 'business-automation';

-- Testimonials --------------------------------------------------
insert into public.testimonials (client_name, designation, company, avatar, testimonial, rating, is_featured, is_active, sort_order) values
('Sarah Mitchell','COO','Brightleaf Restaurants','https://i.pravatar.cc/150?img=47',
 'Nexus Digital rebuilt our entire restaurant management stack. Table turnover is up 20% and inventory shrinkage is down. The team is technical, responsive, and truly partners with you.',
 5, true, true, 10),
('James Carter','Founder','Carter & Co. Logistics','https://i.pravatar.cc/150?img=12',
 'Their custom inventory system paid for itself in the first quarter. We finally have real visibility across all our warehouses. Worth every penny.',
 5, true, true, 20),
('Amelia Rodriguez','Head of Marketing','Bloom Beauty','https://i.pravatar.cc/150?img=32',
 'Our organic traffic grew 3x in six months with their SEO and content engine. Reporting is transparent and the ROI is undeniable.',
 5, true, true, 30),
('David Okafor','CEO','EduBridge Academy','https://i.pravatar.cc/150?img=59',
 'The school management system transformed how we operate. Attendance, fees, and parent communication now run on autopilot. Highly recommended.',
 4, true, true, 40);

-- Team members --------------------------------------------------
insert into public.team_members (name, designation, bio, photo, linkedin, github, sort_order, is_active) values
('Aiden Brooks','Founder & CEO','Ex-Google engineer with 12+ years building products that scale.', 'https://i.pravatar.cc/400?img=11', 'https://linkedin.com/in/aidenbrooks', 'https://github.com/aidenbrooks', 10, true),
('Maya Chen','Head of Engineering','Full-stack architect obsessed with clean systems and fast software.', 'https://i.pravatar.cc/400?img=45', 'https://linkedin.com/in/mayachen', 'https://github.com/mayachen', 20, true),
('Omar Hassan','Creative Director','Design leader crafting premium, conversion-focused experiences.', 'https://i.pravatar.cc/400?img=13', 'https://linkedin.com/in/omarhassan', null, 30, true),
('Priya Patel','Growth Lead','Data-driven marketer who turns campaigns into revenue.', 'https://i.pravatar.cc/400?img=30', 'https://linkedin.com/in/priyapatel', null, 40, true);
