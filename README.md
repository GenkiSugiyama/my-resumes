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
npm ci
npm run verify
npm run preview
```

`npm run preview` の実行中は、ブラウザで `http://127.0.0.1:4173` を開くと
公開前の職務経歴書を確認できます。

## GitHub Pages の公開設定

GitHub に Push した後、リポジトリの `Settings` → `Pages` で次のように設定します。

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

設定後は、通常 `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` で公開されます。

## 更新方針

公開用の原稿とページは、非公開の正本から生成します。
このリポジトリ単体には非公開の正本や生成用の個人情報を含めません。

1. 作業用ワークスペースのキャリア更新手順に従って正本を編集し、原稿とページを生成する
2. `npm run verify` で文章、Markdown、本文の同期、公開対象を確認する
3. 差分を確認してコミットする
4. 公開の依頼がある場合にGitHubへPushする

`resume-short.md` と `docs/index.md` は生成物です。直接編集すると、
次回のワークスペース側の生成処理が不一致を検出します。
