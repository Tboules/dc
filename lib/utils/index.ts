import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { uuidv4Regex } from "./regex";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pullUuidFromUrl(url: string) {
  const match = url.match(uuidv4Regex);

  if (match) {
    return match[0];
  }
}
