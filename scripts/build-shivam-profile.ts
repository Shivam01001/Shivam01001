import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderCard, type CardInput } from "./lib/card.ts";
import { renderHero } from "./lib/hero.ts";
import { type Key, keyWidth, renderKey } from "./lib/keys.ts";
import { DARK, LIGHT } from "./lib/theme.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "assets");

const keys: Key[] = [
  { slug: "github", label: "GITHUB", url: "https://github.com/Shivam01001", alt: "Shivam's public GitHub profile" },
  { slug: "linkedin", label: "LINKEDIN", url: "https://www.linkedin.com/in/pandit-shivam", alt: "Shivam's LinkedIn profile" },
  { slug: "projects", label: "PROJECTS", url: "https://github.com/Shivam01001?tab=repositories", alt: "Shivam's public security projects" },
];

const cards: Record<string, CardInput> = {
  recon: { title: "ReconSP", pill: "WEB RECON", tagline: ["Web reconnaissance for scoped", "and authorized security assessments."], stats: [{ value: "WEB", label: "surface" }, { value: "HTML", label: "stack" }], body: { kind: "chat", ask: "map the attack surface", call: "discover → validate → report", answer: "scope respected", caption: "recon workflow" }, footer: "GitHub" },
  inboxeye: { title: "InboxEye", pill: "PYTHON", tagline: ["Email-header forensics and", "phishing-signal investigation."], stats: [{ value: "SPF", label: "checks" }, { value: "DKIM", label: "checks" }, { value: "DMARC", label: "checks" }], body: { kind: "chat", ask: "trace this message route", call: "headers → signals → evidence", answer: "investigation ready", caption: "email forensics" }, footer: "GitHub" },
  mobile: { title: "Android Lab", pill: "CTF", tagline: ["An intentionally vulnerable lab", "for safe mobile-security practice."], stats: [{ value: "ADB", label: "testing" }, { value: "FRIDA", label: "learning" }], body: { kind: "chat", ask: "test the lab safely", call: "analyze → bypass → explain", answer: "lesson captured", caption: "mobile security" }, footer: "GitHub" },
  research: { title: "Research", pill: "NEXT", tagline: ["Red teaming, reverse engineering", "binary exploitation and LLM security."], stats: [{ value: "SYS", label: "security" }, { value: "LLM", label: "security" }], body: { kind: "chat", ask: "what assumption can fail?", call: "model → test → harden", answer: "research in progress", caption: "authorized labs" }, footer: "learning" },
};

await mkdir(assets, { recursive: true });
const writes: Promise<void>[] = [writeFile(path.join(assets, "hero.svg"), renderHero({ command: "shivam --profile", name: "SHIVAM", roles: "Cybersecurity · VAPT · Security Research", tagline: "Break assumptions. Strengthen systems. Stay authorized." }))];
const width = keyWidth(keys);
for (const [theme, palette] of [["dark", DARK], ["light", LIGHT]] as const) {
  keys.forEach((key, index) => writes.push(writeFile(path.join(assets, `key-${key.slug}-${theme}.svg`), renderKey(key, index + 1, width, palette))));
  Object.entries(cards).forEach(([slug, card]) => writes.push(writeFile(path.join(assets, `card-${slug}-${theme}.svg`), renderCard(card, palette))));
}
await Promise.all(writes);
console.log("Shivam profile assets built.");
