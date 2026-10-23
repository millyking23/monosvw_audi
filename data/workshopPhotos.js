const workshopPhotos = [
  {
    src: "/images/panel-repair.jpg",
    title: "Panel Repair",
    category: "Panel & Paint",
    description: "Panel and body repair work carried out in the Monos workshop.",
    service: "/services/panel-beating-spray-painting",
    reviewStatus: "needs-visual-review",
  },
  {
    src: "/images/diagnostics-cluster.jpg",
    title: "Computer Diagnostics",
    category: "Diagnostics",
    description: "Vehicle diagnostics and fault-finding work.",
    service: "/services/computer-diagnostics",
    reviewStatus: "needs-visual-review",
  },
  {
    src: "/images/back-workshop.jpeg",
    title: "Workshop Floor",
    category: "Workshop",
    description: "The Monos workshop environment where vehicles are inspected and repaired.",
    service: "/services/car-workshop-mechanical-repairs",
    reviewStatus: "needs-visual-review",
  },
  {
    src: "/images/WhatsApp Image 2026-09-11 at 11.44.08.jpeg",
    title: "Volkswagen Golf",
    category: "Mechanical & Service",
    description: "Volkswagen Golf photographed at the Monos workshop.",
    service: "/services/car-workshop-mechanical-repairs",
    reviewStatus: "needs-visual-review",
  },
  ...[
    ["vehicles-in-service-3.jpg", "Vehicle Service — 03"],
    ["vehicles-in-service-5.jpeg", "Vehicle Service — 05"],
    ["vehicles-in-service-6.jpeg", "Vehicle Service — 06"],
    ["vehicles-in-service-7.jpeg", "Vehicle Service — 07"],
    ["vehicles-in-service-8.jpg", "Vehicle Service — 08"],
    ["vehicles-in-service-9.jpeg", "Vehicle Service — 09"],
    ["vehicles-in-service-10.jpeg", "Vehicle Service — 10"],
  ].map(([src, title]) => ({
    src: `/images/${src}`,
    title,
    category: "Mechanical & Service",
    description: "Vehicle servicing and mechanical work at the Monos workshop.",
    service: "/services/car-workshop-mechanical-repairs",
    reviewStatus: "needs-visual-review",
  })),
  ...[
    "vehicles-in-service-5.jpg",
    "workshop-about.jpg",
    "workshop-hero.jpg",
  ].map((src) => ({
    src: `/images/${src}`,
    title: "Workshop Photo — Review",
    category: "Workshop",
    description: "Workshop photo awaiting visual classification. No specific service claim is made for this image.",
    service: "/services/car-workshop-mechanical-repairs",
    reviewStatus: "needs-visual-review",
  })),
];

export default workshopPhotos;
