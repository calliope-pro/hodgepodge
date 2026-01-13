---
name: blog-writer
description: This skill should be used when the user asks to "write a blog post", "create a blog article", "draft a blog entry", "create blog content", or mentions writing blog articles for their Hodgepodge blog. Supports multiple genres (technical tutorials, lifestyle/diary, learning notes) with SEO optimization, structure planning, and MDX output.
version: 0.1.0
---

# Blog Writer Skill

Create high-quality blog posts for the Hodgepodge blog with proper SEO, engaging structure, and MDX formatting. This skill guides the complete article creation process from topic ideation to final MDX output.

## Purpose

Generate well-structured, SEO-optimized blog posts that follow Hodgepodge's editorial guidelines. Each article should provide long-term value, demonstrate expertise (E-E-A-T), and engage readers with clear problem-solution frameworks.

## When to Use This Skill

Activate this skill when the user:
- Requests to write or create blog content
- Wants to draft an article about a specific topic
- Needs help structuring blog posts
- Asks for SEO-optimized content generation
- Mentions writing for their Hodgepodge blog

## Article Creation Process

### Step 1: Gather Article Requirements

Before generating content, clarify:

1. **Topic and angle**: What specific topic? What unique perspective?
2. **Target audience**: Who is this for? What's their skill level?
3. **Article type**: Technical tutorial, lifestyle post, or learning notes?
4. **Key message**: What's the main takeaway for readers?

If the user hasn't specified these details, ask using the `AskUserQuestion` tool.

### Step 2: Create Article Structure Plan

Before writing the full article, create a structure plan:

```markdown
## Structure Plan

### Genre: [technical/lifestyle/learning]

### Target Audience: [description]

### SEO Keywords: [primary, secondary]

### Article Structure:
1. **Hook/Opening** - What grabs attention?
2. **Problem/Context** - What situation led to this?
3. **Solution/Content** - What's being shared?
4. **Value/Takeaway** - What should reader remember?
```

Present this plan to the user for approval before proceeding. Use `AskUserQuestion` or wait for confirmation.

### Step 3: Generate MDX Article

Once structure is approved, generate the MDX file following:
- `templates/technical.mdx` for technical posts
- `templates/lifestyle.mdx` for lifestyle content
- `templates/learning.mdx` for learning notes

### Step 4: Apply Editorial Guidelines

Follow all guidelines in `references/editorial-guidelines.md`:
- Tone: 80% polite (desu/masu), 20% plain (da/dearu)
- Sentence length: 40-60 characters
- Headings: Noun form, no period, ~20 characters
- SEO description: 120-160 characters

### Step 5: Optimize for SEO

Ensure each article includes:
- Compelling title with keywords
- Meta description (120-160 chars)
- Related keywords in content
- Proper heading hierarchy (h2, h3)
- Internal linking opportunities

See `references/seo-guide.md` for detailed SEO requirements.

### Step 6: Create MDX File

Generate the final MDX file with proper frontmatter:

```yaml
---
title: "Article Title"
description: "SEO-optimized description (120-160 chars)"
datePublished: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
keywords: ["primary", "secondary", "related"]
relatedPosts: ["file-name.mdx"] # optional
---
```

Save to `src/content/posts/YYYY-MM-DD-{slug}.mdx` where:
- Date format: YYYY-MM-DD
- Slug: URL-friendly identifier (auto-generated if not specified)

## Genre-Specific Guidelines

### Technical Tutorials

Focus on:
- Clear problem statement
- Step-by-step instructions
- Code examples with language tags
- Troubleshooting section
- Links to official documentation

Use `templates/technical.mdx` as the base structure.

### Lifestyle/Diary Posts

Focus on:
- Personal experience and voice
- Relatable situations
- Practical takeaways
- Authentic tone

Use `templates/lifestyle.mdx` as the base structure.

### Learning Notes

Focus on:
- What was learned
- Why it matters
- How to apply it
- Resources for further learning

Use `templates/learning.mdx` as the base structure.

## Quality Standards

Every article should:
- **Provide value**: Solve a real problem or share genuine insight
- **Demonstrate expertise**: Show author's knowledge and experience
- **Be original**: Offer unique perspective, not just summarizing others
- **Be accurate**: Verify technical details and facts
- **Be scannable**: Use headings, bullets, and short paragraphs
- **Target 800-1500 characters**: Concise but substantial content

## Common Mistakes to Avoid

❌ **Don't:**
- Write generic content that could apply to any blog
- Use second person ("You should...")
- Make articles too long (over 3000 chars for this blog's style)
- Skip the structure planning step
- Forget SEO optimization
- Use cliched phrases or overused expressions

✅ **Do:**
- Include specific details and personal experience
- Use imperative/infinitive form in instructions
- Keep articles focused and concise
- Plan structure before writing
- Optimize for search intent
- Write authentically with original voice

## Additional Resources

### Templates
- **`templates/technical.mdx`** - Technical tutorial template
- **`templates/lifestyle.mdx`** - Lifestyle/diary template
- **`templates/learning.mdx`** - Learning notes template

### References
- **`references/editorial-guidelines.md`** - Complete writing style guide
- **`references/seo-guide.md`** - SEO optimization requirements
- **`references/structure-patterns.md`** - Article structure patterns

### Examples
- **`examples/technical-example.mdx`** - Sample technical post
- **`examples/lifestyle-example.mdx`** - Sample lifestyle post

## Quick Workflow Summary

1. **Gather requirements** - Ask for topic, audience, type if unclear
2. **Create structure plan** - Present outline for approval
3. **Generate content** - Write article following template
4. **Apply guidelines** - Ensure tone, style, SEO compliance
5. **Create MDX file** - Output final file with proper frontmatter
