"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Article1Modal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="
          fixed inset-0 z-[210] 
          max-w-3xl mx-auto my-10 p-8 
          bg-white dark:bg-[#0f0f0f] rounded-2xl 
          overflow-y-auto shadow-xl border border-white/10
        "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>

        {/* Content */}
        <>
          <h2 className="text-xl font-bold mb-4">Custom GraphQL Directives</h2>

          <p className="mb-3">
            GraphQL Directives allow you to extend your schema with reusable behaviors like authentication, validation, formatting, and rate limiting. They add logic directly at the schema level, keeping your resolvers clean and consistent.
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-2">What Are Directives?</h3>
          <p className="mb-3">
            A directive is an annotation (using <code>@</code>) that modifies execution of a field, type, or query. GraphQL ships with built-in directives such as <code>@include</code> and <code>@skip</code>, but you can create your own for advanced use cases.
          </p>

          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`type Query {
  profile(id: ID!): User @auth
}`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Common Use Cases</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Authorization and role checking (<code>@auth</code>, <code>@requiresRole</code>)</li>
            <li>Rate limiting (<code>@rateLimit</code>)</li>
            <li>Input validation (<code>@isEmail</code>, <code>@maxLength</code>)</li>
            <li>Field formatting (<code>@date</code>, <code>@mask</code>)</li>
            <li>Field-level logic like deprecation messages</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Example Directive Definition</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`directive @auth(role: String!) on FIELD_DEFINITION`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Using the Directive</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`type Query {
  users: [User] @auth(role: "ADMIN")
}`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Directive Implementation (Apollo Server)</h3>
          <pre className="bg-gray-900 text-white p-4 rounded mb-4 text-sm overflow-x-auto">
            {`class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve;

    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user || ctx.user.role !== this.args.role) {
        throw new Error("Access denied");
      }
      return resolver(root, args, ctx, info);
    };
  }
}`}
          </pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Best Practices</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Keep directives simple and focused</li>
            <li>Use them for cross-cutting concerns (auth, logging, limits)</li>
            <li>Avoid business logic inside directives</li>
            <li>Validate directive arguments</li>
          </ul>

          <p className="mt-4">
            Custom GraphQL directives provide a powerful way to extend your schema with reusable logic, making your API more consistent and expressive.
          </p>
        </>


      </motion.div>
    </AnimatePresence>
  );
}
