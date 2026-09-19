/**
 * ContactForm - multi-step engineering qualification (React island).
 * client:visible: static shell first, JS only when scrolled into view.
 * Submission: Formspree (PUBLIC_FORMSPREE_ID) → email to ELG inbox.
 * Fallback with no backend: opens the visitor's mail app with the full
 * brief prefilled, so the email still reaches ELG. Never fake success.
 * No bounce/spring motion (Brand 3).
 */
import { useState } from 'react';

const DOMAINS = ['Motorsport / Automotive', 'Industrial & Energy', 'Enterprise Appliance', 'Smart Infrastructure', 'Other'] as const;
const SCOPES = ['Custom Hardware / PCB', 'Embedded Linux / BSP', 'Edge AI', 'Cloud & Dashboard', 'Turnkey Ecosystem'] as const;
const CONSTRAINTS = ['Extreme Temperature', 'High Vibration', 'Low Latency', 'Remote Connectivity', 'Battery / Low Power'] as const;
const inputCls = 'w-full rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20';
const CAL_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ykdY5a2sozv3ORdUVbPhhHaCzABq7AWFojngeJBtFE-3uJU5dSwtmPp0jHjEwv3O2eQzkOWmM?gv=true';
const ELG_EMAIL = 'elg.info@embeddedlinuxgroup.com';

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [scope, setScope] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');
  const [sent, setSent] = useState<'formspree' | 'mailto' | false>(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const canNext =
    step === 0 ? domain !== ''
    : step === 1 ? scope.length > 0
    : step === 3 ? name.trim() !== '' && /.+@.+\..+/.test(email)
    : true;
  function mailtoHref(payload: Record<string, string>) {
    const subject = encodeURIComponent(`ELG enquiry — ${payload.domain} — ${payload.name}`);
    const body = encodeURIComponent(
      [`Name: ${payload.name}`, `Email: ${payload.email}`, `Company: ${payload.company || '-'}`, `Domain: ${payload.domain}`, `Scope: ${payload.scope || '-'}`, `Environment: ${payload.constraints || '-'}`, '', `Brief:`, payload.brief || '-', '', `Sent from ${payload.site} at ${payload.at}`].join('\n'),
    );
    return `mailto:${ELG_EMAIL}?subject=${subject}&body=${body}`;
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const payload = {
      domain, scope: scope.join(', '), constraints: constraints.join(', '),
      name: name.trim(), email: email.trim(), company: company.trim(), brief: brief.trim(),
      site: typeof window !== 'undefined' ? window.location.origin : '',
      at: new Date().toISOString(),
      _subject: `ELG enquiry — ${domain} — ${name.trim()}`,
      _replyTo: email.trim(),
    };
    const formId = (import.meta.env.PUBLIC_FORMSPREE_ID as string | undefined)?.trim() ?? '';
    if (!formId) {
      // No backend configured: hand the full brief to the visitor's mail app.
      window.location.href = mailtoHref(payload);
      setSent('mailto');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setSent('formspree');
    } catch {
      setError('Could not send automatically — your mail app opens next with everything prefilled, or reach us on LINE @embeddedlinuxgroup.');
      window.location.href = mailtoHref(payload);
      setSent('mailto');
    } finally {
      setSending(false);
    }
  }
  if (sent) {
    return (
      <div className="rounded-xl border border-brand-line bg-white p-8 text-center" role="status">
        <p className="mx-auto grid size-12 place-items-center rounded-full bg-brand-orange/10 font-mono font-bold text-brand-ember">OK</p>
        <h3 className="mt-4 text-xl font-bold tracking-tight">
          {sent === 'formspree' ? 'Brief received.' : 'Almost there — one tap to send.'}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-600">
          {sent === 'formspree'
            ? <>Thanks {name.split(' ')[0] || 'there'} — our engineers reply within one business day. Want a slot now?</>
            : <>Thanks {name.split(' ')[0] || 'there'} — your mail app just opened with the full brief prefilled. Hit send and our engineers reply within one business day.</>}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={CAL_URL} className="rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-black active:scale-[0.98]">Book on Google Calendar</a>
          <a href="https://line.me/R/ti/p/@embeddedlinuxgroup" className="rounded-full border border-brand-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-all duration-200 hover:-translate-y-px hover:border-brand-ink active:scale-[0.98]">Continue on LINE</a>
        </div>
      </div>
    );
  }
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-3 min-h-[44px] inline-flex items-center text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${on ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-line bg-white text-neutral-600 hover:border-brand-ink'}`;
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
        <button type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-full border border-brand-line px-5 py-3 min-h-[44px] text-sm font-semibold text-neutral-600 transition-all duration-200 hover:border-brand-ink disabled:opacity-40">Back</button>
        {step < 3 ? (
          <button key="next" type="button" disabled={!canNext} onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded-full bg-brand-ink px-6 py-3 min-h-[44px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-black active:scale-[0.98] disabled:opacity-40">Continue</button>
        ) : (
          <button key="send" type="submit" disabled={!canNext || sending} className="rounded-full bg-brand-ink px-6 py-3 min-h-[44px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-black active:scale-[0.98] disabled:opacity-40">
            {sending ? 'Sending…' : 'Send to engineering'}
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-[11px] text-neutral-400">No spam. One engineering reply within one business day.</p>
    </form>
  );
}
