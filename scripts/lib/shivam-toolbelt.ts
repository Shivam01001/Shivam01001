import { esc, FONT, frame, type Palette, REDUCED_MOTION } from "./theme.ts";

export interface SecurityTool {
  name: string;
  mark: string;
  kind: "web" | "scanner" | "radar" | "network" | "android" | "hook" | "code" | "terminal" | "python" | "api";
}

const icon = (kind: SecurityTool["kind"], x: number, y: number, color: string): string => {
  const s = `stroke="${color}" stroke-width="2" fill="none" stroke-linecap="square" stroke-linejoin="miter"`;
  switch (kind) {
    case "web": return `<path d="M${x + 3} ${y + 2}h14v14H${x + 3}z M${x + 6} ${y + 7}h8 M${x + 6} ${y + 11}h5" ${s}/>`;
    case "scanner": return `<path d="M${x + 2} ${y + 10}a8 8 0 1 1 16 0 M${x + 10} ${y + 10}l5-4 M${x + 3} ${y + 10}h14" ${s}/>`;
    case "radar": return `<circle cx="${x + 10}" cy="${y + 10}" r="8" ${s}/><path d="M${x + 10} ${y + 10}l6-5 M${x + 10} ${y + 2}v16 M${x + 2} ${y + 10}h16" ${s}/>`;
    case "network": return `<circle cx="${x + 4}" cy="${y + 4}" r="2" ${s}/><circle cx="${x + 16}" cy="${y + 6}" r="2" ${s}/><circle cx="${x + 10}" cy="${y + 16}" r="2" ${s}/><path d="M${x + 6} ${y + 5}l8 1 M${x + 5} ${y + 6}l4 8 M${x + 15} ${y + 8}l-4 6" ${s}/>`;
    case "android": return `<path d="M${x + 4} ${y + 8}h12v9H${x + 4}z M${x + 6} ${y + 8}l-2-3 M${x + 14} ${y + 8}l2-3 M${x + 7} ${y + 12}h1 M${x + 12} ${y + 12}h1" ${s}/>`;
    case "hook": return `<path d="M${x + 5} ${y + 3}v8a5 5 0 0 0 10 0V8a3 3 0 0 0-6 0v3a1 1 0 0 0 2 0" ${s}/>`;
    case "code": return `<path d="M${x + 8} ${y + 4}l-5 6 5 6 M${x + 12} ${y + 4}l5 6-5 6 M${x + 11} ${y + 2}l-2 16" ${s}/>`;
    case "terminal": return `<path d="M${x + 3} ${y + 3}h14v14H${x + 3}z M${x + 6} ${y + 7}l3 3-3 3 M${x + 11} ${y + 14}h3" ${s}/>`;
    case "python": return `<path d="M${x + 5} ${y + 3}h7v5H${x + 7}v4h8v5H${x + 8}v-5h5V${y + 7}H${x + 5}z" ${s}/><circle cx="${x + 9}" cy="${y + 5}" r=".8" fill="${color}"/><circle cx="${x + 12}" cy="${y + 15}" r=".8" fill="${color}"/>`;
    case "api": return `<path d="M${x + 3} ${y + 6}h5v8H${x + 3}z M${x + 12} ${y + 6}h5v8h-5z M${x + 8} ${y + 10}h4" ${s}/>`;
  }
};

export function renderToolbelt(tools: readonly SecurityTool[], p: Palette): string {
  const cols = 5, cellW = 164, cellH = 48, head = 32, pad = 14;
  const rows = Math.ceil(tools.length / cols);
  const w = cols * cellW + pad * 2;
  const h = head + rows * cellH + pad * 2;
  const cells = tools.map((tool, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = pad + col * cellW, y = head + pad + row * cellH;
    return `<g transform="translate(${x} ${y})"><rect width="${cellW - 6}" height="${cellH - 6}" fill="${p.bg}" stroke="${p.faint}"/>
${icon(tool.kind, 10, 10, p.text)}<text x="36" y="19" font-size="11" font-weight="700" fill="${p.text}">${esc(tool.mark)}</text><text x="36" y="32" font-size="10" fill="${p.dim}">${esc(tool.name)}</text></g>`;
  }).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">Shivam's cybersecurity toolbelt</title><style>text{font-family:${FONT};white-space:pre;}${REDUCED_MOTION}</style><rect width="${w}" height="${h}" fill="${p.bg}"/><rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${head - 5}" fill="${p.bar}"/><text x="${pad + 12}" y="${pad + 19}" font-size="12" font-weight="700" fill="${p.text}">SECURITY TOOLBELT ── ACTIVE</text><text x="${w - pad - 12}" y="${pad + 19}" font-size="10" fill="${p.accent}" text-anchor="end">10 TOOLS</text>${cells}${frame(p,{w:w-pad*2,h:h-pad*2,gutter:pad,arm:9,weight:2,border:1})}</svg>`;
}
