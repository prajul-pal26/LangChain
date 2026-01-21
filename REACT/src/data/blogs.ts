// Blog Post Types and Sample Data

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: string;
    tags: string[];
    readTime: number;
    publishedAt: string;
    isFeatured: boolean;
    isTrending: boolean;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
}

export const categories = [
    { id: "all", name: "All Posts", icon: "📚" },
    { id: "ai-systems", name: "AI Systems", icon: "🤖" },
    { id: "langchain-agents", name: "LangChain & Agents", icon: "🦜" },
    { id: "rag-production", name: "RAG in Production", icon: "🔍" },
    { id: "frontend-ai", name: "Frontend + AI", icon: "🎨" },
    { id: "system-design", name: "System Design", icon: "🏗️" },
    { id: "case-studies", name: "Case Studies", icon: "📊" },
    { id: "lessons-learned", name: "Lessons Learned", icon: "💡" },
];

export const author = {
    name: "Pranjul Pal",
    avatar: "https://avatars.githubusercontent.com/u/pranjul-pal26",
    bio: "AI Engineer building production-ready LLM applications. I write about real-world experiences with LangChain, RAG systems, and AI infrastructure.",
};

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "how-i-built-production-ready-rag-system",
        title: "How I Built a Production-Ready RAG System",
        excerpt: "From prototype to production: the architecture decisions, pitfalls, and optimizations that made our RAG system actually work at scale.",
        content: `
# How I Built a Production-Ready RAG System

Building a RAG (Retrieval Augmented Generation) system that works in a demo is easy. Building one that works in production? That's a completely different story.

## The Problem

When I first deployed our RAG system, it looked great in testing. Users could upload documents, ask questions, and get relevant answers. But once we hit production with real users and real documents, everything started breaking.

## What Went Wrong

### 1. Chunking Strategy Matters More Than You Think

I started with the naive approach: split documents into 1000-character chunks with 200-character overlap. It worked for simple documents, but failed miserably for:

- **Tables**: Split right in the middle, losing context
- **Code blocks**: Broken syntax, useless chunks
- **Lists**: Items separated from their headers

**The fix**: Semantic chunking based on document structure. We used markdown parsing to respect headers, code blocks, and list boundaries.

### 2. Embedding Quality != Retrieval Quality

Just because two chunks have similar embeddings doesn't mean they answer the same question. We had cases where the system retrieved chunks about "Python performance" when users asked about "Python syntax" because both contained similar vocabulary.

**The fix**: Hybrid search combining dense embeddings with BM25 sparse retrieval. The combination dramatically improved relevance.

### 3. The Context Window Trap

RAG tutorials often gloss over this: when you retrieve 5 chunks and stuff them into a prompt, you're often wasting most of your context window on irrelevant text while missing the actual answer.

**The fix**: Re-ranking. We added a cross-encoder re-ranker that scores each chunk against the actual question before including it in the context.

## The Architecture That Works

\`\`\`
User Query
    ↓
Query Expansion (LLM rewrites query)
    ↓
Hybrid Search (Dense + Sparse)
    ↓
Re-ranking (Cross-encoder)
    ↓
Context Assembly
    ↓
LLM Generation
    ↓
Response
\`\`\`

## Key Takeaways

- **Start with evaluation**: Build your test set before optimizing
- **Hybrid search is not optional**: Dense-only retrieval will fail you
- **Re-ranking is worth the latency**: The quality improvement justifies the extra 200ms
- **Monitor everything**: Log retrieval scores, not just final answers

## What's Next

In the next post, I'll dive into how we handle document updates and keep our vector store in sync with changing source documents.

---

*Have questions about RAG systems? Drop a comment or reach out on LinkedIn.*
        `,
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
        category: "rag-production",
        tags: ["RAG", "LangChain", "Production", "Vector Database"],
        readTime: 8,
        publishedAt: "2026-01-15",
        isFeatured: true,
        isTrending: true,
        author,
    },
    {
        id: "2",
        slug: "langchain-vs-llamaindex-real-comparison",
        title: "LangChain vs LlamaIndex: What I Learned After Using Both",
        excerpt: "After building production systems with both frameworks, here's my honest comparison of when to use each one.",
        content: `
# LangChain vs LlamaIndex: What I Learned After Using Both

Everyone asks this question. I've now built production systems with both, and here's my honest take.

## The Short Answer

**LangChain** is for building complex AI applications with multiple components.
**LlamaIndex** is for building search and retrieval systems.

But that's oversimplified. Let me explain.

## When I Use LangChain

### 1. Complex Workflows

LangChain shines when you need to chain multiple operations together. Think:
- Multi-step reasoning
- Tool use and function calling
- Agent-based systems

\`\`\`python
from langchain.agents import create_openai_functions_agent

agent = create_openai_functions_agent(
    llm=llm,
    tools=[search_tool, calculator_tool, database_tool],
    prompt=prompt
)
\`\`\`

### 2. Integration-Heavy Applications

LangChain has integrations for everything. If you need to connect 5 different services, LangChain probably has wrappers for all of them.

### 3. Experimentation

The abstractions make it easy to swap components. Testing GPT-4 vs Claude? Change one line.

## When I Use LlamaIndex

### 1. Document QA Systems

LlamaIndex was built for this. The indexing, retrieval, and synthesis pipeline is more refined.

\`\`\`python
from llama_index import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
\`\`\`

### 2. Complex Document Structures

LlamaIndex handles hierarchical documents better. If you have documents with nested sections, tables, and references, LlamaIndex's node structure is more natural.

### 3. Production RAG

The query pipelines and response synthesizers are more production-ready out of the box.

## The Honest Truth

Both frameworks are converging. LangChain added better RAG support, LlamaIndex added agent capabilities. The differences are becoming less significant.

## My Recommendation

- **Start with LlamaIndex** if your core use case is document search/QA
- **Start with LangChain** if you're building a multi-tool agent or complex workflow
- **Use both** if needed - they integrate well together

## Key Takeaways

- Neither is universally better
- Your use case determines the choice
- Don't over-engineer - pick one and ship
- You can always migrate later

---

*What's your experience with these frameworks? Let me know in the comments.*
        `,
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        category: "langchain-agents",
        tags: ["LangChain", "LlamaIndex", "Comparison", "Framework"],
        readTime: 6,
        publishedAt: "2026-01-12",
        isFeatured: false,
        isTrending: true,
        author,
    },
    {
        id: "3",
        slug: "why-your-rag-system-gives-wrong-answers",
        title: "Why Your RAG System Gives Wrong Answers",
        excerpt: "The 5 most common reasons RAG systems fail and how to fix each one with practical solutions.",
        content: `
# Why Your RAG System Gives Wrong Answers

Your RAG system retrieves documents. It generates answers. But they're wrong. Sound familiar?

Here are the 5 most common causes I've seen, and how to fix them.

## 1. Your Chunks Are Too Big (or Too Small)

**The Problem**: Large chunks contain irrelevant information that confuses the LLM. Small chunks lose context.

**The Fix**: 
- Aim for 500-1000 tokens per chunk
- Use semantic boundaries (paragraphs, sections)
- Test different sizes with your actual queries

## 2. You're Not Re-ranking

**The Problem**: Vector similarity ≠ relevance. The embedding model wasn't trained on your domain.

**The Fix**:
\`\`\`python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
scores = reranker.predict([(query, doc) for doc in retrieved_docs])
\`\`\`

## 3. Your Embedding Model Is Wrong

**The Problem**: Generic embedding models don't understand domain-specific terminology.

**The Fix**:
- Fine-tune on your domain (if you have data)
- Use domain-specific models when available
- Try multiple models and evaluate

## 4. The Answer Isn't In Your Documents

**The Problem**: Sometimes the system confidently generates wrong answers because the real answer doesn't exist in the corpus.

**The Fix**:
- Add a confidence threshold
- Implement "I don't know" responses
- Check retrieval scores before generating

## 5. Context Pollution

**The Problem**: You retrieve 10 chunks, but only 2 are relevant. The other 8 confuse the LLM.

**The Fix**:
- Retrieve more, include less
- Use retrieval scores to filter
- Summarize context before injection

## The Debugging Checklist

1. ✅ Check what's actually being retrieved
2. ✅ Verify the answer exists in retrieved context
3. ✅ Test the same prompt with manual context injection
4. ✅ Compare embedding similarity scores
5. ✅ Try different chunk sizes

## Key Takeaways

- Most RAG failures are retrieval failures
- Always log and inspect your retrieved chunks
- Re-ranking is essential, not optional
- "I don't know" is a valid answer

---

*Debugging a tricky RAG issue? Share it in the comments - I might feature it in a future post.*
        `,
        thumbnail: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=400&fit=crop",
        category: "ai-systems",
        tags: ["RAG", "Debugging", "LLM", "Best Practices"],
        readTime: 5,
        publishedAt: "2026-01-10",
        isFeatured: false,
        isTrending: true,
        author,
    },
    {
        id: "4",
        slug: "from-side-project-to-production-mistakes",
        title: "From Side Project to Production: Mistakes I Made",
        excerpt: "The hard lessons I learned taking an AI side project to production - so you don't have to learn them the hard way.",
        content: `
# From Side Project to Production: Mistakes I Made

I built an AI chatbot as a weekend project. Getting it to production took 3 months. Here's what I wish I knew.

## Mistake 1: Ignoring Rate Limits

**What happened**: My app went viral on Reddit. OpenAI rate limits kicked in. Users got errors.

**The lesson**: 
- Implement request queuing from day 1
- Have fallback models ready
- Show users meaningful error messages

## Mistake 2: No Cost Tracking

**What happened**: I woke up to a $500 bill. One user had been sending the entire Harry Potter series through my chatbot.

**The lesson**:
\`\`\`python
# Always track token usage
def track_cost(prompt_tokens, completion_tokens):
    cost = (prompt_tokens * 0.00003) + (completion_tokens * 0.00006)
    log_to_database(user_id, cost)
    if get_user_total_cost(user_id) > FREE_TIER_LIMIT:
        raise CostLimitExceeded()
\`\`\`

## Mistake 3: Trusting LLM Output

**What happened**: A user asked for "Python code" and the LLM generated actual working malware code. Another user got financial advice.

**The lesson**:
- Output filtering is mandatory
- Implement content moderation
- Add disclaimers for sensitive topics

## Mistake 4: No Caching

**What happened**: Users asked the same common questions repeatedly. Every request hit the API.

**The lesson**:
- Cache common queries
- Implement semantic caching (similar queries → same response)
- Use Redis or a simple in-memory cache

## Mistake 5: Sync Everything

**What happened**: LLM calls take 2-5 seconds. My Flask app could only handle 4 concurrent users.

**The lesson**:
- Use async from the start
- Implement streaming responses
- Show users that something is happening

## The Production Checklist

Before going live:

- [ ] Rate limiting per user
- [ ] Cost tracking and limits
- [ ] Output moderation
- [ ] Response caching
- [ ] Async processing
- [ ] Error handling and fallbacks
- [ ] Logging and monitoring
- [ ] Terms of service

## Key Takeaways

- Production is 10x harder than the prototype
- Users will do unexpected things
- Monitor costs obsessively
- Build defensive systems

---

*Learning from my mistakes? Follow for more production AI content.*
        `,
        thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop",
        category: "lessons-learned",
        tags: ["Production", "Best Practices", "Mistakes", "Scaling"],
        readTime: 7,
        publishedAt: "2026-01-08",
        isFeatured: true,
        isTrending: false,
        author,
    },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedBlogs(): BlogPost[] {
    return blogPosts.filter((post) => post.isFeatured);
}

export function getTrendingBlogs(): BlogPost[] {
    return blogPosts.filter((post) => post.isTrending);
}

export function getBlogsByCategory(categoryId: string): BlogPost[] {
    if (categoryId === "all") return blogPosts;
    return blogPosts.filter((post) => post.category === categoryId);
}
