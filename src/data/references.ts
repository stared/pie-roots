// Source URLs, keyed by the ids that nodes cite in `refs`. Labels are derived
// from the URL by sourceLink() so there is nothing to keep in sync; scholarly
// context lives inline on each node as `note` / `quote`.

import { TREE, type EtymNode } from "./etymology";

export const REFERENCES: Record<number, string> = {
  1: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/h%E2%82%82st%E1%B8%97r",
  2: "https://www.etymonline.com/word/*ster-",
  3: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/h%E2%82%82eHs-",
  4: "https://www.academia.edu/11490267/",
  5: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stern%C7%AD",
  6: "https://en.wiktionary.org/wiki/steorra#Old_English",
  7: "https://www.etymonline.com/word/star",
  8: "https://www.etymonline.com/word/sterling",
  9: "https://en.wiktionary.org/wiki/Stern#German",
  10: "https://en.wiktionary.org/wiki/stjarna#Old_Norse",
  11: "https://en.wiktionary.org/wiki/sterne",
  12: "https://en.wiktionary.org/wiki/%F0%90%8D%83%F0%90%8D%84%F0%90%8C%B0%F0%90%8C%B9%F0%90%8D%82%F0%90%8C%BD%F0%90%8D%89",
  13: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/st%C4%93rl%C4%81",
  14: "https://en.wiktionary.org/wiki/stella#Latin",
  15: "https://en.wiktionary.org/wiki/stellaris#Latin",
  16: "https://www.etymonline.com/word/stellar",
  17: "https://en.wiktionary.org/wiki/stellarator",
  18: "https://www.etymonline.com/word/interstellar",
  19: "https://en.wiktionary.org/wiki/constellatio#Latin",
  20: "https://www.etymonline.com/word/constellation",
  21: "https://en.wiktionary.org/wiki/stellatus#Latin",
  22: "https://www.etymonline.com/word/stellate",
  23: "https://en.wiktionary.org/wiki/stellify",
  24: "https://en.wiktionary.org/wiki/stellio#Latin",
  25: "https://en.wiktionary.org/wiki/stellionate",
  26: "https://en.wiktionary.org/wiki/Stella",
  27: "https://en.wiktionary.org/wiki/estoile",
  28: "https://en.wiktionary.org/wiki/%C3%A9toile#French",
  29: "https://en.wiktionary.org/wiki/Estelle#English",
  30: "https://archive.org/details/etymological-dictionary-of-proto-germanic",
  31: "https://en.wiktionary.org/wiki/estrella#Spanish",
  32: "https://en.wiktionary.org/wiki/%E1%BC%80%CF%83%CF%84%CE%AE%CF%81",
  33: "https://en.wiktionary.org/wiki/%E1%BC%80%CF%83%CF%84%CE%B5%CF%81%CE%AF%CF%83%CE%BA%CE%BF%CF%82",
  34: "https://www.etymonline.com/word/asterisk",
  35: "https://www.etymonline.com/word/asteroid",
  36: "https://www.etymonline.com/word/asterism",
  37: "https://en.wiktionary.org/wiki/aster#Latin",
  38: "https://www.etymonline.com/word/aster",
  39: "https://en.wiktionary.org/wiki/%E1%BC%84%CF%83%CF%84%CF%81%CE%BF%CE%BD",
  40: "https://en.wiktionary.org/wiki/astrum#Latin",
  41: "https://www.etymonline.com/word/astral",
  42: "https://en.wiktionary.org/wiki/disastro#Italian",
  43: "https://en.wiktionary.org/wiki/d%C3%A9sastre#French",
  44: "https://www.etymonline.com/word/disaster",
  45: "https://en.wiktionary.org/wiki/%E1%BC%80%CF%83%CF%84%CF%81%CE%BF%CE%BD%CE%BF%CE%BC%CE%AF%CE%B1",
  46: "https://www.etymonline.com/word/astronomy",
  47: "https://en.wiktionary.org/wiki/%E1%BC%80%CF%83%CF%84%CF%81%CE%BF%CE%BB%CE%BF%CE%B3%CE%AF%CE%B1",
  48: "https://www.etymonline.com/word/astrology",
  49: "https://en.wiktionary.org/wiki/%E1%BC%80%CF%83%CF%84%CF%81%CE%BF%CE%BB%CE%AC%CE%B2%CE%BF%CF%82",
  50: "https://www.etymonline.com/word/astrolabe",
  51: "https://www.etymonline.com/word/astro-",
  52: "https://www.etymonline.com/word/astronaut",
  53: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Hst%C4%81%CC%81",
  54: "https://en.wiktionary.org/wiki/%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%83",
  55: "https://en.wiktionary.org/wiki/%E0%A4%A4%E0%A4%BE%E0%A4%B0%E0%A4%BE",
  56: "https://en.wiktionary.org/wiki/Tara#English",
  57: "https://en.wiktionary.org/wiki/%F0%90%AC%AF%F0%90%AC%99%F0%90%AC%80%F0%90%AC%AD",
  58: "https://en.wiktionary.org/wiki/%D8%B3%D8%AA%D8%A7%D8%B1%D9%87#Persian",
  59: "https://www.etymonline.com/word/Esther",
  60: "https://en.wiktionary.org/wiki/%F0%92%84%A9%F0%92%80%B8%F0%92%8B%BC%F0%92%85%95%F0%92%8D%9D",
  61: "https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/ster%C4%81",
  62: "https://en.wiktionary.org/wiki/seren#Welsh",
  63: "https://dil.ie/37209",
  64: "https://en.wiktionary.org/wiki/%D5%A1%D5%BD%D5%BF%D5%B2",
  65: "https://en.wiktionary.org/wiki/%C5%9Bcirye#Tocharian_B",
};

const SITE: Record<string, string> = {
  "etymonline.com": "etymonline",
  "en.wiktionary.org": "Wiktionary",
  "en.wikipedia.org": "Wikipedia",
  "archive.org": "archive.org",
  "dil.ie": "eDIL",
  "academia.edu": "Wilson-Wright 2015",
};
const NAME_ONLY = new Set(["dil.ie", "academia.edu"]);

/** Derive a consistent "Source · page" label straight from the URL. */
export function sourceLink(url: string): string {
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, "");
  const site = SITE[host] ?? host;
  if (NAME_ONLY.has(host)) return site;
  const segs = u.pathname.split("/").filter(Boolean);
  const raw = host === "archive.org" ? (segs[1] ?? "") : (segs[segs.length - 1] ?? "");
  const page = decodeURIComponent(raw)
    .replace(/^Reconstruction:/, "")
    .replace(/[_+]/g, " ");
  return page ? `${site} · ${page}` : site;
}

// Fail fast if a node cites an id with no URL.
(function validateTreeRefs(root: EtymNode) {
  const dangling: string[] = [];
  (function walk(n: EtymNode) {
    for (const r of n.refs ?? []) if (!REFERENCES[r]) dangling.push(`${n.id} → R${r}`);
    n.children?.forEach(walk);
  })(root);
  if (dangling.length) {
    throw new Error(`[references] nodes cite undefined sources: ${dangling.join(", ")}`);
  }
})(TREE);
