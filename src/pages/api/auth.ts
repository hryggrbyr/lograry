import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const client_id = import.meta.env.GITHUB_CLIENT_ID;
  const client_secret = import.meta.env.GITHUB_CLIENT_SECRET;

  // 1. If there's no code, redirect to GitHub to start login
  if (!code) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`,
      },
    });
  }

  // 2. Exchange the code for an Access Token
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });

  const data = await response.json();

  // 3. Return a script that tells the CMS the login was successful
  return new Response(
    `<html><body><script>
      (function() {
        function receiveMessage(e) {
          if (e.data === "authorizing:github") {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(data)}',
              e.origin
            );
          }
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
};
