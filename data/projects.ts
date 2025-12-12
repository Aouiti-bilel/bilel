// data/projects.ts

import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "vitasoins",
    title: "Vitasoins",
    description:
      "Medical booking platform with appointment scheduling, practitioner profiles, and secure authentication.",
    coverImage: "/projects/vitasoins-public.png",
    gallery: [
      "/projects/vitasoins-public.png",
      "/projects/vitasoins-admin.png",
    ],
    github: "https://github.com/Aouiti-bilel/vitasoins",
    website: "https://vitasoins.fly.dev/",
    techStack: ["Remix.js", "Node.js", "Express", "BootstrapCSS"],
    features: [
      "Appointment system",
      "Medical practitioner profiles",
      "Secure patient login",
      "Responsive UI",
    ],
    timeline: { start: "2023-05", end: "2023-09" },
    category: "Healthcare",
    tags: ["Booking", "Platform"],
    status: "completed",
  },

  {
    id: 2,
    slug: "a2structure",
    title: "A2 Structure — Construction Website",
    description:
      "Corporate website with a custom admin dashboard for managing content, services, and project gallery.",
    coverImage: "/projects/a2.png",
    gallery: [],
    github: "https://github.com/yourname/a2structure",
    website: "https://www.a2structures.fr/",
    techStack: ["Remix", "PostgreSQL", "Node.js"],
    features: [
      "Admin content manager",
      "Project gallery",
      "Service pages",
      "SEO optimized",
    ],
    timeline: { start: "2022-10", end: "2023-01" },
    category: "Corporate",
    tags: ["CMS", "Admin Panel"],
    status: "completed",
  },

  {
    id: 3,
    slug: "pickbazar-ecommerce",
    title: "PickBazar Ecommerce",
    description:
      "React + GraphQL ecommerce platform with full cart, checkout, admin dashboard, and product management.",
    coverImage: "/projects/pickbazar.png",
    gallery: [],
    github: "https://github.com/Aouiti-bilel/NextS-shop",
    website: "https://pickbazar-react-rest.vercel.app/shops/furniture-shop",
    techStack: ["Next.js", "GraphQL", "Redux", "NestJS", "TypeOrm", "PostgreSQL"],
    features: [
      "Product catalog",
      "Cart & checkout system",
      "Admin product manager",
      "GraphQL API integration",
    ],
    timeline: { start: "2021-06", end: "2021-09" },
    category: "Ecommerce",
    tags: ["GraphQL", "Admin"],
    status: "completed",
  },

  {
    id: 4,
    slug: "origin-intranet",
    title: "Origin Intranet",
    description:
      "Enterprise intranet platform for disaster investigation teams — built with Node/Express backend and React interfaces.",
    coverImage: "/projects/origin.png",
    gallery: [],
    github: "https://github.com/Aouiti-bilel/Tekru_ORIGIN",
    website: "https://origin-intranet.com",
    techStack: ["Node.js", "Express", "React", "Socket.io", "GraphQL", "Redux", "Mui", "MySQL" ],
    features: [
      "Real-time communication (socket/subscriptions)",
      "Investigation workflows",
      "Admin dashboard",
      "Role-based access",
    ],
    timeline: { start: "2021-09", end: "2022-03" },
    category: "Enterprise",
    tags: ["Realtime", "Sockets"],
    status: "completed",
  },
  {
    id: 5,
    slug: "new-food",
    title: "New Food — Delivery App",
    description:
      "Customer-facing food delivery mobile application built with React Native + TypeScript to place and track food orders.",
    coverImage: "/projects/new-food.png",
    gallery: [],
    github: "https://github.com/Aouiti-bilel/Food-delivery-Mobile-App",
    website: "https://www.facebook.com/Newfood.tn/?locale=fr_FR",
    techStack: ["React Native", "TypeScript", "REST/GraphQL"],
    features: [
      "Order tracking",
      "Authentication",
      "Reusable RN modules",
      "Redux store setup",
    ],
    timeline: { start: "2023-03", end: "2023-06" },
    category: "Food Delivery",
    tags: ["React Native", "Mobile"],
    status: "completed",
  },
];
