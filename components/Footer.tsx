export default function Footer() {
  return (
    <footer className="border-t mt-20 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">

        {/* Opportunity Note */}
        <div className="w-full max-w-2xl bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 rounded-md shadow-md">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 text-lg">
            🧑‍💻 Available for Backend / Full-Stack Roles
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
            I’m open to full-time, contract, or freelance opportunities.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Bilel Laouiti. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
