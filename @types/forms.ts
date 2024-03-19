import { InternalFormStateStatus } from "@/lib/enums";

export type InternalFormState = {
  status?: InternalFormStateStatus;
  fields?: Record<string, string>;
  message?: string;
};
