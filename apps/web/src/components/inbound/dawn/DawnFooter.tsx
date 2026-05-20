import Link from "next/link";

export function DawnFooter() {
  return (
    <footer className="mt-16 border-t border-[#e8e8e8] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6">
        <p className="text-sm font-medium text-black">SPRAY — Asahikawa, Hokkaido</p>
        <p className="mt-2 text-sm text-black/60">
          1-8 Toyooka 12-jo 1-chome, Asahikawa 078-8242 · Tel 0166-33-2779
        </p>
        <p className="mt-4 text-xs text-black/50">Open 12:00–19:00 · Closed Wednesdays</p>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-black/60">
          <Link href="/ja" className="hover:underline">
            Japanese site
          </Link>
          <Link href="/en/legal/privacy" className="hover:underline">
            Privacy
          </Link>
          <a
            href="https://www.spray166.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Official online store
          </a>
        </div>
        <p className="mt-8 text-xs text-black/40">© {new Date().getFullYear()} SPRAY</p>
      </div>
    </footer>
  );
}
