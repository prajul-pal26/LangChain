export default function BlogLoading() {
  return (
    <main className="relative z-10 min-h-screen">
      <div className="pt-[72px]">
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-20 pb-16">
          <div className="h-4 w-32 bg-bg-3 rounded animate-pulse mb-8" />
          <div className="h-16 w-48 bg-bg-3 rounded animate-pulse mb-6" />
          <div className="h-6 w-96 bg-bg-3 rounded animate-pulse" />
        </section>
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pb-12">
          <div className="h-80 bg-bg-2 rounded-2xl border border-[var(--border)] animate-pulse" />
        </section>
      </div>
    </main>
  );
}
