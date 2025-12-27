import { z } from "astro:content";

export const smartDate = z.preprocess(
  (val) => {
    if (typeof val === "number") return String(val);
    if (val === "" || val === null) return undefined;
    return val;
  },
  // Use coerce here to force strings into Date objects
  z.coerce.date().optional().nullable(),
);

export const formatSortName = (fullName: string = "") => {
  const parts = fullName.trim().split(" ");
  if (parts.length <= 1) return fullName;
  const lastName = parts.pop();
  return `${lastName}, ${parts.join(" ")}`.trim();
};

export const formatSortTitle = (title: string) => {
  const cleanTitle = title.replace(/&[a-z0-9]+;/gi, "");
  const articles = /^(The|A|An)\s+/i;
  return (
    cleanTitle.replace(articles, "") +
    (articles.test(cleanTitle)
      ? `, ${cleanTitle.match(articles)?.[0].trim()}`
      : "")
  );
};

// You can even share common fields, like tags or ratings
export const commonMeta = z.object({
  title: z.string(),
  subtitle: z.string().optional().nullable(),
  owned: z.boolean().default(false),
  recommended_by: z
    .object({
      name: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  created: smartDate,
  reviewUrl: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
});
