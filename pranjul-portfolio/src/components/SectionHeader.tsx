interface Props {
  label: string;
}

export default function SectionHeader({ label }: Props) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-8 h-px bg-gold" />
      <span className="font-mono text-xs tracking-[3px] uppercase text-gold font-medium">
        {label}
      </span>
    </div>
  );
}
