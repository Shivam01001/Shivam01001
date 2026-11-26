import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderCard, type CardInput } from "./lib/card.ts";
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

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "assets");
const keys: Key[] = [
  { slug: "portfolio", label: "GITHUB", url: "https://github.com/Shivam01001", alt: "Shivam's public GitHub profile" },
  { slug: "linkedin", label: "LINKEDIN", url: "https://www.linkedin.com/in/pandit-shivam", alt: "Shivam's LinkedIn profile" },
  { slug: "tryhackme", label: "TRYHACKME", url: "https://tryhackme.com/p/Mr.NULL", alt: "Shivam's TryHackMe profile" },
  { slug: "projects", label: "PROJECTS", url: "https://github.com/Shivam01001?tab=repositories", alt: "Shivam's public security projects" },
];
const cards: Record<string, CardInput> = {
  gmt: { title: "ReconSP", pill: "WEB RECON", tagline: ["Web reconnaissance for scoped", "and authorized security assessments."], stats: [{ value: "WEB", label: "surface" }, { value: "HTML", label: "stack" }], body: { kind: "chat", ask: "map the attack surface", call: "discover → validate → report", answer: "scope respected", caption: "recon workflow" }, footer: "GitHub" },
  worktree: { title: "InboxEye", pill: "PYTHON", tagline: ["Email-header forensics and", "phishing-signal investigation."], stats: [{ value: "SPF", label: "checks" }, { value: "DKIM", label: "checks" }, { value: "DMARC", label: "checks" }], body: { kind: "chat", ask: "trace this message route", call: "headers → signals → evidence", answer: "investigation ready", caption: "email forensics" }, footer: "GitHub" },
  dox: { title: "Android Lab", pill: "CTF", tagline: ["An intentionally vulnerable lab", "for safe mobile-security practice."], stats: [{ value: "ADB", label: "testing" }, { value: "FRIDA", label: "learning" }], body: { kind: "chat", ask: "test the lab safely", call: "analyze → bypass → explain", answer: "lesson captured", caption: "mobile security" }, footer: "GitHub" },
  northguild: { title: "Research", pill: "NEXT", tagline: ["Red teaming, reverse engineering", "binary exploitation and LLM security."], stats: [{ value: "SYS", label: "security" }, { value: "LLM", label: "security" }], body: { kind: "chat", ask: "what assumption can fail?", call: "model → test → harden", answer: "research in progress", caption: "authorized labs" }, footer: "learning" },
};
const tip: TipInput = { title: "SECURITY ── PROFILE", status: "AUTHORIZED", text: "Explore Shivam's public projects and professional profile.", command: "open github.com/Shivam01001", note: "Use only with clear authorization, scope and reporting." };
const portfolio: PortfolioInput = { url: "https://github.com/Shivam01001", host: "github.com/Shivam01001", lines: ["A cybersecurity portfolio: VAPT, forensics, Android labs and security research.", "Follow the projects, document the evidence, and strengthen the system."], locked: ["Red Team", "Reverse Eng", "Binary Exploit", "LLM Security"], unlocks: 4 };
const quiz: Quiz = { prompt: "Which practice keeps security research ethical and safe?", options: ["Explicit authorization", "Guessing scope", "Skipping reports", "Testing strangers"], answer: "Explicit authorization", reveal: "Clear authorization, agreed scope and responsible reporting come before any assessment." };

await mkdir(assets, { recursive: true });
const writes: Promise<void>[] = [writeFile(path.join(assets, "hero.svg"), renderHero({ command: "shivam --profile", name: "SHIVAM", roles: "Cybersecurity · VAPT · Security Research", tagline: "Break assumptions. Strengthen systems. Stay authorized." }))];
const width = keyWidth(keys);
const idiom = idiomOfTheDay();
for (const [theme, palette] of [["dark", DARK], ["light", LIGHT]] as const) {
  keys.forEach((key, index) => writes.push(writeFile(path.join(assets, `key-${key.slug}-${theme}.svg`), renderKey(key, index + 1, width, palette))));
  Object.entries(cards).forEach(([slug, card]) => writes.push(writeFile(path.join(assets, `card-${slug}-${theme}.svg`), renderCard(card, palette))));
  writes.push(writeFile(path.join(assets, `tip-${theme}.svg`), renderTip(tip, palette)));
  writes.push(writeFile(path.join(assets, `gitlog-${theme}.svg`), renderGitlog([], palette, { label: "SHIVAM01001", comment: "# public projects and updates" })));
  writes.push(writeFile(path.join(assets, `idiom-${theme}.svg`), renderIdiom(idiom, palette)));
  writes.push(writeFile(path.join(assets, `city-${theme}.svg`), renderCity(undefined, palette, theme === "dark" ? CITY_DARK : CITY_LIGHT, lights)));
  writes.push(writeFile(path.join(assets, `portfolio-${theme}.svg`), renderPortfolio(portfolio, theme === "dark" ? HELSINKI_DARK : HELSINKI_LIGHT)));
  writes.push(writeFile(path.join(assets, `guide-${theme}.svg`), renderGuide(quiz, theme === "dark" ? RAIN_DARK : RAIN_LIGHT)));
  quiz.options.forEach((option, index) => writes.push(writeFile(path.join(assets, `answer-${LETTERS[index].toLowerCase()}-${theme}.svg`), renderAnswer(LETTERS[index], option, theme === "dark" ? RAIN_DARK : RAIN_LIGHT))));
}
await Promise.all(writes);
console.log("Full Shivam profile assets built.");
