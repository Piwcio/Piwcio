// Builds the tech stack badges in assets/stack/ and the matching README section.
// Usage: node tools/build-stack.mjs
//
// No dependencies. Every icon is an original line drawing on a 24-unit grid, so the badges
// don't reuse anyone's logo. Text widths come from Segoe UI Semibold measurements, and
// textLength keeps other system fonts inside the badge on macOS, Linux and mobile.
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'assets', 'stack');
const readmePath = join(root, 'README.md');

// Groups and levels follow the technology section on piwowarpawel.com (highest level first).
// Concepts such as CI/CD, PromQL and RAG stay on the website; the badges show tools.
const groups = [
  { title: 'Cloud & virtualisation', colour: '#93c5fd', items: [
    ['Microsoft Azure', 'azure'], ['IONOS Cloud', 'rack'], ['VMware vSphere · vCenter', 'vms'],
  ] },
  { title: 'Automation & delivery', colour: '#edc58e', items: [
    ['Terraform', 'cube'], ['Ansible', 'tasks'], ['Azure DevOps', 'loop'], ['Azure Bicep', 'braces'],
    ['Bash', 'shebang'], ['PowerShell', 'prompt'], ['Python', 'snake'], ['Jenkins', 'bowtie'], ['GitHub Actions', 'play'],
  ] },
  { title: 'Observability', colour: '#81d1c7', items: [
    ['Grafana', 'gauge'], ['Prometheus', 'samples'], ['VictoriaMetrics', 'bars'], ['VictoriaLogs', 'tail'],
    ['Grafana Alloy', 'merge'], ['Loki', 'tag'], ['Tempo', 'spans'], ['OpenTelemetry', 'signal'],
    ['Checkmk', 'monitor'], ['Site24x7', 'clock'],
  ] },
  { title: 'Containers & GitOps', colour: '#b8b2f0', items: [
    ['Kubernetes', 'cluster'], ['Docker', 'container'], ['Git', 'branch'], ['Argo CD', 'sync'],
  ] },
  { title: 'Systems & operations', colour: '#c1c989', items: [
    ['Linux', 'penguin'], ['Windows Server', 'tower'], ['Active Directory', 'tree'], ['PostgreSQL · MySQL · MariaDB', 'database'],
  ] },
  { title: 'Identity, security & ITSM', colour: '#e5ae9e', items: [
    ['Microsoft Entra ID', 'idcard'], ['Jira Service Management', 'ticket'], ['PagerDuty', 'bell'], ['OPNsense', 'wall'],
    ['Sophos', 'shield'], ['Cisco networking', 'switch'],
  ] },
  { title: 'AI & workflow engineering', colour: '#d5afdf', items: [
    ['Claude', 'sparkle'], ['ChatGPT', 'chat'], ['GitHub Copilot', 'code'], ['n8n', 'workflow'],
    ['Open WebUI', 'window'], ['OpenRouter', 'fork'], ['Local LLMs', 'chip'], ['LangGraph', 'graph'], ['Qdrant', 'vectors'],
  ] },
  { title: 'Web projects', colour: '#9fd0ae', items: [
    ['Astro', 'planet'], ['TypeScript', 'generic'], ['Cloudflare', 'edge'],
  ] },
];

