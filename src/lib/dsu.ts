// Data access for the DSU dataset. The public site renders ONLY rows with
// verification_status = 'verified' — that guarantee is enforced here.

import { getSupabase } from "./supabase";

// The academic year the site currently presents. Bump once a year when the
// new bando cycle starts publishing.
export const CURRENT_ACADEMIC_YEAR = "2026/27";

export type RegionStatus = "live" | "soon" | "unknown";

export interface RegionAgency {
  name: string;
  website_url: string | null;
  bando_page_url: string | null;
  verified: boolean;
}

export interface RegionFigures {
  yearLabel: string;
  award_fuori_sede: number | null;
  award_pendolare: number | null;
  award_in_sede: number | null;
  isee_ceiling: number | null;
  ispe_ceiling: number | null;
  application_opens_on: string | null;
  application_deadline: string | null;
  bando_url: string | null;
  verified_at: string | null;
  source_url: string | null;
}

export interface RegionDSU {
  code: string;
  name: string;
  status: RegionStatus;
  agencies: RegionAgency[];
  figures: RegionFigures[]; // newest academic year first
}

export interface UpcomingDeadline {
  label: string;
  due_on: string;
  url: string | null;
}

interface AgencyRow {
  id: string;
  region_id: string;
  name: string;
  website_url: string | null;
  bando_page_url: string | null;
  verification_status: string;
}

interface FigureRow {
  agency_id: string;
  award_fuori_sede: number | null;
  award_pendolare: number | null;
  award_in_sede: number | null;
  isee_ceiling: number | null;
  ispe_ceiling: number | null;
  application_opens_on: string | null;
  application_deadline: string | null;
  bando_url: string | null;
  verified_at: string | null;
  academic_years: { label: string } | null;
  sources: { url: string } | null;
}

export async function getItalyRegions(): Promise<RegionDSU[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const [regionsRes, agenciesRes, figuresRes] = await Promise.all([
    sb
      .from("regions")
      .select("id, code, name")
      .eq("country_code", "IT"),
    sb
      .from("agencies")
      .select("id, region_id, name, website_url, bando_page_url, verification_status"),
    sb
      .from("region_year_figures")
      .select(
        "agency_id, award_fuori_sede, award_pendolare, award_in_sede, isee_ceiling, ispe_ceiling, application_opens_on, application_deadline, bando_url, verified_at, academic_years(label), sources(url)"
      )
      .eq("verification_status", "verified"),
  ]);

  if (regionsRes.error || agenciesRes.error || figuresRes.error) {
    throw new Error(
      regionsRes.error?.message ||
        agenciesRes.error?.message ||
        figuresRes.error?.message
    );
  }

  const agencies = (agenciesRes.data ?? []) as AgencyRow[];
  const figures = (figuresRes.data ?? []) as unknown as FigureRow[];

  const figuresByAgency = new Map<string, RegionFigures[]>();
  for (const f of figures) {
    const list = figuresByAgency.get(f.agency_id) ?? [];
    list.push({
      yearLabel: f.academic_years?.label ?? "",
      award_fuori_sede: f.award_fuori_sede,
      award_pendolare: f.award_pendolare,
      award_in_sede: f.award_in_sede,
      isee_ceiling: f.isee_ceiling,
      ispe_ceiling: f.ispe_ceiling,
      application_opens_on: f.application_opens_on,
      application_deadline: f.application_deadline,
      bando_url: f.bando_url,
      verified_at: f.verified_at,
      source_url: f.sources?.url ?? null,
    });
    figuresByAgency.set(f.agency_id, list);
  }

  return (regionsRes.data ?? []).map((r) => {
    const regionAgencies = agencies.filter((a) => a.region_id === r.id);
    const regionFigures = regionAgencies
      .flatMap((a) => figuresByAgency.get(a.id) ?? [])
      .sort((a, b) => b.yearLabel.localeCompare(a.yearLabel));

    const hasCurrentBando = regionFigures.some(
      (f) => f.yearLabel === CURRENT_ACADEMIC_YEAR
    );
    const hasVerifiedAgency = regionAgencies.some(
      (a) => a.verification_status === "verified"
    );

    return {
      code: r.code as string,
      name: r.name as string,
      status: (hasCurrentBando
        ? "live"
        : hasVerifiedAgency
          ? "soon"
          : "unknown") as RegionStatus,
      agencies: regionAgencies.map((a) => ({
        name: a.name,
        website_url: a.website_url,
        bando_page_url: a.bando_page_url,
        verified: a.verification_status === "verified",
      })),
      figures: regionFigures,
    };
  });
}

export async function getUpcomingDeadlines(limit = 4): Promise<UpcomingDeadline[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await sb
    .from("deadlines")
    .select("label, due_on, url")
    .gte("due_on", today)
    .order("due_on", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as UpcomingDeadline[];
}

// Highest verified fuori-sede award for the current academic year.
export async function getMaxVerifiedAward(): Promise<number | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("region_year_figures")
    .select("award_fuori_sede, academic_years(label)")
    .eq("verification_status", "verified")
    .not("award_fuori_sede", "is", null)
    .order("award_fuori_sede", { ascending: false })
    .limit(1);

  if (error || !data?.length) return null;
  const row = data[0] as unknown as {
    award_fuori_sede: number;
    academic_years: { label: string } | null;
  };
  return row.academic_years?.label === CURRENT_ACADEMIC_YEAR
    ? row.award_fuori_sede
    : null;
}
