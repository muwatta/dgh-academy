import type {
  GalleryImage,
  SchoolInfo,
  HeroContent,
  ContentOverrides,
} from "@/lib/types";

const STORAGE_KEY = "dghacademy_gallery";
const CONTENT_STORAGE_KEY = "dghacademy_content";

export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "/images/madrasa-overview.jpg",
    alt: "Overview of madrasa students",
    caption: "Daily Assembly",
    title: "School Community",
    description:
      "Pupils gather together for morning assembly, Quran recitation and school announcements.",
    tag: "Community",
    date: "February 2026",
  },
  {
    id: 2,
    src: "/images/coding-session.jpg",
    alt: "Students coding with Pictoblox",
    caption: "Coding Session",
    title: "ICT Class",
    description:
      "A creative technology lesson where pupils build projects and solve problems.",
    tag: "STEM",
    date: "March 2026",
  },
  {
    id: 3,
    src: "/images/pupil-standing.jpg",
    alt: "Female pupil standing with confidence",
    caption: "Inspired Learner",
    title: "Student Confidence",
    description:
      "Young learners gain confidence through speaking, reading and leadership opportunities.",
    tag: "Character",
    date: "Feb 2026",
  },
  {
    id: 4,
    src: "/images/pupil-staircase.jpg",
    alt: "Female pupil on the staircase",
    caption: "School Welcome",
    title: "School Arrival",
    description:
      "Pupils arrive happily at school, ready to begin the day with purpose and energy.",
    tag: "Welcome",
    date: "Feb 2026",
  },
  {
    id: 5,
    src: "/images/pupils-walkway.jpg",
    alt: "Pupils smiling on the walkway",
    caption: "Happy Walkway",
    title: "School Life",
    description:
      "Students enjoy friendly moments while moving between lessons and activities.",
    tag: "Life",
    date: "Feb 2026",
  },
  {
    id: 6,
    src: "/images/game-session.jpg",
    alt: "Pupils playing during a game session",
    caption: "Playtime",
    title: "Recess & Teamwork",
    description:
      "Recess activities help students grow physically and socially in a caring setting.",
    tag: "Wellbeing",
    date: "Feb 2026",
  },
  {
    id: 7,
    src: "/images/toddlers-swing.jpg",
    alt: "Toddlers playing with a swing",
    caption: "Early Play",
    title: "Foundation Play",
    description:
      "Young learners enjoy playful movement that builds coordination and confidence.",
    tag: "Early Years",
    date: "March 2026",
  },
  {
    id: 8,
    src: "/images/toddlers-class.jpg",
    alt: "Toddlers learning in their class",
    caption: "Tiny Classrooms",
    title: "Early Learning",
    description:
      "Our early years programme supports young children with gentle, age-appropriate lessons.",
    tag: "Foundation",
    date: "March 2026",
  },
  {
    id: 9,
    src: "/images/staff-training.jpg",
    alt: "Staff training session",
    caption: "Teacher Growth",
    title: "Staff Development",
    description:
      "Our teachers strengthen their skills through regular professional development sessions.",
    tag: "Growth",
    date: "September 2026",
  },
  {
    id: 10,
    src: "/images/school-wall.jpg",
    alt: "School wall with the school name",
    caption: "School Identity",
    title: "School Entrance",
    description:
      "The school entrance proudly displays our academy name and commitment to excellence.",
    tag: "School",
    date: "February 2026",
  },
  {
    id: 11,
    src: "/images/playground_dgh.jpg",
    alt: "Outdoor school activity",
    caption: "Playground Fun",
    title: "Outdoor Recreation",
    description:
      "Our playground provides a safe place for children to play, learn and grow together.",
    tag: "Wellbeing",
    date: "March 2026",
  },
  {
    id: 12,
    src: "/images/logo_dgh.jpg",
    alt: "School logo",
    caption: "Our Emblem",
    title: "School Logo",
    description:
      "The DGHIA logo represents our vision of faith, learning and community service.",
    tag: "Identity",
    date: "January 2026",
  },
  {
    id: 13,
    src: "/images/library_dgh.jpg",
    alt: "School library",
    caption: "Library Corner",
    title: "Books & Research",
    description:
      "Students use our library space for reading, research and quiet study time.",
    tag: "Learning",
    date: "February 2026",
  },
  {
    id: 14,
    src: "/images/library-prep.jpg",
    alt: "Students preparing in the library",
    caption: "Study Prep",
    title: "Library Prep",
    description:
      "Learners take time in the library to prepare assignments, revise and reflect.",
    tag: "Study",
    date: "March 2026",
  },
  {
    id: 15,
    src: "/images/founder-dr-gambo.jpg",
    alt: "Founder portrait",
    caption: "Founder Tribute",
    title: "Our Founder",
    description: "The founder’s vision inspires everything we do at DGHIA.",
    tag: "Leadership",
    date: "January 2026",
  },
  {
    id: 16,
    src: "/images/formal-opening.jpg",
    alt: "Formal opening event",
    caption: "Opening Ceremony",
    title: "School Launch",
    description:
      "A special event marking the formal opening of our academy and celebration with families.",
    tag: "Community",
    date: "August 2026",
  },
  {
    id: 17,
    src: "/images/environment.jpg",
    alt: "School grounds",
    caption: "School Grounds",
    title: "Beautiful Grounds",
    description:
      "A peaceful school environment creates the right atmosphere for learning and growth.",
    tag: "School",
    date: "February 2026",
  },
  {
    id: 18,
    src: "/images/environment-2.jpg",
    alt: "Students learning outside",
    caption: "Outdoor School",
    title: "Outside Display",
    description:
      "Outside displays of the school’s vision and values inspire students and visitors alike.",
    tag: "Experience",
    date: "March 2026",
  },
  {
    id: 19,
    src: "/images/class1_dgh.jpg",
    alt: "Students learning in class",
    caption: "Classroom Focus",
    title: "Interactive Class",
    description:
      "Teachers guide pupils through engaging group activities and interactive lessons.",
    tag: "Learning",
    date: "March 2026",
  },
  {
    id: 20,
    src: "/images/uniform_dgh.jpg",
    alt: "Students in uniform",
    caption: "School Spirit",
    title: "Uniform Pride",
    description:
      "The academy uniform reflects our commitment to unity, discipline and pride.",
    tag: "Culture",
    date: "January 2026",
  },
];

