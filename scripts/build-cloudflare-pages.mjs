import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const productionHomepageSource = path.join(root, "release", "production-homepage.html");

const topLevelFiles = [
  "_headers",
  "_redirects",
  "_routes.json",
  "404.html",
  "about-leonardo.html",
  "ankle-sprain.html",
  "ask-leonardo.html",
  "aviso-cookies.html",
  "aviso-medico.html",
  "aviso-privacidad.html",
  "back-pain.html",
  "body-resources.html",
  "can-you-keep-training-while-injured.html",
  "combat-sports-rehab.html",
  "contact.html",
  "derechos-arco.html",
  "do-you-need-an-mri-before-physical-therapy.html",
  "faq.html",
  "first-session.html",
  "hip-pain.html",
  "how-return-to-sport-testing-works.html",
  "knee-mobility.html",
  "knee-pain.html",
  "knee-readiness-check.html",
  "knee-return-to-sport.html",
  "knee-strength.html",
  "knee.html",
  "llms.txt",
  "neck-pain.html",
  "post-surgical-rehab.html",
  "resources.html",
  "return-to-performance.html",
  "return-to-running.html",
  "return-to-sport.html",
  "reviews.html",
  "robots.txt",
  "shoulder-pain.html",
  "sitemap.xml",
  "sports-injuries.html",
  "sports-performance.html",
  "success-stories.html",
  "tennis-golfers-elbow.html",
  "videos.html",
  "what-happens-during-your-first-session.html",
  "what-we-treat.html",
  "who-we-help.html",
  "why-physical-therapy-didnt-work-the-first-time.html",
];

const directories = ["static", "es"];

const excludedPublicPaths = new Set([
  "static/website.turnstile-init.test.js",
]);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

async function getProductionHomepage() {
  try {
    const source = await readFile(productionHomepageSource, "utf8");
    return source
      .replace(/\.html\b/g, "")
      .replace('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">')
      .replace(
        '<meta property="og:url" content="https://physioprotijuana.com/">',
        [
          '<meta property="og:url" content="https://physioprotijuana.com/">',
          '<meta property="og:image" content="https://physioprotijuana.com/static/images/v3/gym.jpg">',
          '<meta property="og:image:width" content="1152">',
          '<meta property="og:image:height" content="1536">',
          '<meta property="og:image:type" content="image/jpeg">',
        ].join("\n    "),
      )
      .replace(
        '<meta name="twitter:description" content="Performance rehabilitation in Zona Rio, Tijuana for pain, injury, post-surgical recovery, and return to training with a clear plan.">',
        [
          '<meta name="twitter:description" content="Performance rehabilitation in Zona Rio, Tijuana for pain, injury, post-surgical recovery, and return to training with a clear plan.">',
          '<meta name="twitter:image" content="https://physioprotijuana.com/static/images/v3/gym.jpg">',
        ].join("\n    "),
      );
  } catch (error) {
    throw new Error(`Could not prepare production homepage from ${path.relative(root, productionHomepageSource)}: ${error.message}`);
  }
}

await writeFile(path.join(dist, "index.html"), await getProductionHomepage());

for (const file of topLevelFiles) {
  const source = path.join(root, file);
  const destination = path.join(dist, file);
  await cp(source, destination);
}

for (const directory of directories) {
  await cp(path.join(root, directory), path.join(dist, directory), {
    recursive: true,
    filter: (source) => {
      const relative = path.relative(root, source).split(path.sep).join("/");
      return (
        !relative.includes("node_modules") &&
        relative !== "static/images/gallery" &&
        !relative.startsWith("static/images/gallery/") &&
        !excludedPublicPaths.has(relative)
      );
    },
  });
}

const entries = await readdir(dist);
for (const entry of entries) {
  if (entry.endsWith(".md") || entry === "wrangler.toml" || entry === "functions" || entry === "node_modules" || entry === "release") {
    throw new Error(`Non-public deployment artifact copied to dist: ${entry}`);
  }
}

for (const excludedPath of excludedPublicPaths) {
  const copied = path.join(dist, excludedPath);
  try {
    await readFile(copied);
    throw new Error(`Excluded local-only asset copied to dist: ${excludedPath}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

console.log(`Cloudflare Pages package prepared in ${path.relative(root, dist)}`);
