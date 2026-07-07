import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Just Wanna Leave",
  description: "We're a guide, not an agency. Here's exactly what that means.",
};

export default function DisclaimerPage() {
  return (
    <main className="wrap legal">
      <span className="kicker">The fine print</span>
      <h1>Disclaimer</h1>
      <p className="legal__updated">Last updated: 7 July 2026</p>

      <p>
        We research government scholarship and tuition programmes and explain
        them in plain English. We&apos;re a guide, not an agency, a law firm,
        or a government body — and we&apos;re not affiliated with any of the
        institutions we write about.
      </p>

      <h2>About our numbers</h2>
      <p>
        Every figure we publish is checked against a primary source — the
        official bando, ministerial decree, or agency page — and stamped with
        the date we verified it and a link to that source. When we haven&apos;t
        verified something, we say so instead of guessing.
      </p>
      <p>
        But: <strong>programmes, amounts, income thresholds and deadlines
        change every year</strong>, sometimes mid-cycle, and translations can
        miss nuance. The official bando — in Italian, in all its bureaucratic
        glory — is always the binding document. Before you make decisions that
        cost money or time, verify with the official source we link to, or with
        the agency directly.
      </p>

      <h2>What we can&apos;t promise</h2>
      <ul>
        <li>
          That you&apos;ll receive any scholarship — eligibility and funding
          decisions belong entirely to the administering agencies.
        </li>
        <li>
          That a figure valid when we verified it is still valid today —
          check the verified date shown next to every number.
        </li>
        <li>
          Immigration, tax, or legal advice of any kind. For that, talk to the
          relevant consulate or a qualified professional.
        </li>
      </ul>

      <h2>Found an error?</h2>
      <p>
        Tell us at{" "}
        <a href="mailto:hello@justwannaleave.com">hello@justwannaleave.com</a>{" "}
        and we&apos;ll fix it and note the correction. Being corrected is the
        cost of publishing real numbers, and we&apos;d rather be corrected
        than vague.
      </p>
    </main>
  );
}
