// Core types used across the application

export type ToolCategory =
  | "internet"
  | "file"
  | "converters"
  | "calculators";

export type IconName =
  | "download"
  | "upload"
  | "bandwidth"
  | "speed"
  | "transfer"
  | "filesize"
  | "image"
  | "resize"
  | "convert"
  | "aspect"
  | "search"
  | "menu"
  | "close"
  | "arrow-right"
  | "check"
  | "info"
  | "alert"
  | "lock"
  | "zap"
  | "globe"
  | "shield"
  | "mobile"
  | "clock"
  | "calculator"
  | "image-jpg"
  | "image-png";

export interface ToolMeta {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  shortDescription: string;
  icon: IconName;
  keywords: string[];
  relatedTools: string[]; // slugs
  seoTitle: string;
  seoDescription: string;
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  /** When true, indicates tool processes data entirely in the browser. */
  clientSide?: boolean;
  /** For programmatic SEO clusters (e.g. download time variants). */
  parametric?: boolean;
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  slug: string;
}
