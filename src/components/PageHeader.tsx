type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="animate-fade-up border-b border-border pb-8">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
