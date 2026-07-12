# Pulse Architecture

Version: 2.0
Status: Engineering Blueprint
Last Updated: July 2026

---

# Architecture Philosophy

Pulse is an AI-first, context-driven Progressive Web Application designed for large-scale live events.

Unlike traditional applications where each page independently fetches and manages data, Pulse maintains a single, continuously updated understanding of the venue through a centralized intelligence layer.

Every screen, recommendation, notification, and AI interaction is powered from the same shared context.

The architecture prioritizes:

- Context First
- AI First
- Modular Design
- Reusable Components
- Explainable Intelligence
- Scalability
- Maintainability

---

# Core Architectural Principle

## Context Before Interface

No page is responsible for understanding the venue.

Every page simply consumes a centralized Venue Context.

This ensures:

- consistent recommendations
- synchronized updates
- reusable business logic
- simplified development

Pages should never independently fetch operational venue information.

---

# High Level Architecture

```
                  External Data Sources

      Venue Data
      Crowd Data
      Weather
      Event Timeline
      Parking
      Transit
      Incidents
      User Profile
      Accessibility
             │
             ▼
      ┌───────────────────────┐
      │ Venue Context Engine │
      └───────────────────────┘
             │
             ▼
      ┌───────────────────────┐
      │ Recommendation Engine │
      └───────────────────────┘
             │
             ▼
      ┌───────────────────────┐
      │ Notification Engine  │
      └───────────────────────┘
             │
             ▼
       Shared Application Context
             │
 ┌───────────┼────────────┬────────────┐
 ▼           ▼            ▼            ▼
Dashboard    Map      AI Assistant   Organizer
```

---

# Technology Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion

---

## Backend

Firebase

Services

- Firestore
- Cloud Functions
- Firebase Storage
- Firebase Hosting
- Anonymous Authentication

---

## AI

Google Gemini

Gemini is responsible only for:

- reasoning
- explanation
- summarization
- translation
- conversational interaction

Gemini is NOT responsible for business logic.

Business decisions must be made before Gemini is called.

---

## Maps

Google Maps Platform

Future Support

- Routes API
- Places API
- Navigation API

---

## Progressive Web App

Pulse must support

- installable experience
- offline assets
- responsive design
- mobile-first layout

---

# Project Structure

```
pulse/

app/
components/
features/
engine/
context/
services/
hooks/
utils/
types/
data/
public/
docs/
```

---

# Folder Responsibilities

## app/

Routing only.

Contains:

- layouts
- pages
- route groups

No business logic.

---

## components/

Reusable UI components.

Examples

- cards
- buttons
- dialogs
- navigation
- maps
- charts
- badges
- modals

---

## features/

Feature modules.

Each feature owns

- UI
- feature hooks
- feature services
- feature state

Examples

dashboard/

assistant/

map/

organizer/

volunteer/

notifications/

accessibility/

---

## engine/

The intelligence layer.

Contains all application reasoning.

Never contains UI.

Modules include

- VenueContextEngine
- RecommendationEngine
- NotificationEngine
- SimulationEngine
- LocalizationEngine

---

## context/

Application-wide Context Providers.

Examples

- VenueContextProvider
- UserContextProvider
- ThemeProvider

---

## services/

External integrations.

Examples

firebase/

gemini/

maps/

notifications/

analytics/

---

## hooks/

Reusable React hooks.

Examples

- useVenue()
- useRecommendations()
- useNotifications()
- useGemini()

---

## utils/

Pure helper functions.

No business logic.

---

## types/

Global TypeScript models.

Examples

Venue

Gate

Incident

Recommendation

CrowdStatus

Notification

User

UserRole

---

## data/

Static demo data.

Examples

venues/

fifa.json

ipl.json

concert.json

---

# Intelligence Layer

The Intelligence Layer is the heart of Pulse.

Every feature depends on it.

UI components must never perform reasoning.

---

## 1. Venue Context Engine

Maintains the complete understanding of the venue.

Responsibilities

- current venue
- selected event
- user profile
- crowd status
- parking
- transport
- weather
- incidents
- accessibility
- timeline

Produces

VenueContext

---

## 2. Recommendation Engine

Consumes VenueContext.

Determines

- priorities
- urgency
- recommendations
- route suggestions
- queue avoidance
- operational insights

Outputs structured recommendations.

No natural language generation.

---

## 3. Notification Engine

Consumes recommendations.

Determines

- when to notify
- notification priority
- notification grouping
- proactive alerts

Never triggered directly by UI components.

---

## 4. Simulation Engine

Provides realistic demo data.

Simulates

- crowd movement
- weather
- queue lengths
- incidents
- parking availability
- transport delays

Can later be replaced with live APIs.

---

## 5. Localization Engine

Provides

- multilingual support
- translated notifications
- accessibility-aware messaging
- locale formatting

---

# Venue Context

The Venue Context represents the application's shared understanding of the current venue.

Example

```
VenueContext

Venue

Selected Event

Current User

Crowd

Queues

Weather

Parking

Transit

Timeline

Incidents

Accessibility

Recommendations

Notifications
```

Every feature consumes this object.

No feature constructs its own context.

---

# Data Flow

```
External Sources

↓

Simulation / APIs

↓

Venue Context Engine

↓

Recommendation Engine

↓

Notification Engine

↓

Application Context

↓

Dashboard

Map

Assistant

Organizer

Volunteer

Accessibility
```

---

# AI Flow

The AI should never receive incomplete information.

Flow

```
User Intent

↓

Venue Context

↓

Recommendation Engine

↓

Gemini

↓

Natural Language Response
```

Gemini explains.

It does not decide.

---

# Feature Architecture

Every feature follows the same structure.

```
dashboard/

components/

hooks/

services/

types/

constants/

index.ts
```

Every feature is independently maintainable.

---

# Routing

Public

/

Landing

/events

Select Event

/dashboard

Dashboard

/map

Venue Map

/assistant

AI Assistant

/profile

Profile

/notifications

Notifications

---

Organizer

/organizer

Volunteer

/volunteer

Accessibility

/accessibility

---

# State Management

Priority

1. React State

↓

2. React Context

↓

3. Firestore

Avoid Redux.

---

# Authentication

Anonymous by default.

Future support

- Google Login
- Ticket Login
- Volunteer Login
- Organizer Login

---

# Error Handling

Every async operation supports

- loading
- success
- empty
- offline
- error

---

# Demo Mode

Demo Mode should function without any live APIs.

Everything is generated through the Simulation Engine.

This guarantees stable demonstrations.

---

# Future Integrations

Architecture must support

- Live CCTV analytics
- IoT sensors
- Smart parking
- Ticket providers
- Google Wallet
- Camera analytics
- Wearables
- Digital Twin systems

without redesigning the application.

---

# Engineering Rules

## Rule 1

UI components never perform reasoning.

---

## Rule 2

Business logic never lives inside Gemini prompts.

---

## Rule 3

Gemini never directly queries APIs.

It only receives structured context.

---

## Rule 4

Every feature consumes Venue Context.

No duplicate state.

---

## Rule 5

Every new capability should be added as a new module or engine.

Avoid modifying existing engines unless necessary.

---

## Rule 6

Simulation and production data should share the same interface.

Switching between them should require configuration only.

---

# Definition of Done

A feature is considered complete only if it:

- consumes Venue Context
- follows the feature architecture
- supports loading/error/empty states
- is reusable
- works in Demo Mode
- follows the shared design system
- does not duplicate business logic
- integrates cleanly with the Intelligence Layer