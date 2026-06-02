import { readFileSync, writeFileSync } from "fs";
import { PDFParse } from "pdf-parse";

const buffer = readFileSync("rapor.pdf");
const parser = new PDFParse({ data: buffer });
const result = await parser.getText();
writeFileSync("rapor-extracted.txt", result.text, "utf8");
console.log(result.text);
