export type ObjectValues<T> = T[keyof T];

export const USER_ROLES = {
  user: 1,
  admin: 2,
} as const;

export type UserRole = ObjectValues<typeof USER_ROLES>;

export const FIND_DESERT_FIGURE_FORM_STATUS = {
  LOADING: "loading",
  INIT: "init",
  SUCCESS: "success",
  EMPTY: "empty",
  ERROR: "error",
  NEW_FIGURE: "new figure",
} as const;

export type FindDesertFigureFormStatus = ObjectValues<
  typeof FIND_DESERT_FIGURE_FORM_STATUS
>;

export const INTERNAL_FORM_STATE_STATUS = {
  LOADING: 3,
  PENDING: 2,
  SUCCESS: 1,
  FAILURE: 0,
} as const;

export type InternalFormStateStatus = ObjectValues<
  typeof INTERNAL_FORM_STATE_STATUS
>;

export const DESERT_FIGURE_TYPE = {
  AUTHOR: 1,
  SUBJECT: 2,
} as const;

export type DesertFigureType = ObjectValues<typeof DESERT_FIGURE_TYPE>;

export const DESERT_FIGURE_TITLE = {
  NONE: "None",
  SAINT: "Saint",
  DOCTOR: "Doctor",
  FATHER: "Father",
  MOTHER: "Mother",
} as const;

export type DesertFigureTitle = ObjectValues<typeof DESERT_FIGURE_TITLE>;

export const EXCERPT_TYPE = {
  STORY: 2,
  QUOTE: 1,
} as const;

export type ExcerptType = ObjectValues<typeof EXCERPT_TYPE>;

export const CONTENT_STATUS = {
  DRAFT: "Draft",
  PENDING: "Pending",
  PUBLISHED: "Published",
  PRIVATE: "Private",
  FLAGGED: "Flagged",
  DELETED: "Deleted",
} as const;

export type ContentStatus = ObjectValues<typeof CONTENT_STATUS>;
