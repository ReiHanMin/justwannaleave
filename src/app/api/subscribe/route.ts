import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let email: unknown;
  let source: unknown;
  try {
    const body = await req.json();
    email = body?.email;
    source = body?.source;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const cleanEmail = email.trim().toLowerCase();
  const cleanSource =
    typeof source === "string" && source.length <= 60 ? source : "homepage";

  // 1. Persist to our own table first — signups must never be lost.
  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  const { error } = await sb
    .from("subscribers")
    .insert({ email: cleanEmail, source: cleanSource });

  // 23505 = unique violation: already subscribed. Treat as success (idempotent).
  if (error && error.code !== "23505") {
    console.error("[subscribe] insert failed:", error.code);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }

  // 2. Best-effort mirror to Resend when configured — failure here must not
  //    fail the signup; the subscribers table is the source of truth.
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail, unsubscribed: false }),
      });
    } catch {
      // Logged nowhere on purpose: no PII in logs; the DB row is safe.
    }
  }

  return NextResponse.json({ ok: true });
}
