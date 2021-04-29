import markdown from "https://deno.land/x/aleph@v0.3.0-alpha.32/plugins/markdown.ts";

export default () => ({
  plugins: [
    markdown(),
  ],
});
