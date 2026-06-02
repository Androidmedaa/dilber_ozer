import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isPrivate = process.env.SITE_PRIVATE === "true";

  if (isPrivate) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
