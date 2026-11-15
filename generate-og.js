// Generates public/og-image.jpg (1200x630). Run: node generate-og.js
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

// Seeded PRNG so the output is identical on every run
let seed = 7;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// Subtle cyan node network, kept mostly to the right half
const nodes = Array.from({ length: 70 }, () => ({
  x: 380 + rand() * 840,
  y: rand() * H,
}));
let lines = "";
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
    if (d < 130) {
      lines += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="#00c2ff" stroke-opacity="${(0.28 * (1 - d / 130)).toFixed(2)}" stroke-width="1"/>`;
    }
  }
}
const dots = nodes
  .map((n) => `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#33d1ff" fill-opacity="${(0.35 + rand() * 0.45).toFixed(2)}"/>`)
  .join("");

const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const sans = "Manrope, 'Segoe UI', Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#060d1f"/><stop offset="1" stop-color="#0a1630"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#00c2ff" stop-opacity="0.16"/><stop offset="1" stop-color="#00c2ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="930" cy="260" r="380" fill="url(#glow)"/>
  ${lines}${dots}
  <rect x="80" y="318" width="64" height="4" fill="#00c2ff"/>
  <text x="80" y="420" font-family="${serif}" font-size="84" font-weight="700" fill="#ffffff" letter-spacing="-2">Clear Strategy.</text>
  <text x="80" y="512" font-family="${serif}" font-size="84" font-weight="700" fill="#00c2ff" letter-spacing="-2">Real Growth.</text>
  <text x="80" y="574" font-family="${sans}" font-size="22" font-weight="600" fill="#b8c2d1" letter-spacing="5">EMERGE STRATEGIC ADVISORS</text>
</svg>`;

const logo = await sharp(path.join(root, "public/logo.webp"))
  .resize({ height: 96, fit: "inside" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: 80, top: 80 }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(root, "public/og-image.jpg"));

console.info("Generated public/og-image.jpg");
