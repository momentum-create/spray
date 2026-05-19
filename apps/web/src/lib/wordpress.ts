const API_BASE =
  process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

export const wpApiUrl = `${API_BASE}/wp-json/wp/v2`;

export type WpPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
};

export async function fetchWp<T>(
  path: string,
  init?: RequestInit & { revalidate?: number }
): Promise<T> {
  const { revalidate = 60, ...rest } = init ?? {};
  const res = await fetch(`${wpApiUrl}${path}`, {
    ...rest,
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getNewsPosts(perPage = 3): Promise<WpPost[]> {
  try {
    return await fetchWp<WpPost[]>(`/posts?per_page=${perPage}&_embed`);
  } catch {
    return [];
  }
}
