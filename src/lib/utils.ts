import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @returns a random rfc4122 version 4 UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Converts a file to a Buffer.
 *
 * @param file the file to convert to a Buffer
 * @returns a Buffer containing the contents of the file
 */
export const fileToBuffer = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export function bufferToBlob(buffer: Buffer<ArrayBufferLike>): Blob {
  const buff = Buffer.from(buffer);
  return new Blob([buff], { type: "application/octet-stream" });
}

export async function streamToBuffer(
  stream: ReadableStream<Uint8Array>,
): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export const coerceDateOptional = () =>
  z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) return date;
      }
      return undefined;
    }, z.date())
    .optional();

export const coerceDateRequired = () =>
  z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date());

export const coerceDateNullish = () =>
  z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) return date;
      }
      return undefined;
    }, z.date())
    .nullish();
