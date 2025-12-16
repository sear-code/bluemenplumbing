# Blue Men Plumbing

## Project Description
It is a website for a plumbing company

## Product Requirements Document
PRD: Blue Men Plumbing Website

1.  INTRODUCTION

    This document outlines the Product Requirements for the "Blue Men Plumbing" website. The primary goal is to establish a robust and professional online presence for Blue Men Plumbing, enabling potential and existing customers to easily access information about services, request quotes, book appointments, and contact for emergency services. This website will serve as a key tool for customer acquisition and engagement.

2.  GOALS & OBJECTIVES

    2.1. PRIMARY GOAL

    To create a user-friendly, responsive, and functional website that serves as the central online hub for Blue Men Plumbing.
    

    2.2. SPECIFIC OBJECTIVES

    *   To provide comprehensive information about Blue Men Plumbing's services.

    *   To facilitate online quote requests for plumbing services.

    *   To enable customers to book non-emergency plumbing appointments online.

    *   To provide a prominent and clear pathway for emergency service contact.

    *   To showcase the company's professionalism and build customer trust.

    *   To ensure the website is fully responsive and accessible across all device types (desktop, tablet, mobile).

    *   To provide an administrative interface for managing core website functionalities and customer interactions.

3.  TARGET AUDIENCE

    *   **Primary Users**: Residential homeowners in need of plumbing services.

    *   **User Scenarios**: Individuals seeking routine maintenance, specific repairs, installations, or immediate emergency plumbing assistance.

4.  CORE FEATURES & FUNCTIONALITY

    4.1. HOME PAGE

    *   Clear header with logo, navigation, and prominent emergency contact number.

    *   Hero section with a clear value proposition and call-to-action (e.g., "Request a Quote", "Book Now", "Emergency Service").

    *   Overview of key services.

    *   Testimonials or customer reviews section.

    *   Brief "About Us" section.

    *   Footer with contact information, social media links, and quick navigation.
    

    4.2. SERVICES PAGE(S)

    *   A main "Services" page listing all plumbing services offered (content will be provided).

    *   Individual service detail pages for each major service, providing detailed descriptions, benefits, and potentially pricing models or starting rates.

    *   Call-to-actions on each service page to "Request a Quote" or "Book Service".
    

    4.3. ONLINE QUOTING SYSTEM

    *   A dedicated "Request a Quote" form.

    *   Fields: Customer Name, Email, Phone Number, Service Type (dropdown/multi-select), Detailed Description of Issue, Preferred Date/Time (optional).

    *   Submission sends an inquiry to the admin panel and a notification to the designated Blue Men Plumbing email address.

    *   Confirmation message to the user upon successful submission.
    

    4.4. ONLINE BOOKING SYSTEM

    *   A dedicated "Book Service" form for non-emergency appointments.

    *   Fields: Customer Name, Email, Phone Number, Service Type, Preferred Date & Time Slot (calendar/time picker).

    *   Availability should ideally be managed via the admin panel.

    *   Submission creates a booking record in the admin panel and sends notifications to both the customer and Blue Men Plumbing.

    *   Booking confirmation sent to the customer via email.
    

    4.5. EMERGENCY SERVICE CONTACT

    *   Highly visible and clickable emergency phone number on all pages (especially in the header).

    *   A dedicated "Emergency Services" page (or section) detailing what constitutes an emergency and clear instructions on what to do.
    

    4.6. ABOUT US PAGE

    *   Company history, mission, values, and team information (if applicable).

    *   Focus on building trust and credibility.
    

    4.7. TESTIMONIALS/REVIEWS

    *   Section to display customer testimonials.

    *   Ability to add new testimonials via the admin panel.
    

    4.8. CONTACT US PAGE

    *   Contact form for general inquiries (Name, Email, Subject, Message).

    *   Phone number, email address, physical address (if applicable).

    *   Operating hours.

    *   Embedded map (e.g., Google Maps).
    

    4.9. FAQ (FREQUENTLY ASKED QUESTIONS) SECTION

    *   Categorized list of common plumbing questions and answers.

    *   Content manageable via the admin panel.

5.  USER FLOWS / USER STORIES

    *   As a homeowner, I want to browse available services so I can understand if Blue Men Plumbing can address my needs.

    *   As a homeowner, I want to request a detailed quote for a specific plumbing job so I can plan my budget.

    *   As a homeowner, I want to book a non-emergency service appointment online at my convenience so I don't have to call during business hours.

    *   As a homeowner facing a plumbing emergency, I want to quickly find the emergency contact number so I can get immediate assistance.

    *   As a potential customer, I want to read testimonials from previous clients so I can trust the service quality.

    *   As a visitor, I want to easily find contact information (phone, email, address) so I can reach Blue Men Plumbing directly.

    *   As an administrator, I want to receive notifications and view new quote requests so I can respond promptly.

    *   As an administrator, I want to view and manage all online bookings so I can schedule technicians efficiently.

    *   As an administrator, I want to easily update website content (services, FAQs, testimonials, general text) so the site remains current.

6.  DESIGN & USER EXPERIENCE (UX) REQUIREMENTS

    *   **Branding**: The website design must strictly adhere to Blue Men Plumbing's existing brand guidelines, incorporating the provided logos and preferred color palette.

    *   **Responsiveness**: The entire website must be fully responsive, ensuring optimal viewing and interaction across all devices and screen sizes (desktops, laptops, tablets, smartphones).

    *   **Navigation**: Intuitive, clear, and consistent navigation structure that allows users to easily find information and perform desired actions.

    *   **Visuals**: Professional, clean, and modern aesthetic. Use of high-quality, relevant imagery that conveys trustworthiness and expertise.

    *   **Call-to-Actions (CTAs)**: Prominent and clear CTAs for key actions (e.g., "Get a Free Quote", "Book Now", "Call for Emergency").

    *   **Accessibility**: Adherence to basic web accessibility standards to ensure usability for a broad audience.

7.  TECHNICAL REQUIREMENTS

    *   **Frontend**: HTML5, CSS3, JavaScript. Use of a responsive framework (e.g., Bootstrap, Tailwind CSS) is highly recommended.

    *   **Backend**: Selection of a robust and secure backend framework (e.g., PHP/Laravel, Python/Django, Node.js/Express) suitable for content management and form processing.

    *   **Database**: A reliable relational database (e.g., MySQL, PostgreSQL) for storing content, bookings, quotes, and admin data.

    *   **Hosting**: Reliable web hosting provider with sufficient bandwidth and storage.

    *   **Security**: Implementation of SSL/TLS certificate for secure data transmission (HTTPS).

    *   **Performance**: Website must be optimized for fast loading times, including optimized images and efficient code.

    *   **SEO**: Basic search engine optimization (SEO) best practices applied, including clean URLs, meta titles/descriptions, and sitemap generation.

    *   **Scalability**: The architecture should be designed to allow for future expansion of features (e.g., online payments, advanced scheduling, multi-location support) without significant re-engineering.

    *   **No specific third-party integrations** are required at this stage, but the architecture should allow for future integration (e.g., CRM, payment gateways).

8.  ADMIN PANEL REQUIREMENTS

    A small, intuitive admin panel will be required to manage website content and customer interactions.

    *   **Secure Login/Logout**: Authentication for authorized users.

    *   **Dashboard**: An overview summarizing new quote requests, new bookings, and recent messages.

    *   **Quote Management**: View all submitted quote requests, mark as processed/responded, and access contact details for follow-up.

    *   **Booking Management**: View all submitted bookings, confirm/cancel bookings, and access customer and service details.

    *   **Content Management System (CMS)**: Ability to edit textual content on various pages (e.g., About Us, Contact Us, Home page sections).

    *   **Services Management**: Add, edit, or remove services listed on the website.

    *   **FAQ Management**: Add, edit, or remove FAQ entries.

    *   **Testimonial Management**: Add, edit, or remove customer testimonials.

    *   **User Management**: Basic management of admin user accounts (e.g., add/remove admin users).

