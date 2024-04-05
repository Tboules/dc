import { InternalFormStateStatus } from "@/lib/enums";

export interface InternalFormState {
  status?: InternalFormStateStatus;
  fields?: Record<string, string>;
  message?: string;
  params?: Params;
}

export interface Params {
  [key: string]: string;
}
