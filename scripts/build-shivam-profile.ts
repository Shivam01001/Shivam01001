import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderShivamProjectCard, type ShivamProjectCard } from "./lib/shivam-project-card.ts";
import { CITY_DARK, CITY_LIGHT, renderCity } from "./lib/city.ts";
import { lights } from "./lib/city-lights.ts";
import { renderGitlog } from "./lib/gitlog.ts";
import { LETTERS, renderAnswer, renderGuide, type Quiz, RAIN_DARK, RAIN_LIGHT } from "./lib/guide.ts";
import { renderHero } from "./lib/hero.ts";
import { idiomOfTheDay, renderIdiom } from "./lib/idioms.ts";
import { type Key, keyWidth, renderKey } from "./lib/keys.ts";
import { HELSINKI_DARK, HELSINKI_LIGHT, renderPortfolio, type PortfolioInput } from "./lib/portfolio.ts";
import { DARK, LIGHT } from "./lib/theme.ts";
import { renderTip, type TipInput } from "./lib/tip.ts";
import { renderToolbelt, type SecurityTool } from "./lib/shivam-toolbelt.ts";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "assets");
const keys: Key[] = [
  { slug: "portfolio", label: "GITHUB", url: "https://github.com/Shivam01001", alt: "Shivam's public GitHub profile" },
  { slug: "linkedin", label: "LINKEDIN", url: "https://www.linkedin.com/in/pandit-shivam", alt: "Shivam's LinkedIn profile" },
  { slug: "tryhackme", label: "TRYHACKME", url: "https://tryhackme.com/p/Mr.NULL", alt: "Shivam's TryHackMe profile" },
  { slug: "projects", label: "PROJECTS", url: "https://github.com/Shivam01001?tab=repositories", alt: "Shivam's public security projects" },
];
const cards: Record<string, ShivamProjectCard> = {
  inboxeye: { title: "InboxEye", pill: "PYTHON", lines: ["Email forensics, header tracing", "and phishing-signal analysis."], label: "ROUTE ANALYSIS READY", footer: "email security", kind: "inbox" },
  android: { title: "Android LoginBypass", pill: "CTF LAB", lines: ["An intentionally vulnerable lab", "for safe mobile-security practice."], label: "LAB CRACKED SAFELY", footer: "android security", kind: "android" },
  recovery: { title: "File Recovery", pill: "FORENSICS", lines: ["Evidence-focused recovery and", "digital-forensics exploration."], label: "RECOVERY IN PROGRESS", footer: "forensics", kind: "recovery" },
  upcoming: { title: "More Projects", pill: "LOCKED", lines: ["New security research projects", "are being prepared for release."], label: "PROJECT QUEUE BUILDING", footer: "coming soon", kind: "locked" },
};
const tip: TipInput = { title: "SECURITY ── PROFILE", status: "AUTHORIZED", text: "Explore Shivam's public projects and professional profile.", command: "open github.com/Shivam01001", note: "Use only with clear authorization, scope and reporting." };
const portfolio: PortfolioInput = { url: "https://github.com/Shivam01001", host: "github.com/Shivam01001", lines: ["A cybersecurity portfolio: VAPT, forensics, Android labs and security research.", "Follow the projects, document the evidence, and strengthen the system."], locked: ["Red Team", "Reverse Eng", "Binary Exploit", "LLM Security"], unlocks: 4 };
const quiz: Quiz = { prompt: "Which practice keeps security research ethical and safe?", options: ["Explicit authorization", "Guessing scope", "Skipping reports", "Testing strangers"], answer: "Explicit authorization", reveal: "Clear authorization, agreed scope and responsible reporting come before any assessment." };
const toolbelt: SecurityTool[] = [
  { name: "Burp Suite", mark: "BURP", kind: "web" }, { name: "Nuclei", mark: "NUCLEI", kind: "scanner" },
  { name: "OWASP ZAP", mark: "ZAP", kind: "radar" }, { name: "Nmap", mark: "NMAP", kind: "network" },
  { name: "MobSF", mark: "MOBSF", kind: "android" }, { name: "Frida", mark: "FRIDA", kind: "hook" },
  { name: "JADX", mark: "JADX", kind: "code" }, { name: "ADB", mark: "ADB", kind: "terminal" },
  { name: "Python", mark: "PY", kind: "python" }, { name: "Postman", mark: "API", kind: "api" },
];

await mkdir(assets, { recursive: true });
const writes: Promise<void>[] = [writeFile(path.join(assets, "hero.svg"), renderHero({ command: "shivam --profile", name: "SHIVAM", roles: "Cybersecurity · VAPT · Security Research", tagline: "Break assumptions. Strengthen systems. Stay authorized." }))];
const width = keyWidth(keys);
const idiom = idiomOfTheDay();
for (const [theme, palette] of [["dark", DARK], ["light", LIGHT]] as const) {
  keys.forEach((key, index) => writes.push(writeFile(path.join(assets, `key-${key.slug}-${theme}.svg`), renderKey(key, index + 1, width, palette))));
  Object.entries(cards).forEach(([slug, card]) => writes.push(writeFile(path.join(assets, `card-${slug}-${theme}.svg`), renderShivamProjectCard(card, palette))));
  writes.push(writeFile(path.join(assets, `tip-${theme}.svg`), renderTip(tip, palette)));
  writes.push(writeFile(path.join(assets, `toolbelt-${theme}.svg`), renderToolbelt(toolbelt, palette)));
  writes.push(writeFile(path.join(assets, `gitlog-${theme}.svg`), renderGitlog([], palette, { label: "SHIVAM01001", comment: "# public projects and updates" })));
  writes.push(writeFile(path.join(assets, `idiom-${theme}.svg`), renderIdiom(idiom, palette)));
  writes.push(writeFile(path.join(assets, `city-${theme}.svg`), renderCity(undefined, palette, theme === "dark" ? CITY_DARK : CITY_LIGHT, lights)));
  writes.push(writeFile(path.join(assets, `portfolio-${theme}.svg`), renderPortfolio(portfolio, theme === "dark" ? HELSINKI_DARK : HELSINKI_LIGHT)));
  writes.push(writeFile(path.join(assets, `guide-${theme}.svg`), renderGuide(quiz, theme === "dark" ? RAIN_DARK : RAIN_LIGHT)));
  quiz.options.forEach((option, index) => writes.push(writeFile(path.join(assets, `answer-${LETTERS[index].toLowerCase()}-${theme}.svg`), renderAnswer(LETTERS[index], option, theme === "dark" ? RAIN_DARK : RAIN_LIGHT))));
}
await Promise.all(writes);
console.log("Full Shivam profile assets built.");
