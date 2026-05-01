import type { AdmissionApplication, ApplicationStatus } from "@/lib/types";

const STORAGE_KEY = "dghacademy_admissions";

export const APPLICATION_STATUSES = [
  "New",
  "In Review",
  "Accepted",
  "Rejected",
] as const;

export const applicationStatusClass = (status: ApplicationStatus) => {
  switch (status) {
    case "Accepted":
      return "bg-emerald-500/10 text-emerald-500";
    case "Rejected":
      return "bg-rose-500/10 text-rose-500";
    case "In Review":
      return "bg-amber-500/10 text-amber-500";
    default:
      return "bg-slate-500/10 text-slate-500";
  }
};

const safeParse = (value: string | null): AdmissionApplication[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is AdmissionApplication => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as any).id === "string" &&
        typeof (item as any).section === "string" &&
        typeof (item as any).guardianName === "string" &&
        typeof (item as any).phone === "string" &&
        typeof (item as any).childName === "string" &&
        typeof (item as any).status === "string" &&
        typeof (item as any).submittedAt === "string"
      );
    });
  } catch {
    return [];
  }
};

const getStorage = (): AdmissionApplication[] => {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

const setStorage = (items: AdmissionApplication[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const loadApplications = (): AdmissionApplication[] => {
  return getStorage();
};

export const saveApplication = (
  application: Omit<AdmissionApplication, "id" | "status" | "submittedAt">,
): AdmissionApplication => {
  const current = getStorage();
  const newApplication: AdmissionApplication = {
    ...application,
    id: createId(),
    status: "New",
    submittedAt: new Date().toISOString(),
  };
  const next = [newApplication, ...current];
  setStorage(next);
  return newApplication;
};

export const updateApplicationStatus = (
  id: string,
  status: ApplicationStatus,
): AdmissionApplication[] => {
  const items = getStorage();
  const next = items.map((item) =>
    item.id === id ? { ...item, status } : item,
  );
  setStorage(next);
  return next;
};

export const deleteApplication = (id: string): AdmissionApplication[] => {
  const items = getStorage();
  const next = items.filter((item) => item.id !== id);
  setStorage(next);
  return next;
};

export const exportApplicationsCsv = (applications: AdmissionApplication[]) => {
  const header = [
    "ID",
    "Section",
    "Status",
    "Submitted At",
    "Guardian Name",
    "Phone",
    "Email",
    "Child Name",
    "Child DOB",
    "Child Age",
    "Gender",
    "Class Applying",
    "Quran Level",
    "Previous School",
    "Additional Info",
    "Additional Notes",
  ];

  const rows = applications.map((item) => [
    item.id,
    item.section,
    item.status,
    item.submittedAt,
    item.guardianName,
    item.phone,
    item.email || "",
    item.childName,
    item.childDob || "",
    item.childAge || "",
    item.gender || "",
    item.classApplying || "",
    item.quranLevel || "",
    item.previousSchool || "",
    item.additionalInfo || "",
    item.additionalNotes || "",
  ]);

  const csvContent = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dghia-applications-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const importApplicationsJson = (
  payload: unknown,
): AdmissionApplication[] => {
  if (!Array.isArray(payload)) return getStorage();

  const existing = getStorage();
  const imported = payload.filter(
    (item): item is AdmissionApplication =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as any).id === "string" &&
      typeof (item as any).section === "string" &&
      typeof (item as any).guardianName === "string" &&
      typeof (item as any).phone === "string" &&
      typeof (item as any).childName === "string" &&
      typeof (item as any).status === "string" &&
      typeof (item as any).submittedAt === "string",
  );

  const merged = [...imported, ...existing].filter(
    (item, index, array) =>
      array.findIndex((match) => match.id === item.id) === index,
  );
  setStorage(merged);
  return merged;
};
