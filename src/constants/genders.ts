export const GENDERS = ["male", "female"] as const;
export type GenderType = (typeof GENDERS)[number];