import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function slugifyFrench(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing whitespace
  str = str.toLowerCase();

  // Handle accents and specific French characters using normalize
  // "NFD" (Normalization Form D) decomposes letters into base letter + accent
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace specific non-ASCII characters that normalize might miss, like œ/Œ
  // For simplicity, we stick to common practices, the above handles most

  // Remove invalid characters, replace spaces/hyphens with a single hyphen
  str = str.replace(/[^a-z0-9 -]/g, '') // Remove all non-alphanumeric, non-space, non-hyphen chars
    .replace(/\s+/g, '-')      // Collapse whitespace and replace by hyphen
    .replace(/-+/g, '-');      // Collapse multiple hyphens

  return str;
}