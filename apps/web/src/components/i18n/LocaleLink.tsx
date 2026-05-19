import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedHref } from "@/i18n/routing";

type LocaleLinkProps = React.ComponentProps<typeof Link> & {
  locale: Locale;
  href: string;
};

export function LocaleLink({ locale, href, ...props }: LocaleLinkProps) {
  return <Link href={localizedHref(locale, href)} {...props} />;
}
