export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12 flex justify-between items-center">
        <span className="text-xs text-t-dim">
          &copy; {new Date().getFullYear()} Pranjul Pal
        </span>
        <span className="text-xs text-t-dim">Bengaluru, India</span>
      </div>
    </footer>
  );
}
