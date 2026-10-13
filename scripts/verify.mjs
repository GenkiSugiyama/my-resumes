import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../",import.meta.url));
const source = await readFile(new URL("../resume-short.md",import.meta.url),"utf8");
const page = await readFile(new URL("../docs/index.md",import.meta.url),"utf8");
if (page !== "---\ndescription: 杉山元基の職務経歴書\n---\n\n"+source) throw Error("公開ページと短縮版が不一致");
const tracked = execFileSync("git",["ls-files","-z"],{cwd:root,encoding:"utf8"}).split("\0").filter(Boolean);
for (const path of tracked) {
  if (/\.(docx|pdf)$/i.test(path) || /(^|\/)(private|output)(\/|$)/.test(path)) throw Error("公開禁止ファイルが追跡されています: "+path);
}
for (const [label,text] of [["resume-short.md",source],["docs/index.md",page]]) {
  if (/<!-- (export:|historical:)|## (未確認事項|旧詳細版)|0\.1[%％]|約2万人|2万件/.test(text)) throw Error(label+": 非公開領域または禁止数値の疑い");
}
execFileSync("git",["diff","--check"],{cwd:root,stdio:"inherit"});
console.log("公開本文の同期・追跡対象・既知の禁止表現を確認しました。");
