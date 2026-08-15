# #RaiseThemRight Website Launch & Community Matching Guide

**Version 1.0 — Working Baseline**  
**Campaign:** #RaiseThemRight  
**Purpose:** Build a safe community around parents to help them raise their children well.

## 1. Core Purpose

#RaiseThemRight is **not a platform for children**.

It is an adult community in which parents can seek appropriate support and Community Partners can offer their time, knowledge, experience and practical assistance.

The website should evolve from a public-awareness campaign site into a **safe community-support platform** without losing the campaign's original identity.

### Core model

> **Parents seek support.**  
> **Community Partners offer support.**  
> **The platform helps them find each other.**  
> **People choose.**  
> **The system protects.**  
> **Admin safeguards.**

## 2. User Roles

### Parent

An adult seeking support related to raising their child or strengthening their family.

Parents should be able to:

- create an account;
- complete a parent profile;
- describe the support they need;
- receive suitable matches;
- review Community Partner profiles;
- select whom they are comfortable connecting with;
- communicate safely;
- end a connection; and
- report concerns.

### Community Partner

An adult willing to support parents and families.

Community Partners should be able to:

- create an account;
- create a support profile;
- describe the assistance they can offer;
- define their service area;
- provide availability;
- complete appropriate verification;
- receive suitable opportunities;
- express interest in an opportunity;
- accept a connection selected by a parent; and
- complete or end a connection.

### Administrator

Admin operates **Mission Control**.

Admin should **not routinely match parents and Community Partners**.

Mission Control exists primarily to protect the integrity of the community through verification, security, safety monitoring, flagged-case investigation, account management, complaint handling and platform oversight.

## 3. Non-Negotiable Child-Safety Rule

### Children do not use #RaiseThemRight.

- No child accounts.
- No Community Partner-to-child matching.
- No independent child-to-partner messaging.
- Parents receive the support.

### Parents describe the need — not the child.

Before a parent submits a support request, prominently display:

> **Protect Your Child's Privacy**
>
> Please do not include your child's full name, photograph, school, exact age, home address, telephone number, or other information that could identify or locate your child.
>
> Describe the support you need without identifying your child.

Parents should confirm before submission that they have complied.

The system should also automatically screen descriptions for potentially identifying information before making them available to Community Partners.

## 4. Parent Journey

The intended journey is:

**Create Account**  
↓  
**Complete Parent Profile**  
↓  
**Request Support**  
↓  
**Privacy/Safety Screening**  
↓  
**Matching Engine Evaluates Request**  
↓  
**Suitable Community Partners Identified**  
↓  
**Partners See Appropriate Opportunity**  
↓  
**Interested Partners Respond**  
↓  
**Parent Reviews Safe Partner Profiles**  
↓  
**Parent Selects Preferred Partner**  
↓  
**Partner Accepts**  
↓  
**Connection Established**  
↓  
**Support Takes Place**  
↓  
**Connection Completed / Ended**  
↓  
**Optional Feedback / Report**

Admin should normally have to do **nothing** during this journey.

## 5. Community Partner Journey

**Register**  
↓  
**Verify Adult Account**  
↓  
**Create Community Partner Profile**  
↓  
**Select Support Categories**  
↓  
**Set Location / Service Area**  
↓  
**Set Availability**  
↓  
**Complete Required Verification**  
↓  
**Matching Engine Finds Suitable Opportunities**  
↓  
**Partner Reviews Anonymised Opportunity**  
↓  
**Express Interest**  
↓  
**Parent Selects Partner**  
↓  
**Partner Confirms**  
↓  
**Connection Opens**  
↓  
**Provide Parent Support**  
↓  
**Complete Connection**

The Community Partner should initially see the **need**, not unnecessary information about the family.

## 6. The Uber-Style Matching Principle

#RaiseThemRight borrows the **matching principle** from platforms such as ride-hailing marketplaces; it is not attempting to reproduce a ride-hailing application.

The system should continuously answer:

> **Which available Community Partners are appropriate for this parent's request?**

Matching factors may include:

- support category;
- broad location/service area;
- availability;
- verification level;
- preferences;
- relevant experience;
- previous reliability;
- current capacity; and
- parent preferences.

The engine may produce a compatibility score and explain the main reasons for a recommendation.

A compatibility score must **never mean automatic assignment**.

### Governing principle

> **AI recommends. People choose. Rules protect.**

## 7. Privacy Through Progressive Disclosure

People should not receive information merely because the database contains it.

### Before interest

A Community Partner may see:

- general support need;
- broad geographic area;
- general availability; and
- relevant non-identifying information.

The Community Partner should not see the parent's telephone number, exact address or identifying information about a child.

### After a Community Partner expresses interest

A parent may see appropriate partner information such as:

- first name or approved display identity;
- general area;
- support categories;
- relevant experience/profile information;
- verification status; and
- appropriate reputation/reliability information.

### After mutual acceptance

The platform may reveal only the additional information reasonably necessary for the connection.

Child-identifying information remains protected.

## 8. Safety Engine

The platform should be designed to detect and respond to risks such as:

