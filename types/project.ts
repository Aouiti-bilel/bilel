export  interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;

  coverImage: string;
  image?: string;
  gallery: string[];

  github: string;
  website: string;

  techStack: string[];
  features: string[];

  timeline: {
    start: string; // YYYY-MM
    end: string;   // YYYY-MM
  };

  category: string;
  tags: string[];

  status: "completed" | "in-progress" | "planned";
}
