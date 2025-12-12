"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const skills = [
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "TailwindCSS",
    "UI/UX Enthusiast"
];

export default function HeroAboutMe() {
    const [skillIndex, setSkillIndex] = useState(0);

    // SIMPLE TEXT ROTATION ANIMATION
    useEffect(() => {
        const interval = setInterval(() => {
            setSkillIndex((i) => (i + 1) % skills.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-5xl mx-auto px-6 mt-10 md:mt-20 grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE — TEXT */}
            <div>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                    Hi, I’m <span className="text-blue-600 dark:text-blue-400">Bilel</span>
                    <br />
                    I Build Modern Web Experiences
                </h1>

                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                    Passionate Full-Stack JavaScript developer focused on building
                    scalable products, clean UI systems, and fast user experiences.
                </p>

                {/* ANIMATED SKILL TAG */}
                <div className="mt-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full
          bg-black/5 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10
          text-sm font-medium">
                        🚀 {skills[skillIndex]}
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-8 flex gap-4">
                    <a
                        href="projects"
                        className="px-6 py-3 rounded-full font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
                    >
                        View Projects
                    </a>

                    <a
                        href="contact"
                        className="px-6 py-3 rounded-full font-medium border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* RIGHT SIDE — IMAGE COLUMN */}
            <div className="relative flex justify-center">

                {/* GLOW EFFECT */}
                <div className="absolute -z-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-400/20 blur-3xl rounded-full" />

                {/* IMAGE CARD */}
                <div className="rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10
        bg-white/40 dark:bg-white/5 backdrop-blur">
                    <Image
                        src="/me.png" // <<< YOUR IMAGE HERE
                        alt="Profile Image"
                        width={350}
                        height={350}
                        className="object-cover"
                    />
                </div>
            </div>

        </section>
    );
}
