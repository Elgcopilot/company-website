/**
 * CaseStudyFilters - the ONLY hydrated island on the hub page.
 * Justification for client:load: instant industry x project-type
 * filtering without a round-trip; 10 cards stay static HTML.
 * Motion: none beyond inherited card hover (Brand 3 anti-bounce).
 */
import { useMemo, useState } from 'react';

export type HubCard = {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  projectType: string;
  clientPartner?: string;
  status: string;
  featuredImage: string;
  isPlaceholderImage: boolean;
  environmentConstraints: string[];
};

const INDUSTRIES = [
  'All',
  'Automotive & Motorsport',
  'Industrial IoT & Energy',
  'Enterprise & Commercial IoT',
  'Smart Agriculture & AI',
  'Smart Buildings & Infrastructure',
  'Education & Research',
  'Entertainment & Events',
] as const;

const PROJECT_TYPES = [
  'All',
  'Turnkey Ecosystem',
  'Mission-Critical Telemetry',
  'Edge AI Platform',
  'IoT Gateway & Infrastructure',
  'Custom Hardware Board',
] as const;

export default function CaseStudyFilters({ items }: { items: HubCard[] }) {
  const [industry, setIndustry] = useState<string>('All');
  const [projectType, setProjectType] = useState<string>('All');
  const filtered = useMemo(
    () =>
      items.filter(
        (c) =>
          (industry === 'All' || c.industry === industry) &&
          (projectType === 'All' || c.projectType === projectType),
      ),
    [items, industry, projectType],
  );
  const pill = (active: boolean) =>
    `rounded-full border px-4 py-3 min-h-[44px] inline-flex items-center text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
      active
        ? 'border-brand-orange bg-brand-orange text-white shadow-sm'
        : 'border-brand-line bg-white text-neutral-600 hover:border-brand-orange/40 hover:text-brand-ember'
    }`;
  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-brand-line bg-white p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Industry</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
            {INDUSTRIES.map((i) => (
              <button key={i} type="button" onClick={() => setIndustry(i)} className={pill(industry === i)} aria-pressed={industry === i}>
                {i}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Project type</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by project type">
            {PROJECT_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => setProjectType(t)} className={pill(projectType === t)} aria-pressed={projectType === t}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-neutral-500" aria-live="polite">
          Showing <span className="font-mono font-bold text-brand-ink">{filtered.length}</span> of{' '}
          <span className="font-mono font-bold text-brand-ink">{items.length}</span> deployments
          {(industry !== 'All' || projectType !== 'All') && (
            <button type="button" onClick={() => { setIndustry('All'); setProjectType('All'); }} className="ml-2 font-semibold text-brand-ember hover:underline">
              Clear filters
            </button>
          )}
        </p>
      </div>
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-brand-line bg-white p-10 text-center">
          <p className="font-semibold">No deployments match this combination yet.</p>
          <p className="mt-2 text-sm text-neutral-600">
            Tell us your operating reality.{' '}
            <a href="/contact" className="font-semibold text-brand-ember hover:underline">Talk to our team</a>
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article key={c.slug} className="group flex flex-col overflow-hidden rounded-xl border border-brand-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-lg">
              <a href={`/case-studies/${c.slug}`} className="flex h-full flex-col" aria-label={`Read case study: ${c.title}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-mist">
                  <img src={c.featuredImage} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {c.isPlaceholderImage && (
                    <span className="absolute left-3 top-3 rounded-md bg-brand-ink/85 px-2 py-1 text-[11px] font-medium text-white">[Placeholder Asset]</span>
                  )}
                  {c.clientPartner && (
                    <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 font-mono text-[11px] font-semibold text-brand-ink">{c.clientPartner}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-widest">
                    <span className="rounded-full bg-brand-mist px-2 py-1 text-neutral-600">{c.industry}</span>
                    <span className="rounded-full bg-brand-orange/10 px-2 py-1 text-brand-ember">{c.projectType}</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-brand-ember">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.subtitle}</p>
                  <p className="mt-4 flex items-center justify-between border-t border-brand-line pt-3 text-xs">
                    <span className="font-mono font-semibold text-neutral-500">{c.status}</span>
                    <span className="font-semibold text-brand-ember">Read evidence</span>
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
