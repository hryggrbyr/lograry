import { defineCollection, z } from "astro:content";

const smartDate = z.preprocess(
  (val) => {
    // If it's a number (like 1998), turn it into a string "1998"
    if (typeof val === "number") return String(val);
    // If it's an empty string or null, return undefined
    if (val === "" || val === null) return undefined;
    return val;
  },
  z.union([z.date(), z.string()]).optional().nullable(),
);

const books = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      subtitle: z.string().optional().nullable(),
      author: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      shelf: z.enum(["to-read", "reading", "read", "abandoned"]),
      owned: z.boolean().default(false),
      start_date: smartDate,
      end_date: smartDate,
      rating: z.number().min(0).max(5).optional().nullable(),
      publisher: z.string().optional().nullable(),
      published: smartDate,
      page_count: z.number().optional().nullable(),
      isbn: z.union([z.number(), z.string()]).optional().nullable(),
      coverUrl: z.string().optional().nullable(),
      recommended_by: z
        .object({
          name: z.string().optional().nullable(),
          url: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
      created: smartDate,
      reviewUrl: z.string().optional().nullable(),
      bookshopUrl: z.string().optional().nullable(),
    })
    // ... inside your defineCollection schema
    .transform((data) => {
      // 1. Handle "The", "A", "An" for Titles
      const title = data.title;

      // 1. Strip HTML entities for sorting purposes (e.g., &ldquo; -> "")
      const cleanTitle = title.replace(/&[a-z0-9]+;/gi, "");

      // 2. Handle articles on the cleaned title
      const articles = /^(The|A|An)\s+/i;
      const sort_title =
        cleanTitle.replace(articles, (match) => {
          return "";
        }) +
        (articles.test(cleanTitle)
          ? `, ${cleanTitle.match(articles)?.[0].trim()}`
          : "");

      // 2. Handle "First Last" to "Last, First" for Authors
      // This takes the first author in your array
      const firstAuthor = data.author[0] || "";
      const authorParts = firstAuthor.split(" ");
      const sort_author =
        authorParts.length > 1
          ? `${authorParts.pop()}, ${authorParts.join(" ")}`
          : firstAuthor;

      return {
        ...data,
        sort_title: sort_title.trim(),
        sort_author: sort_author.trim(),
      };
    }),
});

export const collections = { books };
