// CODEBASE SCALING COMMENTS
// This file is intentionally comment-only.
// Goal: explain how the current code works and where to scale next.

// =============================================================================
// 1) CURRENT HIGH-LEVEL ARCHITECTURE
// =============================================================================
// Framework:
// - Next.js App Router (server components + API route handlers).
//
// Current auth path:
// - src/lib/auth.ts
//   - Uses signed cookie sessions with HMAC.
//   - Credentials are env-based with hardcoded fallback accounts.
//   - Roles: "student" | "tutor".
//
// Current course/content persistence:
// - src/lib/course-content.ts
//   - Static chapter/section definitions for A-Level Maths.
// - src/lib/course-module-store.ts
//   - File-based storage in data/course-modules.json.
//   - Uploaded PDFs saved under public/course-files.
//
// Current API surface:
// - src/app/api/course/module/route.ts
//   - Reads modules + assessments + unlock maps.
// - src/app/api/course/module/upload/route.ts
//   - Handles tutor material uploads and student submissions.
// - src/app/api/course/module/pass/route.ts
//   - Tutor marks section/chapter as passed and unlocks chapters.
// - src/app/api/course/custom-topic/route.ts
//   - Tutor creates/controls custom topics.

// =============================================================================
// 2) HOW TO ADD REAL AUTHENTICATION
// =============================================================================
// Why change:
// - Current auth is valid for MVP but not ideal for production-grade identity.
// - Missing: password reset, MFA, provider login, account lifecycle, audit.
//
// Recommended production options:
// - Option A: Managed provider (Clerk/Auth0/Firebase Auth/Supabase Auth).
// - Option B: Auth.js (NextAuth) + your database adapter.
// - Option C: Fully custom auth + DB + secure password hashing + reset flows.
//
// Minimum production requirements:
// - Store users in DB table with unique email and role(s).
// - Hash passwords using Argon2 or bcrypt (never plain text).
// - Add refresh/session rotation strategy.
// - Add password reset email flow with single-use token.
// - Add optional MFA for tutor/admin accounts.
//
// Migration path for this codebase:
// - Replace verifyCredentials/createSession/readSession in src/lib/auth.ts
//   with provider/adapter-backed session validation.
// - Keep current role checks in APIs, but source role from DB claims/session.
// - Add middleware.ts route protection for /courses, /student, /tutor.
// - Add account lock/rate limit on sign-in route actions.

// =============================================================================
// 3) HOW TO ADD COURSE MATERIALS PROPERLY
// =============================================================================
// Current state:
// - Materials are PDF files saved to local disk in public/course-files.
// - Metadata is in JSON file data/course-modules.json.
//
// Production upgrade:
// - Move file storage to object store:
//   - AWS S3, Cloudflare R2, Supabase Storage, or GCS.
// - Keep only metadata and permissions in relational DB.
//
// Suggested DB entities:
// - users(id, email, role, created_at, ...)
// - courses(id, slug, title, ...)
// - chapters(id, course_id, slug, order_index, ...)
// - sections(id, chapter_id, title, order_index, ...)
// - materials(id, section_id, kind, file_key, uploaded_by, ...)
//   - kind: notes | exam | chapter_test
// - submissions(id, section_id, student_id, file_key, status, reviewed_by, ...)
// - chapter_submissions(id, chapter_id, student_id, file_key, status, ...)
//
// API changes:
// - upload route should create signed upload URLs (presigned URL flow).
// - client uploads directly to object store, then confirms metadata to API.
// - avoid large API body uploads through Next server when scaling.
//
// Versioning:
// - Add material versions so tutor updates do not break student history.
// - Keep immutable versions and point "active material" per section.

// =============================================================================
// 4) HOW TO LIMIT STUDENT ACCESS SAFELY
// =============================================================================
// Current model:
// - Access mostly derived from chapter pass state + manual unlock flags.
//
// Production model:
// - Introduce entitlement policies in DB:
//   - enrollment table (which student has which course).
//   - plan/feature flags per student.
//   - unlock rules tracked server-side only.
//
// Enforcement rules:
// - Never rely only on UI for lock behavior.
// - Every read/write API must validate:
//   - authenticated user id
//   - role
//   - enrollment
//   - entitlement
//   - ownership (student can only mutate own submissions)
//
// Additional controls:
// - Rate limit uploads and pass-marking endpoints.
// - Add anti-abuse checks and file scan for uploads.
// - Add audit log for "who unlocked what and when".

// =============================================================================
// 5) HOW TUTOR SHOULD INTERACT WITH STUDENTS AT SCALE
// =============================================================================
// Current tutor interactions:
// - Upload notes/exams
// - View submissions
// - Mark passed
// - Unlock chapters/custom topics
//
// Recommended next features:
// - Structured feedback per submission:
//   - score, rubric items, comments, correction targets.
// - Assignment queue/dashboard:
//   - "awaiting review", "late", "resubmission requested".
// - In-app communication:
//   - thread tied to section/submission.
// - Notifications:
//   - email/in-app on new material, review complete, unlock granted.
//
// Data model additions:
// - submission_feedback(id, submission_id, tutor_id, score, notes, created_at)
// - conversations(id, student_id, tutor_id, context_type, context_id)
// - messages(id, conversation_id, sender_id, text, created_at)
// - notifications(id, user_id, type, payload, read_at)

// =============================================================================
// 6) PERFORMANCE + RELIABILITY SCALING
// =============================================================================
// Storage and DB:
// - Replace JSON file store with DB transactions.
// - Add proper indexes on course/chapter/section/student lookup fields.
//
// API reliability:
// - Add validation schemas (zod/valibot) for request bodies.
// - Standardize error codes and response contracts.
// - Add idempotency keys for upload confirm and mark-pass actions.
//
// Security:
// - Add CSRF strategy for session-auth POST endpoints.
// - Add Content Security Policy and strict file-type validation.
// - Add virus scanning for uploaded documents.
//
// Observability:
// - Add structured logs with request ids.
// - Add metrics (p95 latency, error rate, upload failure rate).
// - Add tracing for API and storage operations.

// =============================================================================
// 7) PRACTICAL MIGRATION PLAN (ORDERED)
// =============================================================================
// Phase 1:
// - Introduce DB schema and keep old JSON path as fallback.
// - Switch reads first, then writes.
//
// Phase 2:
// - Move file uploads to object storage with presigned URLs.
// - Store only file keys/metadata in DB.
//
// Phase 3:
// - Replace local auth with provider-backed auth.
// - Migrate users and roles.
//
// Phase 4:
// - Add tutor feedback + notifications + conversation layer.
//
// Phase 5:
// - Add observability, rate limits, and security hardening.
//
// This phased path avoids full rewrite risk and keeps your current routes
// usable while progressively moving to production-grade architecture.
