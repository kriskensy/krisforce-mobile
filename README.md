# KrisForce – Mobile Manager Dashboard

KrisForce-mobile is a cross-platform monitoring application built with React Native. It serves as a dedicated, read-only analytics tool for Managers and Customer Service Leads, providing real-time oversight of the company's operations directly from their mobile devices.

### Purpose & Scope

Unlike the web-based administrative platform, this mobile application is designed specifically for data consumption and monitoring. It provides managers with a high-level overview of the ecosystem without the risk of accidental data modification, ensuring a safe and efficient way to track KPIs and operational health on the go.

##### Key Features (Read-Only)

- Managerial Dashboard: Real-time data visualization of key performance indicators.
- Invoice Overview: Instant access to invoice statuses and financial summaries.
- Ticket Monitoring: Oversight of support tickets.
- Customer Directory: A comprehensive view of the client list and their associated data.
- Role-Based Security: Leverages the shared Supabase Auth and RBAC logic to ensure only authorized personnel can access sensitive management data.

---

### Tech Stack

- Framework: React Native
- Backend: Supabase (PostgreSQL, Auth, RLS)

---

### Shared Ecosystem

This application is the "Mobile Viewer" component of the KrisForce suite. It connects to the same robust infrastructure as the web version:

- [KrisForce-web](https://github.com/kriskensy/krisforce-web.git): The main administrative hub where data management occurs.
- Centralized Database: All data is fetched from the shared PostgreSQL instance. The complex business logic (Triggers/Functions) ensures that the data viewed here is always consistent and up-to-date.

---

### Development Setup

##### Prerequisites

- Node.js
- Expo CLI or React Native CLI
- A Supabase project (or a local PostgreSQL instance to run the provided schema)

##### Installation

1. Clone the repository:

```
git clone https://github.com/kriskensy/krisforce-mobile.git
cd krisforce-mobile
```

2. Install dependencies:

```
npm install
```

3. Environment Variables:

Create a .env.local file in the root directory and add your Supabase credentials:

```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

4. Start the application:

```
npx expo start
```

### Architecture

The app focuses on performance and data integrity. By utilizing a "read-only" architecture for this mobile module, we reduce the attack surface and prevent unauthorized changes, while maintaining a modular codebase that follows SOLID principles.