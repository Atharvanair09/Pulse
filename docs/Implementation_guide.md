# Pulse Implementation Guide

Version: 1.0
Status: Development Process
Last Updated: July 2026

---

# Purpose

This document defines how Pulse should be developed.

It serves as the operational handbook for developers and AI coding assistants working on the project.

Every implementation must follow the architecture, design system, and AI philosophy defined in the other documentation.

This document defines *how* features are built.

---

# Development Philosophy

Pulse should be developed as a production-quality software platform.

Every implementation should prioritize:

- Maintainability
- Modularity
- Scalability
- Readability
- Reusability
- Predictability

The objective is to build software that could realistically evolve beyond the hackathon.

---

# Golden Rule

Never sacrifice architecture for speed.

Temporary hacks should be avoided whenever possible.

If a shortcut is required for the MVP, isolate it so it can easily be replaced later.

---

# Documentation Hierarchy

When multiple documents exist, they should be interpreted in the following order.

1. PRODUCT.md
2. ARCHITECTURE.md
3. AI.md
4. DESIGN.md
5. DATA_MODEL.md
6. FEATURES.md
7. IMPLEMENTATION_GUIDE.md
8. CHANGELOG.md

If conflicts exist, higher-priority documents take precedence.

---

# Sprint Workflow

Every sprint follows the same lifecycle.

Understand Feature

↓

Read Documentation

↓

Identify Dependencies

↓

Implement

↓

Test

↓

Refactor

↓

Update Documentation

↓

Commit

No sprint should modify unrelated functionality.

---

# Feature Workflow

Every feature must follow these steps.

## Step 1

Read relevant documentation.

Never begin implementation without understanding the architecture.

---

## Step 2

Determine affected modules.

Avoid unnecessary modifications.

---

## Step 3

Reuse existing components.

Do not duplicate UI or logic.

---

## Step 4

Implement feature.

Follow project conventions.

---

## Step 5

Verify.

Check

- responsiveness
- accessibility
- loading states
- error handling
- dark mode
- Demo Mode

---

## Step 6

Update

FEATURES.md

CHANGELOG.md

if necessary.

---

# File Modification Rules

Allowed

- Create new feature modules.
- Extend existing engines.
- Add reusable components.
- Improve documentation.

Avoid

- Rewriting existing architecture.
- Renaming folders unnecessarily.
- Duplicating utilities.
- Copying code between features.

---

# Component Guidelines

Every component should have a single responsibility.

Prefer

Small reusable components

Instead of

Large monolithic pages.

Example

Dashboard

↓

PulseRing

↓

RecommendationCard

↓

TimelineCard

↓

WeatherCard

↓

CrowdCard

Not

Dashboard.tsx

500 lines

---

# State Management Rules

Use the following order.

1. Local React State

2. Context

3. Firestore

Avoid introducing additional state management libraries.

---

# Venue Context Rules

Every feature must consume VenueContext.

Never create independent copies of

- crowd
- parking
- weather
- timeline
- recommendations

VenueContext is always the source of truth.

---

# AI Rules

Gemini never

- manages state
- calls APIs
- performs business logic
- stores application memory

Gemini only

- reasons
- explains
- summarizes
- translates

Every AI request must receive structured context.

---

# Engine Rules

Business logic belongs inside engines.

Never inside UI.

Available engines

- Venue Context Engine
- Recommendation Engine
- Insight Engine
- Notification Engine
- Prediction Engine
- Simulation Engine
- Localization Engine

Future engines should follow the same architecture.

---

# Simulation Rules

Every feature should function without external APIs.

Simulation Engine must provide

- crowd
- weather
- incidents
- transport
- parking
- queues

Simulation data should follow the same interfaces as production data.

---

# UI Rules

Every screen should answer

What is happening?

↓

What should I do?

↓

Why?

Avoid decorative dashboards.

Prioritize operational clarity.

---

# Design Rules

Follow DESIGN.md.

Never hardcode

colors

spacing

typography

animations

Always use shared design tokens.

---

# Accessibility Rules

Every feature must support

- keyboard navigation
- screen readers
- dark mode
- reduced motion
- high contrast
- large touch targets

Accessibility is a core requirement.

---

# Routing Rules

New functionality should be added as feature modules.

Avoid deeply nested routes.

Routing should remain intuitive.

---

# Performance Targets

Initial Load

< 3 seconds

AI Response

< 4 seconds

Route Change

< 300 ms

Animations

60 FPS

Lighthouse

90+

---

# Coding Standards

Use

TypeScript

Strict typing

No `any`

Prefer interfaces

Prefer composition

Avoid inheritance

Small functions

Reusable hooks

Reusable utilities

Meaningful naming

Avoid premature optimization.

---

# Error Handling

Every async operation should support

- loading
- success
- empty
- offline
- error

No blank screens.

---

# Testing Checklist

Before considering a feature complete

- Builds successfully
- Responsive
- Mobile friendly
- Dark mode
- Accessibility
- Demo Mode
- No console errors
- No duplicate code

---

# Git Workflow

Every sprint

Create branch

↓

Implement

↓

Test

↓

Merge

↓

Update CHANGELOG

↓

Tag release

Recommended commit format

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# Documentation Rules

Whenever architecture changes

Update

ARCHITECTURE.md

Whenever AI behavior changes

Update

AI.md

Whenever features change

Update

FEATURES.md

Whenever versions change

Update

CHANGELOG.md

Documentation should always reflect the codebase.

---

# Definition of Done

A feature is complete only if

✓ Follows architecture

✓ Uses shared data models

✓ Uses shared design system

✓ Consumes VenueContext

✓ Uses reusable components

✓ Works in Demo Mode

✓ Supports accessibility

✓ Handles loading/error states

✓ Maintains performance goals

✓ Updates documentation when required

---

# Engineering Principle

Every line of code should answer one question:

"Would this still make sense if Pulse served one million users across thousands of venues?"

If the answer is yes,

the implementation is likely aligned with the long-term vision of Pulse.