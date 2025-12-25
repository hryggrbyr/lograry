# Lograry

Lograry is a personal book logging application built with [Astro](https://astro.build/). It allows you to track the books you're reading, have read, want to read, or have abandoned.

## Features

-   **Track Reading Status:** Keep a record of your books, organized by shelves: "to-read", "reading", "read", and "abandoned".
-   **Reading Statistics:** Visualize your reading habits with a yearly graph.
-   **Detailed Book Information:** Each book entry can store information such as title, author, cover image, rating, and more.
-   **Content-Driven:** Book data is managed through simple Markdown files, making it easy to add and edit your library.

## Project Structure

```
/
├── public/
│   └── admin/
│       └── config.yml
├── src/
│   ├── components/
│   │   ├── BookCard.astro
│   │   └── ...
│   ├── content/
│   │   ├── books/
│   │   │   ├── a-game-of-thrones.md
│   │   │   └── ...
│   │   └── config.ts
│   ├── layouts/
│   └── pages/
└── astro.config.mjs
```

-   `src/content/books/`: Contains the Markdown files for each book in your library.
-   `src/content/config.ts`: Defines the schema for the book collection.
-   `src/pages/`: Contains the pages for the website, including the main dashboard.
-   `src/components/`: Contains reusable Astro components, like the `BookCard`.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/lograry.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd lograry
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the server on `http://localhost:4321`.

## Content Management

Books are managed as Markdown files in the `src/content/books/` directory. Each file represents a single book and contains a frontmatter section with the book's data.

### Example Book Entry

Here is an example of the frontmatter for a book entry:

```yaml
---
title: "A Game of Thrones"
subtitle: "A Song of Ice and Fire 1"
author:
  - "George R. R. Martin"
tags:
  - "fantasy"
  - "dragons"
shelf: "read"
owned: true
start_date: "2008-02-02"
end_date: "2008-02-02"
rating: 4
coverUrl: "https://covers.openlibrary.org/b/olid/OL7830295M-M.jpg"
---
```

The body of the Markdown file can be used for notes or a summary of the book.