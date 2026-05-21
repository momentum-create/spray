import Link from "next/link";
import { getSiteFacts } from "@/content/get-site-facts";

/** Store info for inbound Dawn pages — avoids jumping to black-site /about/access */
export function DawnVisitBlock() {
  const { address, contact, hours } = getSiteFacts("en");

  return (
    <section
      id="visit-store"
      className="scroll-mt-24 border-t border-[#e8e8e8] pt-10"
    >
      <h2 className="text-base font-medium text-black">Visit SPRAY Asahikawa</h2>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[7rem_1fr]">
        <dt className="text-black/50">Address</dt>
        <dd className="text-black/80">{address.full}</dd>
        <dt className="text-black/50">Phone</dt>
        <dd>
          <a href={contact.telLink} className="text-black underline hover:text-black/70">
            {contact.tel}
          </a>
        </dd>
        <dt className="text-black/50">Hours</dt>
        <dd className="text-black/80">
          {hours.label}
          <span className="text-black/50"> · {hours.closedDay}</span>
        </dd>
      </dl>
      <Link href="/en/about/access" className="mt-4 inline-block text-sm text-black/60 underline hover:text-black">
        Full store &amp; access info on main English site →
      </Link>
    </section>
  );
}
