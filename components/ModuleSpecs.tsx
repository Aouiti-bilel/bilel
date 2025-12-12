'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ModuleItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Props {
  modules: ModuleItem[];
}

const ModuleSpecs: React.FC<Props> = ({ modules }) => {
  return (
    <section className="py-20 bg-white dark:bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Module Specifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            A structured look at the modules, features, and architecture layers.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#161616] hover:shadow-lg transition"
            >
              {item.icon && <div className="mb-4">{item.icon}</div>}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ModuleSpecs;
