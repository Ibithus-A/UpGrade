import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type UserRole = "student" | "tutor";

type SessionPayload = {
  role: UserRole;
  email: string;
  exp: number;
  v: number;
};

const SESSION_VERSION = 2;
export const SESSION_COOKIE = "upgrade_session_v2";

// Hardcoded login details (for quick reference):
// Student: Student@UpGrade.com / Student123
// Tutor: Ibrahim@UpGrade.com / Ibrahim123

const HARDCODED_CREDENTIALS = {
  student: {
    email: "Student@UpGrade.com",
    password: "Student123",
  },
  tutor: {
    email: "Ibrahim@UpGrade.com",
    password: "Ibrahim123",
  },
} as const;

const ROLE_CONFIG = {
  student: {
    email: "AUTH_STUDENT_EMAIL",
    password: "AUTH_STUDENT_PASSWORD",
  },
  tutor: {
    email: "AUTH_TUTOR_EMAIL",
    password: "AUTH_TUTOR_PASSWORD",
  },
} as const;

let cachedSecret: string | null = null;
let cachedQuickLearnAllowList: string[] | null = null;

function getSecret() {
  if (cachedSecret) return cachedSecret;

  const secret = process.env.AUTH_SESSION_SECRET;
  if (secret && secret.length >= 32) {
    cachedSecret = secret;
    return cachedSecret;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SESSION_SECRET must be set to at least 32 characters in production.");
  }

  cachedSecret = "dev-only-upgrade-auth-secret-change-this-in-production";
  return cachedSecret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function secureEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isValidPasswordFormat(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

export function verifyCredentials(role: UserRole, email: string, password: string) {
  const envKeys = ROLE_CONFIG[role];
  const expectedEmail = (
    process.env[envKeys.email]?.trim() || HARDCODED_CREDENTIALS[role].email
  ).toLowerCase();
  const expectedPassword =
    process.env[envKeys.password] || HARDCODED_CREDENTIALS[role].password;

  return (
    secureEqual(email.trim().toLowerCase(), expectedEmail) &&
    secureEqual(password, expectedPassword)
  );
}

function makeToken(payload: SessionPayload) {
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(encoded);
  return `${encoded}.${signature}`;
}

function parseToken(token: string) {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signValue(encoded);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(encoded)) as SessionPayload;
    if (!parsed.role || !parsed.email || !parsed.exp || !parsed.v) return null;
    if (parsed.exp <= Date.now()) return null;
    if (parsed.v !== SESSION_VERSION) return null;
    if (parsed.role !== "student" && parsed.role !== "tutor") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function createSession(role: UserRole, email: string) {
  const payload: SessionPayload = {
    role,
    email,
    exp: Date.now() + 1000 * 60 * 60 * 8,
    v: SESSION_VERSION,
  };
  const token = makeToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function readSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return parseToken(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export function hasQuickLearnAccessForStudent(email: string) {
  if (!cachedQuickLearnAllowList) {
    const configured = (process.env.QUICKLEARN_3_MONTH_PLAN_EMAILS ?? "").trim();
    cachedQuickLearnAllowList = configured
      ? configured.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean)
      : [HARDCODED_CREDENTIALS.student.email.toLowerCase()];
  }

  return cachedQuickLearnAllowList.includes(email.trim().toLowerCase());
}
