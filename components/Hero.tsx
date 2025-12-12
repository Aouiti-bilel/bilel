"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";

const skills = [
  "Node.js",
  "Express.js",
  "GraphQL",
  "Socket.IO",
  "JavaScript",
  "TypeScript(+-)",
  "React.js",
  "Next.js",
  "Remix.js",
  "React-native",
  "TailwindCSS(+-)",
  "BootstrapCSS",
  "MySQL",
  "PostgreSQL",
];

export default function Hero() {


  return (
    <>
      <section className="max-w-5xl mx-auto px-6 mt-14 md:mt-24 grid md:grid-cols-2 gap-12 items-center relative">
        <div className="">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Hi, I’m <span className="text-blue-600 dark:text-blue-400">Bilel</span>
            <br />
            I Build Modern Web Experiences
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            Experienced Full Stack ( JavaScript )  Developer with 4+ years of expertise in building robust systems, solving complex challenges, and delivering consistent, high-quality results.</p>
          {/* BADGE CLOUD */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-sm">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="
                px-3 py-1 text-xs rounded-full 
                bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10
                backdrop-blur 
                animate-softfloat
                shadow-sm hover:scale-110 transition-transform
              "
                style={{
                  animationDelay: `${i * 150}ms`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>


        </div>
        {/* RIGHT */}
        <div className="relative flex flex-col items-center">
          {/* Glow */}
          <div className="absolute -z-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-400/20 blur-3xl rounded-full" />
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur z-10">
            <Image src="/me.png" alt="Profile" width={350} height={350} className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
