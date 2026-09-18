// ELG company facts — single source of truth for contact details.
// Values verified against the live site (Sep 2026). Copywriting is
// ORIGINAL to this build; nothing is lifted from the old WordPress copy.
export const COMPANY = {
  name: 'Embedded Linux Group',
  shortName: 'ELG',
  tagline: 'Hardware & Software House',
  address: '141/638 Rama 9 Road, Huai Khwang, Bangkok 10310, Thailand',
  email: 'elg.info@embeddedlinuxgroup.com',
  phone: '+66 83-644-5519',
  phoneHref: 'tel:+66836445519',
  lineId: '@embeddedlinuxgroup',
  lineUrl: 'https://line.me/R/ti/p/@embeddedlinuxgroup',
  hours: 'Mon–Fri 9:00AM – 5:00PM (ICT)',
  domain: 'https://www.embeddedlinuxgroup.com',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/embeddedlinuxgroup' },
    { label: 'Instagram', href: 'https://www.instagram.com/embeddedlinuxgroup' },
    { label: 'X', href: 'https://x.com/embeddedlinuxgroup' },
    { label: 'LINE', href: 'https://line.me/R/ti/p/@embeddedlinuxgroup' },
  ],
} as const;

// Capability modules: the reusable building blocks ELG combines per
// client engagement. Shown on solution pages and as tags on case studies.
export const CAPABILITY_MODULES = [
  {
    slug: 'embedded-linux',
    name: 'Embedded Linux',
    blurb: 'Custom Yocto BSPs, kernel tuning and rock-solid industrial OS builds.',
  },
  {
    slug: 'embedded-ai',
    name: 'Embedded AI',
    blurb: 'On-device inference and smart detection that decide without the cloud.',
  },
  {
    slug: 'iot-connectivity',
    name: 'IoT & Connectivity',
    blurb: 'Gateways, protocol translation and resilient links for remote sites.',
  },
  {
    slug: 'rtos-firmware',
    name: 'RTOS & Firmware',
    blurb: 'Deterministic real-time control, drivers and power-optimized firmware.',
  },
  {
    slug: 'ux-ui',
    name: 'UX / UI & HMI',
    blurb: 'Operator touchscreens, mission-control dashboards and mobile apps.',
  },
  {
    slug: 'cloud-backend',
    name: 'Cloud Backend',
    blurb: 'High-throughput ingestion, real-time streaming and time-series storage.',
  },
] as const;

// Overview architecture layers — safe to show publicly. Per-client
// internals (chips, BOMs, protocol specifics) are never published.
export const ARCHITECTURE_LAYERS = [
  { name: 'Physical & Sensors', blurb: 'Custom PCBs, sensors and actuator interfaces built for the site.' },
  { name: 'Firmware & Real-Time OS', blurb: 'Deterministic control loops and drivers that meet hard deadlines.' },
  { name: 'Embedded Linux & Edge Logic', blurb: 'Local processing and buffering that survive link outages.' },
  { name: 'Cloud Ingestion & Analytics', blurb: 'Real-time pipelines that turn raw telemetry into decisions.' },
  { name: 'Mission Control & HMI', blurb: 'Dashboards and controls operators trust under pressure.' },
] as const;