9.  CONTENT REQUIREMENTS

    *   **Existing Content**: Logos, preferred color palette, and initial text content for services will be provided by Blue Men Plumbing.

    *   **Additional Content**: New content will need to be developed and integrated, including:
        *   Detailed descriptions for all plumbing services.

        *   Answers for the FAQ section.

        *   Additional testimonials.

        *   Specific guidelines or instructions for emergency services.

        *   Any promotional or seasonal content as needed.

10. PERFORMANCE & SCALABILITY

    *   **Performance**: The website must offer a smooth and fast user experience. Page load times should be minimal to reduce bounce rates and improve user satisfaction.

    *   **Scalability**: While initial traffic may be moderate, the system architecture should be capable of handling increased traffic and data volumes as the business grows, and accommodate future feature enhancements without significant redevelopment.

11. TIMELINE & MAINTENANCE

    *   **Timeline**: The project is targeted for completion within 3 months from the start date.

    *   **Maintenance**: Blue Men Plumbing will undertake ongoing maintenance of the website. The system should be built with ease of maintenance in mind, providing clear admin interfaces and potentially documentation for self-support.

## Technology Stack
TECHNOLOGY STACK DOCUMENT: Blue Men Plumbing

This document outlines the recommended technology stack for the "Blue Men Plumbing" website project. The choices are based on factors such as development efficiency (given a 3-month timeline), ease of self-maintenance, responsiveness across devices, the need for a small administrative panel, and core features like quoting and booking services.

--- 

**1. Frontend Technologies (Client-Side)**

*   **Vue.js (v3)**
    *   **Justification**: Vue.js is a progressive JavaScript framework known for its excellent documentation, gentle learning curve, and component-based architecture. This allows for efficient development of interactive elements like quoting forms, booking interfaces, and dynamic service listings. Its reactivity system ensures a smooth user experience. Given the self-maintenance aspect, Vue's clear structure and active community support will be highly beneficial. It enables building a responsive and engaging user interface that effectively highlights services and facilitates customer interaction.

*   **Tailwind CSS (v3)**
    *   **Justification**: Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your HTML. This approach significantly speeds up UI development and ensures consistency. It's highly customizable, allowing for seamless integration of "Blue Men Plumbing's" existing logos and preferred color palette. Its responsive utilities make it straightforward to ensure the website is fully functional and visually appealing across all devices, addressing the responsiveness requirement.

*   **HTML5, CSS3, JavaScript (ES6+)**
    *   **Justification**: These are the foundational web technologies. HTML5 provides the semantic structure for content, CSS3 handles styling and layout (augmented by Tailwind CSS), and modern JavaScript (ES6+) powers the interactivity and dynamic aspects of the Vue.js application. Mastery of these fundamentals is assumed for robust web development.

--- 

**2. Backend Technologies (Server-Side)**

*   **Python (v3.9+) with Django Framework (v4.x)**
    *   **Justification**: Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It's a "batteries-included" framework, meaning it comes with many built-in features that simplify common web development tasks. Its standout feature for this project is its powerful and customizable **built-in admin panel**, which directly addresses the requirement for a "small admin panel" for managing content, bookings, quotes, and customer information with minimal effort. Django's robust ORM (Object-Relational Mapper) simplifies database interactions, and its strong security features ensure data integrity and user safety. Python's readability and Django's comprehensive documentation make it an excellent choice for self-maintenance and long-term viability.

*   **Django REST Framework (DRF)**
    *   **Justification**: While not a core backend technology, DRF is a powerful and flexible toolkit for building Web APIs in Django. It will be used to create the RESTful APIs that allow the Vue.js frontend to communicate securely and efficiently with the Django backend for operations like submitting quotes, managing bookings, and retrieving service information. This separation of concerns (frontend consuming backend API) is a modern best practice.

--- 

**3. Database**

*   **PostgreSQL (v14+)**
    *   **Justification**: PostgreSQL is a powerful, open-source, object-relational database system known for its strong reputation for reliability, feature robustness, and performance. It is an excellent choice for storing structured data such as customer information, service details, booking schedules, and quote requests. Its advanced indexing capabilities, support for JSONB (for flexible data storage if needed), and transactional integrity make it highly suitable for a business-critical application. PostgreSQL integrates seamlessly with Django, leveraging Django's ORM for efficient data management and queries. It provides a scalable foundation for future growth of the website's data needs.

--- 

**4. Deployment & Infrastructure**

*   **Docker & Docker Compose**
    *   **Justification**: Docker will be used for containerization of both the frontend and backend applications, along with the PostgreSQL database. This ensures consistency between development, testing, and production environments, eliminating "it works on my machine" issues. Docker Compose simplifies the orchestration of multi-container applications, making setup and deployment more manageable for a single maintainer.

*   **DigitalOcean Droplets (or similar VPS provider)**
    *   **Justification**: A Virtual Private Server (VPS) like DigitalOcean Droplets offers a balance of control, performance, and cost-effectiveness. It provides the flexibility to host both the Django backend and serve the Vue.js frontend (e.g., via Nginx or Caddy reverse proxy) from the same server. This allows for direct control over the server environment, necessary for custom configurations and ensuring optimal performance. DigitalOcean's user-friendly interface and comprehensive documentation assist with self-management.

*   **Nginx (or Caddy)**
    *   **Justification**: Nginx (or Caddy as a simpler alternative with automatic HTTPS) will serve as the web server for the Django application (handling static files and proxying requests to the Django backend via Gunicorn/uWSGI) and will also serve the static assets of the Vue.js frontend. It is highly performant and reliable, crucial for ensuring fast load times and handling concurrent user requests effectively.

*   **Git & GitHub/GitLab**
    *   **Justification**: Git is the industry standard for version control, allowing for tracking changes, collaborating (even solo), and easy rollback. GitHub or GitLab will host the project's repositories, providing cloud-based version control, issue tracking, and potentially CI/CD pipelines for automated deployment, streamlining the development and maintenance workflow.

--- 

**5. Development Tools & Practices**

*   **Visual Studio Code (VS Code)**
    *   **Justification**: A lightweight yet powerful code editor with extensive extensions for Python, JavaScript, Vue.js, Docker, and Git integration. It provides an efficient and productive development environment.

*   **Prettier & ESLint**
    *   **Justification**: For code formatting and linting. These tools ensure consistent code style and help catch potential errors early, which is vital for maintaining a clean and readable codebase, especially when self-maintaining.

*   **Figma (for UI/UX design)**
    *   **Justification**: Even with existing logos and preferred colors, Figma can be used to prototype page layouts, user flows (e.g., for quoting and booking), and refine UI elements before coding. This ensures a well-thought-out user experience aligned with the "Blue Men Plumbing" brand.

*   **Agile Methodology (Simplified)**
    *   **Justification**: Given the 3-month timeline and self-maintenance, adopting a simplified agile approach (e.g., using a tool like Trello for task tracking) can help manage the project scope, prioritize features, and ensure consistent progress towards the core functionalities (quoting, booking, emergency services).

## Project Structure
PROJECTSTRUCTURE

This document outlines the file and folder organization for the "Blue Men Plumbing" website project. A well-defined structure ensures maintainability, scalability, and ease of collaboration.

