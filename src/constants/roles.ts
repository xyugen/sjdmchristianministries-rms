export const ROLES = ["admin", "pastor", "treasurer"] as const;
export type RoleType = (typeof ROLES)[number];

export const RoleTypeLabels: Record<RoleType, string> = {
  admin: "Marriage Certificate",
  pastor: "Baptismal Certificate",
  treasurer: "Treasurer",
};
