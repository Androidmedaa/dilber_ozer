import { InternshipsContent } from "@/components/internships/InternshipsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "AI development internships and work experience — BilSoft CallMetric, Norm Digital Vinter, Proceedit FinTech.",
};

export default function InternshipsPage() {
  return <InternshipsContent />;
}
