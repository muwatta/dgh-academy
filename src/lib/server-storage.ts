import { Redis } from "@upstash/redis";
import type { ContentOverrides, GalleryImage } from "@/lib/types";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/content-store";

const GALLERY_KEY = "dgh:gallery";
const CONTENT_KEY = "dgh:content";

const hasRedis = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

function getRedis(): Redis | null {
  if (!hasRedis) return null;
  return Redis.fromEnv();
}

// ── Gallery ──────────────────────────────────────────────────

export const getStoredGallery = async (): Promise<GalleryImage[]> => {
  try {
    const redis = getRedis();
    if (!redis) return DEFAULT_GALLERY_IMAGES;
    const stored = await redis.get<GalleryImage[]>(GALLERY_KEY);
    if (Array.isArray(stored)) return stored;
  } catch {
    // fall through
  }
  return DEFAULT_GALLERY_IMAGES;
};

export const setStoredGallery = async (items: GalleryImage[]) => {
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.set(GALLERY_KEY, items);
  } catch {
    // silently fail locally
  }
};

// ── Content ──────────────────────────────────────────────────

export const getStoredContent = async (): Promise<ContentOverrides> => {
  try {
    const redis = getRedis();
    if (!redis) return {};
    const stored = await redis.get<ContentOverrides>(CONTENT_KEY);
    if (typeof stored === "object" && stored !== null) return stored;
  } catch {
    // fall through
  }
  return {};
};

export const setStoredContent = async (content: ContentOverrides) => {
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.set(CONTENT_KEY, content);
  } catch {
    // silently fail locally
  }
};
