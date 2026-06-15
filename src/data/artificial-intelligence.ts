export type AiFocusArea = {
  title: string;
  description: string;
  points: string[];
};

export const aiPageIntro =
  "My engineering approach combines strong fundamentals with production thinking. I focus on taking systems from prototype to real use, and I connect design choices to outcomes through measurable improvements in internships across CRM, HR, and FinTech domains.";

export const aiFocusAreas: AiFocusArea[] = [
  {
    title: "Speech, LLMs, and Retrieval in Production",
    description:
      "At CallMetric / BilSoft, I worked on end-to-end AI pipelines for live CRM workflows.",
    points: [
      "Fine-tuned and benchmarked speech systems (including Whisper) to improve in-domain transcription quality.",
      "Built and optimized retrieval-augmented pipelines with practical constraints such as latency, queueing, and cost.",
      "Applied model-efficiency methods (quantization, LoRA/QLoRA, PEFT) to make deployments more practical.",
    ],
  },
  {
    title: "AI for Recruitment Intelligence",
    description:
      "At Norm Digital / Vinter, I supported candidate-matching and CV understanding workflows.",
    points: [
      "Contributed to OCR and semantic retrieval flows for extracting usable candidate information from resumes.",
      "Helped convert unstructured CV text into structured JSON blob outputs for downstream screening.",
      "Improved prompt and retrieval quality for more consistent candidate-job matching.",
    ],
  },
  {
    title: "Forecasting and Reliable Data Collection",
    description:
      "At Expertel SA / Proceedit (FinTech), I focused on forecasting and robust data acquisition.",
    points: [
      "Worked with time-series models (including LSTM and Prophet) to improve baseline forecasting quality.",
      "Built resilient scraping pipelines for near-real-time market data in environments without official APIs.",
      "Handled anti-bot and blocking issues, and reported progress with clear visualizations such as scatter plots.",
    ],
  },
];

export const aiFoundationsText =
  "I continuously strengthen core engineering topics such as system design, APIs, optimization, and evaluation—alongside ML fundamentals like attention and transformers. My goal is to build reliable production systems, not just prototype isolated features.";

export const aiLearningStory =
  "What keeps me excited about software engineering is understanding how ideas become systems. I enjoy going from first principles to implementation: data modeling, service design, and how architecture choices affect reliability and performance. I am especially curious about integrating ML and generative workflows into real products. For me, engineering is not only about shipping features, but about understanding why systems work and how to improve them responsibly.";

export const aiStudyTopics = [
  "Transformer architecture",
  "LLM tokenization",
  "Byte Pair Encoding (BPE)",
  "Input-target pairs with data loaders",
  "Token embeddings",
  "Positional embeddings",
  "Simplified attention (non-trainable)",
  "Self-attention (Q/K/V matrices)",
  "Causal self-attention",
  "Multi-head attention",
  "Forward pass and backward pass intuition",
  "Generative model denoising behavior",
  "Local MCP workflows",
];
