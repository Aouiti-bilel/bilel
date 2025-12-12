"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const modules = [
  {
    title: "KPI Dashboard Widgets",
    desc: "Interactive analytics widgets using Chart.js, circular progress bars, and async metrics.",
    image: "/projects/vitasoins-admin.png",
  },
  {
    title: "Authentication System",
    desc: "Secure login, register, API keys, JWT, validation and protected routes.",
    image: "/projects/auth.png",
  },
  {
    title: "Roles & Permissions",
    desc: "Full RBAC system with customizable permissions matrix and role-based menus.",
    image: "/projects/access.png",
  },
  {
    title: "Realtime Notifications & Chat",
    desc: "Socket.io-based messaging system with realtime notifications and activity tracking.",
    image: "/projects/chat.png",
  },
  {
    title: "Posts Management",
    desc: "Content management with TinyMCE editor, image uploads and publishing workflow.",
    image: "/projects/posts.png",
  },
  {
    title: "Calendar & Appointments",
    desc: "FullCalendar system with interactions, schedules, drag & drop, and reminders.",
    image: "/projects/appointment-calendar.jpg",
  },
];

export default function ModulesHero() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#0d0d0d] dark:to-[#111]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white"
        >
          Reusable Engineering Modules
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-center text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto"
        >
          Production-ready modules I build, refine and reuse across enterprise applications.
        </motion.p>

        {/* Modules Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="
                group rounded-2xl overflow-hidden 
                border border-gray-200 dark:border-gray-800 
                shadow-lg bg-white/60 dark:bg-white/5 
                backdrop-blur-xl transition-all
              "
            >
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {m.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
