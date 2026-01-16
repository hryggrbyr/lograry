import { defineCollection, z } from "astro:content";
import {
  smartDate,
  commonMeta,
  formatSortName,
  formatSortTitle,
} from "./utils";

const books = defineCollection({
  type: "content",
  schema: z
    .object({
      type: z.string().default("book"),
      owned: z.boolean().default(false), // #edit-owned
      author: z.array(z.string()).default([]), // #edit-book-author
      tags: z.array(z.string()).default([]), // #edit-book-tags
      shelf: z.enum(["to-read", "reading", "read", "abandoned"]), // #edit-shelf
      start_date: smartDate, // #edit-book-start
      end_date: smartDate, // #edit-book-end
      publisher: z.string().optional().nullable(), // #edit-book-publisher
      published: smartDate, // #edit-book-published
      page_count: z.number().optional().nullable(),
      isbn: z.union([z.number(), z.string()]).optional().nullable(), // #edit-book-isbn
      coverUrl: z.string().optional().nullable(), // #edit-book-coverUrl
      bookshopUrl: z.string().optional().nullable(),
    })
    .merge(commonMeta)
    .transform((data) => ({
      ...data,
      sort_title: formatSortTitle(data.title),
      sort_author: formatSortName(data.author[0] || ""),
    })),
});

const movies = defineCollection({
  type: "content",
  schema: z
    .object({
      type: z.string().default("movie"),
      owned: z.boolean().default(false), // #edit-owned
      country: z.string(), // #edit-movie-country
      year: z.any(), // #edit-movie-year
      director: z.string(), // #edit-movie-director
      actors: z.array(z.string()), // #edit-movie-actors
      genre: z.array(z.string()), // #edit-movie-genre
      length: z.any().optional().nullable(), // #edit-movie-length
      shelf: z.enum(["watched", "watching", "watchlist"]), // #edit-shelf
      watched: smartDate, // #edit-created
      poster: z.string().url().optional().nullable(), // #edit-movie-poster
    })
    .merge(commonMeta)
    .transform((data) => {
      const directors = (data.director || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      return {
        ...data,
        directors,
        sort_title: formatSortTitle(data.title),
        sort_director: formatSortName(directors[0] || data.director || ""),
      };
    }),
});

const series = defineCollection({
  type: "content",
  schema: z
    .object({
      type: z.string().default("series"),
      owned: z.boolean().default(false), // #edit-owned
      country: z.string(), // #edit-series-country
      year: z.any(), // #edit-series-year
      creator: z.string().optional().nullable(), // #edit-series-creator
      director: z.string().optional().nullable(), // Optional fallback
      actors: z.array(z.string()), // Mandatory array
      genre: z.array(z.string()), // #edit-series-genre
      length: z.string().optional().nullable(), // Descriptive string
      shelf: z.enum(["watched", "watching", "watchlist"]), // #edit-shelf
      watched: smartDate, // #edit-created
      poster: z.string().url().optional().nullable(), // #edit-series-poster
    })
    .merge(commonMeta)
    .transform((data) => {
      // Fallback hierarchy: Creator > Director > Empty String
      const primaryCredit = data.creator || data.director || "";
      const directors = primaryCredit
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      return {
        ...data,
        directors,
        sort_title: formatSortTitle(data.title),
        sort_director: formatSortName(directors[0] || ""),
      };
    }),
});

export const collections = { books, movies, series };
