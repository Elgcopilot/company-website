import { useState } from 'react';

const ELG_EMAIL = 'elg.info@embeddedlinuxgroup.com';
const inputClass = 'mt-1.5 w-full rounded-md border border-brand-line bg-white px-3 py-3 text-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20';

export default function InvestorAccessForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<'formspree' | 'mailto' | false>(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    payload._subject = `Private investor access request - ${payload.name} - ${payload.company}`;
    payload.requestType = 'Investor pitch deck and roadmap access';
    payload.submittedAt = new Date().toISOString();

    const formId = ((import.meta.env.PUBLIC_INVESTOR_FORMSPREE_ID || import.meta.env.PUBLIC_FORMSPREE_ID) as string | undefined)?.trim() ?? '';
    const mailBody = encodeURIComponent([
      `Name: ${payload.name}`,
      `Work email: ${payload.email}`,
      `Company / fund: ${payload.company}`,
      `Role: ${payload.role}`,
      `Investment focus: ${payload.focus || '-'}`,
      '',
      `Context: ${payload.context || '-'}`,
      '',
      'I am requesting private access to ELG investor materials and understand access is reviewed individually.',
    ].join('\n'));
    const mailto = `mailto:${ELG_EMAIL}?subject=${encodeURIComponent(payload._subject)}&body=${mailBody}`;

    if (!formId) {
      window.location.href = mailto;
      setSent('mailto');
      return;
    }

    setSending(true);
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Formspree ${response.status}`);
      setSent('formspree');
    } catch {
      setError('Automatic delivery was unavailable. Your mail app will open with the request prefilled.');
      window.location.href = mailto;
      setSent('mailto');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-brand-line bg-white p-8" role="status">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-ember">Request prepared</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-ink">We will review the context privately.</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-neutral-600">
          {sent === 'formspree' ? 'Your request has reached ELG.' : 'Your mail app opened with the request prefilled. Please send it to complete the request.'} Approved materials are shared directly, never through a public link.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-brand-line bg-white p-6 sm:p-8" aria-label="Private investor access request">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-brand-ink">Name*<input className={inputClass} name="name" required autoComplete="name" /></label>
        <label className="text-sm font-semibold text-brand-ink">Work email*<input className={inputClass} name="email" type="email" required autoComplete="email" /></label>
        <label className="text-sm font-semibold text-brand-ink">Company or fund*<input className={inputClass} name="company" required autoComplete="organization" /></label>
        <label className="text-sm font-semibold text-brand-ink">Role*<input className={inputClass} name="role" required autoComplete="organization-title" /></label>
        <label className="text-sm font-semibold text-brand-ink sm:col-span-2">Investment focus<input className={inputClass} name="focus" placeholder="Stage, sector, geography, or strategic interest" /></label>
        <label className="text-sm font-semibold text-brand-ink sm:col-span-2">Why would you like access?*<textarea className={inputClass} name="context" rows={5} required placeholder="A short introduction and the context for your request" /></label>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
        <input type="checkbox" name="confidentialityAcknowledged" value="yes" required className="mt-1 size-4 accent-brand-orange" />
        <span>I understand ELG’s pitch deck, roadmap, and current initiatives are confidential and access is granted individually.</span>
      </label>
      {error && <p className="mt-4 text-sm font-semibold text-red-600" role="alert">{error}</p>}
      <button type="submit" disabled={sending} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-brand-ember active:scale-[0.98] disabled:opacity-50">
        {sending ? 'Sending request...' : 'Request private access'}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-neutral-500">No investor documents are hosted publicly. ELG reviews identity and context before sharing materials.</p>
    </form>
  );
}
