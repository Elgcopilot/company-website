import { z, defineCollection } from 'astro:content';

// ─── Shared primitives ──────────────────────────────────────────────
// Every engineering metric on the site carries `verified`. Anything
// unverified renders with the "under NDA / pending validation" badge
// (Brand Golden Rule: Evidence > Claims — never present a placeholder
// number as fact).
const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string().optional(),
  verified: z.boolean().default(false),
});

// Capability modules — the reusable building blocks ELG combines per
// client. Case studies are TAGGED with these; engineers can follow a
// tag to see every project that used it. Per-client tech stacks
// (chips, BOMs) are NEVER published — overview layer diagrams only.
export const capabilityModuleSchema = z.enum([
  'embedded-linux',
  'embedded-ai',
  'iot-connectivity',
  'rtos-firmware',
  'ux-ui',
  'cloud-backend',
]);

export const architectureLayerSchema = z.enum([
  'Physical & Sensors',
  'Firmware & Real-Time OS',
  'Embedded Linux & Edge Logic',
  'Cloud Ingestion & Analytics',
  'Mission Control & HMI',
]);

// ─── Collections ────────────────────────────────────────────────────
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    clientPartner: z.string().optional(),
    industry: z.enum([
      'Automotive & Motorsport',
      'Industrial IoT & Energy',
      'Enterprise & Commercial IoT',
      'Smart Agriculture & AI',
      'Smart Buildings & Infrastructure',
      'Education & Research',
      'Entertainment & Events',
    ]),
    projectType: z.enum([
      'Turnkey Ecosystem',
      'Mission-Critical Telemetry',
      'Edge AI Platform',
      'IoT Gateway & Infrastructure',
      'Custom Hardware Board',
    ]),
    // Which capability modules this project combined.
    capabilityModules: z.array(capabilityModuleSchema),
    status: z.enum(['In Production', 'Field Deployed', 'Active Operation', 'Delivered']),
    environmentConstraints: z.array(z.string()),
    deliverables: z.array(z.string()),
    metrics: z.array(metricSchema),
    featuredImage: z.string(),
    isPlaceholderImage: z.boolean().default(false),
    // Extra field photos (min 3 per case incl. featuredImage). Shown in the
    // detail-page evidence gallery; first entry should repeat featuredImage.
    galleryImages: z.array(z.string()).default([]),
    publishedAt: z.date(),
    isFeatured: z.boolean().default(false),
    // Overview-level layer descriptions only — never per-client internals.
    architectureLayers: z.array(
      z.object({
        layerName: architectureLayerSchema,
        description: z.string(),
      }),
    ).optional(),
  }),
});

const solutions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    // Business-outcome package, not a raw technology name.
    packageType: z.enum([
      'Mission-Critical Telemetry',
      'Industrial IoT & Gateways',
      'Smart Product Turnkey',
      'Edge AI & Vision',
    ]),
    capabilityModules: z.array(capabilityModuleSchema),
    metrics: z.array(metricSchema).default([]),
    featuredImage: z.string().optional(),
    isPlaceholderImage: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

const industries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    heroMetric: metricSchema.optional(),
    featuredImage: z.string().optional(),
    isPlaceholderImage: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { 'case-studies': caseStudies, solutions, industries };
