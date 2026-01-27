# 不動産営業のためのGemini活用セミナー LP

商業不動産業界向けのGemini活用セミナーランディングページです。anyenv株式会社が主催するウェビナーの参加者募集を目的としています。

## プロジェクト概要

このプロジェクトは、製造業向けのセミナーLPを商業不動産業界向けに書き換えたものです。デザインとレイアウトは完全に維持しながら、コンテンツを不動産業界特有の課題と活用事例に最適化しています。

## 技術スタック

- **フロントエンド**: React 19, TypeScript, Vite
- **スタイリング**: TailwindCSS 4, Framer Motion
- **バックエンド**: Express, tRPC
- **データベース**: Drizzle ORM + MySQL (Manus内蔵)
- **メール送信**: SendGrid
- **ホスティング**: Manus内蔵ホスティング (vite-plugin-manus-runtime)

## 主な機能

### 1. セミナー情報の表示
- ヒーローセクション: 不動産営業のAI活用を訴求
- セミナー概要カード: 日時、開催形式、内容の詳細
- 課題セクション: 不動産業界特有の営業課題を提示
- 学べることセクション: Gemini活用による具体的な解決策
- 実際の活用事例: 4社の導入事例を紹介
- FAQセクション: よくある質問と回答

### 2. 申込フォーム
- 会社名、氏名、役職、メールアドレス、電話番号、課題（任意）の入力
- クライアント側バリデーション
- データベースへの保存
- 管理者への通知メール（HTML形式）
- 申込者への自動返信メール（HTML形式）

### 3. レスポンシブデザイン
- モバイル、タブレット、デスクトップに対応
- Framer Motionによるスムーズなアニメーション
- Cyan/Blueグラデーションのモダンなデザイン

## セットアップ

### 前提条件
- Node.js 22.x
- pnpm 10.x
- MySQL データベース（Manus内蔵データベース推奨）
- SendGrid APIキー

### インストール

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定（.envファイルを作成）
DATABASE_URL=mysql://user:password@host:port/database
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@anyenv-inc.com

# データベースマイグレーション
pnpm db:push

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# 本番サーバーの起動
pnpm start
```

## 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| DATABASE_URL | MySQLデータベースの接続文字列 | ✅ |
| SENDGRID_API_KEY | SendGrid APIキー | ✅ |
| SENDGRID_FROM_EMAIL | 送信元メールアドレス | ⚠️ デフォルト: noreply@anyenv-inc.com |
| OAUTH_SERVER_URL | Manus OAuth認証サーバーURL | ❌ オプション |

## データベーススキーマ

### seminar_registrations テーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|-----|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 登録ID |
| companyName | varchar(255) | NOT NULL | 会社名 |
| name | varchar(255) | NOT NULL | 氏名 |
| position | varchar(255) | NOT NULL | 役職 |
| email | varchar(320) | NOT NULL | メールアドレス |
| phone | varchar(20) | NOT NULL | 電話番号 |
| challenge | text | NULLABLE | 課題（任意） |
| createdAt | timestamp | DEFAULT NOW | 登録日時 |

## デプロイ

### Manus内蔵ホスティングへのデプロイ

1. **ビルド**: `pnpm build`を実行してdist/ディレクトリを生成
2. **環境変数の設定**: Manus Management UIで環境変数を設定
3. **データベースマイグレーション**: `pnpm db:push`を実行
4. **Publish**: Management UIでPublishボタンをクリック
5. **カスタムドメイン設定**: Management UI → Settings → Domainsで設定

### 推奨カスタムドメイン
- gemini-salesseminar-for-real-estate.anyenv-inc.com

## テスト

```bash
# すべてのテストを実行
pnpm test

# 型チェック
pnpm check
```

**注意**: テストの一部はDATABASE_URLとSENDGRID_API_KEYが設定されていないと失敗します。

## プロジェクト構造

```
.
├── client/                 # フロントエンドコード
│   ├── public/            # 静的ファイル
│   └── src/
│       ├── components/    # Reactコンポーネント
│       ├── pages/         # ページコンポーネント
│       └── lib/           # ユーティリティ
├── server/                # バックエンドコード
│   ├── _core/            # コアシステム
│   ├── routers.ts        # tRPCルーター
│   ├── seminar.ts        # セミナー登録ロジック
│   └── sendgrid.ts       # メール送信ロジック
├── drizzle/              # データベーススキーマとマイグレーション
├── shared/               # 共有型定義
└── dist/                 # ビルド出力（生成される）
```

## 管理者情報

- **管理者メールアドレス**: info@anyenv-inc.com
- **会社名**: anyenv株式会社
- **代表取締役**: 四宮 浩二
- **住所**: 東京都渋谷区道玄坂2-25-12 道玄坂通5F

## ライセンス

MIT

## 開発者向けドキュメント

詳細な開発情報については、以下のドキュメントを参照してください：

- [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) - デプロイメント状況
- [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md) - 検証レポート
- [SENDGRID_SETUP.md](./SENDGRID_SETUP.md) - SendGridセットアップガイド

## サポート

質問や問題がある場合は、GitHubのIssuesまたはinfo@anyenv-inc.comまでお問い合わせください。
