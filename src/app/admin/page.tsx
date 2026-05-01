"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Download,
  Upload,
  Search,
  Trash2,
  CheckCircle2,
  Star,
  FileText,
} from "lucide-react";
import {
  APPLICATION_STATUSES,
  applicationStatusClass,
  deleteApplication,
  exportApplicationsCsv,
  loadApplications,
  updateApplicationStatus,
  importApplicationsJson,
} from "@/lib/application-store";
import ContentEditor from "@/components/school/ContentEditor";
import GalleryEditor from "@/components/school/GalleryEditor";
import type { AdmissionApplication, ApplicationStatus } from "@/lib/types";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

const SECTION_LABELS: Record<string, string> = {
  school: "School",
  madrasa: "Madrasa",
};

const ADMIN_PAGE_TITLE = "Admissions Admin Dashboard";

export default function AdminPage() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [sectionFilter, setSectionFilter] = useState<
    "all" | "school" | "madrasa"
  >("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<
    "applications" | "gallery" | "content"
  >("applications");
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    setApplications(loadApplications());
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch === "" ||
        [
          application.guardianName,
          application.childName,
          application.phone,
          application.email || "",
          application.classApplying || "",
          application.quranLevel || "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesSection =
        sectionFilter === "all" || application.section === sectionFilter;
      const matchesStatus =
        statusFilter === "all" || application.status === statusFilter;

      return matchesSearch && matchesSection && matchesStatus;
    });
  }, [applications, searchTerm, sectionFilter, statusFilter]);

  const refreshApplications = () => setApplications(loadApplications());

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateApplicationStatus(id, status);
    refreshApplications();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) {
      return;
    }
    deleteApplication(id);
    refreshApplications();
  };

  const handleExport = () => {
    exportApplicationsCsv(
      filteredApplications.length ? filteredApplications : applications,
    );
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const imported = importApplicationsJson(parsed);
      setApplications(imported);
    } catch (error) {
      setImportError(
        "Unable to import JSON file. Please make sure it is valid.",
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleSignOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const summary = useMemo(() => {
    const total = applications.length;
    const bySection = {
      school: applications.filter((item) => item.section === "school").length,
      madrasa: applications.filter((item) => item.section === "madrasa").length,
    };
    const byStatus: Record<ApplicationStatus, number> = {
      New: 0,
      "In Review": 0,
      Accepted: 0,
      Rejected: 0,
    };

    applications.forEach((application) => {
      byStatus[application.status] += 1;
    });

    return { total, bySection, byStatus };
  }, [applications]);

  return (
    <AdminAuthGuard>
      <main className="bg-[var(--school-cream)] min-h-screen py-16">
        <div className="container">
          <div className="mb-12 rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="section-tag bg-[var(--school-primary)]/10 text-[var(--school-primary)]">
                  Admin
                </div>
                <h1 className="font-amiri text-4xl font-bold text-[var(--school-primary)] mt-4">
                  {ADMIN_PAGE_TITLE}
                </h1>
                <p className="mt-3 max-w-2xl text-[var(--school-text-muted)] leading-relaxed">
                  Manage school and madrasa applications directly from the
                  browser. Update statuses, export records, and keep the
                  admissions process moving without developer support.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--school-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--school-primary)]/10 hover:bg-[var(--school-primary)]/90 transition"
                >
                  <Download size={16} /> Export CSV
                </button>
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition">
                  <Upload size={16} />
                  Import JSON
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={handleImport}
                  />
                </label>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition sm:col-span-2 lg:col-span-1"
                >
                  Sign Out
                </button>
              </div>
            </div>
            {importError ? (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                {importError}
              </div>
            ) : null}
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveSection("applications")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeSection === "applications"
                  ? "bg-[var(--school-primary)] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Applications
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("gallery")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeSection === "gallery"
                  ? "bg-[var(--school-primary)] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Gallery Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("content")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeSection === "content"
                  ? "bg-[var(--school-primary)] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Content Editor
            </button>
          </div>

          {activeSection === "applications" ? (
            <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
              <section className="space-y-6 rounded-3xl bg-white p-8 shadow-xl">
                <div className="grid gap-4 lg:grid-cols-[1fr_0.45fr]">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Search
                        size={18}
                        className="text-[var(--school-primary)]"
                      />
                      <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search by name, phone, email or class"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      value={sectionFilter}
                      onChange={(event) =>
                        setSectionFilter(event.target.value as any)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    >
                      <option value="all">All Sections</option>
                      <option value="school">School</option>
                      <option value="madrasa">Madrasa</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        setStatusFilter(event.target.value as any)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[var(--school-primary)] focus:bg-white transition"
                    >
                      <option value="all">All Statuses</option>
                      {APPLICATION_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Total Applications
                    </div>
                    <div className="mt-4 text-3xl font-bold text-[var(--school-primary)]">
                      {summary.total}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      School
                    </div>
                    <div className="mt-4 text-3xl font-bold text-[var(--school-primary)]">
                      {summary.bySection.school}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Madrasa
                    </div>
                    <div className="mt-4 text-3xl font-bold text-[var(--school-primary)]">
                      {summary.bySection.madrasa}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      Most Recent
                    </div>
                    <div className="mt-4 text-3xl font-bold text-[var(--school-primary)]">
                      {applications[0]?.guardianName || "—"}
                    </div>
                  </div>
                </div>

                {filteredApplications.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
                    No applications match the current filters. Use export/import
                    to sync or add new submissions from the admissions pages.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <article
                        key={application.id}
                        className="rounded-3xl border border-slate-200 p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="rounded-full bg-[var(--school-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--school-primary)]">
                                {SECTION_LABELS[application.section]}
                              </span>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${applicationStatusClass(application.status)}`}
                              >
                                {application.status}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(
                                  application.submittedAt,
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                              <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                                  Guardian
                                </p>
                                <p className="font-semibold text-[var(--school-primary)]">
                                  {application.guardianName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                                  Child
                                </p>
                                <p className="font-semibold text-slate-700">
                                  {application.childName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                                  Contact
                                </p>
                                <p className="font-semibold text-slate-700">
                                  {application.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {APPLICATION_STATUSES.map((status) => (
                              <button
                                key={`${application.id}-${status}`}
                                type="button"
                                onClick={() =>
                                  handleStatusChange(application.id, status)
                                }
                                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                  application.status === status
                                    ? "border-[var(--school-primary)] bg-[var(--school-primary)]/10 text-[var(--school-primary)]"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          {application.email ? (
                            <div className="rounded-2xl bg-slate-50 p-4">
                              <p className="text-xs text-slate-500">Email</p>
                              <p className="font-medium text-slate-700">
                                {application.email}
                              </p>
                            </div>
                          ) : null}
                          {application.gender ? (
                            <div className="rounded-2xl bg-slate-50 p-4">
                              <p className="text-xs text-slate-500">Gender</p>
                              <p className="font-medium text-slate-700">
                                {application.gender}
                              </p>
                            </div>
                          ) : null}
                          {application.classApplying ? (
                            <div className="rounded-2xl bg-slate-50 p-4">
                              <p className="text-xs text-slate-500">
                                Class Applying
                              </p>
                              <p className="font-medium text-slate-700">
                                {application.classApplying}
                              </p>
                            </div>
                          ) : null}
                          {application.quranLevel ? (
                            <div className="rounded-2xl bg-slate-50 p-4">
                              <p className="text-xs text-slate-500">
                                Quran Level
                              </p>
                              <p className="font-medium text-slate-700">
                                {application.quranLevel}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                          {application.childDob ? (
                            <p>
                              <span className="font-semibold">
                                Date of Birth:
                              </span>{" "}
                              {application.childDob}
                            </p>
                          ) : null}
                          {application.childAge ? (
                            <p>
                              <span className="font-semibold">Child Age:</span>{" "}
                              {application.childAge}
                            </p>
                          ) : null}
                          {application.previousSchool ? (
                            <p>
                              <span className="font-semibold">
                                Previous School:
                              </span>{" "}
                              {application.previousSchool}
                            </p>
                          ) : null}
                          {application.additionalInfo ? (
                            <p>
                              <span className="font-semibold">
                                Additional Information:
                              </span>{" "}
                              {application.additionalInfo}
                            </p>
                          ) : null}
                          {application.additionalNotes ? (
                            <p>
                              <span className="font-semibold">
                                Additional Notes:
                              </span>{" "}
                              {application.additionalNotes}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleDelete(application.id)}
                            className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-500/15 transition"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                          {application.email ? (
                            <a
                              href={`mailto:${application.email}`}
                              className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)]/10 px-4 py-2 text-sm font-semibold text-[var(--school-primary)] hover:bg-[var(--school-primary)]/15 transition"
                            >
                              <CheckCircle2 size={16} /> Email Guardian
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 cursor-not-allowed"
                            >
                              <CheckCircle2 size={16} /> No Email
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-xl">
                <div className="rounded-3xl bg-[var(--school-primary)]/5 p-5">
                  <div className="flex items-center gap-3 text-[var(--school-primary)]">
                    <Star size={18} />
                    <h2 className="font-semibold">How to use this page</h2>
                  </div>
                  <div className="mt-4 text-sm leading-relaxed text-slate-700">
                    Use the filters to narrow the list. Click status buttons to
                    update application progress, then export CSV for sharing or
                    import JSON backups when switching devices.
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3 text-[var(--school-primary)]">
                    <FileText size={18} />
                    <div>
                      <p className="text-sm font-semibold">Application Count</p>
                      <p className="text-3xl font-bold text-[var(--school-primary)]">
                        {applications.length}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-slate-600">
                    {APPLICATION_STATUSES.map((status) => (
                      <div
                        key={status}
                        className="flex items-center justify-between rounded-2xl bg-white p-3"
                      >
                        <span>{status}</span>
                        <span className="font-semibold">
                          {summary.byStatus[status] ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          ) : activeSection === "gallery" ? (
            <GalleryEditor />
          ) : (
            <ContentEditor />
          )}
        </div>
      </main>
    </AdminAuthGuard>
  );
}
