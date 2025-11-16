<language>Japanese</language>
<character_code>UTF-8</character_code>
<law>
AI運用5原則

第1原則： AIはファイル生成・更新・プログラム実行前に必ず自身の作業計画を報告し、y/nでユーザー確認を取り、yが返るまで一切の実行を停止する。

第2原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第4原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第5原則： AIは全てのチャットの冒頭にこの5原則を逐語的に必ず画面出力してから対応する。
その他ruleがあれば追加で復唱すること。
</law>

<rule>
- ディレクトリ構造をしっかりと把握しながら責任分離を徹底する
- エラーハンドリングは最小限に抑え、エラーであるべきとことはエラーにする
- export importはpage以外常にnamedで行う
- 3回chatするごとにclaude.mdを参照する
- 特定のページに固執せず既存の他のページも参照し一貫性を確保する
- 関連するlayout, component, page全て網羅的に走査して構造の過不足が無いようにする
</rule>

<every_chat>
[AI運用5原則]
[rule]

[main_output]

#[n] times. # n = increment each chat, end line, etc(#1, #2...)
</every_chat>

# 📘 Hodgepodge ブログサイト仕様書（実装完了版）

## 1. サイト概要

* **サービス名**: Hodgepodge（寄せ集めブログ）
* **技術スタック**: yarn + Next.js 15 (App Router) + TypeScript + Tailwind CSS + Headless UI + Velite + MDX + Biome
* **ホスティング**: Vercel
* **ビルド方式**: SSG (Static Site Generation)
* **コンテンツ**: 日々の記録と小さな覚え書き（非テック中心）
* **ライセンス**: 
  - コード: MIT License
  - 記事コンテンツ: CC BY 4.0
* **ポリシー**:
  - アクセシビリティ重視
  - SEO最適化（構造化データ、OG/Twitter、自動canonical）
  - UIはシンプルで見やすい
  - 文体トーン: 落ち着いた中立（敬体8:常体2、絵文字0）

---

## 文体トーンガイド

- 見出し: 名詞形、句点なし、20字前後。
- 本文: 敬体を基本（敬体:常体=8:2）、1文40〜60字、比喩は控えめ。
- 語彙: 断定弱め（〜します/〜でした）、感嘆符の多用禁止、顔文字・絵文字0。
- 英数・単位: 半角統一。数値と単位の間に半角スペース（例: 3 分）。
- 導入/締め例: 「このテーマについての短い記録です。」/「以上です。」。
- SEO説明: 120〜160字。中立トーンで体験/気づき軸。固有名詞の過剰羅列を避ける。
- アクセシビリティ: 画像altは具体的に。フォーム要素には視覚外ラベル必須（sr-only可）。
- 禁則: 過度な専門用語、強い誘導表現、過度な比喩。

---

## 2. URL設計

* `/` : トップページ
* `/blogs` : 記事一覧（フィルタUIあり）
* `/blogs/[slug]` : 記事詳細
* `/tags/[tag]` : タグ別一覧

👉 ページネーションは **`/blogs?page=n` のURLクエリで表現**。

---

## 3. ページ仕様（実装済み）

### 3.1 トップページ `/`

✅ **実装完了**
* サイト名 + キャッチコピー
* 最新記事リスト（最大6件）
* レスポンシブデザイン

### 3.2 記事一覧 `/blogs`

✅ **実装完了**
* 新着順で並び替え
* 検索機能（開発環境：簡易検索、本番環境：Pagefind）
* タグフィルタ（複数選択可）
* ページネーション（URLクエリ `?page=n`）
* Suspense対応

### 3.3 記事詳細 `/blogs/[slug]`

✅ **実装完了**
* タイトル、投稿日、読了時間
* Hero画像（任意）
* TOC（自動生成）
* MDXレンダリング
* 関連記事（フロントマターで明示的に指定、指定がない場合は非表示）
* 構造化データ（`BlogPosting` JSON-LD）
* SEOメタデータ自動生成

### 3.4 タグ別一覧 `/tags/[tag]`

