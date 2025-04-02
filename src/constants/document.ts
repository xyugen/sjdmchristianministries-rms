export const DOCUMENT_TYPE = [
  "marriage_certificate",
  "baptismal_certificate",
] as const;

export const DOCUMENT_ORIGIN = [
  "issued_by_church",
  "issued_to_church",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[number];
export type DocumentOrigin = (typeof DOCUMENT_ORIGIN)[number];
