import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Just Wanna Leave",
  description: "What we collect (almost nothing), why, and how to make us delete it.",
};

export default function PrivacyPage() {
  return (
    <main className="wrap legal">
      <span className="kicker">The fine print</span>
      <h1>Privacy policy</h1>
      <p className="legal__updated">Last updated: 7 July 2026</p>

      <p>
        Short version: we collect your email address if you give it to us,
        we use it to send you the things we said we&apos;d send you, and we
        don&apos;t sell it to anyone. That&apos;s the whole business model —
        the guide is the product, not you.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Your email address</strong>, if you sign up — plus which page
          you signed up from, so we can send you relevant reminders (e.g.
          deadlines for a region you were reading about).
        </li>
        <li>
          <strong>Standard server logs</strong> kept by our hosting provider
          (Vercel) for security and debugging.
        </li>
      </ul>
      <p>
        We don&apos;t run advertising trackers, and we don&apos;t use cookies
        for anything beyond what the site technically needs to function.
      </p>

      <h2>Where it lives</h2>
      <p>
        Your email is stored in our database (Supabase) and mirrored to our
        email provider (Resend) so we can actually send you mail. Both are
        reputable processors with their own security and privacy commitments.
      </p>

      <h2>What we send</h2>
      <p>
        Deadline reminders and updates when scholarship rules change — roughly
        one email per month, usually fewer. Every email has an unsubscribe
        link, and unsubscribing works the first time.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us at any time to show you what we hold about you (it&apos;s
        your email address), correct it, or delete it entirely. Email{" "}
        <a href="mailto:hello@justwannaleave.com">hello@justwannaleave.com</a>{" "}
        and it&apos;s done. If you&apos;re in the EU/EEA, UK, or California,
        these are your legal rights (GDPR/CCPA); everywhere else, they&apos;re
        just how we behave anyway.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes in any way that matters, we&apos;ll note it here
        with a new date. We won&apos;t quietly get worse.
      </p>
    </main>
  );
}