✅ **実装完了**
* タグで絞り込み済の記事一覧
* 新着順
* 他のタグへのナビゲーション

---

## 4. データモデル（Velite + Frontmatter）

### 必須フィールド

* `title: string`
* `description: string`（SEO/OG用 120–160字）
* `datePublished: string`（ISO8601, 手動入力）
* `tags: string[]`

### 任意フィールド

* `keywords: string[]`（SEO用）
* `hero: { src: string; alt: string; width?: number; height?: number }`
* `relatedPosts: string[]`（関連記事をファイル名で指定、例: ["2025-11-17-uv-python-manager.mdx"]）

### 自動生成フィールド

✅ **実装完了**
* `slug: string`（**uuidで自動生成**）
* `filePath: string`（ファイルパス、関連記事検索に使用）
* `readingTime: number`（本文文字数から算出）
* `canonical: string`（slugから生成）
* `ogImage: string`（自動生成URL）

### 下書き判定

✅ **実装完了**
* `datePublished` が未来日なら非公開扱い

---

## 5. 検索・フィルタ仕様（実装完了）

✅ **環境別実装**
* **開発環境**: クライアントサイド簡易検索（タイトル・説明・タグ）
* **本番環境**: Pagefind全文検索
* **フィルタ**: タグによる絞り込み
* **状態管理**: URLクエリに反映
* **エラーハンドリング**: 本番環境でPagefind失敗時は適切にエラー表示

---

## 6. 実装済み機能一覧

### ✅ 基本機能
- [x] Next.js 15 + TypeScript環境構築
- [x] Tailwind CSS + Headless UIスタイリング
- [x] Veliteによるコンテンツ管理
- [x] Biomeによる統一開発環境

### ✅ ページ実装
- [x] トップページ（最新記事表示）
- [x] 記事一覧ページ（検索・フィルタ付き）
- [x] 記事詳細ページ（TOC・関連記事付き）
- [x] タグ別一覧ページ

### ✅ コンテンツ機能  
- [x] MDX記事レンダリング
- [x] TOC自動生成
- [x] 読了時間算出
- [x] 関連記事表示

### ✅ 検索・フィルタ
- [x] 開発環境用簡易検索
- [x] 本番環境用Pagefind統合
- [x] タグフィルタリング
- [x] ページネーション

### ✅ SEO・アクセシビリティ
- [x] メタデータ自動生成
- [x] 構造化データ（JSON-LD）
- [x] サイトマップ・robots.txt
- [x] ARIA属性・見出し階層
- [x] Suspense境界

### ✅ その他
- [x] MIT License（コード用）
- [x] CC BY 4.0（コンテンツ用）
- [x] レスポンシブデザイン
- [x] 型安全性

---

## 7. ビルド・開発環境

### コマンド
* `yarn dev` : 開発サーバー起動
* `yarn build` : 本番ビルド（Pagefind付き）
* `yarn build:dev` : 開発ビルド
* `yarn check` : Biome lint & format

### 開発時の注意点
* 開発環境では簡易検索が動作
* slugはファイル名から自動生成
* コンテンツ変更時はVeliteが自動リビルド

---

## 6. アクセシビリティ要件

* `<form role="search">`
* フィルタUI = `<fieldset><legend>`
* 結果リスト = `<section aria-live="polite">`
* alt必須、コントラスト比遵守、見出し階層厳守
* Headless UIで対話UI（Dialog, Menu等）を構築

---

## 7. SEO要件

* `generateMetadata` で title / description / canonical / ogImage 自動生成
* 構造化データ: `BlogPosting` JSON-LD
* `keywords` は `<meta name="keywords">` に反映

---

## 8. MDX執筆ルール

### フロントマター（必須）

```yaml
---
title: "記事タイトル"
description: "SEO/OG用の概要文。120〜160文字程度。"
datePublished: "2025-08-28"
tags: ["diary", "life"]
keywords: ["日記", "暮らし", "メモ"] # SEO用（任意）
hero: # 任意
  src: "/images/blog/hero-sample.jpg"
  alt: "Hero画像の説明"
relatedPosts: ["2025-08-25-related-article.mdx", "2025-08-20-another-article.mdx"] # 任意、ファイル名で指定
---
```

