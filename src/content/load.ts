// Loads the Markdown story steps (glob), parses frontmatter, renders bodies,
// and validates every `focus` id against the dataset at startup — a typo in a
// step file throws before anything renders.

import { marked } from "marked";
import { NODE_BY_ID } from "../data/etymology";

export interface Step {
  key: string;
  title: string;
  focus: string[];
  html: string;
}

function parseFrontmatter(raw: string, path: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`[content] ${path}: missing frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: m[2] };
}

function parseFocus(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const files = import.meta.glob("./steps/*.md", { query: "?raw", import: "default", eager: true }) as Record<
  string,
  string
>;

export const STEPS: Step[] = Object.keys(files)
  .sort()
  .map((path) => {
    const { meta, body } = parseFrontmatter(files[path], path);
    if (!meta.key || !meta.title) throw new Error(`[content] ${path}: needs key and title`);
    const focus = parseFocus(meta.focus);
    for (const id of focus) {
      if (!NODE_BY_ID.has(id)) throw new Error(`[content] ${path}: unknown focus id "${id}"`);
    }
    return { key: meta.key, title: meta.title, focus, html: marked.parse(body) as string };
  });
