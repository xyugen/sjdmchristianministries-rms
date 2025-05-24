export const DOCUMENT_TYPE_BY_CHURCH = [
  "marriage_certificate",
  "baptismal_certificate",
] as const;

export const DOCUMENT_TYPE_TO_CHURCH = [
  "legal_registration",
  "government_permit",
  "tax_document"
] as const;

export const DOCUMENT_TYPE = [
  ...DOCUMENT_TYPE_BY_CHURCH,
  ...DOCUMENT_TYPE_TO_CHURCH
] as const;

export const DOCUMENT_ORIGIN = [
  "issued_by_church",
  "issued_to_church",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[number];
export type DocumentOrigin = (typeof DOCUMENT_ORIGIN)[number];
export type DocumentTypeByChurch = (typeof DOCUMENT_TYPE_BY_CHURCH)[number];
export type DocumentTypeToChurch = (typeof DOCUMENT_TYPE_TO_CHURCH)[number];

export const documentTypeByChurchLabels: Record<DocumentTypeByChurch, string> = {
  marriage_certificate: "Marriage Certificate",
  baptismal_certificate: "Baptismal Certificate",
}

export const documentTypeToChurchLabels: Record<DocumentTypeToChurch, string> = {
  legal_registration: "Legal Registration",
  government_permit: "Government Permit",
  tax_document: "Tax Document",
}

export const documentTypeLabels: Record<DocumentType, string> = {
  ...documentTypeByChurchLabels,
  ...documentTypeToChurchLabels
};

export const documentOriginLabels: Record<DocumentOrigin, string> = {
  issued_by_church: "Issued by Church",
  issued_to_church: "Issued to Church",
};
