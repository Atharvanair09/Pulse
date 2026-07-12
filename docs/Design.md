# Pulse Design System

Version: 1.0
Status: Design Language
Last Updated: July 2026

---

# Design Philosophy

Pulse is an AI-first operational platform, not a social app.

The interface should communicate confidence, clarity, and intelligence.

Users should feel that the system is continuously aware of the venue and proactively assisting them.

The design language should emphasize:

- clarity over decoration
- hierarchy over density
- motion with purpose
- minimal cognitive load
- accessibility first
- calm under pressure

Every screen should answer:

> "What is happening right now?"
> "What should I do next?"

---

# Overall Style

Modern

Minimal

Professional

Context-aware

Calm

Premium

Google-inspired

The UI should resemble products like:

- Google Maps
- Google Weather
- Google Flights
- Material 3

Avoid:

- Gaming aesthetics
- Neon cyberpunk
- Glassmorphism-heavy interfaces
- Brutalism
- Excessive gradients
- Visual clutter

---

# Color Palette

## Primary

Google Blue

Used for

- actions
- active states
- navigation
- highlights

---

## Success

Green

Used for

- low congestion
- completed tasks
- safe conditions

---

## Warning

Amber

Used for

- moderate queues
- delays
- reminders

---

## Critical

Red

Used for

- incidents
- emergencies
- heavy congestion

---

## Background

Light Theme

Neutral off-white

Dark Theme

Dark gray (not pure black)

---

## Surfaces

Cards should have subtle elevation.

Avoid strong shadows.

---

# Typography

Primary Font

Inter

Fallback

System Sans

Hierarchy

Display

Heading

Title

Body

Caption

Readable at all sizes.

Avoid decorative fonts.

---

# Spacing

Use an 8-point grid.

Spacing values

4

8

16

24

32

48

64

Never use arbitrary spacing.

---

# Border Radius

Small

12px

Medium

16px

Large

24px

Cards should feel approachable but structured.

---

# Elevation

Use minimal shadows.

Cards should appear layered through spacing rather than depth.

Avoid floating UI everywhere.

---

# Icons

Use Material Symbols Rounded.

Icons should communicate function before decoration.

Every important metric should have an associated icon.

---

# Motion

Motion should communicate change.

Not decoration.

Animations should be:

Fast

Natural

Purposeful

Examples

Cards fading in

Heatmap transitions

Count animations

Route updates

Notification slide-ins

Avoid flashy animations.

---

# Layout

Desktop

Responsive dashboard.

Mobile

Bottom navigation.

Tablet

Adaptive layout.

Maximum content width should remain comfortable for reading.

---

# Navigation

Bottom Navigation

- Dashboard
- Map
- Assistant
- Alerts
- Profile

Organizer mode may use a side navigation on larger screens.

---

# Cards

Pulse is card-driven.

Every major piece of information should exist inside a reusable card component.

Examples

Pulse Score

Weather

Queue

Parking

Recommendations

Incidents

Timeline

Cards should:

- concise
- glanceable
- interactive when necessary

---

# Dashboard

The dashboard is the heart of Pulse.

It is NOT a menu.

It is a live operational overview.

Priority order

1. Pulse Score

2. AI Insight

3. Crowd Status

4. Timeline

5. Recommendations

6. Quick Actions

The dashboard should immediately answer:

"What should I know right now?"

---

# Maps

Maps should remain clean.

Use overlays instead of clutter.

Supported overlays

Crowd

Parking

Food

Medical

Restrooms

Accessibility

Transit

Routes

Only one overlay should be emphasized at a time.

---

# AI Assistant

The assistant is a copilot.

Not the homepage.

Conversation should feel contextual.

Responses should include

- explanation
- recommendation
- reasoning

Whenever possible,

show supporting cards alongside text.

Example

Recommendation

↓

Map Preview

↓

Estimated Time

↓

Why this recommendation?

---

# Notifications

Notifications should be proactive.

Grouped by priority.

Levels

Critical

Warning

Information

Suggestions

Critical notifications should always remain visible until acknowledged.

---

# Accessibility

Must support

High Contrast

Reduced Motion

Screen Readers

Keyboard Navigation

Large Text

Accessible Color Contrast

Touch targets should always meet accessibility guidelines.

---

# Empty States

Every empty state should educate.

Example

Instead of

"No notifications"

Display

"Everything looks good.
We'll notify you if anything needs your attention."

---

# Loading States

Use skeleton loaders.

Never show blank screens.

AI responses should stream progressively when possible.

---

# Error States

Errors should be actionable.

Instead of

"Something went wrong."

Display

"We couldn't refresh live venue information.
Showing the latest available data."

---

# Heatmap

Three levels

Green

Low Density

Amber

Moderate Density

Red

High Density

Avoid rainbow gradients.

---

# Pulse Score

The signature component.

Displayed prominently.

Scale

0–100

Categories

90–100

Excellent

75–89

Healthy

50–74

Busy

25–49

Congested

0–24

Critical

Always include

AI explanation

Trend

Last updated

---

# Recommendation Cards

Every recommendation includes

Title

Priority

Reason

Expected Impact

Optional Action Button

Example

Use Gate C

↓

Expected wait time reduced by 12 minutes

↓

Navigate

---

# Timeline

Show upcoming events chronologically.

Examples

Kickoff

Halftime

Weather Alert

Transit Update

Gate Closing

Timeline should update automatically.

---

# Role-Based UI

The interface adapts to the user's role.

Attendee

Navigation focused

Volunteer

Task focused

Organizer

Operations focused

Accessibility

Guidance focused

Core navigation remains consistent.

---

# Branding

Name

Pulse

Tagline

AI-Powered Venue Intelligence

Logo

Simple

Circular

Heartbeat-inspired

Avoid sports-specific branding.

---

# Tone of Voice

Professional

Helpful

Calm

Reassuring

Never alarming unless necessary.

Explain recommendations clearly.

Avoid technical jargon.

---

# Design Principles

Every screen should satisfy these questions.

Can the user understand the venue status within 5 seconds?

Does the interface clearly communicate what to do next?

Can this screen be understood without reading long paragraphs?

Is the most important information immediately visible?

Would this interface work equally well for FIFA, IPL, or a concert?

If the answer to any question is "No",

the design should be simplified.

---

# Definition of Done

A UI implementation is complete only if it:

- follows the shared design tokens
- uses reusable components
- supports dark mode
- supports accessibility
- is mobile-first
- avoids visual clutter
- emphasizes proactive information
- aligns with the Pulse design philosophy