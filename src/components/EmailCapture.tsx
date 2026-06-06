"use client";

import { useState } from "react";

type FormState = "idle" | "bad" | "done";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setState(ok ? "done" : "bad");
  };

  return (
    <section className="section capture" id="signup">
      <div className="wrap capture__in">
        <div>
          <span className="kicker">Stay ahead of the deadline</span>
          <h2>
            The <em>bando</em> changes every year.
            <br />
            We&apos;ll tell you when it does.
          </h2>
          <p>
            Sign up and get the full regional breakdown — plus deadline
            reminders sent before it&apos;s too late to apply.
          </p>
        </div>

        {state === "done" ? (
          <div className="form form--done">
            <div className="tick">✓</div>
            <h3
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 800,
                fontSize: 24,
                margin: "0 0 8px",
              }}
            >
              You&apos;re on the list.
            </h3>
            <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 15 }}>
              Check your inbox for the regional breakdown. We&apos;ll only email
              when the bando actually moves.
            </p>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <label htmlFor="jwl-email">Your email</label>
            <div className="form__row">
              <input
                id="jwl-email"
                type="email"
                placeholder="you@email.com"
                value={email}
                className={state === "bad" ? "err" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "bad") setState("idle");
                }}
                aria-invalid={state === "bad"}
              />
              <button className="btn btn--primary" type="submit">
                Get access — it&apos;s free
              </button>
            </div>
            <div className={`form__msg${state === "bad" ? " bad" : ""}`}>
              {state === "bad"
                ? "That doesn't look like an email — mind checking?"
                : "Free, forever. The guide is the product, not you."}
            </div>
            <div className="form__reassure">
              🔒 No spam. One email per month. Unsubscribe anytime.
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