**関連記事の指定方法**:
* `relatedPosts`フィールドにファイル名の配列で指定（任意）
* 指定された記事が記事詳細ページの下部に「あわせて読みたい記事」として表示される
* 指定がない場合は関連記事セクション自体が非表示になる
* 最大3件まで表示される

### 本文

* 見出しは `#` は使わず、本文内は `##` から開始（h1は自動で記事タイトルが使われるため）
* コードブロックは必ず言語指定：

  ```ts
  const hello: string = "world";
  ```
* 画像挿入は必ず `alt` をつける

  ```mdx
  ![説明文](/images/blog/foo.png)
  ```
* 外部リンクは `[テキスト](URL){target="_blank" rel="noopener noreferrer"}` を推奨
* 強調は `**bold**` を基本。`_italic_` は補助的に使用。
* 箇条書きは `-`、番号リストは `1.` を使う
* 引用は `>` を使う（ネスト可）
* 特殊なUI要素（Callout, Noteなど）はカスタムMDXコンポーネントで利用可能（後で定義）

---

## 9. デザインシステム（Sophisticated Minimalism）

---

## ドラフト運用メモ

- ルートの `draft` ファイルを下書きとして使用。
- メタ生成ポリシー（不足時は既定値を補完）
  - title: 先頭行を採用（装飾記号は除去）
  - description: 本文要約（120〜160字目安、落ち着いた敬体）
  - datePublished: 作成日（YYYY-MM-DD）
  - tags/keywords: 本文の語彙から抽出（例: 用語・プロダクト名・状況）
- ファイル作成: `src/content/posts/YYYY-MM-DD-わかりやすい名前.mdx`
  - slug は uuid で自動生成（ファイル名は可読性重視）
  - 本文は `##` 見出しから開始し、最小限の整形に留める

### コンセプト
* **基本理念**: 洗練された機能美と心地よい質感の融合
* **アプローチ**: "Sophisticated Minimalism" - くすみカラー + ニューモフィズム + 上品なアニメーション

### カラーパレット（くすみアース系）
* **Dusty Pink Rose** (#d8a8bb): メインアクセント
* **Sage Green** (#9caf88): 自然・成功色
* **Clay Terracotta** (#c4a484): 警告・補色
* **Muted Lavender** (#b8a9c9): 装飾・第三色
* **Warm Stone** (#b8b5a7): ニュートラル
* **ベース**: 温かみのある白・グレー（#f7f5f3, #2d2a26）

### ニューモフィズム指針
* `.neu-convex`: 浮き出し効果（カード、ボタン）
* `.neu-concave`: 凹み効果（入力フィールド）
* `.neu-pressed`: 押下状態（アクティブ要素）
* `.neu-floating`: 浮遊感（メインコンテンツ）
* `.neu-subtle`: 控えめ立体感（一般要素）

### アニメーション原則
* **控えめさ重視**: 過度な変形・移動を避ける
* **可読性優先**: `text-transparent`使用は最小限
* **自然な動き**: 
  - カードホバー: `hover:-translate-y-1`（1px上昇のみ）
  - 浮遊アニメーション: 2px以下の微細な動き
  - トランジション: 0.3s以下で快適性確保
* **グラデーション**: 装飾目的のみ、テキストは明確な色使用

### UI要素ルール
* **カード**: neu-subtle + 微細ホバー効果
* **ボタン**: neu-convex + グラデーション背景
* **タグ**: 単色背景 + ホバー時カラー変更
* **入力フィールド**: neu-concave + フォーカス時neu-pressed
* **ナビゲーション**: グラスモフィズム + neu要素の組み合わせ

### レスポンシブ考慮
* モバイル: ニューモフィズム効果を軽減
* タブレット: 中間的な効果レベル
* デスクトップ: フル効果適用
