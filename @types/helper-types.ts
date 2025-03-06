import { Route } from "nextjs-routes";

export type DesertCollectionsStaticRoute = Exclude<
  Route,
  { query: any }
>["pathname"];
