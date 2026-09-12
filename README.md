# ジムソト 公式ホームページ

ジムソトのホームページを管理する専用リポジトリです。

- 管理先：<https://github.com/mshibasango-droid/jimusoto>
- 公式URL：<https://jimusoto.jp/>
- 旧GitHub Pages URL：<https://mshibasango-droid.github.io/jimusoto/>（独自ドメインへ転送）
- 公開元：`main` ブランチの `/docs` フォルダー
- 独自ドメイン：`jimusoto.jp`（XServerドメインで取得、2026年9月12日に接続設定を保存）
- 接続状況：DNSの反映・GitHubの証明書発行を確認中。HTTPS強制は証明書の準備後に有効化します。

HTML・CSS・JavaScriptだけの静的サイトです。依存パッケージのインストールやビルドは不要です。`docs/` が編集対象かつ公開ファイルです。

## 現在の内容

- サービス6種、料金（すべて税別）、特徴、ご利用の流れ、情報管理、FAQ、運営者情報、お問い合わせ
- 情報管理方針・プライバシーポリシーの独立ページ
- スマートフォン・タブレット・PC向けの表示
- タイトル・説明・OGP・favicon・canonical・サイトマップ
- フォームの必須入力・メール形式の確認、入力内容の確認画面

問い合わせ先は **info@jimusoto.jp** です。さくらのメールボックスで外部送受信・SPF/DKIM/DMARCのPASSを確認しました。Formspree Free（月50件）を接続し、ダミー問い合わせの通知と返信先も確認しています。

**2026年9月12日、独自ドメインのHTTPSと公開HPからの最終送信テストは未完了です。** GitHub PagesはDNSの取得エラーを表示し、証明書の名前不一致が残っています。HTTPの公開サイトへの反映とメール相談の表示は確認しました。HTTPではフォームの入力を表示せず、HTTPSでは入力・確認・送信・成功／失敗の表示を利用できます。JavaScript無効時もメール相談先を表示します。フォームの内容は確認画面の最終ボタンでのみ送信し、ブラウザ内への永続保存は行いません。

情報管理方針とプライバシーポリシーに、問い合わせ窓口・Formspree（米国での処理を含む）・さくら・GitHubの利用を記載しています。受託データの具体的な取り扱い条件は依頼ごとに確認します。正式公開の確認が残っているため `noindex,nofollow` を維持しています。検索除外はアクセス制限ではありません。

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
| `docs/robots.txt` | 正式運用前の検索クローラー向け設定 |
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

GitHub PagesのCustom domainは `jimusoto.jp`。`www.jimusoto.jp` と旧GitHub Pages URLから公式URLへの転送はGitHub Pagesが行います。DNS反映後に `Settings → Pages` の検証・証明書発行を確認し、`Enforce HTTPS` を有効にします。

公式ガイド：<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

## 受付開始前に確定すること

- 独自ドメインのHTTPSを有効化し、公開HPのフォームから実際の受信まで最終確認する
- 運営者氏名、住所、電話番号の公開範囲を確定する（問い合わせ窓口はinfo@jimusoto.jp）
- データの保管・削除、秘密保持、外部サービスとAI利用の条件を実運用に合わせて確定する
- 方針ページと受託時の運用条件に齟齬がないことを確認する
- 正式な検索公開時に各ページの `noindex,nofollow` と `robots.txt` を見直す

このリポジトリに秘密情報、実際の顧客データ、パスワード、APIキーを保存しないでください。
