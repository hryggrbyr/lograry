// src/pages/api/auth.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: import.meta.env.GITHUB_CLIENT_ID,
          client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify(data), { status: 400 });
    }

    // This is a simple HTML page that will post the token back to the CMS
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Authentication</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(${JSON.stringify(data)}, window.location.origin);
              window.close();
            }
          </script>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
};
