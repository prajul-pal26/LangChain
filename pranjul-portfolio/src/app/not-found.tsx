import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="text-center px-8">
        <p className="font-mono text-sm text-gold uppercase tracking-[3px] mb-6">
          404
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
          Page not found
        </h1>
        <p className="text-lg text-t-mid mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 bg-t text-bg font-sans text-base font-semibold px-8 py-4 rounded-xl hover:brightness-95 hover:scale-[1.02] transition-all"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
