/** @jsxImportSource react */
import * as React from "react";

import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "books",
        label: "Books",
        path: "src/content/books",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "author", label: "Authors", list: true },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: { component: "tags" },
          },
          {
            type: "string",
            name: "shelf",
            label: "Shelf Status",
            options: [
              { label: "To Read", value: "to-read" },
              { label: "Reading", value: "reading" },
              { label: "Read", value: "read" },
              { label: "Abandoned", value: "abandoned" },
            ],
          },
          {
            type: "boolean",
            name: "owned",
            label: "Owned Physically/Digitally",
          },
          {
            type: "object",
            name: "history",
            label: "Reading History (Re-reads)",
            list: true,
            ui: {
              itemProps: (item) => {
                return {
                  label: `${
                    item?.end_date?.substring(0, 10) || "In Progress"
                  } - ⭐ ${item?.rating || "?"}`,
                };
              },
            },
            fields: [
              { type: "datetime", name: "start_date", label: "Start Date" },
              { type: "datetime", name: "end_date", label: "End Date" },
              {
                type: "number",
                name: "rating",
                label: "Rating (0-5)",
                ui: {
                  validate: (val) =>
                    val < 0 || val > 5 ? "0-5 only" : undefined,
                },
              },
            ],
          },
          { type: "string", name: "publisher", label: "Publisher" },
          {
            type: "datetime",
            name: "published",
            label: "Date Published",
            ui: {
              dateFormat: "YYYY-MM-DD",
            },
          },
          { type: "string", name: "isbn", label: "ISBN" },
          { type: "string", name: "coverUrl", label: "Cover Image URL" }, // Changed from image to string
          {
            type: "object",
            name: "recommended_by",
            label: "Recommended By",
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "url", label: "URL" },
            ],
          },
          { type: "string", name: "reviewUrl", label: "Review URL" },
          { type: "string", name: "bookshopUrl", label: "Bookshop Link" },
          {
            type: "rich-text",
            name: "body",
            label: "Description/Notes",
            isBody: true,
          },
        ],
      },
    ],
  },
});
