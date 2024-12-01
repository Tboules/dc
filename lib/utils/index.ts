import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { uuidv4Regex } from "./regex";
import { Params } from "@/@types/forms";
import {
  DesertFigure,
  DesertFigureDirectInsert,
  NewDesertFigure,
} from "../database/schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pullUuidFromUrl(url: string) {
  const match = url.match(uuidv4Regex);

  if (match) {
    return match[0];
  }
}

export function getAllParams(entries: IterableIterator<[string, string]>) {
  let params: Params = {};

  Array.from(entries).forEach(([key, value]) => {
    params[key] = value;
  });

  return params;
}

export function generateDesertFigureFullname(
  figure: DesertFigureDirectInsert | NewDesertFigure | DesertFigure,
) {
  let fullname = figure.firstName;

  if (figure.title && figure.title != DESERT_FIGURE_TITLE.NONE) {
    fullname = figure.title + " " + fullname;
  }

  if (figure.lastName) {
    fullname += ` ${figure.lastName}`;
  }

  if (figure.epithet) {
    fullname += ` ${figure.epithet}`;
  }

  return fullname;
}

// make sure values come through as null in the DB rather than empty string
export function normalizeStringToNull(s: string) {
  if (s === "") return null;

  return s;
}
