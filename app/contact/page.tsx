"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiLinkedin, FiGithub } from "react-icons/fi";
import { sendMessage } from "../actions/sendMessage";

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(sendMessage, {
    ok: false,
    message: "",
  });

  const me = {
    email: "khelifa.bilel1@outlook.fr",
    phone: "+216 ",
    linkedin: "www.linkedin.com/in/bilel-laouiti-ba697a15b",
    github: "https://github.com/Aouiti-bilel",
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0d0d0d] dark:to-[#111] py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Contact Me
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Have a project? Let’s talk — I respond fast.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">

          {/* LEFT CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="
              p-8 rounded-2xl shadow-xl
              bg-white/80 dark:bg-white/5 
              border border-gray-200 dark:border-gray-800 
              backdrop-blur-xl
            "
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Let’s Connect</h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <FiMail className="text-xl text-primary" />
                <a href={`mailto:${me.email}`}
                  className="text-gray-700 dark:text-gray-200 hover:underline">
                  {me.email}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="text-xl text-primary" />
                <a href={`tel:${me.phone}`}
                  className="text-gray-700 dark:text-gray-200 hover:underline">
                  {me.phone}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <FiLinkedin className="text-xl text-primary" />
                <a href={`https://${me.linkedin}`} className="hover:underline"> {me.linkedin} </a>
              </div>

              <div className="flex items-center gap-4">
                <FiGithub className="text-xl text-primary" />
                <a href={me.github} className="hover:underline"> {me.github} </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.form
            action={formAction}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="
              p-8 rounded-2xl shadow-xl
              bg-white/80 dark:bg-white/5 
              border border-gray-200 dark:border-gray-800 
              backdrop-blur-xl
              space-y-6
            "
          >
            {/* STATUS */}
            {state.message && (
              <p
                className={`text-sm p-3 rounded-lg ${state.ok
                  ? "bg-green-500/20 text-green-700 dark:text-green-300"
                  : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
              >
                {state.message}
              </p>
            )}

            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Name</label>
              <input
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/60"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/60"
                placeholder="your@email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 
                border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/60"
                placeholder="Tell me about your project…"></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={pending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl font-medium text-white 
                         bg-primary hover:bg-primary/90 transition disabled:opacity-50"
            >
              {pending ? "Sending…" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
