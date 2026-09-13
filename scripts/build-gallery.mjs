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
const TALL_RATIO = 2.4; // height/width above this = "tall page" (full-page web screenshot)
const TALL_FULL_WIDTH = 1600; // tall pages are sized by width so they stay readable
const QUALITY = 82;

// Maps a folder in the source tree to a collection slug. Anything not listed
// here is skipped (e.g. videos, PDFs).
//   dir:              folder, relative to "Portofolio (by Folder)"
//   brand:            client / project label shown on the site
//   groupBySubfolder: first-level sub-folder becomes the item's group
//   rootGroup:        group name for files sitting at the folder root (with groupBySubfolder)
//   tag:              free-form marker (e.g. "puzzle-grid" renders 2x2 in the grid)
//   tagIf:            regex on the filename that applies `tag` only to matching files
//   tallPages:        height/width ratio above which a page counts as "tall" — the
//                     lightbox then scrolls it instead of shrinking it to fit
//   thumbAspect:      [w, h] — every thumb gets this shape: taller images are
//                     cropped to their top, shorter ones are centred on a dark canvas
//   thumbFit:         "contain" — never crop; always fit the whole image on the canvas
//   match / exclude:  regex on the filename — only include / skip matching files
//   square:           centre-crop non-square images to 1:1 (keeps a feed grid even)
//   orderBy:          "name" (default) or "shape" — portrait canvases first, then
//                     landscape; wider canvases first within each; then by name
//   recursive:        false to take only the folder's own files (default: true)
const SOURCES = [
  // --- Development (screens for project cards and detail pages) ------------
  { dir: "College", brand: "Campus", collection: "dev-screens", recursive: false },
  // Floor plans ("Denah Lantai n") sort before the Packet Tracer screenshots by name.
  { dir: "College/Cisco Packet Tracer", brand: "Campus Network", collection: "cisco", thumbAspect: [16, 10], thumbFit: "contain" },
  { dir: "College/NLP", brand: "Review Authenticity Analyzer", collection: "nlp" },

  // --- Design ---------------------------------------------------------------
  { dir: "Daily Health/Design Marketplace", brand: "Daily Health", collection: "marketplace", groupBySubfolder: true },
  { dir: "Daily Health/Katalog Product", brand: "Daily Health", collection: "catalog" },
  { dir: "Daily Health/Design Product", brand: "Daily Health", collection: "packaging" },
  { dir: "Daily Health/Instagram Feeds", brand: "Daily Health", collection: "instagram-feeds" },
  { dir: "Gykaco/Instagram Feeds", brand: "Gykaco", collection: "instagram-feeds" },
  { dir: "Global Cool", brand: "Global Cool", collection: "instagram-feeds", square: true },
  { dir: "Daily Health/Instagram Story", brand: "Daily Health", collection: "instagram-stories" },
  { dir: "Gykaco/Instagram Story", brand: "Gykaco", collection: "instagram-stories" },
  { dir: "Gykaco/Lorikeet", brand: "Gykaco", collection: "lorikeet" },
  { dir: "College/Design", brand: "BabyBloom", collection: "lorikeet", match: /lorikeet/i },
  { dir: "College/Design", brand: "BabyBloom", collection: "campus-design", exclude: /lorikeet/i },
  { dir: "Individual Project (Just for Fun)", brand: "Personal", collection: "just-for-fun", square: true },
  { dir: "College/UI UX Application/PantryHub", brand: "PantryHub", collection: "pantryhub", groupBySubfolder: true, rootGroup: "Brand" },
  { dir: "College/UI UX Web/PromoHub", brand: "PromoHub", collection: "promohub", tallPages: 1.4, thumbAspect: [4, 5], orderBy: "shape" },
  { dir: "College/UI UX Web/Mr Coffee", brand: "Mr. Coffee", collection: "mrcoffee", tallPages: 1.4, thumbAspect: [4, 5], orderBy: "shape" },
  { dir: "College/UI UX Web/Mr Coffee HTML Version", brand: "Mr. Coffee", collection: "mrcoffee-html", tallPages: 1.4, thumbAspect: [4, 5], orderBy: "shape" },
  // PortfolioX files carry a "01. " ordering prefix, so name order is the intended order.
  { dir: "College/UI UX Web/PortfolioX", brand: "PortfolioX", collection: "portfoliox", tallPages: 1.4, thumbAspect: [4, 5] },
  { dir: "College/UI UX Web/AIVI", brand: "AIVI", collection: "aivi", tallPages: 1.4, thumbAspect: [4, 5], orderBy: "shape" },
];