const safeParse = (value: string | null): GalleryImage[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is GalleryImage => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as any).id === "number" &&
        typeof (item as any).src === "string" &&
        typeof (item as any).alt === "string" &&
        typeof (item as any).caption === "string" &&
        typeof (item as any).title === "string" &&
        typeof (item as any).description === "string" &&
        typeof (item as any).tag === "string" &&
        typeof (item as any).date === "string"
      );
    });
  } catch {
    return [];
  }
};

const safeParseContent = (value: string | null): ContentOverrides => {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};

    const content = parsed as Record<string, unknown>;
    const result: ContentOverrides = {};

    if (typeof content.schoolInfo === "object" && content.schoolInfo !== null) {
      result.schoolInfo = {};
      for (const key of [
        "fullName",
        "shortName",
        "motto",
        "established",
        "type",
        "ownership",
        "address",
        "phone",
        "email",
        "googleMapsUrl",
        "workingHours",
        "logoUrl",
        "facebook",
      ] as const) {
        const value = (content.schoolInfo as Record<string, unknown>)[key];
        if (
          typeof value === "string" ||
          (key === "established" && typeof value === "number")
        ) {
          (result.schoolInfo as Record<string, unknown>)[key] = value;
        }
      }
    }

    if (typeof content.schoolHero === "object" && content.schoolHero !== null) {
      result.schoolHero = {};
      const heroFields = ["headline", "subheadline", "badge"] as const;

      for (const key of heroFields) {
        const value = (content.schoolHero as Record<string, unknown>)[key];
        if (typeof value === "string") {
          (result.schoolHero as Record<string, unknown>)[key] = value;
        }
      }

      const primary = (content.schoolHero as Record<string, unknown>)
        .ctaPrimary;
      const secondary = (content.schoolHero as Record<string, unknown>)
        .ctaSecondary;
      if (typeof primary === "object" && primary !== null) {
        const label = (primary as Record<string, unknown>).label;
        const href = (primary as Record<string, unknown>).href;
        if (typeof label === "string" && typeof href === "string") {
          (result.schoolHero as Record<string, unknown>).ctaPrimary = {
            label,
            href,
          };
        }
      }
      if (typeof secondary === "object" && secondary !== null) {
        const label = (secondary as Record<string, unknown>).label;
        const href = (secondary as Record<string, unknown>).href;
        if (typeof label === "string" && typeof href === "string") {
          (result.schoolHero as Record<string, unknown>).ctaSecondary = {
            label,
            href,
          };
        }
      }
    }

    if (typeof content.schoolHistory === "string") {
      result.schoolHistory = content.schoolHistory;
    }
    if (typeof content.schoolVision === "string") {
      result.schoolVision = content.schoolVision;
    }
    if (typeof content.schoolMission === "string") {
      result.schoolMission = content.schoolMission;
    }

    return result;
  } catch {
    return {};
  }
};

