import { ContactForm } from "@/components/forms/ContactForm";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { getSiteFacts } from "@/content/get-site-facts";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function AccessPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { address, contact, hours, access } = getSiteFacts(locale);
  const labels = copy.about.access;

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <PageHero
        title={copy.about.access.title}
        lead={`${address.full} / TEL ${contact.tel}`}
      />
      <section className="container-page space-y-10 pb-12">
        <section>
          <h2 className="text-xl font-bold">{labels.storeInfo}</h2>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
            <dt className="text-spray-muted">{labels.fields.address}</dt>
            <dd>{address.full}</dd>
            <dt className="text-spray-muted">{labels.fields.phone}</dt>
            <dd>
              <a href={contact.telLink} className="hover:text-spray-orange">
                {contact.tel}
              </a>
            </dd>
            <dt className="text-spray-muted">{labels.fields.fax}</dt>
            <dd>{contact.fax}</dd>
            <dt className="text-spray-muted">{labels.fields.hours}</dt>
            <dd>{hours.label}</dd>
            <dt className="text-spray-muted">{labels.fields.closed}</dt>
            <dd>{hours.closedDay}</dd>
          </dl>
        </section>

        <ContactForm locale={locale} copy={copy} />

        <section>
          <h2 className="text-xl font-bold">{labels.byCar}</h2>
          <p className="mt-4 text-sm text-spray-muted">
            {access.byCarFromStation} / {access.byCarFromAirport}
          </p>
          <p className="mt-2 text-sm">{access.byCarDetail}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{labels.byBus}</h2>
          <p className="mt-4 text-sm">{access.byBus}</p>
          <p className="mt-2 text-xs text-spray-muted">{access.busLine}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[360px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-spray-border bg-spray-surface">
                  <th className="p-2">{labels.busTable.stationDepart}</th>
                  <th className="p-2">{labels.busTable.stopArrive}</th>
                  <th className="p-2">{labels.busTable.stopDepart}</th>
                  <th className="p-2">{labels.busTable.stationReturn}</th>
                </tr>
              </thead>
              <tbody>
                {access.busTimetable.map((row) => (
                  <tr key={row.stationDepart} className="border-b border-spray-border">
                    <td className="p-2">{row.stationDepart}</td>
                    <td className="p-2">{row.stopArrive}</td>
                    <td className="p-2">{row.stopDepart}</td>
                    <td className="p-2">{row.stationReturn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="aspect-video w-full overflow-hidden rounded-lg border border-spray-border">
          <iframe
            title="SPRAY map"
            src={access.mapsEmbedUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </section>
    </>
  );
}
