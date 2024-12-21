import axios from "axios";

export const openLibraryInstance = axios.create({
  baseURL: "https://openlibrary.org",
  headers: {
    "User-Agent": "DesertCollections/1.0(tboules@gmail.com)",
  },
});
