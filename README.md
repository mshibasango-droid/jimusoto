# ジムソト 公式ホームページ

ジムソトのホームページを管理する専用リポジトリです。

- 管理先：<https://github.com/mshibasango-droid/jimusoto>
- 公式URL：<https://jimusoto.jp/>
- 旧GitHub Pages URL：<https://mshibasango-droid.github.io/jimusoto/>（独自ドメインへ転送）
- 公開元：`main` ブランチの `/docs` フォルダー
- 独自ドメイン：`jimusoto.jp`（XServerドメインで取得、2026年9月12日に接続設定を保存）
- 接続状況：2026年9月13日にDNS確認が成功し、Enforce HTTPSを有効化。公式URLのHTTPS表示とHTTP・www・旧URLからの転送を確認しました。

HTML・CSS・JavaScriptだけの静的サイトです。依存パッケージのインストールやビルドは不要です。`docs/` が編集対象かつ公開ファイルです。

## 現在の内容

- サービス6種、料金（すべて税別）、特徴、ご利用の流れ、情報管理、FAQ、運営者情報、お問い合わせ
- 情報管理方針・プライバシーポリシーの独立ページ
- スマートフォン・タブレット・PC向けの表示
- タイトル・説明・OGP・favicon・canonical・サイトマップ
- フォームの必須入力・メール形式の確認、入力内容の確認画面

問い合わせ先は **info@jimusoto.jp** です。さくらのメールボックスで外部送受信・SPF/DKIM/DMARCのPASSを確認しました。Formspree Free（月50件）を接続し、ダミー問い合わせの通知と返信先も確認しています。

**2026年9月13日、HTTPSの有効化と公開フォームから通知メールの受信まで最終確認を完了しました。** 通常の証明書検証で公式URLは200応答となり、HTTP・www・旧GitHub Pages URLはHTTPSの公式URLへ301転送します。公開フォームからダミー問い合わせを1件送り、「ご相談を受け付けました。」の表示と、info@jimusoto.jpの受信箱に届いた同じ内容の通知（21:34）を確認しました。JavaScript無効時はメール相談先を表示します。フォームの内容は確認画面の最終ボタンでのみ送信し、ブラウザ内への永続保存は行いません。

情報管理方針とプライバシーポリシーに、問い合わせ窓口・Formspree（米国での処理を含む）・さくら・GitHubの利用を記載しています。受託データの具体的な取り扱い条件は依頼ごとに確認します。

### 検索公開とSearch Console

2026年9月13日、ユーザーの指示により全3ページの検索除外を解除し、`index,follow` に変更しました。`robots.txt` は巡回を許可し、サイトマップの場所を記載しています。公開3ページへの反映とサイトマップの取得を確認しました。

Google Search Consoleに公式HTTPS URLのプロパティを作成し、HTMLタグによる所有権確認を完了しました。サイトマップは正常に処理され、Googleが3ページを検出しています。トップページのURL検査は「検出 - インデックス未登録」で、インデックス登録リクエストは受理され、優先クロール待ちに入りました。設定・申請の完了と、実際の検索掲載完了は別です。

管理画面：<https://search.google.com/search-console?resource_id=https%3A%2F%2Fjimusoto.jp%2F>。登録したGoogleアカウントでログインし、「ページ」「検索パフォーマンス」で状況を確認できます。

Googleの確認タグは公開するための識別子であり、パスワードや秘密APIキーではありません。確認後も削除しないでください。検索公開を許可しても、検索結果への掲載時期や順位が保証されるものではありません。

### フォームの管理

- Formspreeフォーム：`mbgjezdo`、プロジェクト「ジムソト公式HP」
- 公開送信先：`https://formspree.io/f/mbgjezdo`（秘密キーではありません）
- 通知先：認証済みの `info@jimusoto.jp`、返信先はフォームの `email` フィールド
- ドメイン制限：`jimusoto.jp`、時刻表示：`Asia/Tokyo`
- 迷惑送信対策：Formshield有効、隠し項目 `_gotcha`。CAPTCHAは初期状態の無効を維持
- 管理画面の履歴：無料枠の30日分。通知メールの自動削除期限とは別
- 自動返信メール・ファイル添付・追加の有料連携は使用しません
- 上限・通信エラーの場合はメールでの相談先を案内し、入力内容を保持します
- `localhost`では表示確認ができますが、本番用の処理はHTTPS以外から送信しません

無料枠の使用量はFormspreeのAccount画面で確認します。上限が近づいたときの通知を確認し、必要になった場合だけプランを検討してください。

## GitHub Pagesの設定

このリポジトリの `Settings → Pages` で、次の設定を使用します。

1. Source：`Deploy from a branch`
2. Branch：`main`
3. Folder：`/docs`
4. `Save`

設定後は `docs/` の変更を `main` へ保存すると自動で公開処理が走ります。`.nojekyll` により、ファイルをそのまま静的配信します。Custom domainは `jimusoto.jp` です。`docs/CNAME` を維持してください。

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
| `docs/robots.txt` | 検索クローラー向けの巡回許可とサイトマップ案内 |
| `docs/CNAME` | GitHub Pagesに接続する独自ドメイン |

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
node finalize-static.mjs https://jimusoto.jp/
```

全3ページのcanonical・OGPのURLとサイトマップをまとめて更新できます。ページ内のリンクと画像は相対パスなので、GitHub Pagesの `/jimusoto/` 配下でも独自ドメインでも使用できます。

## 独自ドメインの設定

ネームサーバーはXServerドメインの `ns1.xdomain.ne.jp`、`ns2.xdomain.ne.jp`、`ns3.xdomain.ne.jp` を使用します。追加のレンタルサーバー契約は不要です。

| ホスト名 | 種別 | 内容 | TTL |
| --- | --- | --- | --- |
| 空欄（jimusoto.jp） | A | 185.199.108.153 | 3600 |
| 空欄（jimusoto.jp） | A | 185.199.109.153 | 3600 |
| 空欄（jimusoto.jp） | A | 185.199.110.153 | 3600 |
| 空欄（jimusoto.jp） | A | 185.199.111.153 | 3600 |
| www | CNAME | mshibasango-droid.github.io | 3600 |

GitHub PagesのCustom domainは `jimusoto.jp`。`www.jimusoto.jp` と旧GitHub Pages URLから公式URLへの転送はGitHub Pagesが行います。2026年9月13日に `Settings → Pages` のDNS確認成功と証明書を確認し、`Enforce HTTPS` を有効にしました。

公式ガイド：<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

## 受付開始前に確定すること

- 運営者氏名、住所、電話番号の公開範囲を確定する（問い合わせ窓口はinfo@jimusoto.jp）
- データの保管・削除、秘密保持、外部サービスとAI利用の条件を実運用に合わせて確定する
- 方針ページと受託時の運用条件に齟齬がないことを確認する

このリポジトリに秘密情報、実際の顧客データ、パスワード、APIキーを保存しないでください。
