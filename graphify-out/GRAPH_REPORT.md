# Graph Report - elg-site  (2026-09-18)

## Corpus Check
- 46 files · ~350,379 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 111 nodes · 157 edges · 13 communities (7 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65ffc585`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- dependencies
- company.ts
- tsconfig.json
- config.ts
- scripts
- CaseStudyFilters.tsx
- BaseLayout.astro
- astro:content
- solutions/[slug].astro
- industries/[slug].astro

## God Nodes (most connected - your core abstractions)
1. `scripts` - 7 edges
2. `COMPANY` - 6 edges
3. `CAPABILITY_MODULES` - 5 edges
4. `compilerOptions` - 5 edges
5. `react` - 3 edges
6. `countFor()` - 3 edges
7. `@astrojs/mdx` - 2 edges
8. `@astrojs/react` - 2 edges
9. `@astrojs/tailwind` - 2 edges
10. `@fontsource-variable/jetbrains-mono` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 6 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (23): devDependencies, @types/react, @types/react-dom, name, private, type, version, astro (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, astro, @astrojs/check, @astrojs/mdx, @astrojs/react, @astrojs/tailwind, clsx, @fontsource-variable/inter (+7 more)

### Community 2 - "company.ts"
Cohesion: 0.39
Nodes (3): ARCHITECTURE_LAYERS, CAPABILITY_MODULES, featured

### Community 3 - "tsconfig.json"
Cohesion: 0.20
Nodes (9): astro/tsconfigs/strict, compilerOptions, baseUrl, jsx, jsxImportSource, paths, exclude, extends (+1 more)

### Community 4 - "config.ts"
Cohesion: 0.22
Nodes (8): ref_astro_content, architectureLayerSchema, capabilityModuleSchema, caseStudies, collections, industries, metricSchema, solutions

### Community 5 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, astro, build, check, dev, preview, typecheck

### Community 6 - "CaseStudyFilters.tsx"
Cohesion: 0.17
Nodes (8): react, HubCard, INDUSTRIES, PROJECT_TYPES, CONSTRAINTS, ContactForm(), DOMAINS, SCOPES

## Knowledge Gaps
- **63 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 73 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@fontsource-variable/jetbrains-mono` connect `package.json` to `BaseLayout.astro`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.190) - this node is a cross-community bridge._
- **Why does `react` connect `CaseStudyFilters.tsx` to `package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._