# Editorial Guidelines

Complete writing style guidelines for Hodgepodge blog articles.

## Tone and Voice

### Basic Tone Ratio
- **80% polite form** (敬体): desu/masu style
- **20% plain form** (常体): da/dearu style
- Default to polite form for accessibility and friendliness

### Voice Characteristics
- **Calm and neutral**: Avoid over-expressive language
- **Humble**: Avoid claiming absolute authority
- **Helpful**: Focus on being useful to readers
- **Authentic**: Write from genuine experience

## Sentence Structure

### Length
- **Ideal**: 40-60 characters per sentence
- **Maximum**: 80 characters (rare exceptions)
- **Avoid**: Very long sentences (>100 chars)

### Paragraph Length
- **Ideal**: 3-5 sentences per paragraph
- **Maximum**: 8 sentences
- **Use**: Short paragraphs for online readability

### Punctuation
- **Periods at end**: Every sentence must end with proper punctuation
- **Commas**: Use for natural pauses, clarify complex sentences
- **No exclamation overuse**: Use sparingly for genuine emphasis
- **No emoticons**: Keep text professional

## Headings

### H1 (Article Title)
- Assigned from frontmatter `title` field
- Don't use `#` in article body
- Should be descriptive but concise

### H2 (## Main Sections)
- **Format**: Noun form, no period, ~20 characters
- **Examples**: "導入方法" not "導入方法について"
- **Purpose**: Main content sections

### H3 (### Subsections)
- **Format**: Noun or verb-noun, no period
- **Examples**: "Pythonバージョンの管理"
- **Purpose**: Sub-sections within H2

### H4 and below
- Use sparingly
- Follow same format: noun form, no period

## Links and References

### External Links
- Use markdown syntax: `[text](url)`
- HTTP/HTTPS URLs automatically get `target="_blank"`
- Add descriptive anchor text

### Internal Links
- Use relative paths: `/blogs/slug`
- Automatically handled by Next.js

## Code Blocks

### Syntax
- Always specify language after opening \`\`\`

\```bash
command here
\```

\```python
def function():
    pass
\```

### No language
\```
text without syntax highlighting
\```

## Images

### Always include alt text

\`\`\`
![Description for accessibility](/path/to/image.png)
\`\`\`

### Alt text guidelines
- Be specific and descriptive
- Include context if relevant
- Don't repeat nearby text
- Don't use "image of" or "picture of"

## Emphasis

### Bold
- Use for: **bold text** with `**text**`
- Purpose: Key terms, important concepts
- Don't overuse: Reserve for genuine emphasis

### Italic
- Use for: *italic text* with `_text_`
- Purpose: Secondary emphasis, technical terms
- Use sparingly: Auxiliary to bold

## Lists

### Bullet lists
- Use `-` for bullets
- Start each item on new line
- Indent for nested lists

\```markdown
- Main point
  - Nested point
  - Another nested
- Another main
\```

### Numbered lists
- Use `1.` for numbered lists
- Markdown handles numbering

\```markdown
1. First step
2. Second step
3. Third step
\```

## Blockquotes

Use `>` for quotes:

\```markdown
> This is a blockquote
> Can span multiple lines
\```

## SEO Description Guidelines

When writing the `description` field in frontmatter:

### Length
- **Minimum**: 120 characters
- **Maximum**: 160 characters
- **Ideal**: 140 characters

### Content
- Summarize the article's main value
- Include primary keyword naturally
- Describe what reader will learn
- Use neutral, factual tone
- Avoid clickbait or exaggerated claims

### Examples

**Good (145 chars):**
"Pythonの環境管理ツールuvについて、導入方法と基本的な使い方を紹介します。Rust製で高速に動作し、プロジェクトごとのバージョン管理が可能です。"

**Bad (too short):**
"uvの使い方を説明します。"

**Bad (too long):**
"Pythonの環境管理は大変ですが、uvという新しいツールを使うと簡単になります。この記事ではuvのインストール方法から、実際のプロジェクトでの使い方、トラブルシューティングまで詳しく解説します。初心者の方にも分かりやすく説明していますので、ぜひ参考にしてください。"

## Japanese Naturalness Guidelines

### Avoid AI-Like Phrasing

**Avoid these patterns:**
- "〜について説明します" → Use: 導入や設定の手順をまとめます
- "〜する必要があります" → Use: 〜します / 〜します
- "〜することができます" → Overuse, vary with: 〜できます / 〜可能です
- "〜してください" → Use: 〜します / 手順は以下の通りです

**Better alternatives:**
- Instead of "この記事では〜を紹介します" → Start with the topic directly
- Instead of "以下の手順に従ってください" → "手順は以下の通りです"
- Instead of "最後に〜をまとめます" → Just summarize naturally

### Flow and Connection

- **Use natural transitions**: 具体的には / そのため / 一方で
- **Avoid mechanical listing**: Connect related points rather than bullet-heavy sections
- **Vary sentence beginnings**: Not every sentence should start with the same pattern
- **Contextual explanations**: Explain why, not just what

### Common Japanese Phrasing Improvements

| AI-Like (Avoid) | Natural (Use) |
|----------------|---------------|
| 設定します | 設定は以下の通りです |
| 確認します | 確認しておきます / 確認します |
| 完了しました | 完了です / これで準備できました |
| します | 行います / 進めます |

### Voice Consistency

- Maintain consistent persona throughout
- Avoid sudden tone shifts
- Write as if explaining to a peer, not instructing a subordinate
- Use humble expressions sparingly and genuinely

## Formatting Checklist

Before finalizing an article:

- [ ] Title is descriptive and concise
- [ ] Description is 120-160 characters
- [ ] All headings are noun form with no period
- [ ] Code blocks have language specified
- [ ] Images have descriptive alt text
- [ ] Sentences are 40-60 characters (max 80)
- [ ] Paragraphs are 3-5 sentences (max 8)
- [ ] Links use descriptive anchor text
- [ ] No emoticons or excessive exclamation
- [ ] Tone is 80% polite, 20% plain
- [ ] Article provides unique value
- [ ] Japanese sounds natural, not AI-generated
- [ ] No mechanical listing or repetitive phrasing
