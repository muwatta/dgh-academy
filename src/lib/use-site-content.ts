"use client";
import { useEffect, useState, useRef } from "react";
import type { SchoolInfo, HeroContent, ContentOverrides } from "@/lib/types";
import { loadSiteContent } from "@/lib/content-store";

export interface SiteContentDefaults {
  schoolInfo: SchoolInfo;
  schoolHero: HeroContent;
  schoolHistory: string;
  schoolVision: string;
  schoolMission: string;
}

export function useSiteContent(defaults: SiteContentDefaults) {
  const [content, setContent] = useState(defaults);
  // Use a ref so defaults don't cause infinite refetching
  const defaultsRef = useRef(defaults);

  useEffect(() => {
    const d = defaultsRef.current;
    const fetchOverrides = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed");
        const overrides: ContentOverrides = await response.json();

        // Only update if there are actual overrides saved
        const hasOverrides = Object.keys(overrides).length > 0;
        if (!hasOverrides) return;

        setContent({
          schoolInfo: { ...d.schoolInfo, ...(overrides.schoolInfo ?? {}) },
          schoolHero: { ...d.schoolHero, ...(overrides.schoolHero ?? {}) },
          schoolHistory: overrides.schoolHistory ?? d.schoolHistory,
          schoolVision: overrides.schoolVision ?? d.schoolVision,
          schoolMission: overrides.schoolMission ?? d.schoolMission,
        });
      } catch {
        // Fallback to localStorage
        const overrides: ContentOverrides = loadSiteContent();
        const hasOverrides = Object.keys(overrides).length > 0;
        if (!hasOverrides) return;

        setContent({
          schoolInfo: { ...d.schoolInfo, ...(overrides.schoolInfo ?? {}) },
          schoolHero: { ...d.schoolHero, ...(overrides.schoolHero ?? {}) },
          schoolHistory: overrides.schoolHistory ?? d.schoolHistory,
          schoolVision: overrides.schoolVision ?? d.schoolVision,
          schoolMission: overrides.schoolMission ?? d.schoolMission,
        });
      }
    };

    fetchOverrides();
  }, []); 

  return content;
}