**Root Directory**
*   `./`
    *   `README.md`: Project overview, setup instructions, and deployment details.
    *   `package.json`: Defines project metadata, scripts, and dependencies.
    *   `package-lock.json` or `yarn.lock`: Records the exact versions of dependencies.
    *   `.env`: Environment variables (e.g., API keys, configuration settings) for local development.
    *   `.gitignore`: Specifies intentionally untracked files and directories to ignore.
    *   `webpack.config.js` / `vite.config.js` / `next.config.js` (or similar): Build configuration file, depending on the chosen framework/bundler.

**`public/`**
This directory holds static assets that are served directly by the web server without being processed by the build pipeline. These files are typically copied as-is to the final build output.
*   `./public/`
    *   `index.html`: The main HTML file, the entry point for the web application.
    *   `robots.txt`: Directives for web crawlers/search engines.
    *   `sitemap.xml`: XML file listing all URLs on the site for search engines (can be generated).
    *   `manifest.json`: Web App Manifest for Progressive Web App (PWA) features.
    *   `favicon.ico`: Website favicon.

**`src/`**
This is the core directory containing all the source code for the application. It's structured to logically separate different aspects of the codebase.
*   `./src/`
    *   `main.js` or `index.js`: The main entry point of the JavaScript application, where the root component is mounted.
    *   `App.jsx` or `App.vue`: The root component of the application, typically defining global layout and routing.

    *   **`./src/assets/`**
        Contains all static assets like images, fonts, and icons specific to the application. This is where the provided logos and future imagery will reside.
        *   `./src/assets/images/`: Logos (Blue Men Plumbing logo), background images, service-specific illustrations, team photos.
        *   `./src/assets/icons/`: SVG or icon font files for UI elements (e.g., phone, wrench, calendar icons).
        *   `./src/assets/fonts/`: Custom web fonts used in the design.

    *   **`./src/components/`**
        Houses reusable UI components that can be used across different pages. Components are typically grouped by their purpose or context.
        *   `./src/components/common/`: Highly reusable, general-purpose components (e.g., `Button.jsx`, `Modal.jsx`, `Input.jsx`, `LoadingSpinner.jsx`, `Alert.jsx`).
        *   `./src/components/layout/`: Components defining the overall page structure (e.g., `Header.jsx`, `Footer.jsx`, `Navbar.jsx`, `HeroSection.jsx`).
        *   `./src/components/services/`: Components specific to displaying services (e.g., `ServiceCard.jsx`, `ServiceDetailsDisplay.jsx`).
        *   `./src/components/forms/`: Components for quoting, booking, and contact forms (e.g., `QuoteForm.jsx`, `BookingForm.jsx`, `ContactForm.jsx`).
        *   `./src/components/admin/`: Components specific to the admin panel (e.g., `AdminLogin.jsx`, `BookingTable.jsx`, `QuoteRequestCard.jsx`, `UserManagement.jsx`).

    *   **`./src/pages/`**
        Contains the main page components, each representing a distinct route or view in the application. These pages combine various components to form a complete view.
        *   `./src/pages/HomePage.jsx`: The landing page, providing an overview of services and calls to action for quoting, booking, and emergencies.
        *   `./src/pages/ServicesPage.jsx`: Lists all plumbing services offered by Blue Men Plumbing.
        *   `./src/pages/ServiceDetailPage.jsx`: Detailed view for a specific service (e.g., "Drain Cleaning", "Water Heater Repair").
        *   `./src/pages/AboutPage.jsx`: Information about Blue Men Plumbing, its mission, and team.
        *   `./src/pages/ContactPage.jsx`: Contact information, location, and a general inquiry form.
        *   `./src/pages/QuotePage.jsx`: Dedicated page for residential homeowners to request a detailed quote for services.
        *   `./src/pages/BookingPage.jsx`: Page for homeowners to book non-emergency services online, potentially with calendar integration.
        *   `./src/pages/EmergencyPage.jsx`: Dedicated page for emergency services, prominently featuring the emergency contact number and what to expect.
        *   `./src/pages/NotFoundPage.jsx`: 404 error page for non-existent routes.
        *   `./src/pages/AdminLoginPage.jsx`: Login page for the small admin panel.
        *   `./src/pages/AdminDashboardPage.jsx`: Main entry point for the admin panel, showing an overview of recent activities.
        *   `./src/pages/AdminBookingsPage.jsx`: Admin view for managing incoming and scheduled service bookings.
        *   `./src/pages/AdminQuotesPage.jsx`: Admin view for reviewing and responding to quote requests.
        *   `./src/pages/AdminContentPage.jsx`: Admin view for managing website content (e.g., services, testimonials, FAQs).

    *   **`./src/styles/`**
        Manages all global and component-specific styling. The preferred colors will be defined and managed here.
        *   `./src/styles/global.css`: Global styles, CSS resets, and base typography defaults.
        *   `./src/styles/variables.css` or `theme.css`: CSS variables for defining the preferred colors, fonts, spacing units, and breakpoints for responsiveness.
        *   `./src/styles/mixins.css`: Reusable CSS snippets (if using a preprocessor like SCSS/LESS).
        *   `./src/styles/typography.css`: Specific typographic rules for headings, body text, etc.
        *   `./src/styles/components/`: Directory for component-specific styles (e.g., `Button.module.css`, `Header.css`).
        *   `./src/styles/pages/`: Directory for page-specific styles (e.g., `HomePage.css`).
        *   `./src/styles/responsive.css`: Styles containing media queries and other adjustments to ensure responsiveness across devices.

    *   **`./src/utils/`**
        Contains utility functions, helper methods, and common logic that can be shared across the application.
        *   `./src/utils/api.js`: Functions for interacting with backend APIs (e.g., `fetchServices`, `submitBooking`, `submitQuote`).
        *   `./src/utils/helpers.js`: General utility functions (e.g., `formatDate`, `validateEmail`, `scrollToTop`).
        *   `./src/utils/constants.js`: Application-wide constants (e.g., service categories, form validation rules).

    *   **`./src/hooks/`** (If using React/Vue and custom hooks)
        Custom reusable logic that can be shared across components to manage state and side effects.
        *   `./src/hooks/useFormValidation.js`: Hook for handling form input validation.
        *   `./src/hooks/useAuth.js`: Hook for managing user authentication state and login/logout logic for the admin panel.
        *   `./src/hooks/useFetchData.js`: Generic hook for fetching data from APIs.

    *   **`./src/context/` or `./src/store/`** (If using state management like React Context, Redux, Vuex, Zustand, etc.)
        Manages global application state, essential for shared data like user authentication or site-wide notifications.
        *   `./src/context/AuthContext.jsx`: Context for user authentication state (primarily for the admin panel).
        *   `./src/context/ServiceContext.jsx`: Context for managing available services data if fetched dynamically.

    *   **`./src/routes/`** (If routing is externalized, e.g., in a separate file from `App.jsx`)
        Defines the application's routing logic and structure.
        *   `./src/routes/index.jsx`: Main routing configuration for public-facing pages.
        *   `./src/routes/privateRoutes.jsx`: Routes requiring authentication (e.g., admin panel routes), potentially including logic for redirection.

    *   **`./src/data/`**
        Stores static or mock data used throughout the application, such as the initial service listings, testimonials, or FAQs. This will serve as the initial content and can be augmented or replaced by a backend.
        *   `./src/data/services.js`: Array of service objects with descriptions, potential pricing, and relevant images.
        *   `./src/data/testimonials.js`: Customer testimonials to build trust.
        *   `./src/data/faq.js`: Frequently asked questions and answers.

**`dist/` or `build/`**
This directory is generated during the build process and contains the optimized, production-ready version of the website. It's what gets deployed to the web server.
*   `./dist/`
    *   `index.html`: The minified main HTML file.
    *   `static/`: Directory containing minified and bundled JavaScript, CSS, and optimized assets.
        *   `./dist/static/js/`: Bundled and minified JavaScript files.
        *   `./dist/static/css/`: Bundled and minified CSS files.
        *   `./dist/static/media/`: Optimized images, fonts, etc.

