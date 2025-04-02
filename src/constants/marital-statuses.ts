export const MARITAL_STATUSES = [
  "single",
  "married",
  "annulled",
  "widowed",
  "separated",
  "legally_separated",
] as const;
export type MaritalStatusType = (typeof MARITAL_STATUSES)[number];
