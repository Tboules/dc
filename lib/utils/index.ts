import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { uuidv4Regex } from "./regex";
import { Params } from "@/@types/forms";
import {
  DesertFigure,
  DesertFigureDirectInsert,
  NewDesertFigure,
} from "../database/schema/desertFigures";

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
  let fullname = "";

  if (figure.title) {
    fullname = figure.title + " " + figure.firstName + " ";
  } else {
    fullname = figure.firstName + " ";
  }

  if (figure.lastName) {
    fullname = fullname + figure.lastName + " ";
  }

  if (figure.epithet) {
    fullname = fullname + figure.epithet;
  }

  return fullname;
}