**`docs/`**
This directory contains project documentation, including this "PROJECTSTRUCTURE" document, API documentation, design specifications, and other relevant project notes.
*   `./docs/`
    *   `PROJECTSTRUCTURE.md`: This document.
    *   `API_SPEC.md`: Documentation for any backend APIs used or exposed (e.g., for booking, quoting).
    *   `DESIGN_GUIDELINES.md`: Detailed design specifications, including brand guidelines for "Blue Men Plumbing" (specific color hex codes, typography rules, logo usage rules derived from provided assets).
    *   `MAINTENANCE.md`: Notes on ongoing maintenance procedures, common issues, and troubleshooting.

**`config/`**
Contains configuration files for various development tools and environments, separate from `.env` for more complex setups.
*   `./config/`
    *   `eslint.config.js` or `.eslintrc.js`: ESLint configuration for code linting.
    *   `prettier.config.js`: Prettier configuration for code formatting.
    *   `jest.config.js` (or similar): Test runner configuration if unit/integration tests are implemented.

This comprehensive structure provides a clear roadmap for developing and maintaining the "Blue Men Plumbing" website, ensuring all project requirements, including responsive design, admin capabilities, and core service features (quoting, booking, emergency services), are addressed in an organized manner.

## Database Schema Design
SCHEMADESIGN

This section outlines the proposed database schema design for the "Blue Men Plumbing" website. The design focuses on robust data models, clear relationships, and an organized structure to support core functionalities like quoting, booking, emergency services, and content management for residential homeowners and internal administration.

1. Core Entities and Attributes

Below are the primary tables and their key attributes. Data types are indicative and may vary based on the chosen database system (e.g., PostgreSQL, MySQL).

