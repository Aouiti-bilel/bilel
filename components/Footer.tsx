"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const me = {
    email: "khelifa.bilel1@outlook.fr",
    phone: "+216 ",
    linkedin: "www.linkedin.com/in/bilel-laouiti-ba697a15b",
    github: "https://github.com/Aouiti-bilel",
  }
  return (
    <footer className="border-t bg-white dark:bg-neutral-950 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-14">

        {/* Column 1 — Branding */}
        <div>
          <h3 className="text-2xl font-bold">Bilel Laouiti</h3>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Backend & Full-Stack Developer specializing in scalable systems,
            APIs, and modern web applications.
          </p>
        </div>


        {/* Column 3 — Socials & Availability */}
        <div>
          {/* Availability Note */}
          <div className="mb-6 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400/40">
            <h3 className="font-semibold mb-2">🧑‍💻 Availability</h3>
            <h4 className="semi-bold"> Available for Backend / Full-Stack Roles</h4>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              I’m open to full-time, contract, or freelance opportunities.
            </p>
          </div>
        </div>

      </div>
      <div className="flex justify-center items-center gap-8 my-4 text-muted-foreground">
        <Link
          href={`${me.github}`}
          target="_blank"
          className="hover:text-primary transition"
        >
          <Github size={30} />
        </Link>

        <Link
          href={`https://${me.linkedin}`}
          target="_blank"
          className="hover:text-primary transition"
        >
          <Linkedin size={30} />
        </Link>

        <Link
          href={`mailto:${me.email}`}
          className="hover:text-primary transition"
        >
          <Mail size={30} />
        </Link>
      </div>
      {/* Bottom bar */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bilel Laouiti. All rights reserved.
      </div>
    </footer>
  );
}
