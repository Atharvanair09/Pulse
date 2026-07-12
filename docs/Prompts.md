# Pulse Prompt Library

Version: 1.0
Status: Prompt Engineering Guide
Last Updated: July 2026

---

# Purpose

This document contains all prompts used to develop Pulse using Google Antigravity.

It serves as:

- Prompt version control
- Development history
- Prompt engineering guide
- Recovery mechanism

Every implementation prompt should follow the standards defined here.

---

# Prompting Philosophy

Antigravity should behave as a senior software engineer.

Never ask it to generate an entire application.

Always implement one feature at a time.

Every prompt should:

- preserve existing architecture
- avoid modifying unrelated files
- reuse existing components
- follow the documentation
- maintain design consistency

---

# Standard Prompt Template

Every implementation prompt begins with:

---

Read the following documentation before making any changes.

- docs/PRODUCT.md
- docs/ARCHITECTURE.md
- docs/DESIGN.md
- docs/FEATURES.md
- docs/AI.md
- docs/DATA_MODEL.md

Treat these files as the single source of truth.

Do not violate the established architecture.

Preserve all existing functionality.

Only implement the requested feature.

Return production-quality TypeScript code.

---

# Prompt Rules

Always specify

- Objective
- Scope
- Constraints
- Deliverables
- Acceptance Criteria

Never use vague requests like

"Build the dashboard."

Instead describe exactly what should be implemented.

---

# Development Workflow

Each feature should follow this order.

1. Understand the objective.
2. Read the documentation.
3. Identify affected modules.
4. Reuse existing components.
5. Implement.
6. Test for regressions.
7. Update documentation if necessary.

---

# Prompt Format

## Objective

What should be built?

---

## Context

Which documentation applies?

---

## Scope

Which files may be modified?

---

## Constraints

What must NOT change?

---

## Deliverables

Expected outputs.

---

## Acceptance Criteria

How do we know the feature is complete?

---

# Sprint Prompts

---

## Sprint 0

Status

Pending

Purpose

Project foundation.

Prompt

(To be added after generation.)

---

## Sprint 1

Status

Pending

Purpose

Venue Context Engine.

Prompt

(To be added.)

---

## Sprint 2

Status

Pending

Purpose

Simulation Engine.

Prompt

(To be added.)

---

## Sprint 3

Status

Pending

Purpose

Dashboard.

Prompt

(To be added.)

---

## Sprint 4

Status

Pending

Purpose

Interactive Map.

Prompt

(To be added.)

---

## Sprint 5

Status

Pending

Purpose

Recommendation Engine.

Prompt

(To be added.)

---

## Sprint 6

Status

Pending

Purpose

Gemini Integration.

Prompt

(To be added.)

---

## Sprint 7

Status

Pending

Purpose

Organizer Dashboard.

Prompt

(To be added.)

---

## Sprint 8

Status

Pending

Purpose

Volunteer Dashboard.

Prompt

(To be added.)

---

## Sprint 9

Status

Pending

Purpose

Accessibility Mode.

Prompt

(To be added.)

---

## Sprint 10

Status

Pending

Purpose

Demo Mode.

Prompt

(To be added.)

---

# Prompt Quality Checklist

Before submitting any prompt, verify:

- References the documentation.
- Implements only one feature.
- Specifies affected files.
- Protects existing code.
- Uses TypeScript.
- Uses reusable components.
- Follows the design system.
- Follows the AI architecture.
- Supports Demo Mode where applicable.

---

# Common Mistakes

Avoid prompts like:

"Make it better."

"Improve the UI."

"Add AI."

Instead provide precise implementation objectives.

---

# Prompt Versioning

Each prompt should include:

Prompt ID

Sprint Number

Date

Purpose

Result

Notes

This allows prompts to be reused and improved over time.

---

# Definition of Done

A prompt is considered complete when it:

- produces deterministic output
- preserves architecture
- requires minimal manual fixes
- integrates cleanly with existing code
- follows every project document