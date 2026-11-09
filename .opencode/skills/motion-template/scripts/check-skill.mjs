#!/usr/bin/env node
/**
 * Consistency checker for the motion-template skill.
 * Run from anywhere: node .opencode/skills/motion-template/scripts/check-skill.mjs
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const requiredFiles = [
  "SKILL.md",
  "data/libraries.json",
  "data/README.md",
  "references/stack-matrix.md",
  "references/framer-motion.md",
  "references/threejs-r3f.md",
  "references/gsap-lenis.md",
  "references/template-architecture.md",
  "references/library-catalog.md",
  "references/recipes.md",
  "references/performance-a11y.md",
  "references/checklist.md",
  "scripts/select-stack.mjs",
  "scripts/check-skill.mjs"
];

for (const file of requiredFiles) {
  check(existsSync(join(root, file)), `missing required file: ${file}`);
}

for (const file of ["scripts/select-stack.mjs", "scripts/check-skill.mjs"]) {
  const absolute = join(root, file);
  if (!existsSync(absolute)) continue;
  try {
    execFileSync(process.execPath, ["--check", absolute], { stdio: "pipe" });
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    errors.push(`${file}: syntax check failed\n${detail}`);
  }
}

function walk(directory) {
  const entries = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) entries.push(...walk(absolute));
    else if (entry.isFile()) entries.push(absolute);
  }
  return entries;
}

const markdownFiles = walk(root).filter((file) => file.endsWith(".md"));
const skillPath = join(root, "SKILL.md");
const skill = read("SKILL.md");
const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
check(Boolean(frontmatter), "SKILL.md is missing YAML frontmatter");
if (frontmatter) {
  check(/^name:\s*\S.+$/m.test(frontmatter[1]), "SKILL.md frontmatter needs a name");
  check(/^description:\s*\S.+$/m.test(frontmatter[1]), "SKILL.md frontmatter needs a description");
  check(frontmatter[1].split(/\r?\n/).length <= 12, "SKILL.md frontmatter should stay short");
}

for (const file of markdownFiles) {
  const text = readFileSync(file, "utf8");
  const label = relative(root, file);
  const fenceCount = (text.match(/^\s*```/gm) ?? []).length;
  check(fenceCount % 2 === 0, `${label}: unbalanced code fences (${fenceCount})`);

  const linkPattern = /\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const target = match[1].trim();
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(target)) continue;
    const clean = target.split("#")[0].split("?")[0];
    if (!clean) continue;
    const absolute = resolve(dirname(file), clean);
    check(existsSync(absolute), `${label}: broken internal link "${target}"`);
  }
}

const referenceFiles = readdirSync(join(root, "references"))
  .filter((file) => file.endsWith(".md"))
  .sort();
for (const file of referenceFiles) {
  check(skill.includes(`references/${file}`), `SKILL.md does not link references/${file}`);
}

let data;
try {
  data = JSON.parse(read("data/libraries.json"));
} catch (error) {
  errors.push(`data/libraries.json is not valid JSON: ${error.message}`);
}

let libraryCount = 0;
let categoryCount = 0;
if (data) {
  check(data.meta && data.meta.verified, "data/libraries.json needs meta.verified");
  check(data.meta && /^\d{4}-\d{2}-\d{2}$/.test(data.meta.verified), "data/libraries.json meta.verified must be YYYY-MM-DD");
  check(Array.isArray(data.libraries), "data/libraries.json needs a libraries array");
  check(data.categories && typeof data.categories === "object", "data/libraries.json needs categories");
  libraryCount = data.libraries?.length ?? 0;
  categoryCount = Object.keys(data.categories ?? {}).length;
  check(libraryCount >= 40, `library catalog needs at least 40 entries, found ${libraryCount}`);
  check(data.meta?.count === libraryCount, `meta.count (${data.meta?.count}) must equal libraries.length (${libraryCount})`);

  const ids = new Set();
  const packages = new Set();
  const statuses = new Set(["core", "recommended", "optional", "legacy"]);
  const weights = new Set(["tiny", "small", "medium", "large"]);
  const ssrModes = new Set(["safe", "client", "server", "build", "island", "dev"]);

  for (const library of data.libraries ?? []) {
    check(Boolean(library.id), "library entry missing id");
    check(Boolean(library.package), `${library.id}: missing package`);
    check(Boolean(library.name), `${library.id}: missing name`);
    check(Boolean(library.role), `${library.id}: missing role`);
    check(Boolean(library.notes), `${library.id}: missing notes`);
    check(Array.isArray(library.frameworks) && library.frameworks.length > 0, `${library.id}: needs frameworks`);
    check(statuses.has(library.status), `${library.id}: invalid status "${library.status}"`);
    check(weights.has(library.weight), `${library.id}: invalid weight "${library.weight}"`);
    check(ssrModes.has(library.ssr), `${library.id}: invalid ssr "${library.ssr}"`);
    check(Boolean(data.categories?.[library.category]), `${library.id}: unknown category "${library.category}"`);

    if (library.id) {
      check(!ids.has(library.id), `duplicate library id: ${library.id}`);
      ids.add(library.id);
    }
    if (library.package) {
      check(!packages.has(library.package), `duplicate package: ${library.package}`);
      packages.add(library.package);
    }
  }
}

const recipes = read("references/recipes.md");
const recipeIds = [...recipes.matchAll(/^##\s+(MT-\d{2})\b/gm)].map((match) => match[1]);
const uniqueRecipeIds = new Set(recipeIds);
check(recipeIds.length >= 12, `references/recipes.md needs at least 12 recipes, found ${recipeIds.length}`);
check(uniqueRecipeIds.size === recipeIds.length, "references/recipes.md has duplicate recipe IDs");

const selector = read("scripts/select-stack.mjs");
const selectorRecipeIds = [...new Set([...selector.matchAll(/"(MT-\d{2})"/g)].map((match) => match[1]))];
for (const id of selectorRecipeIds) {
  check(uniqueRecipeIds.has(id), `scripts/select-stack.mjs references missing recipe ${id}`);
}

if (errors.length > 0) {
  console.error("motion-template skill: FAILED");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("motion-template skill: OK");
console.log(
  `libraries ${libraryCount} | categories ${categoryCount} | references ${referenceFiles.length} | recipes ${uniqueRecipeIds.size}`
);
