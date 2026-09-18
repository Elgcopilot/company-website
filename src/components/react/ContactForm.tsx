/**
 * ContactForm - multi-step engineering qualification (React island).
 * client:visible: static shell first, JS only when scrolled into view.
 * Submission: Google Calendar link + LINE + GSheet endpoint via env.
 * No bounce/spring motion (Brand 3).
 */
import { useState } from 'react';

const DOMAINS = ['Motorsport / Automotive', 'Industrial & Energy', 'Enterprise Appliance', 'Smart Infrastructure', 'Other'] as const;
const SCOPES = ['Custom Hardware / PCB', 'Embedded Linux / BSP', 'Edge AI', 'Cloud & Dashboard', 'Turnkey Ecosystem'] as const;
const CONSTRAINTS = ['Extreme Temperature', 'High Vibration', 'Low Latency', 'Remote Connectivity', 'Battery / Low Power'] as const;
const inputCls = 'w-full rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20';

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [scope, setScope] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const canNext =
    step === 0 ? domain !== ''
    : step === 1 ? scope.length > 0
    : step === 3 ? name.trim() !== '' && /.+@.+\..+/.test(email)
    : true;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const endpoint = (import.meta.env.PUBLIC_GSHEET_ENDPOINT as string | undefined) ?? '';
    const payload = { domain, scope: scope.join(', '), constraints: constraints.join(', '), name, email, company, brief, at: new Date().toISOString() };
    if (!endpoint) { setSent(true); return; }
    try {
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
      setSent(true);
    } catch {
      setError('Submission failed. Please reach us on LINE @embeddedlinuxgroup instead.');
    }
  }
  if (sent) {
    return (
      <div className="rounded-xl border border-brand-line bg-white p-8 text-center" role="status">
        <p className="mx-auto grid size-12 place-items-center rounded-full bg-brand-orange/10 font-mono font-bold text-brand-ember">OK</p>
        <h3 className="mt-4 text-xl font-bold tracking-tight">Brief received.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-600">
          Thanks {name.split(' ')[0] || 'there'} - our engineers reply within one business day. Want a slot now?
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2KxT2uJ8wXyZ_example" className="rounded-md bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ember">Book on Google Calendar</a>
          <a href="https://line.me/R/ti/p/@embeddedlinuxgroup" className="rounded-md border border-brand-line bg-white px-5 py-2.5 text-sm font-semibold hover:border-brand-orange/40">Continue on LINE</a>
        </div>
      </div>
    );
  }
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-3 min-h-[44px] inline-flex items-center text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${on ? 'border-brand-orange bg-brand-orange text-white' : 'border-brand-line bg-white text-neutral-600 hover:border-brand-orange/40'}`;
  return (
    <form onSubmit={submit} className="rounded-xl border border-brand-line bg-white p-6 sm:p-8" aria-label="Engineering qualification form">
      <ol className="flex gap-2" aria-label="Form progress">
        {['Domain', 'Scope', 'Environment', 'Contact'].map((l, i) => (
          <li key={l} className="flex-1">
            <p className={`h-1.5 rounded-full ${i <= step ? 'bg-brand-orange' : 'bg-brand-line'}`} />
            <p className={`mt-1.5 text-[11px] font-semibold ${i === step ? 'text-brand-ember' : 'text-neutral-400'}`}>{i + 1}. {l}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 min-h-[220px]">
        {step === 0 && (
          <fieldset>
            <legend className="font-semibold">Which operating domain is closest?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {DOMAINS.map((d) => (
                <button key={d} type="button" onClick={() => setDomain(d)} className={chip(domain === d)} aria-pressed={domain === d}>{d}</button>
              ))}
            </div>
          </fieldset>
        )}
        {step === 1 && (
          <fieldset>
            <legend className="font-semibold">What scope do you need? <span className="font-normal text-neutral-500">(pick any)</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SCOPES.map((s) => (
                <button key={s} type="button" onClick={() => toggle(scope, s, setScope)} className={chip(scope.includes(s))} aria-pressed={scope.includes(s)}>{s}</button>
              ))}
            </div>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset>
            <legend className="font-semibold">Operating environment (optional)</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONSTRAINTS.map((c) => (
                <button key={c} type="button" onClick={() => toggle(constraints, c, setConstraints)} className={chip(constraints.includes(c))} aria-pressed={constraints.includes(c)}>{c}</button>
              ))}
            </div>
          </fieldset>
        )}
        {step === 3 && (
          <fieldset>
            <legend className="font-semibold">Where do we send the engineering reply?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold">Name*<input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" autoComplete="name" /></label>
              <label className="text-xs font-semibold">Work email*<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@company.com" autoComplete="email" /></label>
              <label className="text-xs font-semibold sm:col-span-2">Company<input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} placeholder="Company / team" autoComplete="organization" /></label>
              <label className="text-xs font-semibold sm:col-span-2">Project brief<textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} className={inputCls} placeholder="Signals, volumes (MOQ from 5), timeline, operating reality" /></label>
            </div>
          </fieldset>
        )}
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{error}</p>}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-line pt-5">
        <button type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-md border border-brand-line px-5 py-3 min-h-[44px] text-sm font-semibold text-neutral-600 hover:border-brand-orange/40 disabled:opacity-40">Back</button>
        {step < 3 ? (
          <button key="next" type="button" disabled={!canNext} onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded-md bg-brand-orange px-6 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-brand-ember disabled:opacity-40">Continue</button>
        ) : (
          <button key="send" type="submit" disabled={!canNext} className="rounded-md bg-brand-orange px-6 py-3 min-h-[44px] text-sm font-semibold text-white hover:bg-brand-ember disabled:opacity-40">Send to engineering</button>
        )}
      </div>
      <p className="mt-3 text-center text-[11px] text-neutral-400">No spam. One engineering reply within one business day.</p>
    </form>
  );
}
