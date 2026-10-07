# My resumes

職務経歴書を Markdown で管理し、GitHub Pages で公開するためのリポジトリです。

## 公開対象

- `docs/index.md`: 公開用の職務経歴書
- `docs/_config.yml`: GitHub Pages の設定
- `docs/assets/css/style.scss`: 表示スタイル

住所、電話番号、生年月日などを含む履歴書と、編集用の DOCX・PDF は公開しません。
これらのファイルは `.gitignore` で Git の管理対象外にしています。

## 確認コマンド

```sh
npm install
npm run lint
```

## GitHub Pages の公開設定

GitHub に Push した後、リポジトリの `Settings` → `Pages` で次のように設定します。

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

設定後は、通常 `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` で公開されます。

## 更新方針

1. `docs/index.md` を更新する
2. `npm run lint` で文章と Markdown を確認する
3. 差分を確認してコミットする
4. GitHub に Push する
