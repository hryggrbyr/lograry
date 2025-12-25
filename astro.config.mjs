import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server", // or 'hybrid'
  adapter: netlify()
});