// Path helpers round to 0.01 so the generated SVG stays short and readable.
const n = (value) => +value.toFixed(2);
// A 4-point star; used by the AI icons.
const star = (x, y, r, k = 0.22) => {
  const a = r * k;
  return `M${x} ${n(y - r)}C${n(x + a / 2)} ${n(y - a)} ${n(x + a)} ${n(y - a / 2)} ${n(x + r)} ${y}C${n(x + a)} ${n(y + a / 2)} ${n(x + a / 2)} ${n(y + a)} ${x} ${n(y + r)}`
    + `C${n(x - a / 2)} ${n(y + a)} ${n(x - a)} ${n(y + a / 2)} ${n(x - r)} ${y}C${n(x - a)} ${n(y - a / 2)} ${n(x - a / 2)} ${n(y - a)} ${x} ${n(y - r)}Z`;
};
// A straight edge with an open arrowhead at its end.
const arrow = (x1, y1, x2, y2, size = 2.6) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const wing = (turn) => `${n(x2 - size * Math.cos(angle + turn))} ${n(y2 - size * Math.sin(angle + turn))}`;
  return `M${x1} ${y1}L${x2} ${y2}M${wing(0.6)}L${x2} ${y2}L${wing(-0.6)}`;
};
// A pointy-top hexagon; three of them make the Kubernetes honeycomb.
const hexagon = (x, y, r = 4.1) => {
  const half = r * 0.866;
  return `M${x} ${n(y - r)}L${n(x + half)} ${n(y - r / 2)}V${n(y + r / 2)}L${x} ${n(y + r)}L${n(x - half)} ${n(y + r / 2)}V${n(y - r / 2)}Z`;
};
const cloud = 'M7 18.2A4 4 0 0 1 6.4 10.25A6 6 0 0 1 17.6 9.3A4.5 4.5 0 0 1 17.5 18.2Z';

