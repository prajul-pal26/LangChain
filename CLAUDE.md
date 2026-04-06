# CLAUDE.md — The Generative Edge (Pranjul Pal's Personal Website)

## Project Overview

**"The Generative Edge"** is Pranjul's personal AI portfolio website. It showcases hands-on AI projects built with LangChain, RAG, LangGraph, and related technologies. The site includes a public-facing portfolio, a blog system, and an admin panel for blog management.

---

## Repository Structure

```
/LangChain
├── config.json          # Central site configuration (name, email, phone, social links, ports)
├── requirements.txt     # Python dependencies
├── main.py              # Python entry point
├── main.sh              # Shell startup script
├── REACT/               # Frontend React application
├── 1-Chatbot/           # AI Chatbot (LangChain + Streamlit)
├── 2-Rag/               # RAG Document Assistant
├── 3-Langchain/         # LangChain examples/experiments
└── 5-LangGraph/         # LangGraph workflows
```

---

## Frontend (REACT/)

**Stack:** React 19, TypeScript, Vite 7, Tailwind CSS v4, Framer Motion, React Router v7, Lucide React

### Dev Server
```bash
cd REACT && npm run dev     # runs on port 5173
npm run build               # production build
npm run lint                # ESLint check
```

### Routing (`App.tsx`)
| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Main portfolio page |
| `/blogs` | `BlogsPage` | Blog listing with category filter |
| `/blogs/:slug` | `BlogPostPage` | Individual blog post |
| `/blog-generator` | `AdminLayout` | Admin dashboard |
| `/blog-generator/blogs` | `BlogListPage` | Admin: manage blogs |
| `/blog-generator/blogs/new` | `BlogEditorPage` | Admin: create blog |
| `/blog-generator/blogs/edit/:id` | `BlogEditorPage` | Admin: edit blog |

### HomePage Sections (in order)
1. **Header** — Fixed nav with scroll-aware backdrop, mobile menu, contact modals (phone/email), social icons
2. **Hero** — Full-screen with animated background shapes (ElegantShape), gradient title "The Generative Edge — by Pranjul", CTA buttons
3. **Stats** — 3 stat cards: "3+ AI Projects", "5+ Technologies", "100% Open Source"
4. **Projects** — 3 project cards: AI Chatbot, RAG Document Assistant, Blog Generator
5. **Features** — 8 technology tiles: LangChain, RAG, AI Agents, LangGraph, LangSmith, FastAPI, AWS, Redis
6. **LaunchSection** — Launch buttons for Chatbot, RAG, and Blog Generator
7. **Footer** — Brand, contact info, social links

### Key Source Paths
- `src/config/site.ts` — imports `config.json` from root via `@config` alias; computes prod/dev URLs
- `src/data/blogs.ts` — blog data and `getBlogsByCategory()` helper
- `src/components/ui/` — reusable UI: `AnimatedDots`, `FloatingParticles`, `GlowingOrbs`, `GridPattern`, `WaveLines`, `ElegantShape`, `PhoneModal`/`EmailModal`
- `src/components/admin/` — `AdminLayout`, `StatsCard`, `StatusBadge`
- `src/components/blog/` — `BlogHero`, `TrendingBlogs`, `CategoryFilter`, `BlogGrid`, `NewsletterCTA`

### Vite Path Aliases
- `@/` → `src/`
- `@config` → root `config.json`

---

## Central Configuration (`config.json`)

All site-wide values live here. Edit this file to update the name, contact info, or ports everywhere.

```json
{
    "name": "Pranjul Pal",
    "email": "pranjulpal04@gmail.com",
    "phone": "+91-9548136921",
    "whatsapp": "919548136921",
    "github": "https://github.com/prajul-pal26",
    "linkedin": "https://www.linkedin.com/in/pranjul-pal-2666p",
    "ports": { "react": 5173, "chatbot": 8502, "rag": 8503 },
    "production": { "chatbotUrl": "/chatbot/", "ragUrl": "/rag/" }
}
```

---

## Python Backend Projects

| Folder | Description | Key Tech |
|---|---|---|
| `1-Chatbot/` | AI chatbot with Streamlit UI and memory | LangChain, Streamlit, LangGraph |
| `2-Rag/` | Upload PDF/TXT and chat with it | RAG, Vector DB, Embeddings |
| `3-Langchain/` | LangChain examples and experiments | LangChain |
| `5-LangGraph/` | Stateful AI workflows (Blog Generator) | LangGraph, LangSmith |

The Blog Generator backend (`5-LangGraph/`) powers the `/blog-generator` admin section — it researches keywords, generates content, evaluates quality, and optimizes for SEO.

---

## Design System

- **Color scheme:** Near-black backgrounds (`#030303`, `#0c0c12`, `#0e0e16`) with white/indigo/rose/amber/cyan accents
- **Font:** `Outfit` (display headings), system sans-serif (body)
- **Animations:** Framer Motion throughout — scroll-triggered reveals, hover lifts, animated background elements
- **UI pattern:** Glassmorphism cards with `backdrop-blur`, subtle `border-white/[0.08]` borders, gradient glow on hover

---

## Known Issues / TODOs

- `LaunchSection`: "Launch Chatbot" and "Launch RAG" buttons call `e.preventDefault()` — they are not yet wired to actual URLs. The chatbot/RAG apps run on ports 8502/8503 and the URLs are available via `config.chatbotUrl` / `config.ragUrl`.
- The `Admin` nav link is visible to all users — there is no authentication on the admin routes.
