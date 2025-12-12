"use client";

import { projects } from "@/data/projects";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProjectsPage() {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A showcase of selected projects, enterprise systems, MVPs, and apps.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow duration-300">
              {project.coverImage && (
                <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40"></div>
                </div>
              )}

              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </Link>
                  )}
                  {project.website && (
                    <Link
                      href={project.website}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
