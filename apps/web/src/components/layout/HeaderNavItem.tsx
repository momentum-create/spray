"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";

type HeaderNavItemBase = {
  label: string;
  sub?: string;
  active?: boolean;
  current?: boolean;
  className?: string;
};

type HeaderNavItemButton = HeaderNavItemBase & {
  as: "button";
  "aria-expanded"?: boolean;
  "aria-haspopup"?: boolean;
  onClick?: () => void;
};

type HeaderNavItemLink = HeaderNavItemBase & {
  as: "link";
  href: string;
  locale: Locale;
};

export type HeaderNavItemProps = HeaderNavItemButton | HeaderNavItemLink;

function cellClassName({
  active,
  current,
  className,
}: Pick<HeaderNavItemBase, "active" | "current" | "className">) {
  return [
    "nav-item-cell",
    active || current ? "bg-spray-elevated" : "",
    current ? "border-spray-orange" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function NavItemContent({ label, sub }: { label: string; sub?: string }) {
  return (
    <>
      <span className="nav-item-label">{label}</span>
      <span className="nav-item-sub">{sub ?? "\u00a0"}</span>
    </>
  );
}

export function HeaderNavItem(props: HeaderNavItemProps) {
  const { label, sub, active, current, className } = props;
  const classes = cellClassName({ active, current, className });

  if (props.as === "link") {
    return (
      <LocaleLink
        href={props.href}
        locale={props.locale}
        className={classes}
      >
        <NavItemContent label={label} sub={sub} />
      </LocaleLink>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-expanded={props["aria-expanded"]}
      aria-haspopup={props["aria-haspopup"]}
      onClick={props.onClick}
    >
      <NavItemContent label={label} sub={sub} />
    </button>
  );
}
