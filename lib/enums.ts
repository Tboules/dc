export type ObjectValues<T> = T[keyof T];

export const FIND_DESERT_FIGURE_FORM_STATUS = {
  LOADING: "loading",
  INIT: "init",
  SUCCESS: "success",
  EMPTY: "empty",
  ERROR: "error",
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
  SAINT: "Saint",
  DOCTOR: "Doctor",
  FATHER: "Father",
  MOTHER: "Mother",
} as const;

export type DesertFigureTitle = ObjectValues<typeof DESERT_FIGURE_TITLE>;
