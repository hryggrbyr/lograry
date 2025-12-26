import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ }) => {
  const manifest = {
    name: "Lograry Admin",
    short_name: "LograryAdmin",
    description: "Content management for the Lograry application.",
    start_url: `${import.meta.env.BASE_URL}admin/`,
    display: "standalone",
    background_color: "#222730",
    theme_color: "#222730",
    icons: [
      {
        src: `${import.meta.env.BASE_URL}icons/icon-192x192.png`,
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: `${import.meta.env.BASE_URL}icons/icon-512x512.png`,
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  return new Response(JSON.stringify(manifest));
};
