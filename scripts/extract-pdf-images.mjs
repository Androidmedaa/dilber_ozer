import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { PDFParse } from "pdf-parse";

const outDir = "public/projects/kits23";
mkdirSync(outDir, { recursive: true });

const buffer = readFileSync("rapor.pdf");
const parser = new PDFParse({ data: buffer });
const result = await parser.getScreenshot({ scale: 1.5, desiredWidth: 1400 });
await parser.destroy();

result.pages.forEach((page, index) => {
  const name = `${outDir}/page-${index + 1}.png`;
  writeFileSync(name, page.data);
  console.log(`Wrote ${name}`);
});
