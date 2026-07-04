import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const PUBLICATIONS_DIR = path.join(CONTENT_DIR, "publications");

export type ProjectStatus = "prod" | "experimental" | "archived";

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  role: string;
  stack: string[];
  status: ProjectStatus;
  tags: string[];
  heroImage: string;
  heroImageAlt: string;
  thesis: string;
  excerpt: string;
  featured: boolean;
}

export interface Project extends ProjectMeta {
  body: string;
}

export type PublicationType = "preprint" | "workshop" | "journal" | "conference";

export interface Publication {
  slug: string;
  title: string;
  venue: string;
  type: PublicationType;
  date: string;
  doi: string;
  arxivId: string;
  links: { paper?: string; code?: string };
  body: string;
}

export interface ResumeData {
  name: string;
  role: string;
  photo: string;
  bio: string;
  experience: {
    role: string;
    company: string;
    start: string;
    end: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    thesis?: string;
  }[];
  stack: Record<string, string[]>;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    cvFile: string;
  };
}

/** El slug es el nombre de archivo sin extensión ni prefijo de fecha YYYY-MM-. */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-/, "");
}

function readProjectFile(filename: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: slugFromFilename(filename),
    title: data.title ?? "",
    date: data.date ?? "",
    role: data.role ?? "",
    stack: data.stack ?? [],
    status: (data.status ?? "experimental") as ProjectStatus,
    tags: data.tags ?? [],
    heroImage: data.heroImage ?? "",
    heroImageAlt: data.heroImageAlt ?? data.title ?? "",
    thesis: data.thesis ?? "",
    excerpt: data.excerpt ?? "",
    featured: Boolean(data.featured),
    body: content,
  };
}

function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return b.date.localeCompare(a.date);
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readProjectFile)
    .sort(byDateDesc);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllProjectTags(): string[] {
  const tags = new Set<string>();
  for (const p of getAllProjects()) for (const t of p.tags) tags.add(t);
  return Array.from(tags).sort();
}

export function getAllPublications(): Publication[] {
  return fs
    .readdirSync(PUBLICATIONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(PUBLICATIONS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        venue: data.venue ?? "",
        type: (data.type ?? "preprint") as PublicationType,
        date: data.date ?? "",
        doi: data.doi ?? "",
        arxivId: data.arxivId ?? "",
        links: data.links ?? {},
        body: content,
      };
    })
    .sort(byDateDesc);
}

export function getResume(): ResumeData {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "resume.yaml"), "utf8");
  return yaml.load(raw) as ResumeData;
}