// Icons draw with stroke `ink`; `paper` is the tile colour, for shapes that hide what is behind them.
const icons = {
  azure: () => `<path d="${cloud}"/><path d="M9.6 15.6L12 12.3L14.4 15.6"/>`,
  edge: (ink) => `<path d="${cloud}"/><path d="M12.9 10.2L10.3 14.1H12.4L11.6 17.2L14.3 13.2H12.2Z" fill="${ink}" stroke-width="1"/>`,
  rack: (ink) => `<rect x="4" y="4.5" width="16" height="6.5" rx="1.6"/><rect x="4" y="13" width="16" height="6.5" rx="1.6"/>`
    + `<path d="M11 7.75H16.5M11 16.25H16.5"/><circle cx="7.6" cy="7.75" r="1.1" fill="${ink}" stroke="none"/><circle cx="7.6" cy="16.25" r="1.1" fill="${ink}" stroke="none"/>`,
  vms: (ink, paper) => `<rect x="8.5" y="3.5" width="12" height="12" rx="2.4"/><path d="M8.5 7H20.5"/>`
    + `<rect x="3.5" y="8.5" width="12" height="12" rx="2.4" fill="${paper}"/><path d="M3.5 12H15.5"/>`,
  cube: (ink) => `<path d="M4 7.5L12 12V21L4 16.5Z" fill="${ink}" fill-opacity=".28" stroke="none"/>`
    + `<path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5Z"/><path d="M4 7.5L12 12L20 7.5M12 12V21"/>`,
  tasks: () => `<path d="M4 7.6L6.1 9.7L10 5.8M4 16.1L6.1 18.2L10 14.3M13 7.8H20M13 16.3H20"/>`,
  loop: () => `<path d="M12 12C10 9.4 8.4 8 6.4 8A4 4 0 1 0 6.4 16C8.4 16 10 14.6 12 12S15.6 8 17.6 8A4 4 0 1 1 17.6 16C15.6 16 14 14.6 12 12Z"/>`,
  braces: (ink) => `<path d="M8.5 4C6.5 4 6 5 6 6.5V9.5C6 11 5.3 12 4 12C5.3 12 6 13 6 14.5V17.5C6 19 6.5 20 8.5 20"/>`
    + `<path d="M15.5 4C17.5 4 18 5 18 6.5V9.5C18 11 18.7 12 20 12C18.7 12 18 13 18 14.5V17.5C18 19 17.5 20 15.5 20"/>`
    + `<circle cx="12" cy="12" r="1.6" fill="${ink}" stroke="none"/>`,
  shebang: (ink) => `<path d="M7.8 5L6.2 19M12.3 5L10.7 19M4.6 9.6H13.6M4 14.4H13"/><path d="M18.4 5V14.5"/>`
    + `<circle cx="18.4" cy="18.6" r="1.35" fill="${ink}" stroke="none"/>`,
  prompt: () => `<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 9.5L10.2 12L7 14.5M12.5 15H17"/>`,
  snake: (ink, paper) => `<path d="M15.5 5.5H11A3.25 3.25 0 0 0 11 12H13A3.25 3.25 0 0 1 13 18.5H5" stroke-width="2.3"/>`
    + `<circle cx="17.4" cy="5.5" r="2.5" fill="${ink}" stroke="none"/><circle cx="18.1" cy="4.8" r=".75" fill="${paper}" stroke="none"/>`,
  bowtie: (ink) => `<path d="M4 7.5L10.5 10.6V13.4L4 16.5Z" fill="${ink}" fill-opacity=".3"/><path d="M20 7.5L13.5 10.6V13.4L20 16.5Z" fill="${ink}" fill-opacity=".3"/>`
    + `<rect x="10.4" y="9.6" width="3.2" height="4.8" rx="1.1" fill="${ink}"/>`,
  play: (ink) => `<circle cx="12" cy="12" r="8.6"/><path d="M10.2 8.5L15.7 12L10.2 15.5Z" fill="${ink}"/>`,
  gauge: (ink) => `<path d="M6 19.2A8.5 8.5 0 1 1 18 19.2"/><path d="M12 13.2L15.9 8.6"/><circle cx="12" cy="13.2" r="1.9" fill="${ink}" stroke="none"/>`,
  samples: (ink) => `<path d="M3.5 20.5H20.5" stroke-opacity=".5"/><path d="M4 16.5L8.5 11.5L12.5 14L19.5 5.5"/>`
    + [[4, 16.5], [8.5, 11.5], [12.5, 14], [19.5, 5.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${ink}" stroke="none"/>`).join(''),
  bars: (ink) => [[4, 13, 7.5], [10.1, 8.5, 12], [16.2, 4, 16.5]]
    .map(([x, y, h]) => `<rect x="${x}" y="${y}" width="3.8" height="${h}" rx="1" fill="${ink}" fill-opacity=".3"/>`).join(''),
  tail: () => `<path d="M3.5 5.5H13M3.5 10H10.5M3.5 14.5H13M3.5 19H9"/><path d="M18 4.5V18.5M15 15.5L18 18.7L21 15.5"/>`,
  merge: (ink) => `<path d="M3.5 5.5C8.5 5.5 8.5 12 12.5 12M3.5 18.5C8.5 18.5 8.5 12 12.5 12M3.5 12H20M16.8 8.8L20.2 12L16.8 15.2"/>`
    + [5.5, 12, 18.5].map((y) => `<circle cx="3.5" cy="${y}" r="1.6" fill="${ink}" stroke="none"/>`).join(''),
  tag: (ink) => `<path d="M3.5 4.8A1.3 1.3 0 0 1 4.8 3.5H11.2A1.6 1.6 0 0 1 12.33 3.97L20.1 11.7A1.6 1.6 0 0 1 20.1 13.96L13.96 20.1A1.6 1.6 0 0 1 11.7 20.1L3.97 12.37A1.6 1.6 0 0 1 3.5 11.24Z"/>`
    + `<circle cx="8" cy="8" r="1.5" fill="${ink}" stroke="none"/>`,
  spans: (ink) => [[3, 4, 10], [6.5, 8.6, 10], [10, 13.2, 11], [6.5, 17.8, 6]]
    .map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="3" rx="1.5" fill="${ink}" stroke="none"/>`).join(''),
  signal: (ink) => `<circle cx="12" cy="10" r="2" fill="${ink}" stroke="none"/><path d="M12 12.5V20.5"/>`
    + `<path d="M8.2 6.2A5.4 5.4 0 0 0 8.2 13.8M15.8 6.2A5.4 5.4 0 0 1 15.8 13.8M5.3 3.3A9.5 9.5 0 0 0 5.3 16.7M18.7 3.3A9.5 9.5 0 0 1 18.7 16.7"/>`,
  monitor: () => `<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M12 16.5V20M8.5 20H15.5M8.3 10.4L10.8 12.9L15.8 7.9"/>`,
  clock: () => `<circle cx="12" cy="12" r="8.6"/><path d="M12 7V12L15.2 14M12 3.4V4.8M20.6 12H19.2M12 20.6V19.2M3.4 12H4.8"/>`,
  cluster: (ink) => `<path d="${hexagon(12, 7.89)}" fill="${ink}" fill-opacity=".3"/><path d="${hexagon(7.25, 16.11)}${hexagon(16.75, 16.11)}"/>`,
  container: () => `<rect x="2.5" y="6.5" width="19" height="11" rx="1.6"/><path d="M6.6 9.3V14.7M10.2 9.3V14.7M13.8 9.3V14.7M17.4 9.3V14.7"/>`,
  branch: () => `<circle cx="7" cy="5.5" r="2.2"/><circle cx="7" cy="18.5" r="2.2"/><circle cx="17" cy="8" r="2.2"/>`
    + `<path d="M7 7.7V16.3M17 10.2C17 14.2 9.6 12.6 7.8 16.4"/>`,
  sync: () => `<path d="M18.6 8.4A7.5 7.5 0 0 0 5 9.4M4.3 5.9L5 9.4L8.5 8.6M5.4 15.6A7.5 7.5 0 0 0 19 14.6M19.7 18.1L19 14.6L15.5 15.4"/>`
    + `<path d="M9.2 12.1L11.2 14.1L14.8 10.3"/>`,
  penguin: (ink, paper) => `<path d="M12 2.8C9.1 2.8 7.7 5.2 7.7 8.1V9.4C5.8 11.3 4.3 13.8 4.3 16.4C4.3 19.3 7.3 20.8 12 20.8S19.7 19.3 19.7 16.4C19.7 13.8 18.2 11.3 16.3 9.4V8.1C16.3 5.2 14.9 2.8 12 2.8Z" fill="${ink}" stroke="none"/>`
    + `<ellipse cx="12" cy="15.4" rx="3.7" ry="4.4" fill="${paper}"/><circle cx="10.6" cy="7.2" r="1" fill="${paper}"/><circle cx="13.4" cy="7.2" r="1" fill="${paper}"/>`
    + `<path d="M10.8 9.3L12 10.5L13.2 9.3Z" fill="${paper}" stroke="none"/><path d="M7 21.2H10M14 21.2H17" stroke-width="1.8"/>`,
  tower: (ink) => `<rect x="6.5" y="3" width="11" height="18" rx="2"/><path d="M9.5 7H14.5M9.5 10H14.5"/><circle cx="12" cy="16.4" r="1.4" fill="${ink}" stroke="none"/>`,
  tree: () => `<rect x="9" y="3" width="6" height="5" rx="1.2"/><rect x="3" y="16" width="6" height="5" rx="1.2"/><rect x="15" y="16" width="6" height="5" rx="1.2"/>`
    + `<path d="M12 8V12M6 16V12H18V16"/>`,
  database: () => `<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6V18C4.5 19.55 7.86 20.8 12 20.8S19.5 19.55 19.5 18V6M4.5 12C4.5 13.55 7.86 14.8 12 14.8S19.5 13.55 19.5 12"/>`,
  idcard: () => `<rect x="2.5" y="5" width="19" height="14" rx="2.4"/><circle cx="8.3" cy="10.3" r="2.1"/>`
    + `<path d="M5 16C5.6 14.1 6.8 13.2 8.3 13.2S11 14.1 11.6 16M14.2 10H18.5M14.2 13.5H17"/>`,
  ticket: () => `<path d="M3 7A1.6 1.6 0 0 1 4.6 5.4H19.4A1.6 1.6 0 0 1 21 7V9.3A2.7 2.7 0 0 0 21 14.7V17A1.6 1.6 0 0 1 19.4 18.6H4.6A1.6 1.6 0 0 1 3 17V14.7A2.7 2.7 0 0 0 3 9.3Z"/>`
    + `<path d="M15 8V16" stroke-dasharray="1.4 2.2"/>`,
  bell: () => `<path d="M6.5 16V11.2A5.5 5.5 0 0 1 17.5 11.2V16L19 17.8H5Z"/><path d="M10.2 20.2A1.9 1.9 0 0 0 13.8 20.2"/>`
    + `<path d="M19.3 4.6A6.2 6.2 0 0 1 21.2 9M4.7 4.6A6.2 6.2 0 0 0 2.8 9"/>`,
  wall: () => `<rect x="3" y="4.5" width="18" height="15" rx="1.6"/><path d="M3 9.5H21M3 14.5H21M12 4.5V9.5M7.5 9.5V14.5M16.5 9.5V14.5M12 14.5V19.5"/>`,
  shield: (ink) => `<path d="M12 3V21C7.7 19.5 4.5 16.1 4.5 11.5V6Z" fill="${ink}" fill-opacity=".35" stroke="none"/>`
    + `<path d="M12 3L19.5 6V11.5C19.5 16.1 16.3 19.5 12 21C7.7 19.5 4.5 16.1 4.5 11.5V6Z"/>`,
  switch: (ink) => `<rect x="2.5" y="11" width="19" height="8" rx="1.8"/><path d="M6 6.5H18M8.6 4L6 6.5L8.6 9M15.4 4L18 6.5L15.4 9"/>`
    + [5.2, 8.8, 12.4, 16].map((x) => `<rect x="${x}" y="13.7" width="2.4" height="2.6" rx=".5" fill="${ink}" stroke="none"/>`).join(''),
  sparkle: (ink) => `<path d="${star(11.2, 12.6, 8.4)}" fill="${ink}" stroke-width="1"/><path d="M18.8 3V7M16.8 5H20.8"/>`,
  chat: (ink) => `<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H17.5A2.5 2.5 0 0 1 20 6.5V13.5A2.5 2.5 0 0 1 17.5 16H11L6.8 19.6V16H6.5A2.5 2.5 0 0 1 4 13.5Z"/>`
    + [8.4, 12, 15.6].map((x) => `<circle cx="${x}" cy="10" r="1.25" fill="${ink}" stroke="none"/>`).join(''),
  code: (ink) => `<path d="M7.5 7.5L3.5 12L7.5 16.5M16.5 7.5L20.5 12L16.5 16.5"/><path d="${star(12, 12, 4.2)}" fill="${ink}" stroke-width="1"/>`,
  workflow: () => `<rect x="2.5" y="9.5" width="5" height="5" rx="1.2"/><rect x="16.5" y="3.5" width="5" height="5" rx="1.2"/><rect x="16.5" y="15.5" width="5" height="5" rx="1.2"/>`
    + `<path d="M7.5 12H10C12.5 12 12.5 6 15 6H16.5M10 12C12.5 12 12.5 18 15 18H16.5"/>`,
  window: () => `<rect x="2.5" y="4" width="19" height="16" rx="2.4"/><path d="M2.5 8H21.5M6 11.8H13M11 15.6H18"/>`,
  fork: (ink) => `<path d="M3.5 12H9C12.5 12 12.5 5.5 17 5.5H19.5M9 12H19.5M9 12C12.5 12 12.5 18.5 17 18.5H19.5"/>`
    + `<path d="M17.3 3.3L19.6 5.5L17.3 7.7M17.3 9.8L19.6 12L17.3 14.2M17.3 16.3L19.6 18.5L17.3 20.7"/><circle cx="3.5" cy="12" r="1.7" fill="${ink}" stroke="none"/>`,
  chip: (ink) => `<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>`
    + `<path d="M9.5 3.5V6.5M14.5 3.5V6.5M9.5 17.5V20.5M14.5 17.5V20.5M3.5 9.5H6.5M3.5 14.5H6.5M17.5 9.5H20.5M17.5 14.5H20.5"/>`
    + `<path d="${star(12, 12, 3.4)}" fill="${ink}" stroke-width=".8"/>`,
  graph: (ink) => [[5.5, 6], [18.5, 6], [12, 18.2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${ink}" stroke="none"/>`).join('')
    + `<path d="${arrow(8.5, 6, 15.5, 6, 2.3)}${arrow(17.09, 8.65, 13.41, 15.55, 2.3)}${arrow(10.59, 15.55, 6.91, 8.65, 2.3)}"/>`,
  vectors: (ink) => `<circle cx="13" cy="11" r="6" stroke-dasharray="2 2.2"/><circle cx="13" cy="11" r="2" fill="${ink}" stroke="none"/>`
    + [[10.4, 8.6], [15.6, 13.6], [4.2, 18], [5.4, 4.6], [20, 19.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.25" fill="${ink}" stroke="none"/>`).join(''),
  planet: (ink, paper) => `<g transform="rotate(-20 12 12)"><path d="M22 12A10 3.4 0 0 0 2 12"/></g>`
    + `<circle cx="12" cy="12" r="5.6" fill="${paper}"/><g transform="rotate(-20 12 12)"><path d="M2 12A10 3.4 0 0 0 22 12"/></g>`,
  generic: () => `<path d="M7 7L2.8 12L7 17M17 7L21.2 12L17 17M9 7.5H15M12 7.5V17"/>`,
};

// Advance widths of Segoe UI Semibold for code points 32-126, in hundredths of the font size.
const widths = '27,30,44,59,56,84,72,26,33,33,43,69,24,40,24,41,56,40,56,56,58,56,56,54,56,56,24,24,69,69,69,44,95,67,60,62,72,52,50,70,74,29,40,61,49,92,77,76,58,76,62,54,55,70,64,97,62,58,59,33,40,33,69,42,29,52,60,47,60,53,34,60,58,26,26,52,26,89,58,60,60,60,37,43,36,58,51,76,50,51,46,33,28,33,69'
  .split(',').map(Number);
const advance = (ch) => (ch === '·' ? 24 : widths[ch.codePointAt(0) - 32] ?? 60) / 100;

const height = 30;
const fontSize = 13;
const textX = 42;
const ink = '#14201a';
const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function badge(name, icon, colour) {
  const textLength = Math.round([...name].reduce((sum, ch) => sum + advance(ch), 0) * fontSize * 10) / 10;
  const width = Math.ceil(textX + textLength + 12);
  const tile = 'M0 0H35L29 30H0Z';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(name)}">
<title>${escape(name)}</title>
<defs><clipPath id="c"><rect width="${width}" height="${height}" rx="7"/></clipPath><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".24"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<g clip-path="url(#c)"><rect width="${width}" height="${height}" fill="#18211d"/><path d="${tile}" fill="${colour}"/><path d="${tile}" fill="url(#g)"/></g>
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="6.5" fill="none" stroke="${colour}" stroke-opacity=".55"/>
<g transform="translate(6.2 5.5) scale(.7917)" fill="none" stroke="${ink}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icons[icon](ink, colour)}</g>
<text x="${textX}" y="19.6" fill="#e9efeb" font-family="${font}" font-size="${fontSize}" font-weight="600" textLength="${textLength}" lengthAdjust="spacing">${escape(name)}</text>
</svg>
`;
}

await mkdir(outDir, { recursive: true });
const written = new Set();
for (const group of groups) {
  for (const [name, icon] of group.items) {
    if (!icons[icon]) throw new Error(`Unknown icon "${icon}" for ${name}.`);
    const file = `${slug(name)}.svg`;
    if (written.has(file)) throw new Error(`Two badges would share ${file}.`);
    await writeFile(join(outDir, file), badge(name, icon, group.colour));
    written.add(file);
  }
}
for (const file of await readdir(outDir)) {
  if (file.endsWith('.svg') && !written.has(file)) await unlink(join(outDir, file));
}

const section = groups.map((group) => [
  '<p>',
  `<b>${escape(group.title)}</b><br>`,
  ...group.items.map(([name]) => `<img src="assets/stack/${slug(name)}.svg" alt="${escape(name)}">`),
  '</p>',
].join('\n')).join('\n\n');

const start = '<!-- stack:start -->';
const end = '<!-- stack:end -->';
const readme = await readFile(readmePath, 'utf8');
const from = readme.indexOf(start);
const to = readme.indexOf(end);
if (from < 0 || to < from) throw new Error('README.md needs the stack:start and stack:end markers.');
await writeFile(readmePath, `${readme.slice(0, from + start.length)}\n${section}\n${readme.slice(to)}`);
console.log(`Wrote ${written.size} badges and the README stack section.`);
