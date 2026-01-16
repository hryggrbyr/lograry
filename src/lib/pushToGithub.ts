/**
 * Shared GitHub API Utilities for Lograry Admin
 */

export function generateFilename(entryData, type) {
  const slug = (str) =>
    (str || "unknown")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const title = slug(entryData.title);

  if (type === "books") {
    const author = Array.isArray(entryData.author)
      ? slug(entryData.author[0])
      : slug(entryData.author);
    return `${title}-${author}.md`;
  }
  if (type === "movies") {
    const director = slug(entryData.director);
    const year = entryData.year || "0000";
    return `${title}-${director}-${year}.md`;
  }
  if (type === "series") {
    const year = entryData.year || "0000";
    return `${title}-${year}.md`;
  }
  return `${title}.md`;
}

export async function pushToGitHub(folder, fileName, data, body) {
  const pat = localStorage.getItem("LOGRARY_PAT");
  const repo = "hryggrbyr/lograry";

  if (!pat) {
    alert("Missing GitHub PAT. Please sign in.");
    return;
  }

  // Build YAML Frontmatter
  let yaml = "---\n";
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v)) {
      yaml += `${k}:\n${v.map((i) => `  - "${i}"`).join("\n")}\n`;
    } else if (v === null || v === "") {
      yaml += `${k}: null\n`;
    } else if (typeof v === "boolean" || typeof v === "number") {
      yaml += `${k}: ${v}\n`;
    } else {
      yaml += `${k}: "${v}"\n`;
    }
  }
  yaml += "---\n\n" + body;

  const url = `https://api.github.com/repos/${repo}/contents/${folder}/${fileName}`;

  // Check for existing file to get SHA (for updates)
  const check = await fetch(url, {
    headers: { Authorization: `token ${pat}` },
  });
  const sha = check.ok ? (await check.json()).sha : null;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${pat}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `archive: ${sha ? "update" : "add"} ${data.title}`,
      content: btoa(unescape(encodeURIComponent(yaml))),
      sha,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to push to GitHub");
  }

  return response.json();
}
