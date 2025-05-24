export const DOCUMENT_TYPE = [
  "marriage_certificate",
  "baptismal_certificate",
  "legal_registration",
  "government_permit",
  "tax_document"
] as const;

export const DOCUMENT_ORIGIN = [
  "issued_by_church",
  "issued_to_church",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[number];
export type DocumentOrigin = (typeof DOCUMENT_ORIGIN)[number];

export const documentTypeLabels: Record<DocumentType, string> = {
  marriage_certificate: "Marriage Certificate",
  baptismal_certificate: "Baptismal Certificate",
  legal_registration: "Legal Registration",
  government_permit: "Government Permit",
  tax_document: "Tax Document",
};

export const documentOriginLabels: Record<DocumentOrigin, string> = {
  issued_by_church: "Issued by Church",
  issued_to_church: "Issued to Church",
};
