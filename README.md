# Tool Lending Library Management System

A full-stack Tool Lending Library Management System developed using the MERN Stack to streamline inventory management for organizations. The application provides secure authentication, role-based access control, dashboard analytics, and complete CRUD functionality for managing tools through an intuitive web interface.

---



# Project Information

| Field | Details |
|--------|---------|
| Project Name | Tool Lending Library Management System |
| Project Type | Inventory Management System |
| Repository | tool-lending-library |
| Track | Full Stack Development |
| Author | Geethika Kondreddy |

---

# Project Overview

The Tool Lending Library Management System is designed to simplify the process of managing an organization's tool inventory through a centralized web application.

The system enables administrators to securely manage staff accounts and maintain the complete inventory of tools while providing staff members with controlled access to search and view inventory information.

The application follows modern enterprise development practices including authentication, authorization, data validation, responsive user interface design, centralized error handling, and secure RESTful APIs.

---

# Problem Statement

Managing physical tool inventories using spreadsheets or paper-based records often results in inconsistent data, inventory loss, duplicate entries, and inefficient tracking.

Organizations require a centralized inventory solution that provides secure user management, structured inventory records, and efficient CRUD operations while ensuring data integrity and role-based access.

---

# Solution Overview

The Tool Lending Library Management System provides a secure web-based platform for inventory administration.

The application allows administrators to:

- Register staff members
- Maintain tool inventory
- Add new tools
- Update existing tool records
- Remove obsolete tools
- Monitor inventory statistics through a dashboard

Staff members can securely access the system to:

- View available tools
- Search inventory
- Access dashboard information

---

# User Roles

| Role | Responsibilities |
|------|------------------|
| Administrator | Manage staff accounts, dashboard, tool inventory and complete CRUD operations |
| Staff | Login securely, access dashboard, search inventory and view tool records |

---

## Default Administrator Account

Use the following administrator account to access the system after importing the provided database or seeding the initial admin user.

| Email | Password |
|-------|----------|
| admin@toollibrary.com | Admin@123 |

After logging in as the administrator, you can:

- Register new staff members
- Manage the tool inventory
- View dashboard statistics
- Edit and delete existing tools

> Note: Staff accounts can be created from the **Register Staff** page after logging in as an administrator.
> **Note:** For the default administrator account credentials, please refer to the `server/scripts/seedAdmin.js` file.

# Core Features

## Authentication & Authorization

- JWT Authentication
- Secure Login
- Password Hashing using bcrypt
- Protected Routes
- Role Based Access Control
- Admin-only Staff Registration

---

## Dashboard

The dashboard provides a quick overview of inventory statistics.

### Dashboard Statistics

- Total Tools
- Available Tools
- Total Categories
- Total Staff Members (Administrator Only)

---

## Tool Inventory

The inventory module supports complete CRUD functionality.

### Features

- Add Tool
- View Tool
- Update Tool
- Delete Tool
- Search Tools
- Pagination
- Responsive Tool Table

Each inventory record contains:

- Tool Code
- Tool Name
- Category
- Description
- Total Quantity
- Available Quantity
- Tool Condition
- Status
- Storage Location

---

## Validation & Security

### User Validation

- Full Name Validation
- Email Validation
- Strong Password Validation

### Tool Validation

- Required Field Validation
- Quantity Validation
- Available Quantity Verification

### Security Features

- JWT Authentication
- Password Encryption
- Protected API Routes
- Input Sanitization
- Centralized Error Handling

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js, Vite |
| Styling | CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Password Encryption | bcrypt.js |
| API Testing | Postman |
| Deployment | Vercel & Render |
| Version Control | Git & GitHub |

---

# System Architecture

The application follows a standard three-tier architecture.

## Presentation Layer

- React.js
- Vite
- CSS3

## Application Layer

- Node.js
- Express.js
- JWT Authentication
- Middleware
- REST APIs

## Data Layer

- MongoDB Atlas
- Mongoose ODM

---

# Database Collections

| Collection | Purpose |
|------------|---------|
| Users | Stores administrator and staff account information |
| Tools | Stores complete inventory details |

---


# TRD Compliance Matrix

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Feature Complete CRUD | ✅ | Full Create, Read, Update and Delete operations |
| Happy Path | ✅ | Dashboard, Inventory and CRUD workflow completed |
| Empty State Handling | ✅ | User-friendly "No Tools Found" message |
| Loading Indicators | ✅ | Loading state during asynchronous requests |
| Invalid Input Handling | ✅ | Client-side and server-side validation |
| Authorization | ✅ | JWT Authentication with Role Based Access |
| Telemetry Simulation | ✅ | Analytics console logging for major actions |
| Input Sanitization | ✅ | Request sanitization middleware |
| Responsive Interface | ✅ | Desktop, Tablet and Mobile layouts |
| Corporate UI | ✅ | Clean monochromatic interface with consistent spacing |

---

