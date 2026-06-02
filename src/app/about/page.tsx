import { AboutContent } from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dilber Özer — Computer Engineering student, AI/Deep Learning engineer. Education, certifications, and competitions.",
};

export default function AboutPage() {
  return <AboutContent />;
}
