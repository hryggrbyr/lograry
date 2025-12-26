import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const booksDir = './src/content/books';
const outputFile = './public/admin/tags.json';

const tags = new Set();

// Read all markdown files
const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(booksDir, file), 'utf-8');
  const { data } = matter(content);
  if (data.tags && Array.isArray(data.tags)) {
    data.tags.forEach(tag => tags.add(tag));
  }
});

const sortedTags = Array.from(tags).sort();
fs.writeFileSync(outputFile, JSON.stringify(sortedTags, null, 2));
console.log(`✅ Synced ${sortedTags.length} tags to ${outputFile}`);
