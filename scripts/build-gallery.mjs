// ---------------------------------------------------------------------------
// Design gallery build script
// ---------------------------------------------------------------------------
// Reads the raw design files in "Portofolio (by Folder)", writes optimised
// WebP copies to public/design/, and generates app/lib/gallery.json.
//
//   npm run gallery
//
// Add files to the source folder, re-run, and they show up on the site.
// The source folder is git-ignored; only the optimised output is committed.
// ---------------------------------------------------------------------------

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "Portofolio (by Folder)");
const OUT_DIR = path.join(ROOT, "public", "design");
const MANIFEST = path.join(ROOT, "app", "lib", "gallery.json");

const THUMB_MAX = 900; // longest edge, px — grid tiles
const FULL_MAX = 1800; // longest edge, px — lightbox
const QUALITY = 82;

// Maps "<brand>/<subfolder>" in the source tree to a collection slug.
// Anything not listed here is skipped (e.g. videos, PDFs).
const SOURCES = [
  { brand: "Daily Health", folder: "Design Marketplace", collection: "marketplace", groupBySubfolder: true },
  { brand: "Daily Health", folder: "Katalog Product", collection: "catalog" },
  { brand: "Daily Health", folder: "Design Product", collection: "packaging" },
  { brand: "Daily Health", folder: "Instagram Feeds", collection: "instagram-feeds" },
  { brand: "Gykaco", folder: "Instagram Feeds", collection: "instagram-feeds" },
  { brand: "Gykaco", folder: "Lorikeet", collection: "instagram-feeds", tag: "puzzle-grid" },
  { brand: "Daily Health", folder: "Instagram Story", collection: "instagram-stories" },
  { brand: "Gykaco", folder: "Instagram Story", collection: "instagram-stories" },
];

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// "Colostrum 30 Tablet (1).png" -> "Colostrum 30 Tablet"
// "1677723121859.png"           -> null (timestamp export, no real title)
const titleFromFilename = (file) => {
  const base = path.basename(file, path.extname(file)).replace(/\s*\(\d+\)\s*$/, "").trim();
  return /^\d+$/.test(base) ? null : base;
};

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await listImages(full)));
    else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
  }
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.error(`Source folder not found: ${SOURCE}`);
    process.exit(1);
  }

  // Reuse existing output when the source file hasn't changed.
  let previous = {};
  try {
    for (const item of JSON.parse(await readFile(MANIFEST, "utf8")).items) previous[item.id] = item;
  } catch {}

  await mkdir(OUT_DIR, { recursive: true });
  const items = [];
  let converted = 0;
  let reused = 0;

  for (const src of SOURCES) {
    const dir = path.join(SOURCE, src.brand, src.folder);
    if (!existsSync(dir)) {
      console.warn(`skip (missing): ${src.brand}/${src.folder}`);
      continue;
    }

    const files = await listImages(dir);
    for (const file of files) {
      const rel = path.relative(dir, file);
      const group = src.groupBySubfolder && rel.includes(path.sep) ? rel.split(path.sep)[0] : null;
      const id = createHash("md5").update(`${src.brand}/${src.folder}/${rel}`).digest("hex").slice(0, 10);
      const { mtimeMs } = await stat(file);

      const outBase = path.join(
        OUT_DIR,
        src.collection,
        slugify(src.brand),
        `${slugify(path.basename(file, path.extname(file)))}-${id}`,
      );
      const thumbPath = `${outBase}.thumb.webp`;
      const fullPath = `${outBase}.webp`;
      const toPublic = (p) => "/" + path.relative(path.join(ROOT, "public"), p).split(path.sep).join("/");

      const prev = previous[id];
      let width, height;
      if (prev && prev.mtime === mtimeMs && existsSync(thumbPath) && existsSync(fullPath)) {
        ({ width, height } = prev);
        reused++;
      } else {
        await mkdir(path.dirname(outBase), { recursive: true });
        const image = sharp(file, { failOn: "none" });
        const meta = await image.metadata();
        width = meta.width;
        height = meta.height;
        await image
          .clone()
          .resize({ width: FULL_MAX, height: FULL_MAX, fit: "inside", withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(fullPath);
        await image
          .clone()
          .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: "inside", withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(thumbPath);
        converted++;
      }

      items.push({
        id,
        collection: src.collection,
        brand: src.brand,
        group,
        title: titleFromFilename(file),
        tag: src.tag ?? null,
        width,
        height,
        thumb: toPublic(thumbPath),
        full: toPublic(fullPath),
        mtime: mtimeMs,
      });
    }
  }

  // Remove output files that no longer correspond to a source file.
  const keep = new Set(items.flatMap((i) => [i.thumb, i.full]));
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (!keep.has("/" + path.relative(path.join(ROOT, "public"), full).split(path.sep).join("/"))) {
        await rm(full);
        console.log(`removed stale: ${e.name}`);
      }
    }
  };
  await walk(OUT_DIR);

  await writeFile(MANIFEST, JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2) + "\n");

  console.log(`\n${items.length} images in manifest — ${converted} converted, ${reused} reused.`);
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
