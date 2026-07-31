export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.monosvwaudi.co.zw";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
