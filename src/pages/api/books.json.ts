import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import path from 'node:path';

export const GET: APIRoute = async ({ params, request }) => {
  // 1. Fetch all book entries from the content collection
  const allBooks = await getCollection('books');

  // 2. Map the data to the desired JSON format
  const formattedBooks = allBooks.map(book => {
    const filename = path.basename(book.id); // e.g., "a-game-of-thrones-george-r.-r.-martin.md"

    return {
      filename,
      path: `src/content/books/${filename}`, // Construct the path
      slug: book.slug,
      frontmatter: {
        ...book.data,
        // Ensure fields that might be null are included
        tags: book.data.tags || [],
        subtitle: book.data.subtitle || null,
        author: book.data.author || [],
        publisher: book.data.publisher || null,
        published: book.data.published || null,
        page_count: book.data.page_count || null,
        isbn: book.data.isbn || null,
        description: book.data.description || null,
        coverUrl: book.data.coverUrl || null,
        shelf: book.data.shelf || 'to-read',
        owned: book.data.owned || false,
        start_date: book.data.start_date || null,
        end_date: book.data.end_date || null,
        rating: book.data.rating || null,
        recommended_by: book.data.recommended_by || { name: null, url: null },
        created: book.data.created || null,
        reviewUrl: book.data.reviewUrl || null,
        bookshopUrl: book.data.bookshopUrl || null,
      }
    };
  });

  return new Response(
    JSON.stringify(formattedBooks, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