- child-identifying information;
- requests for inappropriate access to children;
- harassment;
- threatening or inappropriate language;
- repeated reports;
- suspicious account behaviour;
- attempts to bypass safeguards;
- repeated cancellations or no-shows;
- verification inconsistencies; and
- unusual requests for personal information.

Not every concern should require an Admin case.

A working risk model may classify activity as:

- **LOW** — system handles automatically;
- **MEDIUM** — additional verification or restriction may occur;
- **HIGH** — Mission Control receives a safety flag;
- **CRITICAL** — connection/account may be restricted pending review.

AI may assist with detection and classification, but deterministic safety rules must remain underneath it. AI must not be the sole decision-maker for safeguarding.

## 9. Mission Control

Admin should focus on **security, trust, safety and exceptions**, rather than routine matchmaking.

Mission Control should eventually surface operational indicators such as:

- Community Partners;
- Parents Seeking Support;
- Potential Matches;
- Active Connections;
- Awaiting Acceptance;
- Verification Reviews;
- Safety Flags; and
- Reports.

Admin should be able to investigate exceptions without becoming the person running every connection.

## 10. Matching and Request Statuses

A support request may move through:

**Submitted → Screening → Matching → Open for Interest → Selection → Matched → Active → Completed**

Exception states may include:

- No Match Found;
- Cancelled;
- Reported; and
- Suspended.

Status transitions should be recorded so the system maintains a reliable operational history.

## 11. Verification

Different kinds of assistance may require different verification levels.

Potential levels include:

- **Basic Verified** — email/contact verification;
- **Identity Verified** — stronger adult identity confirmation;
- **Organisation Verified** — recognised organisation/community affiliation; and
- **Enhanced Verified** — additional checks appropriate to higher-trust support categories.

The matching engine may use verification level to determine which opportunities a Community Partner is eligible to see.

## 12. Existing Foundation

The project is **not starting over**.

The existing application already includes the public #RaiseThemRight website, campaign pages, pledge functionality, Community Partner/volunteer submissions, support requests, Supabase integration and the beginning of Mission Control.

New matching and safeguarding capabilities should extend this existing foundation rather than unnecessarily replace certified or working functionality.

## 13. Version 1 Launch Boundary

### Must Have

- Parent registration/authentication.
- Community Partner registration/authentication.
- Admin authentication and authorization.
- Community Partner profile.
- Parent support request.
- Child-privacy warnings and safeguards.
- Support categories.
- Basic verification.
- Safe opportunity visibility.
- Matching/ranking.
- Community Partner expression of interest.
- Parent selection.
- Mutual acceptance.
- Connection status/lifecycle.
- Progressive information disclosure.
- Report/block mechanism.
- Mission Control safety flags.
- Basic audit history.
- End-to-end security and privacy testing.

### Can Wait

The following should not delay Version 1 launch:

- native mobile application;
- GPS/live maps;
- complex AI recommendations;
- automatic dispatch;
- public star ratings;
- advanced analytics;
- sophisticated reputation scoring;
- large reporting suites; and
- payments.

## 14. Proposed Development Sequence

### Phase 0 — Current System Audit & Security Baseline

Confirm the current Supabase schema, RLS policies, authentication, public forms, admin access, privileges, service-role boundaries and production configuration.

### Phase 1 — Identity & Roles

Implement secure Parent, Community Partner and Admin authentication/authorization.

### Phase 2 — Community Partner Profile

Implement support categories, service area, availability, profile information and appropriate verification.

### Phase 3 — Parent Support Request 2.0

Implement structured requests, child-privacy safeguards, parent confirmation and automated screening.

### Phase 4 — Matching Engine V1

Implement rules-based compatibility first, with AI assistance only where it adds clear value and remains subject to deterministic safety controls.

### Phase 5 — Interest & Mutual Selection

Implement Community Partner expression of interest, parent selection and partner acceptance.

### Phase 6 — Safe Connection

Implement the connection lifecycle, controlled information disclosure, completion and cancellation.

### Phase 7 — Trust & Safety

Implement reporting, blocking, automated flags, suspension and the Mission Control safety queue.

### Phase 8 — Launch QA

Perform security, privacy, mobile usability, RLS, matching, abuse-scenario and complete end-to-end testing.

### Release Gate

**CONTROLLED PUBLIC LAUNCH** occurs only after the Version 1 launch requirements and launch QA gate have been satisfied.

## 15. Development Governance

This document is the working product baseline for the #RaiseThemRight community platform.

No significant matching, account, privacy, safeguarding or Mission Control feature should knowingly conflict with this baseline without first reviewing and updating the baseline.

Security and safeguarding requirements take precedence over convenience or automation.

The platform should preserve this core operating principle throughout development:

> **AI recommends. People choose. Rules protect. Admin safeguards.**

## 16. Immediate Next Step

Proceed with **Phase 0 — Current System Audit & Security Baseline** before adding the new matching workflow.

The Phase 0 audit should establish exactly what currently exists in Supabase and the application, identify security or privacy gaps, and define the safe technical baseline from which the remaining launch phases will be built.