const getStorage = (): GalleryImage[] => {
  if (typeof window === "undefined") return DEFAULT_GALLERY_IMAGES;
  const stored = safeParse(window.localStorage.getItem(STORAGE_KEY));
  return stored.length ? stored : DEFAULT_GALLERY_IMAGES;
};

const setStorage = (items: GalleryImage[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const createGalleryId = (): number => Date.now();

const getContentStorage = (): ContentOverrides => {
  if (typeof window === "undefined") return {};
  return safeParseContent(window.localStorage.getItem(CONTENT_STORAGE_KEY));
};

const setContentStorage = (content: ContentOverrides) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
};

export const loadSiteContent = (): ContentOverrides => getContentStorage();

export const saveSiteContent = (content: ContentOverrides) => {
  setContentStorage(content);
};

export const resetSiteContent = (): ContentOverrides => {
  const empty = {};
  setContentStorage(empty);
  return empty;
};

export const exportSiteContentJson = (content: ContentOverrides) => {
  if (typeof window === "undefined") return;

  const blob = new Blob([JSON.stringify(content, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dghia-content-overrides-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const importSiteContentJson = (payload: unknown): ContentOverrides => {
  const imported = safeParseContent(JSON.stringify(payload));
  setContentStorage(imported);
  return imported;
};

export const mergeSiteContent = <
  T extends {
    schoolInfo: SchoolInfo;
    schoolHero: HeroContent;
    schoolHistory: string;
    schoolVision: string;
    schoolMission: string;
  },
>(
  defaults: T,
): T => {
  const overrides = loadSiteContent();

  return {
    ...defaults,
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
  };
};

export const loadGalleryImages = (): GalleryImage[] => getStorage();

export const saveGalleryImages = (items: GalleryImage[]) => {
  setStorage(items);
};

export const resetGalleryImages = (): GalleryImage[] => {
  setStorage(DEFAULT_GALLERY_IMAGES);
  return DEFAULT_GALLERY_IMAGES;
};

export const exportGalleryJson = (items: GalleryImage[]) => {
  if (typeof window === "undefined") return;

  const blob = new Blob([JSON.stringify(items, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dghia-gallery-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const importGalleryJson = (payload: unknown): GalleryImage[] => {
  if (!Array.isArray(payload)) return getStorage();

  const imported = payload.filter((item): item is GalleryImage => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as any).id === "number" &&
      typeof (item as any).src === "string" &&
      typeof (item as any).alt === "string" &&
      typeof (item as any).caption === "string" &&
      typeof (item as any).title === "string" &&
      typeof (item as any).description === "string" &&
      typeof (item as any).tag === "string" &&
      typeof (item as any).date === "string"
    );
  });

  const unique = imported.filter(
    (item, index, array) =>
      array.findIndex((entry) => entry.id === item.id) === index,
  );

  setStorage(unique);
  return unique;
};

export const createNewGalleryItem = (): GalleryImage => ({
  id: createGalleryId(),
  src: "/images/logo_dgh.jpg",
  alt: "New gallery photo",
  caption: "New caption",
  title: "New title",
  description: "Description for the new gallery item.",
  tag: "New",
  date: new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }),
});
