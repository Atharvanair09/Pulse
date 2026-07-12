# Pulse Data Model

Version: 1.0
Status: Domain Model
Last Updated: July 2026

---

# Purpose

This document defines the canonical data models used throughout Pulse.

Every feature, engine, and service must use these models.

Do not create duplicate or conflicting models.

---

# Core Entities

Pulse consists of the following primary entities.

Venue

↓

Event

↓

User

↓

VenueContext

↓

Recommendation

↓

Notification

↓

Incident

↓

Route

↓

Facility

↓

TimelineEvent

---

# Venue

Represents a physical venue.

Fields

- id
- name
- type
- city
- country
- coordinates
- mapImage
- capacity
- gates
- facilities
- parkingLots
- accessibilityFeatures

---

# Event

Represents an event hosted inside a venue.

Fields

- id
- venueId
- name
- category
- startTime
- endTime
- schedule
- expectedAttendance
- status

---

# User

Fields

- id
- role
- language
- accessibilityPreferences
- favoriteTeam (optional)
- selectedEvent
- currentLocation

---

# User Roles

- Attendee
- Organizer
- Volunteer
- Accessibility

---

# Crowd Zone

Represents congestion inside a specific area.

Fields

- id
- zoneName
- density
- estimatedWait
- confidence
- timestamp

---

Density Levels

Low

Moderate

High

Critical

---

# Facility

Fields

- id
- type
- name
- coordinates
- accessibilitySupported
- status

Types

Food

Medical

Parking

Restroom

Water

Merchandise

Elevator

Ramp

Exit

Gate

---

# Parking Lot

Fields

- id
- capacity
- occupied
- available
- status

---

# Weather

Fields

- temperature
- condition
- rainfall
- wind
- alertLevel

---

# Transport

Fields

- mode
- line
- status
- delayMinutes
- estimatedArrival

---

# Incident

Fields

- id
- type
- severity
- location
- description
- reportedAt
- resolved
- assignedTeam

---

Severity

Low

Medium

High

Critical

---

# Recommendation

Fields

- id
- priority
- title
- reason
- expectedImpact
- confidence
- action
- timestamp

---

Priority

Critical

High

Medium

Low

---

# Notification

Fields

- id
- priority
- title
- message
- timestamp
- read
- recommendationId

---

# Timeline Event

Fields

- id
- title
- category
- scheduledTime
- description

---

Categories

Match

Weather

Transport

Incident

Reminder

Gate

---

# Route

Fields

- origin
- destination
- distance
- duration
- accessibilitySupported
- crowdScore
- routeType

---

Route Types

Shortest

Fastest

Least Crowded

Accessible

Emergency

---

# Venue Context

This is the most important model in Pulse.

Fields

- venue
- event
- user
- crowd
- parking
- weather
- transport
- incidents
- timeline
- recommendations
- notifications

Every feature consumes this object.

---

# Relationships

Venue

↓

contains

↓

Facilities

Parking

Gates

Events

---

Event

↓

creates

↓

VenueContext

---

VenueContext

↓

feeds

↓

Recommendation Engine

↓

Notification Engine

↓

Gemini

↓

UI

---

# Data Sources

Current MVP

- JSON
- Simulation Engine

Future

- Firestore
- Google Maps
- Weather APIs
- IoT
- Camera Analytics

The data model must remain unchanged regardless of the source.

---

# Design Principles

Every model should be

- immutable where possible
- strongly typed
- reusable
- independent of UI
- serializable
- compatible with Firestore

Avoid nested structures that become difficult to query.

Prefer IDs for relationships.

---

# Definition of Done

A data model is complete when

- every field has a defined purpose
- every relationship is documented
- no duplicate models exist
- every engine consumes the same structures