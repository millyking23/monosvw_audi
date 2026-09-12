const SITE_URL = "https://www.monovwaudi.co.zw";

const serviceSlugs = ["vw-service-repairs", "audi-service-repairs", "computer-diagnostics", "fuel-injector-testing-cleaning", "panel-beating-spray-painting", "fleet-maintenance", "car-workshop-mechanical-repairs"];
const problemSlugs = ["vw-audi-wont-start-bulawayo", "car-overheating-bulawayo", "check-engine-light-bulawayo", "car-losing-power-bulawayo", "fuel-injector-problems-bulawayo", "rough-idle-bulawayo", "brake-problems-bulawayo"];

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/areas/bulawayo`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/auto-advice`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/trust/local-business`, changeFrequency: "monthly", priority: 0.75 },
    ...serviceSlugs.map((slug) => ({ url: `${SITE_URL}/services/${slug}`, changeFrequency: "monthly", priority: 0.9 })),
    ...problemSlugs.map((slug) => ({ url: `${SITE_URL}/problems/${slug}`, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
