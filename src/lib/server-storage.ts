import { kv } from "@vercel/kv";
import type { ContentOverrides, GalleryImage } from "@/lib/types";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/content-store";

const GALLERY_KEY = "dgh:gallery";
const CONTENT_KEY = "dgh:content";

export const getStoredGallery = async (): Promise<GalleryImage[]> => {
  try {
    const stored = await kv.get<GalleryImage[]>(GALLERY_KEY);
    if (Array.isArray(stored)) return stored;
  } catch {
    // KV not available locally — fall back to defaults
  }
  return DEFAULT_GALLERY_IMAGES;
};

export const setStoredGallery = async (items: GalleryImage[]) => {
  await kv.set(GALLERY_KEY, items);
};

export const getStoredContent = async (): Promise<ContentOverrides> => {
  try {
    const stored = await kv.get<ContentOverrides>(CONTENT_KEY);
    if (typeof stored === "object" && stored !== null) return stored;
  } catch {
    // KV not available locally — return empty overrides
  }
  return {};
};

export const setStoredContent = async (content: ContentOverrides) => {
  await kv.set(CONTENT_KEY, content);
};
