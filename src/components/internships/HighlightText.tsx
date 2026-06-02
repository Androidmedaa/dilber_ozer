import styles from "./internships-content.module.css";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Build match terms from technology labels (longest first). */
export function buildTechHighlightTerms(technologies: string[]): string[] {
  const terms = new Set<string>();

  for (const tech of technologies) {
    terms.add(tech);
    const withoutParens = tech.replace(/\s*\([^)]*\)/g, "").trim();
    if (withoutParens) terms.add(withoutParens);

    tech.split(/[/,]/).forEach((part) => {
      const trimmed = part.trim();
      if (trimmed.length > 1) terms.add(trimmed);
    });
  }

  return [...terms].sort((a, b) => b.length - a.length);
}

const EXTRA_TERMS: Record<string, string[]> = {
  "bilsoft-callmetric": [
    "OpenAI Whisper",
    "Whisper",
    "WER",
    "STT",
    "GPU",
    "LLMs",
    "SLMs",
    "LLM/SLMs",
    "open-source LLMs",
    "BDDK",
    "GDPR",
    "Route 53",
    "load balancers",
    "PoCs",
    "regex",
    "fine-tuning",
    "fine-tunes",
  ],
  "norm-digital-vinter": [
    "prompt engineering",
    "semantic search",
    "embedding models",
    "LLM",
  ],
  "expertel-proceedit": [
    "Kolmogorov-Arnold Networks",
    "Tor Proxy Controller",
    "multithreading",
    "JavaScript",
    "time-series",
    "Google Meet",
    "Scrum",
    "scatter plots",
    "anti-bot",
  ],
};

type HighlightTextProps = {
  text: string;
  internshipId: string;
  technologies: string[];
};

export function HighlightText({ text, internshipId, technologies }: HighlightTextProps) {
  const terms = [
    ...buildTechHighlightTerms(technologies),
    ...(EXTRA_TERMS[internshipId] ?? []),
  ];

  const unique = [...new Set(terms)].sort((a, b) => b.length - a.length);

  if (unique.length === 0) {
    return text;
  }

  const pattern = new RegExp(`(${unique.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        const isTerm = unique.some((term) => part.toLowerCase() === term.toLowerCase());
        if (isTerm) {
          return (
            <strong key={`${index}-${part}`} className={styles.techEm}>
              <em>{part}</em>
            </strong>
          );
        }
        return <span key={`${index}-${part}`}>{part}</span>;
      })}
    </>
  );
}
