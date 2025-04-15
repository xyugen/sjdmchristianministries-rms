export const ROLES = ["admin", "pastor", "treasurer"] as const;
export type RoleType = (typeof ROLES)[number];
