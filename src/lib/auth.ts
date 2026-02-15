import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type UserRole = "student" | "tutor";

type SessionPayload = {
  role: UserRole;
  email: string;
  exp: number;
};

export const SESSION_COOKIE = "upgrade_session";
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

function getSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SESSION_SECRET must be set to at least 32 characters in production.");
  }
  return "dev-only-upgrade-auth-secret-change-this-in-production";
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

export function verifyCredentials(role: UserRole, email: string, password: string) {
  const envKeys = ROLE_CONFIG[role];
  const expectedEmail = process.env[envKeys.email]?.trim().toLowerCase();
  const expectedPassword = process.env[envKeys.password];

  if (!expectedEmail || !expectedPassword) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Missing login credentials for role "${role}". Set ${envKeys.email} and ${envKeys.password}.`,
      );
    }
    return false;
  }

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
    if (!parsed.role || !parsed.email || !parsed.exp) return null;
    if (parsed.exp <= Date.now()) return null;
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
