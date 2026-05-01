export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge?: string;
}

export interface ContentOverrides {
  schoolInfo?: Partial<SchoolInfo>;
  schoolHero?: Partial<HeroContent>;
  schoolHistory?: string;
  schoolVision?: string;
  schoolMission?: string;
}

export interface SchoolInfo {
  fullName: string;
  shortName: string;
  motto: string;
  established: number;
  type: string;
  ownership: string;
  address: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
  workingHours: string;
  colors: string[];
  logoUrl?: string;
  facebook?: string;
}

export interface StaffMember {
  name: string;
  position: string;
  message?: string;
  imageUrl?: string;
}

export interface Program {
  title: string;
  description: string;
  icon: string;
  levels?: string[];
}

export interface Facility {
  name: string;
  icon: string;
}

export interface AdmissionRequirement {
  item: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  title: string;
  description: string;
  tag: string;
  date: string;
}

// Future LMS-ready types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  thumbnail?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  category: "school" | "madrasa" | "both";
}

export type ApplicationStatus = "New" | "In Review" | "Accepted" | "Rejected";

export interface AdmissionApplication {
  id: string;
  section: "school" | "madrasa";
  guardianName: string;
  phone: string;
  email?: string;
  childName: string;
  childDob?: string;
  childAge?: string;
  gender?: string;
  classApplying?: string;
  quranLevel?: string;
  previousSchool?: string;
  additionalInfo?: string;
  additionalNotes?: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface EnquiryForm {
  parentName: string;
  phone: string;
  email?: string;
  childName: string;
  childAge: string;
  classInterested: string;
  message?: string;
  section: "school" | "madrasa";
}