const CANVAS = { r: 27, g: 28, b: 31 }; // --graphite

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// "Colostrum 30 Tablet (1).png"      -> "Colostrum 30 Tablet"
// "5.1. Resep Menu (Tampilan Utama)" -> "Resep Menu (Tampilan Utama)"
// "1677723121859.png"                -> null (timestamp export, no real title)
const titleFromFilename = (file) => {
  const base = path
    .basename(file, path.extname(file))
    .replace(/^\d+(\.\d+)*\.\s*/, "") // leading "4. " / "5.1. " ordering prefix
    .replace(/\s*\(\d+\)\s*$/, "") // trailing " (1)" duplicate counter
    .replace(/_/g, " ") // "SignIn_Light" -> "SignIn Light"
    .trim();
  return /^\d+$/.test(base) || base === "" ? null : base;
};

async function listImages(dir, recursive = true) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (recursive) files.push(...(await listImages(full)));
    } else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
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
    const dir = path.join(SOURCE, src.dir);
    if (!existsSync(dir)) {
      console.warn(`skip (missing): ${src.dir}`);
      continue;
    }

    const files = (await listImages(dir, src.recursive !== false)).filter((f) => {
      const name = path.basename(f);
      if (src.match && !src.match.test(name)) return false;
      if (src.exclude && src.exclude.test(name)) return false;
      return true;
    });
    const sourceItems = [];
    for (const file of files) {
      const rel = path.relative(dir, file);
      const inSubfolder = rel.includes(path.sep);
      const group = src.groupBySubfolder
        ? inSubfolder
          ? rel.split(path.sep)[0]
          : (src.rootGroup ?? null)
        : null;
      const id = createHash("md5").update(`${src.dir}/${rel}`).digest("hex").slice(0, 10);
      const { mtimeMs } = await stat(file);
      const isGif = path.extname(file).toLowerCase() === ".gif";

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
      let width, height, tall;
      if (prev && prev.mtime === mtimeMs && existsSync(thumbPath) && existsSync(fullPath)) {
        ({ width, height, tall } = prev);
        reused++;
      } else {
        await mkdir(path.dirname(outBase), { recursive: true });
        const meta = await sharp(file, { failOn: "none" }).metadata();
        width = meta.width;
        height = meta.pageHeight ?? meta.height; // animated GIFs report the stacked height
        tall = height / width > (src.tallPages ?? TALL_RATIO);

        // Optional centre square crop (applied to both copies).
        let crop = null;
        if (src.square && width !== height) {
          const size = Math.min(width, height);
          crop = {
            left: Math.round((width - size) / 2),
            top: Math.round((height - size) / 2),
            width: size,
            height: size,
          };
          width = height = size;
        }
        const open = (opts = {}) => {
          const img = sharp(file, { failOn: "none", ...opts });
          return crop ? img.extract(crop) : img;
        };

        // Full-size copy. Tall pages are sized by width so text stays readable;
        // animated GIFs keep their animation.
        const full = open({ animated: isGif });
        if (tall) {
          await full
            .resize({ width: TALL_FULL_WIDTH, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(fullPath);
        } else {
          await full
            .resize({ width: FULL_MAX, height: FULL_MAX, fit: "inside", withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(fullPath);
        }

        // Thumbnail. With thumbAspect every tile gets the same shape: taller
        // images show their top, shorter ones sit centred on a dark canvas.
        const thumb = open();
        if (src.thumbAspect) {
          const [aw, ah] = src.thumbAspect;
          const targetH = Math.round((width * ah) / aw);
          if (height > targetH && src.thumbFit !== "contain") {
            await thumb
              .extract({ left: 0, top: 0, width, height: targetH })
              .resize({ width: THUMB_MAX, withoutEnlargement: true })
              .webp({ quality: QUALITY })
              .toFile(thumbPath);
          } else {
            const w = Math.min(THUMB_MAX, width);
            await thumb
              .resize({ width: w, height: Math.round((w * ah) / aw), fit: "contain", background: CANVAS })
              .webp({ quality: QUALITY })
              .toFile(thumbPath);
          }
        } else {
          await thumb
            .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: "inside", withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(thumbPath);
        }
        converted++;
      }

      const tagApplies = src.tag && (!src.tagIf || src.tagIf.test(path.basename(file)));

      sourceItems.push({
        id,
        collection: src.collection,
        brand: src.brand,
        group,
        title: titleFromFilename(file),
        tag: tagApplies ? src.tag : null,
        width,
        height,
        tall: Boolean(tall),
        thumb: toPublic(thumbPath),
        full: toPublic(fullPath),
        mtime: mtimeMs,
        _name: path.basename(file),
      });
    }

    if (src.orderBy === "shape") {
      sourceItems.sort(
        (a, b) =>
          Number(b.height >= b.width) - Number(a.height >= a.width) || // portrait first
          b.width - a.width || // wider canvas first
          a._name.localeCompare(b._name, undefined, { numeric: true }),
      );
    }
    for (const it of sourceItems) {
      delete it._name;
      items.push(it);
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
