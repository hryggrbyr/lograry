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
      type: z.string(),
      author: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      shelf: z.enum(["to-read", "reading", "read", "abandoned"]),
      start_date: smartDate,
      end_date: smartDate,
      publisher: z.string().optional().nullable(),
      published: smartDate,
      page_count: z.number().optional().nullable(),
      isbn: z.union([z.number(), z.string()]).optional().nullable(),
      coverUrl: z.string().optional().nullable(),
      bookshopUrl: z.string().optional().nullable(),
    })
    .merge(commonMeta)
    .transform((data) => ({
      ...data,
      sort_title: formatSortTitle(data.title),
      sort_author: formatSortName(data.author[0]),
    })),
});

const movies = defineCollection({
  type: "content",
  schema: z
    .object({
      type: z.string(),
      country: z.string(),
      year: z.any(),
      director: z.string(),
      actors: z.array(z.string()),
      genre: z.array(z.string()),
      length: z.any().optional().nullable(),
      shelf: z.enum(["watched", "watching", "watchlist"]),
      watched: smartDate,
      poster: z.string().url().optional().nullable(),
    })
    .merge(commonMeta)
    .transform((data) => ({
      ...data,
      sort_title: formatSortTitle(data.title),
      sort_director: formatSortName(data.director),
    })),
});

const series = defineCollection({
  type: "content",
  schema: z
    .object({
      type: z.string(),
      country: z.string(),
      year: z.any(),
      director: z.string(),
      actors: z.array(z.string()),
      genre: z.array(z.string()),
      length: z.any().optional().nullable(), // To handle "5 seasons (42 episodes)"
      shelf: z.enum(["watched", "watching", "watchlist"]),
      watched: smartDate,
      poster: z.string().url().optional().nullable(),
    })
    .merge(commonMeta)
    .transform((data) => ({
      ...data,
      sort_title: formatSortTitle(data.title),
      sort_director: formatSortName(data.director),
    })),
});

export const collections = { books, movies, series };
