// src/lib/utils.js

/**
 * Formats a date string to "DD MMM YYYY"
 * @param {string | Date} dateInput
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "INVALID";

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
};

// src/lib/utils.js
export const formatPublishedDate = (dateInput) => {
  if (!dateInput) return null;

  const d = new Date(dateInput);

  if (isNaN(d.getTime())) {
    // Fallback: If it's a simple "1984" string that Date() might fail on
    const yearMatch = dateInput.toString().match(/^\d{4}/);
    return yearMatch ? `${yearMatch[0]}-01-01` : null;
  }

  return d.getFullYear();
};

export const getAuthorOffset = (authorName) => {
  if (!authorName) return 0;

  // 1. Get the first letter and make it lowercase
  const firstLetter = authorName.trim().toLowerCase().charAt(0);

  // 2. Get the alphabet position (a = 0, b = 1, etc.)
  // 'a'.charCodeAt(0) is 97
  const position = firstLetter.charCodeAt(0) - 97;

  // 3. Handle non-alphabetic characters (optional)
  if (position < 0 || position > 25) return 0;

  // 4. The Math: (Position % CycleLength) - Offset
  // (0 % 7) - 3 = -3 (a)
  // (6 % 7) - 3 =  3 (g)
  // (7 % 7) - 3 = -3 (h)
  return (position % 7) - 3;
};
