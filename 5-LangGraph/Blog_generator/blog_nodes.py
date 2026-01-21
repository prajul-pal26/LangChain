from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, SystemMessage
import operator
import sys
import os
from dotenv import load_dotenv

# LOAD .env FIRST
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from model_connection import llm_openrouter
from blog_state import BlogState, BlogEvaluation

generator_llm = llm_openrouter
evaluator_llm = llm_openrouter
optimizer_llm = llm_openrouter
keyword_llm = llm_openrouter


def research_keywords(state: BlogState):
    """Research and suggest SEO keywords for the topic"""
    message = [
        SystemMessage(content="""You are an expert SEO specialist and technical content researcher. 
        Your job is to identify the most relevant and high-impact keywords for technical blog posts."""),
        HumanMessage(content=f"""
Research and provide SEO keywords for a technical blog on: "{state['topic']}"
Target Audience: {state.get('target_audience', 'developers')}

Provide:
1. **Primary Keyword**: The main focus keyword
2. **Secondary Keywords**: 3-5 related keywords
3. **Long-tail Keywords**: 3-5 specific search phrases
4. **LSI Keywords**: 3-5 semantically related terms
5. **Trending Terms**: Any current buzzwords or trends related to this topic

Format your response as a structured list.
        """)
    ]
    keywords = generator_llm.invoke(message).content
    return {'keywords': keywords}


def generate_blog(state: BlogState):
    """Generate a structured technical blog post"""
    message = [
        SystemMessage(content="""You are an expert technical content writer specializing in creating 
        high-quality, SEO-optimized blog posts for developers and tech professionals. 
        You write engaging, informative, and well-structured content that ranks well on search engines."""),
        HumanMessage(content=f"""
Write a comprehensive technical blog post on: "{state['topic']}"
Target Audience: {state.get('target_audience', 'intermediate developers')}
Researched Keywords: {state.get('keywords', 'N/A')}
This is revision #{state.get('iteration', 0) + 1}.

## BLOG STRUCTURE REQUIREMENTS:

### 1. Title
- Create a compelling, SEO-friendly title (50-60 characters ideal)
- Use a single # (markdown H1) for the title
- Include the primary keyword naturally
- Make it click-worthy but not clickbait

### 2. Meta Description
- Write a 150-160 character meta description
- Include primary keyword
- Add a clear value proposition

### 3. Introduction (2-3 paragraphs)
- Hook the reader immediately with a problem or question
- Establish credibility and relevance
- Preview what they'll learn
- Include primary keyword in first 100 words

### 4. Table of Contents
- List all main sections with anchor links format

### 5. Main Content Sections
For each section:
- Use ## (markdown H2) for main section headings
- Use ### (markdown H3) for subsection headings
- Keep paragraphs short (2-4 sentences max)
- Use **bold** for key concepts
- Include bullet points or numbered lists for scannability
- Add code examples where relevant (use proper markdown code blocks with language)
- Include practical, real-world examples

### 6. Code Examples (if applicable)
- Provide complete, working code snippets
- Add comments explaining key parts
- Show both before/after or problem/solution
- Use syntax highlighting (```python, ```javascript, etc.)

### 7. Key Takeaways
- Summarize main points in a bulleted list
- Make them actionable

### 8. Conclusion
- Recap the main benefits/learnings
- Encourage engagement

### 9. Call to Action
- Invite comments, shares, or newsletter signup
- Suggest related topics to explore

## FORMATTING RULES:
- Use Markdown formatting throughout
- Use proper markdown heading syntax: # for title, ## for sections, ### for subsections
- DO NOT include labels like "(H1)", "(H2)", "(H3)" in headings - just use the markdown # symbols
- Short paragraphs (max 4 sentences)
- Plenty of white space
- Strategic use of **bold** and *italic*
- Include relevant emojis sparingly for engagement 🚀
- Internal linking suggestions [Related: Topic Name]

## SEO REQUIREMENTS:
- Natural keyword placement (not stuffed)
- Use keywords in headings
- Include LSI (related) terms
- Aim for 1500-2500 words for comprehensive coverage
        """)
    ]
    blog_content = generator_llm.invoke(message).content
    return {'blog_content': blog_content, 'blog_history': [blog_content]}


def evaluate_blog(state: BlogState):
    """Evaluate the blog for quality, SEO, and readability"""
    message = [
        SystemMessage(content="""You are a senior technical content editor and SEO expert. 
        You evaluate blog posts for quality, structure, SEO optimization, and reader engagement.
        Be thorough but constructive in your feedback."""),
        HumanMessage(content=f"""
Evaluate this technical blog post:

---
{state['blog_content']}
---

## EVALUATION CRITERIA:

### 1. Content Quality (Score 1-10)
- Technical accuracy
- Depth of coverage
- Practical value
- Code quality (if applicable)

### 2. Structure & Readability (Score 1-10)
- Clear hierarchy (H1, H2, H3)
- Short paragraphs
- Use of bullet points and lists
- Logical flow
- Scannable format

### 3. SEO Optimization (Score 1-10)
- Title optimization
- Meta description
- Keyword usage (natural, not stuffed)
- Heading optimization
- Internal/external linking suggestions

### 4. Engagement (Score 1-10)
- Strong hook/introduction
- Compelling examples
- Call to action
- Reader value

### 5. Technical Elements
- Code examples quality
- Proper formatting
- Completeness

## DECISION RULES:
- If AVERAGE score >= 7.5 AND no critical issues → "approved"
- Otherwise → "needs_improvement"

Provide:
- evaluation: "approved" or "needs_improvement"
- feedback: Detailed, actionable feedback paragraph
- seo_score: 1-10
- readability_score: 1-10
        """)
    ]
    evaluation = evaluator_llm.with_structured_output(BlogEvaluation).invoke(message)
    return {
        'evaluation': evaluation.evaluation,
        'feedback': evaluation.feedback,
        'feedback_history': [evaluation.feedback]
    }


def optimize_blog(state: BlogState):
    """Optimize the blog based on feedback"""
    message = [
        SystemMessage(content="""You are an expert technical content optimizer. 
        You take existing blog posts and improve them based on specific feedback while maintaining 
        the original intent and voice. You excel at making content more engaging, SEO-friendly, and readable."""),
        HumanMessage(content=f"""
Improve this technical blog post based on the feedback provided.

## ORIGINAL BLOG:
---
{state['blog_content']}
---

## FEEDBACK TO ADDRESS:
{state['feedback']}

## OPTIMIZATION GUIDELINES:
1. Address ALL feedback points specifically
2. Maintain the technical accuracy
3. Keep the same overall structure but improve weak sections
4. Enhance SEO elements if mentioned
5. Improve readability with better formatting
6. Add or improve code examples if needed
7. Strengthen the introduction and conclusion
8. Ensure call-to-action is compelling

Return the COMPLETE improved blog post in Markdown format.
        """)
    ]
    response = optimizer_llm.invoke(message).content
    iteration = state.get('iteration', 0) + 1
    return {
        'blog_content': response,
        'iteration': iteration,
        'blog_history': [response]
    }