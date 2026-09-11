# ジムソト 公式ホームページ

ジムソトのホームページを管理する専用リポジトリです。

- 管理先：<https://github.com/mshibasango-droid/jimusoto>
- GitHub Pages URL：<https://mshibasango-droid.github.io/jimusoto/>
- 公開元：`main` ブランチの `/docs` フォルダー
- 独自ドメイン：`jimusoto.jp` は後日取得・接続予定。現在は未設定です。

HTML・CSS・JavaScriptだけの静的サイトです。依存パッケージのインストールやビルドは不要です。`docs/` が編集対象かつ公開ファイルです。

## 現在の内容

- サービス6種、料金（すべて税別）、特徴、ご利用の流れ、情報管理、FAQ、運営者情報、お問い合わせ
- 情報管理方針・プライバシーポリシーの独立ページ
- スマートフォン・タブレット・PC向けの表示
- タイトル・説明・OGP・favicon・canonical・サイトマップ
- フォームの必須入力・メール形式の確認、入力内容の確認画面

**問い合わせの受信先が未定のため、フォーム送信は無効です。入力情報の通信・保存は行いません。** 情報管理方針とプライバシーポリシーは運用確定前の確認案です。ページは受付開始前の確認版として `noindex,nofollow` を維持しています。Publicリポジトリと有効化後のGitHub Pagesは誰でも閲覧できます。検索除外はアクセス制限ではありません。

## GitHub Pagesの設定

このリポジトリの `Settings → Pages` で、次の設定を使用します。

1. Source：`Deploy from a branch`
2. Branch：`main`
3. Folder：`/docs`
4. `Save`

設定後は `docs/` の変更を `main` へ保存すると自動で公開処理が走ります。`.nojekyll` により、ファイルをそのまま静的配信します。Custom domainは空欄のままにしてください。

公式ガイド：<https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

## 編集するファイル

| ファイル | 内容 |
| --- | --- |
| `docs/index.html` | トップページ・サービス・料金・問い合わせフォーム |
| `docs/information-policy.html` | 情報管理方針 |
| `docs/privacy.html` | プライバシーポリシー |
| `docs/assets/site.css` | デザイン・レスポンシブ表示 |
| `docs/assets/site.js` | メニュー・フォーム確認画面 |
| `docs/assets/hero.webp` | オリジナルイラスト |
| `docs/sitemap.xml` | 公開URL一覧 |
| `docs/robots.txt` | 正式運用前の検索クローラー向け設定 |

`write-policy-pages.mjs` は方針ページの生成補助です。方針本文を直接HTMLで編集した場合、生成スクリプトにも同じ修正を反映してから再生成してください。再生成後は下記のURL更新コマンドを実行します。

## ローカル確認

```sh
node serve.mjs
```

表示されたURLをブラウザで開きます。停止は Ctrl+C。表示確認だけなら `docs/index.html` を直接ブラウザで開くこともできます。

```sh
node check-static.mjs
node --check docs/assets/site.js
```

## 公開URLの更新

```sh
node finalize-static.mjs https://mshibasango-droid.github.io/jimusoto/
```

全3ページのcanonical・OGPのURLとサイトマップをまとめて更新できます。ページ内のリンクと画像は相対パスなので、GitHub Pagesの `/jimusoto/` 配下でも独自ドメインでも使用できます。

## 独自ドメインを取得した後

1. 所有するドメインを確認し、GitHub PagesのCustom domainとDNSを設定します。
2. GitHubによる検証・証明書発行を確認し、HTTPSを有効にします。
3. `node finalize-static.mjs https://jimusoto.jp/` を実行して保存します。
4. 旧URLからのアクセスと全ページ・画像・フォームを確認します。

現在は未取得のため、`CNAME` ファイルは作成していません。

## 受付開始前に確定すること

- 受信用メールアドレスとフォーム送信サービスを決定・接続し、実際の受信まで検証する
- 運営者氏名、住所、電話番号の公開範囲と問い合わせ窓口を確定する
- データの保管・削除、秘密保持、外部サービスとAI利用の条件を実運用に合わせて確定する
- 方針ページを確定し、確認案と受付準備中の表示を更新する
- 正式な検索公開時に各ページの `noindex,nofollow` と `robots.txt` を見直す

このリポジトリに秘密情報、実際の顧客データ、パスワード、APIキーを保存しないでください。
