import fs from "fs/promises";
import path from "path";
import type { ContentOverrides, GalleryImage } from "@/lib/types";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/content-store";

const STORAGE_DIR = path.join(process.cwd(), "storage");
const GALLERY_FILE = path.join(STORAGE_DIR, "gallery.json");
const CONTENT_FILE = path.join(STORAGE_DIR, "site-content.json");

const ensureStorageDir = async () => {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
};

const readJsonFile = async <T>(filePath: string): Promise<T | null> => {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeJsonFile = async (filePath: string, value: unknown) => {
  await ensureStorageDir();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
};

export const getStoredGallery = async (): Promise<GalleryImage[]> => {
  const stored = await readJsonFile<unknown>(GALLERY_FILE);
  if (Array.isArray(stored)) {
    return stored as GalleryImage[];
  }
  return DEFAULT_GALLERY_IMAGES;
};

export const setStoredGallery = async (items: GalleryImage[]) => {
  await writeJsonFile(GALLERY_FILE, items);
};

export const getStoredContent = async (): Promise<ContentOverrides> => {
  const stored = await readJsonFile<unknown>(CONTENT_FILE);
  if (typeof stored === "object" && stored !== null) {
    return stored as ContentOverrides;
  }
  return {};
};

export const setStoredContent = async (content: ContentOverrides) => {
  await writeJsonFile(CONTENT_FILE, content);
};
