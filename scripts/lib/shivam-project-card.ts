import { esc, FONT, FRAME_CSS, frame, type Palette, REDUCED_MOTION } from "./theme.ts";

export type ProjectKind = "inbox" | "android" | "recovery" | "locked";

export interface ShivamProjectCard {
  title: string;
  pill: string;
  lines: [string, string];
  label: string;
  footer: string;
  kind: ProjectKind;
}

const W = 410;
const H = 220;
const G = 6;
const P = 20;

function art(kind: ProjectKind, p: Palette): string {
  if (kind === "inbox") return `<g class="art" transform="translate(303 91)"><path d="M0 22C22 -5 62 -5 84 22C62 49 22 49 0 22Z" fill="none" stroke="${p.text}" stroke-width="2.2"/><circle cx="42" cy="22" r="13" fill="none" stroke="${p.accent}" stroke-width="2"/><circle cx="42" cy="22" r="5" fill="${p.text}"/><path d="M9 58H75M18 67H66" stroke="${p.dim}" stroke-width="1.4"/></g>`;
  if (kind === "android") return `<g class="art" transform="translate(314 86)" fill="none" stroke="${p.text}" stroke-width="2"><path d="M8 25Q42 -2 76 25V61Q42 78 8 61Z"/><path d="M23 24L15 10M61 24L69 10M22 38H62M29 48H30M54 48H55"/><path class="crack" d="M43 25L36 39L45 39L39 55" stroke="${p.accent}" stroke-width="3"/></g>`;
  if (kind === "recovery") return `<g class="art" transform="translate(298 82)"><path d="M5 66V28H20V66M25 66V15H42V66M47 66V35H64V66M69 66V5H87V66" fill="${p.faint}" stroke="${p.border}"/><path d="M2 58L19 47L34 54L55 29L75 38L91 13" fill="none" stroke="${p.text}" stroke-width="2.5"/><circle cx="91" cy="13" r="4" fill="${p.accent}"/></g>`;
  return `<g class="art" transform="translate(311 82)"><rect x="0" y="10" width="70" height="54" fill="${p.faint}" stroke="${p.border}"/><rect x="9" y="0" width="70" height="54" fill="${p.faint}" stroke="${p.border}"/><path d="M44 20V14a9 9 0 0 1 18 0v6" fill="none" stroke="${p.dim}" stroke-width="2"/><rect x="39" y="20" width="28" height="23" fill="${p.bg}" stroke="${p.dim}"/><circle cx="53" cy="31" r="2" fill="${p.dim}"/></g>`;
}

export function renderShivamProjectCard(card: ShivamProjectCard, p: Palette): string {
  const pillW = card.pill.length * 7.4 + 18;
  const W2 = W + 2 * G;
  const H2 = H + 2 * G;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" role="img" aria-labelledby="title">
<title id="title">${esc(`${card.title}: ${card.lines.join(" ")} ${card.label}.`)}</title>
<style>
  text { font-family:${FONT}; white-space:pre; }
  @keyframes scan { from { transform:translateX(-112px); } to { transform:translateX(112px); } }
  @keyframes pulse { 50% { opacity:.3; } }
  .scan { animation:scan 3s ease-in-out infinite alternate; }
  .art { animation:pulse 2.5s ease-in-out infinite; }
  ${FRAME_CSS} ${REDUCED_MOTION}
</style>
<g transform="translate(${G} ${G})">
 <rect width="${W}" height="${H}" fill="${p.bg}"/>
 <text x="${P}" y="38" font-size="20" font-weight="700" fill="${p.text}"><tspan fill="${p.dim}">▸ </tspan>${esc(card.title)}</text>
 <rect x="${W - P - pillW}" y="22" width="${pillW}" height="22" fill="${p.faint}" stroke="${p.border}"/>
 <text x="${W - P - pillW / 2}" y="37.5" text-anchor="middle" font-size="11" fill="${p.text}">${esc(card.pill)}</text>
 <text x="${P}" y="65" font-size="12.5" fill="${p.dim}">${esc(card.lines[0])}</text>
 <text x="${P}" y="82" font-size="12.5" fill="${p.dim}">${esc(card.lines[1])}</text>
 <line x1="${P}" y1="101" x2="${W - P}" y2="101" stroke="${p.border}"/>
 <rect class="scan motion-only" x="${P}" y="112" width="110" height="44" fill="${p.faint}" opacity=".22"/>
 <text x="${P}" y="127" font-size="10.5" fill="${p.dim}">STATUS</text>
 <text x="${P}" y="149" font-size="15" font-weight="700" fill="${p.text}">${esc(card.label)}</text>
 ${art(card.kind, p)}
 <text x="${P}" y="${H - 9}" font-size="10.5" fill="${p.dim}">${esc(card.footer)}</text>
 <text x="${W - P}" y="${H - 9}" text-anchor="end" font-size="10.5" fill="${p.dim}">OPEN →</text>
</g>
${frame(p, { w:W, h:H, gutter:G, arm:16, weight:2.5, border:1.5 })}
</svg>`;
}
