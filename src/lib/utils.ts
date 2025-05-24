import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 
 * @returns a random rfc4122 version 4 UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}


export const coerceDateOptional = () =>
  z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date()).optional();

export const coerceDateRequired = () =>
  z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date());