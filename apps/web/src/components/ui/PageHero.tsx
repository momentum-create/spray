type PageHeroProps = {
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

export function PageHero({ title, lead, children }: PageHeroProps) {
  return (
    <section className="border-b border-spray-border bg-spray-surface py-12 md:py-16">
      <div className="container-page">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-spray-muted">{lead}</p> : null}
        {children ? (
          <div className="mt-6 flex flex-wrap gap-3">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
