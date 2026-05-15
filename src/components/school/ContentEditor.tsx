"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Upload, Save, RefreshCcw } from "lucide-react";
import {
  exportSiteContentJson,
  importSiteContentJson,
  loadSiteContent,
} from "@/lib/content-store";
import {
  schoolHero as defaultSchoolHero,
  schoolInfo as defaultSchoolInfo,
  schoolHistory as defaultSchoolHistory,
  schoolMission as defaultSchoolMission,
  schoolVision as defaultSchoolVision,
} from "@/data/school";
import type { ContentOverrides, HeroContent, SchoolInfo } from "@/lib/types";

interface EditorContent {
  schoolInfo: SchoolInfo;
  schoolHero: HeroContent;
  schoolHistory: string;
  schoolVision: string;
  schoolMission: string;
}

type ContentTab = "schoolInfo" | "hero" | "about";

export default function ContentEditor() {
  const [content, setContent] = useState<EditorContent>({
    schoolInfo: defaultSchoolInfo,
    schoolHero: defaultSchoolHero,
    schoolHistory: defaultSchoolHistory,
    schoolVision: defaultSchoolVision,
    schoolMission: defaultSchoolMission,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "dirty" | "saving" | "saved" | "error">("idle");
  const [activeTab, setActiveTab] = useState<ContentTab>("schoolInfo");
  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load content");
        }
        const overrides = await response.json();
        setContent({
          schoolInfo: { ...defaultSchoolInfo, ...(overrides.schoolInfo ?? {}) },
          schoolHero: { ...defaultSchoolHero, ...(overrides.schoolHero ?? {}) },
          schoolHistory: overrides.schoolHistory ?? defaultSchoolHistory,
          schoolVision: overrides.schoolVision ?? defaultSchoolVision,
          schoolMission: overrides.schoolMission ?? defaultSchoolMission,
        });
        setSaveStatus("idle");
        return;
      } catch {
        const overrides = loadSiteContent();
        setContent({
          schoolInfo: { ...defaultSchoolInfo, ...(overrides.schoolInfo ?? {}) },
          schoolHero: { ...defaultSchoolHero, ...(overrides.schoolHero ?? {}) },
          schoolHistory: overrides.schoolHistory ?? defaultSchoolHistory,
          schoolVision: overrides.schoolVision ?? defaultSchoolVision,
          schoolMission: overrides.schoolMission ?? defaultSchoolMission,
        });
        setSaveStatus("idle");
      }
    };

    fetchContent();
  }, []);

  const overridesForSave = useMemo<ContentOverrides>(() => {
    return {
      schoolInfo: content.schoolInfo,
      schoolHero: content.schoolHero,
      schoolHistory: content.schoolHistory,
      schoolVision: content.schoolVision,
      schoolMission: content.schoolMission,
    };
  }, [content]);

  const saveChanges = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(overridesForSave),
      });

      if (!response.ok) {
        throw new Error("Unable to save content to server.");
      }

      setMessage("Website content changes saved to the server.");
      setSaveStatus("saved");
    } catch {
      setMessage("Unable to save content to the server. Please try again.");
      setSaveStatus("error");
    } finally {
      setTimeout(() => setMessage(null), 3200);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const imported = importSiteContentJson(parsed);
      setContent({
        schoolInfo: { ...defaultSchoolInfo, ...(imported.schoolInfo ?? {}) },
        schoolHero: { ...defaultSchoolHero, ...(imported.schoolHero ?? {}) },
        schoolHistory: imported.schoolHistory ?? defaultSchoolHistory,
        schoolVision: imported.schoolVision ?? defaultSchoolVision,
        schoolMission: imported.schoolMission ?? defaultSchoolMission,
      });
      setMessage("Content overrides imported successfully.");
      setSaveStatus("dirty");
      setTimeout(() => setMessage(null), 3200);
    } catch (error) {
      setImportError(
        "Unable to import JSON file. Please provide valid content JSON.",
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all editable content to the default values?")) {
      return;
    }

    setContent({
      schoolInfo: defaultSchoolInfo,
      schoolHero: defaultSchoolHero,
      schoolHistory: defaultSchoolHistory,
      schoolVision: defaultSchoolVision,
      schoolMission: defaultSchoolMission,
    });

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Unable to reset content on server.");
      }

      setMessage("Content overrides cleared and defaults restored on the server.");
      setSaveStatus("saved");
    } catch {
      setMessage("Unable to reset content on the server. Please try again.");
      setSaveStatus("error");
    } finally {
      setTimeout(() => setMessage(null), 3200);
    }
  };

  const updateSchoolInfo = (field: keyof SchoolInfo, value: string) => {
    setContent((current) => ({
      ...current,
      schoolInfo: {
        ...current.schoolInfo,
        [field]: field === "established" ? Number(value) : value,
      },
    }));
    setSaveStatus("dirty");
  };

  const updateHeroField = (field: keyof HeroContent, value: string) => {
    setContent((current) => ({
      ...current,
      schoolHero: { ...current.schoolHero, [field]: value },
    }));
    setSaveStatus("dirty");
  };

  const updateHeroCta = (
    key: "ctaPrimary" | "ctaSecondary",
    field: "label" | "href",
    value: string,
  ) => {
    setContent((current) => ({
      ...current,
      schoolHero: {
        ...current.schoolHero,
        [key]: {
          ...current.schoolHero[key],
          [field]: value,
        },
      },
    }));
    setSaveStatus("dirty");
  };

  const updateAboutField = (
    field: "schoolHistory" | "schoolVision" | "schoolMission",
    value: string,
  ) => {
    setContent((current) => ({ ...current, [field]: value }));
    setSaveStatus("dirty");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-tag bg-[var(--school-primary)]/10 text-[var(--school-primary)]">
              Content Editor
            </div>
            <h2 className="font-amiri text-3xl font-bold text-[var(--school-primary)] mt-4">
              Edit site copy and contact details without redeploying.
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--school-text-muted)] leading-relaxed">
              Change school information, hero text, about section content, and
              save overrides directly to the server.
            </p>
            <p className="mt-4 text-sm text-slate-500">
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
              onClick={saveChanges}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--school-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--school-primary)]/10 hover:bg-[var(--school-primary)]/90 transition"
            >
              <Save size={16} /> Save Content
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
          onClick={() => exportSiteContentJson(overridesForSave)}
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
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "schoolInfo", label: "School Info" },
              { id: "hero", label: "Hero Content" },
              { id: "about", label: "About & Values" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-[var(--school-primary)] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6">
          {activeTab === "schoolInfo" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>School Name</span>
                <input
                  type="text"
                  value={content.schoolInfo.fullName}
                  onChange={(event) =>
                    updateSchoolInfo("fullName", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Short Name</span>
                <input
                  type="text"
                  value={content.schoolInfo.shortName}
                  onChange={(event) =>
                    updateSchoolInfo("shortName", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Motto</span>
                <input
                  type="text"
                  value={content.schoolInfo.motto}
                  onChange={(event) =>
                    updateSchoolInfo("motto", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Phone</span>
                <input
                  type="text"
                  value={content.schoolInfo.phone}
                  onChange={(event) =>
                    updateSchoolInfo("phone", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Email</span>
                <input
                  type="email"
                  value={content.schoolInfo.email}
                  onChange={(event) =>
                    updateSchoolInfo("email", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Address</span>
                <input
                  type="text"
                  value={content.schoolInfo.address}
                  onChange={(event) =>
                    updateSchoolInfo("address", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Google Maps URL</span>
                <input
                  type="text"
                  value={content.schoolInfo.googleMapsUrl}
                  onChange={(event) =>
                    updateSchoolInfo("googleMapsUrl", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Working Hours</span>
                <input
                  type="text"
                  value={content.schoolInfo.workingHours}
                  onChange={(event) =>
                    updateSchoolInfo("workingHours", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Facebook URL</span>
                <input
                  type="text"
                  value={content.schoolInfo.facebook ?? ""}
                  onChange={(event) =>
                    updateSchoolInfo("facebook", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Logo URL</span>
                <input
                  type="text"
                  value={content.schoolInfo.logoUrl ?? ""}
                  onChange={(event) =>
                    updateSchoolInfo("logoUrl", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
            </div>
          ) : activeTab === "hero" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Headline</span>
                <input
                  type="text"
                  value={content.schoolHero.headline}
                  onChange={(event) =>
                    updateHeroField("headline", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Subheadline</span>
                <textarea
                  rows={3}
                  value={content.schoolHero.subheadline}
                  onChange={(event) =>
                    updateHeroField("subheadline", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Primary Button Label</span>
                <input
                  type="text"
                  value={content.schoolHero.ctaPrimary.label}
                  onChange={(event) =>
                    updateHeroCta("ctaPrimary", "label", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Primary Button Link</span>
                <input
                  type="text"
                  value={content.schoolHero.ctaPrimary.href}
                  onChange={(event) =>
                    updateHeroCta("ctaPrimary", "href", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Secondary Button Label</span>
                <input
                  type="text"
                  value={content.schoolHero.ctaSecondary.label}
                  onChange={(event) =>
                    updateHeroCta("ctaSecondary", "label", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Secondary Button Link</span>
                <input
                  type="text"
                  value={content.schoolHero.ctaSecondary.href}
                  onChange={(event) =>
                    updateHeroCta("ctaSecondary", "href", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
                <span>Badge Text</span>
                <input
                  type="text"
                  value={content.schoolHero.badge ?? ""}
                  onChange={(event) =>
                    updateHeroField("badge", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
            </div>
          ) : (
            <div className="grid gap-4">
              <label className="space-y-2 text-sm text-slate-700">
                <span>School History</span>
                <textarea
                  rows={6}
                  value={content.schoolHistory}
                  onChange={(event) =>
                    updateAboutField("schoolHistory", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>School Vision</span>
                <textarea
                  rows={4}
                  value={content.schoolVision}
                  onChange={(event) =>
                    updateAboutField("schoolVision", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>School Mission</span>
                <textarea
                  rows={4}
                  value={content.schoolMission}
                  onChange={(event) =>
                    updateAboutField("schoolMission", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
        <p className="text-sm leading-relaxed">
          Content overrides are stored in browser local storage. This editor
          updates the site copy locally, so changes appear in pages that use the
          stored overrides.
        </p>
      </div>
    </div>
  );
}
