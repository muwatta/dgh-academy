import type { ContentOverrides, GalleryImage } from "@/lib/types";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/content-store";

const GALLERY_KEY = "dgh:gallery";
const CONTENT_KEY = "dgh:content";

// Only use KV if credentials are available
const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function kvGet<T>(key: string): Promise<T | null> {
  if (!hasKV) return null;
  const { kv } = await import("@vercel/kv");
  return kv.get<T>(key);
}

async function kvSet(key: string, value: unknown): Promise<void> {
  if (!hasKV) return;
  const { kv } = await import("@vercel/kv");
  await kv.set(key, value);
}

// ── Gallery ──────────────────────────────────────────────────

export const getStoredGallery = async (): Promise<GalleryImage[]> => {
  try {
    const stored = await kvGet<GalleryImage[]>(GALLERY_KEY);
    if (Array.isArray(stored)) return stored;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_GALLERY_IMAGES;
};

export const setStoredGallery = async (items: GalleryImage[]) => {
  try {
    await kvSet(GALLERY_KEY, items);
  } catch {
    // KV not available — saves will not persist on server
  }
};

// ── Content ──────────────────────────────────────────────────

export const getStoredContent = async (): Promise<ContentOverrides> => {
  try {
    const stored = await kvGet<ContentOverrides>(CONTENT_KEY);
    if (typeof stored === "object" && stored !== null) return stored;
  } catch {
    // fall through to empty
  }
  return {};
};

export const setStoredContent = async (content: ContentOverrides) => {
  try {
    await kvSet(CONTENT_KEY, content);
  } catch {
    // KV not available
  }
};
