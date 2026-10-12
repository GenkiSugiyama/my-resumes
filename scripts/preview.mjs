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
      :root { color-scheme: light; --ink: #17202a; --muted: #5f6b76; --accent: #176b73; --border: #dce4e7; --surface: #f7f9fa; }
      * { box-sizing: border-box; }
      body { margin: 0; color: var(--ink); background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif; line-height: 1.75; }
      header { padding: 2.5rem 1.5rem 2.25rem; color: var(--ink); text-align: center; background: var(--surface); border-bottom: 1px solid var(--border); }
      header h1 { margin: 0; font-size: clamp(1.8rem, 5vw, 2.6rem); letter-spacing: .02em; }
      header p { margin: .6rem auto 0; color: var(--muted); }
      main { max-width: 64rem; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
      main > h1 { display: none; }
      h2, h3, h4, h5 { color: var(--ink); line-height: 1.45; }
      h2 { margin-top: 4rem; padding-bottom: .55rem; border-bottom: 1px solid var(--border); font-size: 1.65rem; }
      h3 { margin-top: 2.5rem; font-size: 1.25rem; }
      h4 { margin-top: 2rem; color: var(--accent); }
      h5 { margin: 1.5rem 0 .35rem; font-size: 1rem; }
      h2 + p { margin-top: 1.25rem; }
      hr { margin: 5rem 0 0; border: 0; border-top: 3px double var(--border); }
      strong { color: #0f4f55; }
      a { color: var(--accent); }
      table { width: 100%; border-collapse: collapse; margin: 1.25rem 0 1.75rem; }
      th, td { padding: .7rem .8rem; border: 1px solid var(--border); text-align: left; vertical-align: top; }
      th { width: 9rem; background: var(--surface); }
      li + li { margin-top: .45rem; }
      @media (max-width: 640px) { main { padding-inline: 1rem; } table { display: block; overflow-x: auto; } th { min-width: 7rem; } }
      @media print { header { display: none; } main { max-width: none; padding: 0; font-size: 10.5pt; } h2 { margin-top: 2rem; } h2, h3, h4, h5 { break-after: avoid; } }
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