1.1. Users (Customers)
This table stores information for registered residential customers who can request quotes, book services, or manage their profiles.
*   `user_id` (Primary Key, INT, AUTO_INCREMENT)
*   `first_name` (VARCHAR(100), NOT NULL)
*   `last_name` (VARCHAR(100), NOT NULL)
*   `email` (VARCHAR(255), UNIQUE, NOT NULL)
*   `password_hash` (VARCHAR(255), NOT NULL) - Stores hashed password
*   `phone_number` (VARCHAR(20))
*   `address_street` (VARCHAR(255))
*   `address_city` (VARCHAR(100))
*   `address_state_province` (VARCHAR(100))
*   `address_zip_postal_code` (VARCHAR(20))
*   `registration_date` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `account_status` (ENUM(\"Active\", \"Inactive\", \"Suspended\"), NOT NULL, DEFAULT \"Active\")

1.2. AdminUsers
This table manages access for internal administrators who handle quotes, bookings, content, and system settings.
*   `admin_id` (Primary Key, INT, AUTO_INCREMENT)
*   `username` (VARCHAR(100), UNIQUE, NOT NULL)
*   `password_hash` (VARCHAR(255), NOT NULL)
*   `email` (VARCHAR(255), UNIQUE, NOT NULL)
*   `role` (ENUM(\"SuperAdmin\", \"Scheduler\", \"ContentManager\"), NOT NULL, DEFAULT \"Scheduler\")
*   `last_login` (DATETIME)
*   `created_at` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

1.3. Services
This table lists all plumbing services offered by Blue Men Plumbing.
*   `service_id` (Primary Key, INT, AUTO_INCREMENT)
*   `service_name` (VARCHAR(255), UNIQUE, NOT NULL)
*   `description` (TEXT)
*   `estimated_price_min` (DECIMAL(10, 2)) - Optional, for "starting from" pricing
*   `estimated_price_max` (DECIMAL(10, 2)) - Optional, for price range
*   `estimated_duration_minutes` (INT)
*   `category` (ENUM(\"Emergency\", \"Repair\", \"Installation\", \"Maintenance\", \"Inspection\", \"Drainage\"), NOT NULL, DEFAULT \"Repair\")
*   `is_emergency_service` (BOOLEAN, NOT NULL, DEFAULT FALSE)
*   `image_url` (VARCHAR(255)) - URL to a service-specific image/icon

1.4. Quotes
This table stores all quote requests made by customers.
*   `quote_id` (Primary Key, INT, AUTO_INCREMENT)
*   `user_id` (Foreign Key to Users, INT, NULLABLE) - Nullable for guest quotes
*   `guest_name` (VARCHAR(200)) - If `user_id` is NULL
*   `guest_phone` (VARCHAR(20)) - If `user_id` is NULL
*   `guest_email` (VARCHAR(255)) - If `user_id` is NULL
*   `problem_description` (TEXT, NOT NULL)
*   `requested_address_street` (VARCHAR(255), NOT NULL)
*   `requested_address_city` (VARCHAR(100), NOT NULL)
*   `requested_address_state_province` (VARCHAR(100), NOT NULL)
*   `requested_address_zip_postal_code` (VARCHAR(20), NOT NULL)
*   `preferred_date_time` (DATETIME) - Customer's preferred time
*   `quote_status` (ENUM(\"Pending\", \"Draft\", \"Submitted\", \"Reviewed\", \"Accepted\", \"Rejected\", \"Expired\", \"Cancelled\"), NOT NULL, DEFAULT \"Submitted\")
*   `quoted_price` (DECIMAL(10, 2))
*   `admin_id` (Foreign Key to AdminUsers, INT, NULLABLE) - Admin who reviewed/prepared the quote
*   `date_generated` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `date_accepted_rejected` (DATETIME)
*   `admin_notes` (TEXT)

1.5. QuoteServices (Linking Table for Quotes & Services)
Handles many-to-many relationship between Quotes and Services. A quote can include multiple services.
*   `quote_service_id` (Primary Key, INT, AUTO_INCREMENT)
*   `quote_id` (Foreign Key to Quotes, INT, NOT NULL)
*   `service_id` (Foreign Key to Services, INT, NOT NULL)
*   `quantity` (INT, DEFAULT 1) - If multiple units of a service are quoted
*   `custom_notes` (TEXT) - Specific to this service within the quote

1.6. Bookings (Appointments)
This table stores confirmed appointments for services.
*   `booking_id` (Primary Key, INT, AUTO_INCREMENT)
*   `user_id` (Foreign Key to Users, INT, NOT NULL)
*   `quote_id` (Foreign Key to Quotes, INT, NULLABLE) - If booking originated from a quote
*   `service_id` (Foreign Key to Services, INT, NOT NULL) - Main service for the booking (can be extended by `BookingServices`)
*   `scheduled_start_time` (DATETIME, NOT NULL)
*   `scheduled_end_time` (DATETIME, NOT NULL)
*   `booking_status` (ENUM(\"Pending Confirmation\", \"Confirmed\", \"Scheduled\", \"In Progress\", \"Completed\", \"Cancelled\", \"Rescheduled\"), NOT NULL, DEFAULT \"Pending Confirmation\")
*   `admin_id` (Foreign Key to AdminUsers, INT, NOT NULL) - Admin who confirmed/scheduled
*   `customer_notes` (TEXT)
*   `internal_notes` (TEXT)
*   `service_address_street` (VARCHAR(255), NOT NULL)
*   `service_address_city` (VARCHAR(100), NOT NULL)
*   `service_address_state_province` (VARCHAR(100), NOT NULL)
*   `service_address_zip_postal_code` (VARCHAR(20), NOT NULL)
*   `created_at` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `last_updated_at` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

1.7. BookingServices (Linking Table for Bookings & Services)
Handles many-to-many relationship between Bookings and Services. A single booking might involve multiple services (e.g., "Drain Cleaning" AND "Pipe Inspection").
*   `booking_service_id` (Primary Key, INT, AUTO_INCREMENT)
*   `booking_id` (Foreign Key to Bookings, INT, NOT NULL)
*   `service_id` (Foreign Key to Services, INT, NOT NULL)
*   `additional_details` (TEXT) - Specific details for this service within the booking

1.8. EmergencyRequests
This table captures immediate emergency service requests.
*   `emergency_id` (Primary Key, INT, AUTO_INCREMENT)
*   `user_id` (Foreign Key to Users, INT, NULLABLE) - Nullable for non-logged-in callers
*   `caller_name` (VARCHAR(200), NOT NULL)
*   `caller_phone` (VARCHAR(20), NOT NULL)
*   `problem_description` (TEXT, NOT NULL)
*   `service_address_street` (VARCHAR(255), NOT NULL)
*   `service_address_city` (VARCHAR(100), NOT NULL)
*   `service_address_state_province` (VARCHAR(100), NOT NULL)
*   `service_address_zip_postal_code` (VARCHAR(20), NOT NULL)
*   `request_timestamp` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `status` (ENUM(\"New\", \"Received\", \"Dispatched\", \"On-Site\", \"Resolved\", \"Closed\"), NOT NULL, DEFAULT \"New\")
*   `admin_id` (Foreign Key to AdminUsers, INT, NULLABLE) - Admin who handled the request
*   `resolution_notes` (TEXT)
*   `dispatched_time` (DATETIME)
*   `resolution_time` (DATETIME)

1.9. ContentPages
For managing static content pages (e.g., About Us, FAQ, Service Area).
*   `page_id` (Primary Key, INT, AUTO_INCREMENT)
*   `page_title` (VARCHAR(255), NOT NULL)
*   `slug` (VARCHAR(255), UNIQUE, NOT NULL) - URL-friendly identifier
*   `content_html` (LONGTEXT) - Stores the page content, potentially in HTML or rich text format
*   `last_modified_by_admin_id` (Foreign Key to AdminUsers, INT, NOT NULL)
*   `created_at` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `last_updated_at` (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
*   `is_published` (BOOLEAN, NOT NULL, DEFAULT TRUE)

2. Relationships (Foreign Key Mappings)

*   `Users.user_id` -> `Quotes.user_id` (One-to-Many: One user can have many quotes)
*   `Users.user_id` -> `Bookings.user_id` (One-to-Many: One user can have many bookings)
*   `Users.user_id` -> `EmergencyRequests.user_id` (One-to-Many: One user can submit many emergency requests)
*   `AdminUsers.admin_id` -> `Quotes.admin_id` (One-to-Many: One admin can manage many quotes)
*   `AdminUsers.admin_id` -> `Bookings.admin_id` (One-to-Many: One admin can manage many bookings)
*   `AdminUsers.admin_id` -> `EmergencyRequests.admin_id` (One-to-Many: One admin can manage many emergency requests)
*   `AdminUsers.admin_id` -> `ContentPages.last_modified_by_admin_id` (One-to-Many: One admin can modify many pages)
*   `Services.service_id` -> `QuoteServices.service_id` (One-to-Many: One service can be in many quotes)
*   `Quotes.quote_id` -> `QuoteServices.quote_id` (One-to-Many: One quote can have many services)
*   `Bookings.booking_id` -> `BookingServices.booking_id` (One-to-Many: One booking can have many services)
*   `Services.service_id` -> `BookingServices.service_id` (One-to-Many: One service can be in many bookings)
*   `Quotes.quote_id` -> `Bookings.quote_id` (One-to-One or One-to-Many: A quote can lead to a booking, or multiple bookings if a quote is fulfilled in stages)

3. General Data Types and Constraints

*   **Primary Keys:** Typically `INT` with `AUTO_INCREMENT` for unique identification.
*   **Foreign Keys:** `INT` to link related tables, often indexed for performance. `ON DELETE CASCADE` or `ON DELETE SET NULL` policies will be considered based on business rules (e.g., if a user is deleted, should their quotes also be deleted or orphaned?).
*   **Strings:** `VARCHAR` for fixed-length strings (names, emails, addresses), `TEXT` or `LONGTEXT` for larger blocks of text (descriptions, notes, page content). Appropriate length limits should be enforced.
*   **Numbers:** `INT` for whole numbers (quantities, durations), `DECIMAL(10, 2)` for currency values to ensure precision.
*   **Dates/Times:** `DATETIME` or `TIMESTAMP` for recording specific points in time. `DEFAULT CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP` will be used for audit trails.
*   **Booleans:** `BOOLEAN` or `TINYINT(1)` for true/false values.
*   **Enums:** `ENUM` types are used where possible to restrict values to a predefined set, ensuring data consistency (e.g., `quote_status`, `booking_status`).
*   **NOT NULL:** Applied to essential fields to ensure data integrity.
*   **UNIQUE:** Applied to fields that must contain unique values (e.g., email addresses, usernames, service names).
*   **Indexes:** Beyond primary and foreign keys, indexes will be applied to frequently queried columns (e.g., `user_id` in `Bookings`, `status` in `EmergencyRequests`) to optimize query performance.

4. Database Choice Recommendation

A **Relational Database Management System (RDBMS)** such as **PostgreSQL** or **MySQL** is highly recommended for this project.
*   **Structured Data:** The project's data is highly structured with clear relationships, which RDBMS excel at managing.
*   **Data Integrity:** Features like foreign key constraints, transactions, and data types ensure high data integrity.
*   **Scalability:** Both PostgreSQL and MySQL offer good scalability for typical web application loads and can be scaled vertically or horizontally if needed.
*   **Familiarity and Community Support:** These are mature technologies with vast communities and resources for support and development.

5. Future Considerations / Scalability Notes

*   **Technician Management:** If Blue Men Plumbing expands to manage individual technicians, a `Technicians` table would be added, linked to `Bookings` and `EmergencyRequests`.
*   **Payment Processing:** Integration with a payment gateway would require tables for `Payments` and potentially `Invoices`.
*   **Customer Feedback/Reviews:** A `Reviews` table linked to `Users` and `Bookings` could be added.
*   **Promotions/Discounts:** Tables for managing offers.
*   **Activity Logs:** A general `ActivityLog` table to track significant user and admin actions for auditing purposes.
*   **Asset Management:** For images and other files, consider storing file paths in the database and the actual files in a scalable cloud storage solution (e.g., S3, Google Cloud Storage).

This schema provides a solid foundation for the "Blue Men Plumbing" website, designed to be extensible for future growth.

## User Flow
USERFLOW

1.0 Introduction
This section details the primary user journeys and interaction patterns for the Blue Men Plumbing website. It outlines how different user types will navigate the site to achieve their goals, providing a foundation for wireframing and subsequent design phases. The flows emphasize clarity, efficiency, and responsiveness to cater to a diverse audience, especially those in urgent situations.

2.0 Core User Personas & Goals
Based on the target audience, the main user personas and their primary goals are:

2.1 Residential Homeowner (Planned Service/Quoting)
   *   **Goal:** To obtain a quote for a plumbing service (e.g., water heater installation, drain cleaning) or to book a non-emergency service at a scheduled time.
   *   **Key Needs:** Clear service descriptions, easy quoting process, flexible booking options, reliable contact information.

2.2 Emergency Caller (Urgent Service)
   *   **Goal:** To quickly connect with Blue Men Plumbing for immediate assistance (e.g., burst pipe, no water).
   *   **Key Needs:** Prominent emergency contact, rapid response, clear instructions.

2.3 General Information Seeker
   *   **Goal:** To learn more about Blue Men Plumbing, its services, service areas, or find general contact details.
   *   **Key Needs:** Clear navigation, comprehensive \"About Us\" and \"Services\" pages, easily accessible contact information.

3.0 General User Flow Principles
*   **Responsiveness:** All flows and interfaces must be fully responsive and optimized for desktop, tablet, and mobile devices.
*   **Clear Calls to Action (CTAs):** Prominent and intuitive CTAs guiding users towards their primary goals (e.g., \"Book Now\", \"Get a Quote\", \"Call Emergency\").
*   **Accessibility:** Adherence to web accessibility guidelines (e.g., clear contrast, keyboard navigation, alt text for images).
*   **Consistency:** Consistent navigation, branding (logos, colors), and UI elements across the entire website.

4.0 Detailed User Flows

4.1 User Flow: Booking a Scheduled Service (Residential Homeowner)
   *   **Objective:** A homeowner identifies a non-emergency plumbing need and wishes to schedule a service online.
   *   **Actors:** Residential Homeowner
   *   **Triggers:** User has a plumbing issue that isn't an immediate emergency but requires professional attention.

   **Steps:**
   1.  **Start:** User lands on the Blue Men Plumbing Homepage (blue-men-plumbing.com).
       *   *Wireframe Description:* Homepage features a clear header with navigation, hero section highlighting services/value proposition, and prominent CTAs like \"Our Services\" and \"Book Now\".
   2.  **Explore Services:** User clicks on \"Our Services\" in the navigation or scrolls down to a services section on the homepage.
       *   *Wireframe Description:* Services page lists all available services (e.g., Leak Detection, Water Heater Repair, Drain Cleaning, Fixture Installation) with brief descriptions. Each service should be clickable.
   3.  **Select Service:** User clicks on a specific service (e.g., \"Drain Cleaning\") for more details.
       *   *Wireframe Description:* Dedicated service page with detailed description of the service, FAQs, typical pricing range (if applicable), and clear CTAs: \"Get a Quote\" and \"Book Now\".
   4.  **Initiate Booking:** User clicks on \"Book Now\" (assuming they are ready to schedule without a prior quote).
       *   *Wireframe Description:* This action leads to a multi-step booking form. Each step should be clearly indicated (e.g., progress bar).
   5.  **Provide Service Details (Step 1 of N):** User enters details about the issue (e.g., type of drain, location of clog, brief description).
       *   *Wireframe Description:* Form fields for text input. Optional fields for uploading photos/videos of the issue.
   6.  **Select Date & Time (Step 2 of N):** User selects preferred date and time slots from an interactive calendar.
       *   *Wireframe Description:* Calendar UI with available slots clearly marked. Consideration for service area restrictions and technician availability.
   7.  **Enter Contact Information (Step 3 of N):** User provides Name, Phone Number, Email Address, and Service Address.
       *   *Wireframe Description:* Standard input fields with clear labels and validation (e.g., required fields, valid email format).
   8.  **Review & Confirm:** User reviews all entered details for accuracy.
       *   *Wireframe Description:* A summary page showing all form inputs. \"Edit\" buttons next to sections for easy modification.
   9.  **Submit Booking:** User clicks \"Confirm & Book\".
       *   *Wireframe Description:* Final button to submit.
   10. **Confirmation:** System displays a confirmation message on screen and sends a confirmation email/SMS.
       *   *Wireframe Description:* Confirmation page with booking reference number, summary of service, and clear next steps (e.g., \"We will contact you within X hours to finalize details\"). Email/SMS template for booking confirmation.
   11. **End:** Booking complete.

4.2 User Flow: Requesting Emergency Service
   *   **Objective:** A user in an emergency plumbing situation needs immediate contact and assistance.
   *   **Actors:** Emergency Caller
   *   **Triggers:** Burst pipe, severe leak, no water, major clog causing overflow.

   **Steps:**
   1.  **Start:** User lands on the Blue Men Plumbing Homepage.
       *   *Wireframe Description:* Homepage features a highly prominent, easily visible \"Emergency Service\" or \"Call Now\" button/banner, possibly sticky or in a high-contrast color, visible immediately upon load.
   2.  **Identify Emergency CTA:** User quickly locates and clicks on the emergency call-to-action.
       *   *Wireframe Description:* The CTA should be unmistakable and action-oriented.
   3.  **Choose Contact Method:** User is presented with options for immediate contact.
       *   *Wireframe Description:* A modal or dedicated emergency page with:
           *   Large \"CALL NOW\" button with click-to-call functionality (phone number prominently displayed).
           *   A concise \"Emergency Request Form\" for those who cannot call immediately or prefer text communication.
   4.  **A) Call Now Path:** User taps/clicks the \"CALL NOW\" button.
       *   *Interaction:* Mobile device initiates a phone call to Blue Men Plumbing's emergency line. Desktop users are shown the number to dial.
   5.  **B) Emergency Request Form Path:** User clicks \"Emergency Request Form\".
       *   *Wireframe Description:* A short, critical information-only form:
           *   Name
           *   Phone Number (required)
           *   Address of Emergency
           *   Brief Description of Emergency (text area)
           *   Acknowledgement that a representative will call immediately.
   6.  **Submit Form:** User fills out and submits the emergency form.
       *   *Wireframe Description:* \"Submit\" button.
   7.  **Confirmation (Form Path):** System displays a message: \"Thank you! A Blue Men Plumbing representative will call you immediately.\" Sends an internal alert to the admin panel and an automated SMS/email to the user acknowledging receipt and expected call.
       *   *Wireframe Description:* Confirmation screen with emergency contact instructions (e.g., \"While you wait, consider turning off your main water supply if safe to do so.\").
   8.  **End:** User is in contact with Blue Men Plumbing or awaiting immediate callback.

4.3 User Flow: Requesting a Quote
   *   **Objective:** A homeowner wants an estimate for a specific service before committing to a booking.
   *   **Actors:** Residential Homeowner
   *   **Triggers:** User is researching plumbing services and comparing prices, or has a specific project in mind that requires a detailed assessment.

   **Steps:**
   1.  **Start:** User lands on the Blue Men Plumbing Homepage.
       *   *Wireframe Description:* Homepage with clear navigation and \"Get a Quote\" CTA (perhaps in the header or hero section).
   2.  **Navigate to Quote Form:** User clicks on \"Get a Quote\" from the homepage or a service-specific page.
       *   *Wireframe Description:* This leads to a dedicated \"Request a Quote\" page.
   3.  **Provide Quote Details (Step 1 of N):** User selects the type of service needed (dropdown/radio buttons), provides a detailed description of the project/issue, and potentially uploads photos/videos.
       *   *Wireframe Description:* Fields for service selection, rich text area for description, file upload component (allowing multiple files).
   4.  **Provide Property/Access Details (Step 2 of N):** User enters the service address, property type (house/apartment), and any access considerations.
       *   *Wireframe Description:* Standard address fields, dropdown for property type, optional text area for notes.
   5.  **Enter Contact Information (Step 3 of N):** User provides Name, Phone Number, and Email Address, and selects preferred contact method for the quote.
       *   *Wireframe Description:* Standard input fields with validation.
   6.  **Review & Submit:** User reviews all details and submits the request.
       *   *Wireframe Description:* Summary page for review, \"Submit Quote Request\" button.
   7.  **Confirmation:** System displays an on-screen confirmation and sends an email/SMS acknowledging receipt and estimated quote processing time.
       *   *Wireframe Description:* Confirmation page stating \"Your quote request has been received. We aim to provide an estimate within X business days. You will be contacted via your preferred method.\" Email/SMS template for quote request confirmation.
   8.  **End:** Quote request submitted and user awaits a response.

4.4 User Flow: General Information Seeking (Services, About Us, Contact)
   *   **Objective:** A user seeks general information about Blue Men Plumbing or its services.
   *   **Actors:** General Information Seeker
   *   **Triggers:** User is researching local plumbers, checking service availability, or wants to find contact details.

   **Steps:**
   1.  **Start:** User lands on the Blue Men Plumbing Homepage.
       *   *Wireframe Description:* Homepage with a clear, persistent global navigation menu (e.g., \"Home\", \"Services\", \"About Us\", \"Contact\", \"Blog\" - if applicable).
   2.  **Navigate to Desired Section:** User uses the navigation menu or scrolls down to find links to specific information.
       *   *Wireframe Description:* Navigation links are intuitive and clearly labeled.
   3.  **A) Services Information:** User clicks \"Services\".
       *   *Wireframe Description:* Services landing page provides an overview of all services offered, possibly categorized. Each service links to a detailed sub-page. Each service sub-page has detailed descriptions, benefits, and relevant CTAs (\"Get a Quote\", \"Book Now\").
   4.  **B) About Us Information:** User clicks \"About Us\".
       *   *Wireframe Description:* \"About Us\" page detailing company history, mission, values, team members (optional), and testimonials/reviews. Reinforces trust and professionalism.
   5.  **C) Contact Information:** User clicks \"Contact\".
       *   *Wireframe Description:* \"Contact Us\" page with:
           *   Physical Address (if applicable)
           *   Phone Number (prominent, click-to-call)
           *   Email Address
           *   Operating Hours
           *   Service Area Map (optional)
           *   General Inquiry Contact Form (simpler than quote/booking forms).
   6.  **Consume Information/Submit Inquiry:** User reads the content or fills out a general inquiry form.
       *   *Wireframe Description:* Clear layout of information. General inquiry form with Name, Email, Subject, Message, and a \"Send Message\" button.
   7.  **End:** User has found the information they sought or submitted a general inquiry.

4.5 User Flow: Admin Panel (High-Level)
   *   **Objective:** Blue Men Plumbing staff manage website content, customer inquiries, bookings, and quotes.
   *   **Actors:** Internal Staff
   *   **Triggers:** New booking request, new quote request, need to update service information, need to check daily schedule.

   **Steps:**
   1.  **Login:** Staff member accesses a dedicated admin URL and logs in with credentials.
       *   *Wireframe Description:* Secure login page with username/password fields and \"Forgot Password\" option.
   2.  **Dashboard Overview:** Upon successful login, staff lands on a dashboard.
       *   *Wireframe Description:* Dashboard provides a summary of new booking requests, new quote requests, upcoming appointments, and key metrics.
   3.  **Manage Bookings:** Staff navigates to the \"Bookings\" section.
       *   *Wireframe Description:* Table view of all bookings with filters (e.g., pending, confirmed, completed, cancelled) and search functionality. Each booking entry is clickable to view details.
   4.  **Manage Quotes:** Staff navigates to the \"Quotes\" section.
       *   *Wireframe Description:* Similar table view for quotes. Functionality to mark as \"responded\", \"accepted\", \"rejected\", or \"archived\". Option to generate and send quotes from the panel.
   5.  **Manage Services/Content:** Staff navigates to the \"Services\" or \"Content Management\" section.
       *   *Wireframe Description:* Interface to add, edit, or delete service descriptions, pricing, and images. WYSIWYG editor for general page content (e.g., About Us, FAQs).
   6.  **View Customer Details:** Staff can access customer contact information linked to bookings and quotes.
       *   *Wireframe Description:* Customer profiles linked from bookings/quotes, showing contact history.
   7.  **Logout:** Staff logs out for security.
       *   *Wireframe Description:* Prominent \"Logout\" button.
   8.  **End:** Admin task completed.

5.0 Key Interaction Patterns & Components
*   **Form Validation:** Real-time and onSubmit validation for all forms, providing clear feedback to the user.
*   **Confirmation Messages:** On-screen success messages, toast notifications, and email/SMS confirmations for key actions (booking, quote submission, contact form).
*   **Error Handling:** Clear, user-friendly error messages for invalid inputs or system failures.
*   **Responsive Navigation:** Hamburger menu or similar pattern for mobile and tablet views, expanding to a full navigation bar on desktop.
*   **Click-to-Call:** Phone numbers on the website (especially emergency lines and contact pages) should be clickable on mobile devices to initiate a call.
*   **Date/Time Pickers:** Intuitive calendar interfaces for selecting service dates and times.
*   **File Uploads:** Secure and easy-to-use component for uploading images/videos for quotes or service descriptions.
*   **Service Area Checker (Optional):** A tool where users can enter their postcode to check if Blue Men Plumbing services their area, before proceeding with booking/quoting.

6.0 Considerations for Wireframing
*   **Mobile-First Design:** Prioritize the mobile experience given the common usage of phones for local services and emergencies.
*   **Visual Hierarchy:** Use size, color, and placement to guide the user's eye towards the most important information and CTAs.
*   **Whitespace:** Utilize ample whitespace to improve readability and reduce visual clutter.
*   **Branding Elements:** Incorporate the Blue Men Plumbing logo and preferred color scheme strategically to establish brand identity and trust.
*   **Placeholder Content:** Use realistic placeholder content that reflects the plumbing industry and Blue Men Plumbing's services.

## Styling Guidelines
STYLING GUIDELINES DOCUMENT

1.0 Introduction
This document outlines the visual and interactive styling guidelines for the \"Blue Men Plumbing\" website. Its purpose is to ensure consistency, enhance user experience, and reinforce the brand image across all digital touchpoints. Adherence to these guidelines will result in a professional, trustworthy, and user-friendly online presence.

2.0 Brand Identity

2.1 Logo Usage
The \"Blue Men Plumbing\" logo is the primary visual identifier of the brand. Proper usage is crucial for maintaining brand integrity.

2.1.1 Logo Files
Primary Logo: [Path to Primary Logo File - e.g., assets/logos/blue-men-plumbing-logo-primary.svg]
Icon Mark: [Path to Icon Mark File - e.g., assets/logos/blue-men-plumbing-icon.svg] (for favicons, small spaces)
Variations: [Path to any White/Dark background variations if applicable]

2.1.2 Clear Space
Maintain a minimum clear space around the logo equal to at least \"X\" (where X is the height of the 'B' in \"Blue\") on all sides. This ensures the logo is always prominent and unobstructed.

2.1.3 Minimum Size
Ensure the logo is never displayed smaller than 30px in height for readability on web. The icon mark can be used down to 16px for favicons.

2.1.4 Usage Restrictions
Do not stretch, distort, or alter the proportions of the logo.
Do not change the logo's colors, unless using approved monochromatic variations.
Do not place the logo on cluttered backgrounds that reduce its legibility.

3.0 Color Palette
Our color palette is designed to evoke trust, cleanliness, and efficiency, aligning with the plumbing industry while maintaining a distinct brand identity.

3.1 Primary Colors
These are the dominant colors used throughout the website.

3.1.1 Blue Men Primary Blue
Hex: #004D77
RGB: 0, 77, 119
Usage: Headers, primary buttons, key branding elements, main calls-to-action, active states.

3.1.2 Blue Men Accent Blue
Hex: #007ACC
RGB: 0, 122, 204
Usage: Secondary buttons, links, highlights, icons, progress indicators.

3.2 Neutral Colors
These colors provide balance and readability for text and backgrounds.

3.2.1 White
Hex: #FFFFFF
RGB: 255, 255, 255
Usage: Backgrounds, text (on dark backgrounds), card elements.

3.2.2 Light Grey
Hex: #F7F7F7
RGB: 247, 247, 247
Usage: Section backgrounds, borders, subtle separators.

3.2.3 Dark Grey (Text)
Hex: #333333
RGB: 51, 51, 51
Usage: Body text, secondary headings.

3.3 Accent & System Colors
Used for emphasis, alerts, or specific functional indicators.

3.3.1 Emergency/Highlight Orange
Hex: #FF8C00
RGB: 255, 140, 0
Usage: Emergency contact buttons, urgent alerts, key promotions, pricing highlights.

3.3.2 Success Green
Hex: #28A745
RGB: 40, 167, 69
Usage: Form submission success messages, positive confirmations.

3.3.3 Error Red
Hex: #DC3545
RGB: 220, 53, 69
Usage: Form validation errors, negative feedback, warning messages.

4.0 Typography
Typography is chosen for legibility, professionalism, and responsiveness across devices.

4.1 Primary Font: Montserrat
Usage: Headings (H1-H6), primary navigation, large display text.
Fallbacks: sans-serif

H1: 48px (desktop), 36px (tablet), 28px (mobile) - Montserrat Bold
H2: 36px (desktop), 28px (tablet), 24px (mobile) - Montserrat Semi-Bold
H3: 28px (desktop), 24px (tablet), 20px (mobile) - Montserrat Semi-Bold
H4: 20px (desktop), 18px (tablet), 16px (mobile) - Montserrat Medium
H5: 18px (desktop), 16px (tablet), 14px (mobile) - Montserrat Medium
H6: 16px (desktop), 14px (tablet), 12px (mobile) - Montserrat Medium

4.2 Secondary Font: Open Sans
Usage: Body text, paragraphs, form labels, small text, links.
Fallbacks: sans-serif

Body Text: 16px (desktop), 15px (tablet), 14px (mobile) - Open Sans Regular
Line Height: 1.6em for body text.
Link Text: 16px (desktop), 15px (tablet), 14px (mobile) - Open Sans Regular (blue, underlined on hover)
Button Text: 18px (primary), 16px (secondary) - Montserrat Semi-Bold

4.3 Text Color
Primary Text: #333333 (Dark Grey)
Secondary Text: #666666 (Medium Grey)
Links: #007ACC (Blue Men Accent Blue)

5.0 Iconography
Icons should be simple, recognizable, and consistent in style.

Style: Line-based, clean, and modern. Filled icons can be used sparingly for emphasis (e.g., active navigation states).
Color: Inherit text color or use Blue Men Accent Blue.
Examples: Plumbing services (faucet, pipe, toilet), emergency (siren, clock), contact (phone, email), booking (calendar, checkmark).

6.0 Imagery & Media
Visual content should reinforce trust, professionalism, and efficiency.

Style: High-quality, professional photography. Authentic, clean, and well-lit. Avoid overly staged or generic stock photos where possible.
Content: Showcase clean work environments, skilled plumbers (diverse representation), clear before/after scenarios (if applicable), satisfied customers (with consent), and pristine home environments.
Avoid: Messy work, blurry images, cluttered backgrounds, overly complex graphics.
Video: Short, engaging, and informative. Testimonials, service explanations, or quick tips.

7.0 UI/UX Principles

7.1 Responsiveness & Adaptability
The website must be fully responsive, providing an optimal viewing experience across a wide range of devices (desktop, tablet, mobile).
Mobile-First Approach: Design and develop for mobile devices first, then scale up to larger screens.
Flexible Layouts: Use fluid grids and flexible images/media.
Breakpoints: Define standard breakpoints for content reflow (e.g., 576px, 768px, 992px, 1200px).

7.2 Accessibility
Ensure the website is usable by people with diverse abilities.
Color Contrast: Maintain sufficient contrast between text and background colors (WCAG AA standards).
Font Sizes: Use readable font sizes and allow for text resizing.
Keyboard Navigation: All interactive elements should be reachable and operable via keyboard.
Alt Text: Provide descriptive alt text for all meaningful images.
Focus States: Clearly visible focus indicators for interactive elements.

7.3 Usability & Intuition
Design for ease of use and quick task completion.
Clear Calls-to-Action (CTAs): Buttons and links should clearly indicate their action (e.g., \"Book Service Now,\" \"Emergency Call\").
Intuitive Navigation: Logical and consistent navigation structure. Users should always know where they are and how to get to key information.
Minimal Clicks: Optimize user flows to achieve goals with the fewest possible clicks, especially for booking and emergency services.
Consistency: Maintain consistent design patterns, interactions, and terminology across the entire site.

7.4 Feedback & Communication
Provide clear feedback to users for their actions.
Loading States: Indicate when content is loading.
Success Messages: Confirm successful actions (e.g., \"Your booking has been confirmed!\").
Error Messages: Clearly explain what went wrong and how to fix it (e.g., \"Please enter a valid phone number.\").
Form Validation: Real-time or on-submission validation to guide users.

7.5 Trust & Professionalism
The design should instill confidence and reliability.
Clean Layout: Uncluttered, well-organized pages with ample white space.
Professional Tone: Language and visuals should convey expertise and reliability.
Clear Information: Easy-to-understand service descriptions, pricing (where applicable), and contact details.
Security Indicators: Highlight any secure booking or payment processes.

7.6 Emergency Focus
Given the target audience includes emergency callers, quick access to emergency services is paramount.
Prominent Emergency Contact: Display emergency phone number clearly in the header and on relevant pages.
Dedicated Emergency Service Section: Easy access to emergency service details and immediate booking options.

8.0 Component Styling

8.1 Buttons
Primary Button (e.g., \"Book Now\"): Background #004D77 (Blue Men Primary Blue), Text #FFFFFF (White). Hover: Slightly darker blue or subtle lift effect.
Secondary Button (e.g., \"Learn More\"): Background #007ACC (Blue Men Accent Blue), Text #FFFFFF (White) or Transparent background with #004D77 (Blue Men Primary Blue) border/text. Hover: Fill background or inverse color.
Emergency Button (e.g., \"Emergency Call\"): Background #FF8C00 (Emergency/Highlight Orange), Text #FFFFFF (White). Prominent, possibly with an icon.
State: Disabled, hover, active, focus states must be clearly defined.
Border-radius: Consistent slight rounding (e.g., 4px).

8.2 Forms
Input Fields: Clean, light background (#FFFFFF or #F7F7F7), subtle border (#DDDDDD), focus state with Blue Men Accent Blue border.
Labels: Placed above input fields, using Dark Grey text (#333333).
Error States: Red border (#DC3545) and error message text below the field.
Checkboxes/Radio Buttons: Custom styled to match brand colors.

8.3 Navigation
Main Navigation: Clear, prominent links. Active state highlighted with Blue Men Accent Blue. Responsive hamburger menu for mobile.
Footer Navigation: Organized links to sitemap, privacy policy, terms, etc.

8.4 Cards
Used for services, testimonials, blog posts.
Style: Clean, rounded corners (e.g., 8px), subtle drop shadow or border. Consistent padding.
Content: Clear headings, concise descriptions, relevant imagery/icons, and CTAs.

8.5 Alerts & Messages
Success: Green background (#28A745), white text.
Error: Red background (#DC3545), white text.
Info: Blue background (#007ACC), white text.
Dismissible options where appropriate.

9.0 Visual Tone & Mood
The overall visual tone of the \"Blue Men Plumbing\" website should be:
Professional: Reflecting expertise and reliability.
Reliable & Trustworthy: Instilling confidence in our services.
Clean & Efficient: Mirroring the quality of our plumbing work.
Approachable: Friendly and easy to engage with.
Modern: Utilizing contemporary web design practices.
