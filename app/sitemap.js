const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

const serviceSlugs = [
  "vw-service-repairs",
  "audi-service-repairs",
  "computer-diagnostics",
  "fuel-injector-testing-cleaning",
  "panel-beating-spray-painting",
  "fleet-maintenance",
];

const problemSlugs = [
  "vw-audi-wont-start-bulawayo",
  "car-overheating-bulawayo",
  "check-engine-light-bulawayo",
  "car-losing-power-bulawayo",
  "fuel-injector-problems-bulawayo",
  "rough-idle-bulawayo",
  "brake-problems-bulawayo",
];

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/areas/bulawayo`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    ...serviceSlugs.map((slug) => ({ url: `${SITE_URL}/services/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 })),
    ...problemSlugs.map((slug) => ({ url: `${SITE_URL}/problems/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
