import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import MarkdownIt from "markdown-it";

const host = "127.0.0.1";
const port = 4173;
const sourceUrl = new URL("../docs/index.md", import.meta.url);
const markdown = await readFile(sourceUrl, "utf8");
const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
const renderer = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false
});

const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>杉山元基の職務経歴書</title>
    <style>
      :root { color-scheme: light; --ink: #17212b; --muted: #59636e; --accent: #176b87; --border: #d8e1e8; --surface: #f6f9fb; }
      * { box-sizing: border-box; }
      body { margin: 0; color: var(--ink); background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif; line-height: 1.85; }
      header { padding: 3.5rem 1.5rem 3rem; color: #fff; text-align: center; background: linear-gradient(135deg, #123c52 0%, #176b87 56%, #2397a5 100%); }
      header h1 { margin: 0; font-size: clamp(2rem, 6vw, 3.25rem); letter-spacing: .04em; }
      header p { margin: 1rem auto 0; opacity: .88; }
      main { max-width: 58rem; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
      main > h1 { display: none; }
      h2, h3, h4, h5 { color: var(--ink); line-height: 1.45; }
      h2 { margin-top: 3rem; padding-bottom: .45rem; border-bottom: 2px solid var(--accent); }
      h3 { margin-top: 2.25rem; }
      h4 { margin-top: 1.5rem; color: var(--accent); }
      h5 { margin-bottom: .4rem; font-size: 1rem; }
      a { color: var(--accent); }
      table { width: 100%; border-collapse: collapse; margin: 1rem 0 1.5rem; }
      th, td { padding: .7rem .8rem; border: 1px solid var(--border); text-align: left; vertical-align: top; }
      th { width: 9rem; background: var(--surface); }
      li + li { margin-top: .35rem; }
      @media (max-width: 640px) { main { padding-inline: 1rem; } table { display: block; overflow-x: auto; } th { min-width: 7rem; } }
      @media print { header { display: none; } main { max-width: none; padding: 0; font-size: 10.5pt; } h2, h3, h4, h5 { break-after: avoid; } }
    </style>
  </head>
  <body>
    <header>
      <h1>杉山元基の職務経歴書</h1>
      <p>バックエンドエンジニアとしての職務経歴とスキル</p>
    </header>
    <main>${renderer.render(body)}</main>
  </body>
</html>`;

const server = createServer((request, response) => {
  if (request.url !== "/" && request.url !== "/index.html") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": "text/html; charset=utf-8"
  });
  response.end(html);
});

server.listen(port, host, () => {
  console.log(`Preview: http://${host}:${port}`);
});

