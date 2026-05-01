"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Upload, Plus, Trash2, Save, RefreshCcw } from "lucide-react";
import {
  createNewGalleryItem,
  DEFAULT_GALLERY_IMAGES,
  exportGalleryJson,
  importGalleryJson,
  loadGalleryImages,
} from "@/lib/content-store";
import type { GalleryImage } from "@/lib/types";

export default function GalleryEditor() {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "dirty" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load gallery");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setGalleryItems(data as GalleryImage[]);
          setSaveStatus("idle");
          return;
        }
        throw new Error("Invalid gallery response");
      } catch {
        setGalleryItems(loadGalleryImages());
        setSaveStatus("idle");
      }
    };

    fetchGallery();
  }, []);

  const hasChanges = useMemo(() => galleryItems.length > 0, [galleryItems]);

  const updateField = (
    id: number,
    field: keyof Omit<GalleryImage, "id">,
    value: string,
  ) => {
    setGalleryItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
    setSaveStatus("dirty");
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryItems),
      });

      if (!response.ok) {
        throw new Error("Unable to save gallery to server.");
      }

      setMessage("Gallery changes saved to the server.");
      setSaveStatus("saved");
    } catch {
      setMessage("Unable to save gallery to the server. Please try again.");
      setSaveStatus("error");
    } finally {
      setTimeout(() => setMessage(null), 3200);
    }
  };

  const handleReload = async () => {
    if (!window.confirm("Reload gallery from the server and discard local unsaved changes?")) {
      return;
    }

    try {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load server gallery.");
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid gallery response");
      }
      setGalleryItems(data as GalleryImage[]);
      setSaveStatus("idle");
      setMessage("Gallery restored from the server.");
    } catch {
      setMessage("Unable to restore gallery from the server.");
      setSaveStatus("error");
    } finally {
      setTimeout(() => setMessage(null), 3200);
    }
  };

  const handleAdd = () => {
    setGalleryItems((items) => [...items, createNewGalleryItem()]);
    setMessage("New gallery item added. Save to persist changes globally.");
    setSaveStatus("dirty");
    setTimeout(() => setMessage(null), 3200);
  };

  const handleDelete = (id: number) => {
    setGalleryItems((items) => items.filter((item) => item.id !== id));
  };

  const handleExport = () => {
    exportGalleryJson(galleryItems);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const imported = importGalleryJson(parsed);
      setGalleryItems(imported);
      setMessage("Gallery imported successfully.");
      setSaveStatus("dirty");
      setTimeout(() => setMessage(null), 3200);
    } catch (error) {
      setImportError(
        "Unable to import JSON file. Please provide valid gallery JSON.",
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset gallery to the original default images?")) {
      return;
    }

    setGalleryItems(DEFAULT_GALLERY_IMAGES);
    setSaveStatus("saving");

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_GALLERY_IMAGES),
      });

      if (!response.ok) {
        throw new Error("Unable to reset gallery on server.");
      }

      setMessage("Gallery reset to default items on the server.");
      setSaveStatus("saved");
    } catch {
      setMessage("Unable to reset gallery on the server. Please try again.");
      setSaveStatus("error");
    } finally {
      setTimeout(() => setMessage(null), 3200);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-tag bg-[var(--school-primary)]/10 text-[var(--school-primary)]">
              Gallery Editor
            </div>
            <h2 className="font-amiri text-3xl font-bold text-[var(--school-primary)] mt-4">
              Edit gallery images without redeploying.
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--school-text-muted)] leading-relaxed">
              Save gallery changes to the server, import/export gallery JSON,
              or reset to defaults.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Gallery items: <span className="font-semibold text-[var(--school-primary)]">{galleryItems.length}</span>
            </p>
            <p className="mt-2 text-sm">
              Status: <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                saveStatus === "idle"
                  ? "bg-slate-100 text-slate-700"
                  : saveStatus === "dirty"
                  ? "bg-amber-100 text-amber-800"
                  : saveStatus === "saving"
                  ? "bg-blue-100 text-blue-800"
                  : saveStatus === "saved"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}> 
                {saveStatus === "idle"
                  ? "Saved"
                  : saveStatus === "dirty"
                  ? "Unsaved changes"
                  : saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "saved"
                  ? "Saved"
                  : "Save failed"}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--school-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--school-primary)]/10 hover:bg-[var(--school-primary)]/90 transition"
            >
              <Save size={16} /> Save Gallery
            </button>
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 transition"
            >
              <RefreshCcw size={16} /> Restore Server Version
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 transition"
            >
              <RefreshCcw size={16} /> Reset Defaults
            </button>
          </div>
        </div>

        {message ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
        {importError ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {importError}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          <Download size={16} /> Export JSON
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition">
          <Upload size={16} /> Import JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--school-primary)]/10 px-5 py-3 text-sm font-semibold text-[var(--school-primary)] hover:bg-[var(--school-primary)]/15 transition"
        >
          <Plus size={16} /> Add New Item
        </button>
      </div>

      <div className="grid gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-4 text-sm uppercase tracking-[0.24em] text-slate-500">
                  Gallery item #{item.id}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Image path</span>
                    <input
                      type="text"
                      value={item.src}
                      onChange={(event) =>
                        updateField(item.id, "src", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Alt text</span>
                    <input
                      type="text"
                      value={item.alt}
                      onChange={(event) =>
                        updateField(item.id, "alt", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Caption</span>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(event) =>
                        updateField(item.id, "caption", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Title</span>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        updateField(item.id, "title", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700 sm:col-span-2">
                    <span>Description</span>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(event) =>
                        updateField(item.id, "description", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Tag</span>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(event) =>
                        updateField(item.id, "tag", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Date</span>
                    <input
                      type="text"
                      value={item.date}
                      onChange={(event) =>
                        updateField(item.id, "date", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <img
                    src={item.src}
                    alt={item.alt || item.caption}
                    className="h-40 w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-500/15 transition"
                >
                  <Trash2 size={16} /> Remove item
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
        <p className="text-sm leading-relaxed">
          Changes are stored in your browser’s local storage. This editor does
          not deploy changes to the server, but it does allow you to preview and
          persist gallery updates locally.
        </p>
      </div>
    </div>
  );
}
