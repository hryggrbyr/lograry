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

## Deployment

This project is configured to be deployed as a static site on GitHub Pages. A GitHub Actions workflow is included to automate the build and deployment process.

### GitHub Pages Configuration

1.  **Push to `main`:** After cloning the repository and pushing it to your own GitHub account, the included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically run. It will build the site and push the static files to a branch named `gh-pages`.
2.  **Set the Branch:** In your repository's settings on GitHub, navigate to the **Pages** section.
3.  **Source:** Under "Build and deployment," set the source to **Deploy from a branch**.
4.  **Branch:** Select `gh-pages` as the branch and `/ (root)` as the folder. Save the changes.

Your site will be deployed to `https://<your-username>.github.io/<your-repo-name>/`.

## Content Management

Books are managed using a git-based CMS, accessible from the `/admin` path of your live site.

### Logging into the CMS

Authentication for the CMS is handled by a **GitHub Personal Access Token (PAT)**.

1.  **Generate a PAT:**
    *   Go to your GitHub **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
    *   Click **Generate new token (classic)**.
    *   Give it a descriptive name (e.g., `lograry-cms`).
    *   Set an expiration date.
    *   Under **Select scopes**, check the entire **`repo`** scope.
    *   Click **Generate token** and copy the token.

2.  **Log In:**
    *   Navigate to your live site's admin page (e.g., `https://<your-username>.github.io/lograry/admin/`).
    *   You will be prompted to log in with GitHub. Instead of a password, paste the Personal Access Token you just created.

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