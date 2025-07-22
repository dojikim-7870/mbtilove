# MBTI Love Match - Complete Architecture Guide

## Overview

This is a full-stack MBTI compatibility web application built with React, Express, and PostgreSQL. The app provides personality-based compatibility analysis, dating style insights, and interactive features for users to explore MBTI relationships. The architecture follows a monorepo pattern with clear separation between frontend (client), backend (server), and shared components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom MBTI-themed color palette
- **Internationalization**: react-i18next supporting Korean, English, and Japanese
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **API Pattern**: RESTful API design with structured route handling
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reload with Vite integration in development mode

### Database Layer
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Fallback Storage**: In-memory storage interface for development/testing

## Key Components

### MBTI Analysis Engine
The core compatibility calculation system includes:
- **Compatibility Algorithm**: Custom scoring based on MBTI cognitive functions and personality preferences
- **Analysis Types**: Comprehensive compatibility analysis covering emotional, intellectual, and practical dimensions
- **Result Generation**: Dynamic generation of strengths, challenges, and relationship advice

### User Interface Components
- **Compatibility Checker**: Interactive MBTI type selector with real-time compatibility scoring
- **Dating Style Grid**: Visual presentation of 16 MBTI types organized by temperament groups (Analysts, Diplomats, Sentinels, Explorers)
- **Conversation Analysis**: Communication style insights and conflict resolution patterns
- **Balance Game**: Interactive personality preference games with visual choice interfaces
- **Ranking System**: Popular compatibility combinations with statistical data

### Internationalization System
- **Multi-language Support**: Korean (primary), English, and Japanese
- **Dynamic Language Switching**: Real-time language changes without page reload
- **Localized Content**: All MBTI descriptions, compatibility analysis, and UI text translated

## Data Flow

### Client-Side Data Flow
1. User interactions trigger React component state changes
2. TanStack Query manages API calls and caching
3. Form submissions use react-hook-form with Zod validation
4. Results display through shadcn/ui components with smooth animations

### Server-Side Data Flow
1. Express routes handle incoming API requests
2. Request validation using Zod schemas
3. Database operations through Drizzle ORM
4. Response formatting with error handling middleware
5. Development logging for API monitoring

### Database Schema Flow
The application uses five main tables:
- **users**: Basic user authentication and profiles
- **mbti_types**: Complete MBTI type definitions with personality traits
- **compatibility_results**: Pre-calculated compatibility scores and analysis
- **compatibility_tests**: User test results and statistics
- **balance_game_results**: Interactive game responses and outcomes

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Database**: Drizzle ORM, Neon PostgreSQL serverless driver
- **UI Components**: Radix UI primitives, Lucide React icons
- **Development**: Vite, TypeScript, ESBuild for production builds

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework with custom MBTI color palette
- **CSS Variables**: Custom properties for romantic-pink, soft-teal, warm-yellow theming
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### Development Tools
- **Hot Reload**: Vite plugin integration for seamless development
- **Type Safety**: Comprehensive TypeScript configuration
- **Code Quality**: ESLint and Prettier configuration (implied by project structure)

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React application into static assets
2. **Backend Build**: ESBuild compiles TypeScript server code for Node.js
3. **Asset Management**: Static files served from dist/public directory

### Production Configuration
- **Server Setup**: Express serves both API routes and static frontend
- **Database**: PostgreSQL connection via environment variables
- **Environment Handling**: Separate development and production configurations

### Development Workflow
- **Dev Server**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Database Management**: Drizzle Kit for schema migrations and updates
- **Type Checking**: Comprehensive TypeScript validation across the monorepo

The architecture prioritizes type safety, developer experience, and scalable MBTI personality analysis features while maintaining clean separation of concerns between frontend presentation, backend logic, and data persistence layers.