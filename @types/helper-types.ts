import { Route } from "nextjs-routes";

export type DesertCollectionsStaticRoute = Exclude<
  Route,
  { query: any }
>["pathname"];

export type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
