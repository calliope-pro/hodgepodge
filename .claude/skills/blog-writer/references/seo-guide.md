# SEO Guide for Hodgepodge Blog

Complete guide for optimizing blog articles for search engines and AI overviews.

## SEO Fundamentals

### Search Intent
Before writing, identify what the user is searching for:
- **Informational**: Learning something ("how to", "what is")
- **Problem-solving**: Fixing an issue ("error", "not working")
- **Comparison**: Choosing between options ("vs", "alternative")
- **Tutorial**: Step-by-step guidance

### E-E-A-T Framework
Google evaluates content on:
- **Experience**: First-hand knowledge and personal use
- **Expertise**: Demonstrated skill and knowledge
- **Authoritativeness**: Recognition in the field
- **Trustworthiness: Accuracy, transparency, credibility

**Apply to articles:**
- Share personal experience ("When I used this tool...")
- Show expertise with accurate technical details
- Link to authoritative sources
- Be honest about limitations

## Keyword Strategy

### Primary Keyword
- **What**: The main topic phrase
- **Placement**: Title, first paragraph, URL, headings
- **Density**: 1-2% of content (natural use)

### Secondary Keywords
- **What**: Related terms and variations
- **Placement**: Throughout content, subheadings
- **Purpose**: Capture related search queries

### Long-tail Keywords
- **What**: Specific, longer phrases (3+ words)
- **Example**: "Python environment management" vs "uv"
- **Value**: Lower competition, higher intent

## Title Optimization

### Best Practices
- **Length**: 30-60 characters (display limit)
- **Format**: [Main Topic] - [Unique Angle/Benefit]
- **Include**: Primary keyword near beginning
- **Avoid**: Clickbait, vagueness, keyword stuffing

### Examples

**Good:**
- "Python環境管理ツールuvの導入と使い方"
- "codexで『Address already in use』エラーの解決法"

**Bad:**
- "Pythonの話" (too vague)
- "【驚愕】uvが最強すぎる！！！" (clickbait)

## Meta Description

### Requirements
- **Length**: 120-160 characters
- **Content**: Summarize article's value proposition
- **Keywords**: Include primary and secondary keywords
- **CTA**: Optional click-through encouragement

### Template

```
[Problem/Topic]について[main content]。[Unique value/benefit]。[Optional: what reader will achieve/learn]。
```

### Examples

**Good (145 chars):**
"Pythonの環境管理ツールuvについて、導入方法と基本的な使い方を紹介します。Rust製で高速に動作し、プロジェクトごとのバージョン管理が可能です。"

**Good (138 chars):**
"MinicondaとMambaのインストール方法を解説します。PyPI未公開のサイエンス系パッケージを使う際に必要な環境構築手順を、macOS/Linux/Windows別に説明します。"

## Content Structure for SEO

### Heading Hierarchy

```
H1: Article Title (from frontmatter)
  |
  +-- H2: Main Section (include keyword)
  |     |
  |     +-- H3: Subsection (related keyword)
  |     +-- H3: Subsection (related keyword)
  |
  +-- H2: Main Section (include keyword)
        |
        +-- H3: Subsection
```

### H2 Sections
- **Each includes**: Primary or secondary keyword
- **Purpose**: Organize content for search crawlers
- **Count**: 4-8 H2s for 800-1500 char articles

### H3 Subsections
- **Purpose**: Break down H2s into scannable chunks
- **Use**: When section has multiple distinct points
- **Avoid**: Over-nesting (H4+ rare)

## Internal Linking

### Link to Related Content
- **From**: Article mentions related topics
- **To**: Other relevant blog posts
- **Anchor**: Descriptive text with keywords

### Use `relatedPosts` Frontmatter
```yaml
---
relatedPosts: ["other-post.mdx", "another-post.mdx"]
---
```

This displays "Related Articles" section at bottom of post.

## URL Structure

### Current Pattern
```
/blogs/{uuid}
```

UUIDs are auto-generated. Don't manually specify.

## Semantic Keywords

### Include Related Terms
Naturally weave related terms throughout content:

**For "Python environment management":**
- Virtual environments
- Package managers
- Dependency management
- Version control
- pip, conda, uv

**For "error resolution":**
- Error message
- Troubleshooting
- Fix
- Solution
- Specific error code

## AI Overview Optimization (LLMO)

### Clear Subject-Predicate Structure
AI summaries prefer clear, direct language:

**Good:**
- "uv is a Python environment manager written in Rust."
- "This error occurs when port 1455 is already in use."

**Bad:**
- "When it comes to Python..." (vague intro)
- "It is recommended to..." (passive)

### Avoid Ambiguity
- **Be specific**: Say exactly what something is/does
- **Concrete examples**: Use real commands, outputs
- **Definitive statements**: Avoid hedging ("might", "could")

## Image SEO

### Alt Text Requirements
- **Be descriptive**: Describe what's shown
- **Include context**: Why is this image here?
- **Use keywords**: When natural and accurate

### File Names
Use descriptive names before uploading:
- `python-uv-installation.png` (good)
- `image1.png` (bad)

## Technical SEO (Automated)

These are handled by the site:
- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Canonical URLs (auto-generated)
- ✅ Structured data (BlogPosting JSON-LD)
- ✅ Open Graph tags
- ✅ Twitter Card tags

## Mobile Optimization

### Writing for Mobile Readers
- **Short paragraphs**: 2-3 sentences max
- **Frequent headings**: Every 2-3 paragraphs
- **Bullet points**: Break up text blocks
- **Scannable**: Quick to browse and understand

## Content Freshness

### Update Policy
- **Technical posts**: Update when tools/versions change significantly
- **Tutorials**: Verify commands still work
- **Add notes**: "Updated for X version" when relevant

## SEO Checklist

Before publishing:

### On-Page SEO
- [ ] Title includes primary keyword
- [ ] Meta description 120-160 chars
- [ ] Keywords field in frontmatter
- [ ] H2s include keywords
- [ ] Internal links where relevant
- [ ] Alt text on all images

### Content Quality
- [ ] Unique perspective (not just summarizing)
- [ ] Personal experience included
- [ ] Accurate technical details
- [ ] Links to authoritative sources
- [ ] Solves real problem or answers question

### Structure
- [ ] Clear heading hierarchy
- [ ] Scannable format (bullets, short paragraphs)
- [ ] 800-1500 characters (target)
- [ ] Proper grammar and spelling

## Common SEO Mistakes

❌ **Avoid:**
- Keyword stuffing (unnatural repetition)
- Generic titles ("My Blog Post")
- Missing or too short descriptions
- Broken internal links
- Duplicate content (don't repost same content)
- Thin content (<500 characters with no substance)

✅ **Do:**
- Natural keyword placement
- Descriptive, specific titles
- Complete meta descriptions
- Working internal links
- Original, valuable content
- Substantial, useful information
