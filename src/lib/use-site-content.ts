"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchOverrides = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load content overrides");
        }
        const overrides = await response.json();

        setContent({
          schoolInfo: {
            ...defaults.schoolInfo,
            ...(overrides.schoolInfo ?? {}),
          },
          schoolHero: {
            ...defaults.schoolHero,
            ...(overrides.schoolHero ?? {}),
          },
          schoolHistory: overrides.schoolHistory ?? defaults.schoolHistory,
          schoolVision: overrides.schoolVision ?? defaults.schoolVision,
          schoolMission: overrides.schoolMission ?? defaults.schoolMission,
        });
        return;
      } catch {
        const overrides: ContentOverrides = loadSiteContent();

        setContent({
          schoolInfo: {
            ...defaults.schoolInfo,
            ...(overrides.schoolInfo ?? {}),
          },
          schoolHero: {
            ...defaults.schoolHero,
            ...(overrides.schoolHero ?? {}),
          },
          schoolHistory: overrides.schoolHistory ?? defaults.schoolHistory,
          schoolVision: overrides.schoolVision ?? defaults.schoolVision,
          schoolMission: overrides.schoolMission ?? defaults.schoolMission,
        });
      }
    };

    fetchOverrides();
  }, [defaults]);

  return content;
}
