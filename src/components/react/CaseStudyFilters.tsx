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
        ? 'border-brand-ink bg-brand-ink text-white shadow-sm'
        : 'border-brand-line bg-white text-neutral-600 hover:border-brand-ink hover:text-brand-ink'
    }`;
  const cardImage = (src: string) => src.includes('/images/case-studies/field/')
    ? src.replace(/\/[^/]+$/, '/card.webp')
    : src;
  return (
    <div data-static-list>
      <div className="rounded-2xl border border-brand-line bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Industry</p>
            <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
              {INDUSTRIES.map((i) => (
                <button key={i} type="button" onClick={() => setIndustry(i)} className={pill(industry === i)} aria-pressed={industry === i}>
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Project type</p>
            <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Filter by project type">
              {PROJECT_TYPES.map((t) => (
                <button key={t} type="button" onClick={() => setProjectType(t)} className={pill(projectType === t)} aria-pressed={projectType === t}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 border-t border-brand-line pt-4 font-mono text-xs text-neutral-500" aria-live="polite">
          Showing <span className="font-bold text-brand-ink">{filtered.length}</span> of{' '}
          <span className="font-bold text-brand-ink">{items.length}</span> deployments
          {(industry !== 'All' || projectType !== 'All') && (
            <button type="button" onClick={() => { setIndustry('All'); setProjectType('All'); }} className="ml-2 font-sans font-semibold text-brand-ember hover:underline">
              Clear filters
            </button>
          )}
        </p>
      </div>
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-brand-line bg-white p-10 text-center sm:p-14">
          <p className="text-lg font-semibold tracking-tight text-brand-ink">No deployments match this combination yet.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-600">
            Tell us your operating reality.{' '}
            <a href="/contact" className="font-semibold text-brand-ember hover:underline">Talk to our team →</a>
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <h2 className="sr-only">Case studies</h2>
          {filtered.map((c) => (
            <article key={c.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink/20 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]">
              <a href={`/case-studies/${c.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-mist">
                  <img src={cardImage(c.featuredImage)} alt={c.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  {c.isPlaceholderImage && (
                    <span className="absolute left-3 top-3 rounded-lg bg-brand-ink/85 px-2 py-1 text-[11px] font-medium text-white">[Placeholder Asset]</span>
                  )}
                  {c.clientPartner && (
                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-brand-ink">{c.clientPartner}</span>
                  )}
                  <span className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 font-mono text-[11px] font-medium text-white">{c.status}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ember">
                    {c.industry} · {c.projectType}
                  </p>
                  <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-tight text-brand-ink transition-colors group-hover:text-brand-ember">{c.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">{c.subtitle}</p>
                  {c.environmentConstraints.length > 0 && (
                    <p className="mt-3 font-mono text-[11px] leading-relaxed text-neutral-500">
                      <span className="font-semibold text-neutral-600">Field:</span> {c.environmentConstraints.slice(0, 2).join(' · ')}
                    </p>
                  )}
                  <p className="mt-4 flex items-center justify-between border-t border-brand-line pt-4 text-sm">
                    <span className="font-semibold text-brand-ink">Read the evidence</span>
                    <span aria-hidden="true" className="grid size-6 place-items-center rounded-full border border-brand-line text-xs transition-all duration-200 group-hover:border-brand-ember group-hover:bg-brand-ember group-hover:text-white">→</span>
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
