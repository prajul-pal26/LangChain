export interface Tech {
  name: string;
  level: "Core" | "Proficient" | "Learning";
  note: string;
  useCase: string;
  pros: string[];
  cons: string[];
}

export interface TechCategory {
  title: string;
  icon: string;
  description: string;
  techs: Tech[];
}

export const techCategories: TechCategory[] = [
  {
    title: "Agentic AI",
    icon: "🤖",
    description: "Frameworks for building autonomous AI agents that reason, plan, and execute tasks.",
    techs: [
      {
        name: "OpenClaw",
        level: "Core",
        note: "Enterprise-grade agent framework with built-in tool orchestration and multi-step planning.",
        useCase: "Complex enterprise workflows with minimal human intervention",
        pros: ["Production-ready", "Great tool orchestration", "Built-in memory"],
        cons: ["Steeper learning curve", "Heavier setup"],
      },
      {
        name: "CrewAI",
        level: "Core",
        note: "Multi-agent orchestration framework where specialized agents collaborate on tasks.",
        useCase: "Multi-agent systems with role-based task delegation",
        pros: ["Easy role-based agents", "Great for teams of agents", "Simple API"],
        cons: ["Less fine-grained control", "Newer ecosystem"],
      },
      {
        name: "LangChain / LangGraph",
        level: "Core",
        note: "The most popular LLM orchestration library. LangGraph adds stateful graph-based workflows.",
        useCase: "Building chains, RAG pipelines, and stateful agent workflows",
        pros: ["Huge ecosystem", "Great docs", "Graph-based state machines"],
        cons: ["Can be over-abstracted", "Frequent breaking changes"],
      },
      {
        name: "LlamaIndex",
        level: "Proficient",
        note: "Specialized for data ingestion, indexing, and retrieval — the RAG specialist.",
        useCase: "Document-heavy RAG systems with complex data sources",
        pros: ["Best-in-class indexing", "Great for structured data", "Easy ingestion"],
        cons: ["Less flexible for non-RAG tasks", "Smaller agent ecosystem"],
      },
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    description: "UI frameworks, styling, and tools for building modern web interfaces.",
    techs: [
      {
        name: "Next.js",
        level: "Core",
        note: "React framework with SSR, SSG, API routes, and file-based routing. The default for production React.",
        useCase: "Full-stack React apps with SEO, server rendering, and API routes",
        pros: ["SSR/SSG built-in", "Great DX", "Vercel deployment"],
        cons: ["Complex caching model", "Vendor-tied deployment"],
      },
      {
        name: "React",
        level: "Core",
        note: "The dominant UI library. Component-based, declarative, with a massive ecosystem.",
        useCase: "Building interactive UIs, SPAs, and component libraries",
        pros: ["Huge ecosystem", "Component model", "React Server Components"],
        cons: ["Boilerplate for state management", "JSX learning curve"],
      },
      {
        name: "TypeScript",
        level: "Core",
        note: "Typed superset of JavaScript. Catches bugs at compile time, improves DX.",
        useCase: "Any JavaScript project — type safety, better IDE support, fewer runtime bugs",
        pros: ["Compile-time safety", "Great IDE support", "Self-documenting"],
        cons: ["Build step required", "Complex generics", "Slower iteration initially"],
      },
      {
        name: "Tailwind CSS",
        level: "Core",
        note: "Utility-first CSS framework. Write styles directly in your markup.",
        useCase: "Rapid UI development without leaving your HTML/JSX",
        pros: ["No context switching", "Consistent design", "Tiny production CSS"],
        cons: ["Long class strings", "Design system lock-in"],
      },
      {
        name: "Framer Motion",
        level: "Proficient",
        note: "Production-ready animation library for React with declarative API.",
        useCase: "Page transitions, scroll animations, interactive UI elements",
        pros: ["Declarative API", "Layout animations", "Gesture support"],
        cons: ["Bundle size", "Can hurt performance if overused"],
      },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    description: "Server-side frameworks and runtimes for building APIs and services.",
    techs: [
      {
        name: "FastAPI",
        level: "Core",
        note: "Async-first Python framework with automatic OpenAPI docs and Pydantic validation.",
        useCase: "High-performance AI APIs with streaming support",
        pros: ["Async by default", "Auto-generated docs", "Pydantic integration"],
        cons: ["Smaller plugin ecosystem", "No built-in admin"],
      },
      {
        name: "Django",
        level: "Core",
        note: "Batteries-included Python framework with ORM, admin panel, and auth out of the box.",
        useCase: "Full-stack web apps with database-heavy features",
        pros: ["Built-in admin", "Mature ORM", "Auth/permissions included"],
        cons: ["Sync by default", "Heavier for simple APIs"],
      },
      {
        name: "Node.js",
        level: "Proficient",
        note: "JavaScript runtime for server-side code. Event-driven, non-blocking I/O.",
        useCase: "Real-time apps, API servers, and JavaScript full-stack projects",
        pros: ["Same language as frontend", "Fast I/O", "Huge npm ecosystem"],
        cons: ["Callback complexity", "Single-threaded CPU tasks", "Dependency bloat"],
      },
      {
        name: "n8n",
        level: "Proficient",
        note: "Low-code workflow automation platform for connecting AI agents to external services.",
        useCase: "Automating multi-step workflows across tools and APIs",
        pros: ["Visual workflow builder", "500+ integrations", "Self-hostable"],
        cons: ["Less code control", "Performance limits at scale"],
      },
    ],
  },
  {
    title: "ML & Models",
    icon: "🧠",
    description: "Machine learning frameworks, model providers, and training tools.",
    techs: [
      {
        name: "PyTorch",
        level: "Core",
        note: "The dominant deep learning framework for research and production AI.",
        useCase: "Model training, fine-tuning, and custom architectures",
        pros: ["Dynamic computation graphs", "Research-friendly", "Huge community"],
        cons: ["More boilerplate for production", "Steeper deployment curve"],
      },
      {
        name: "Hugging Face",
        level: "Core",
        note: "The hub for pre-trained models, datasets, and the Transformers library.",
        useCase: "Loading pre-trained models, fine-tuning, and inference",
        pros: ["Massive model hub", "Easy fine-tuning", "Great community"],
        cons: ["Can be slow for large models", "API rate limits"],
      },
      {
        name: "TensorFlow",
        level: "Proficient",
        note: "Google's ML framework — strong for production deployment and TFLite mobile.",
        useCase: "Production ML pipelines and mobile/edge deployment",
        pros: ["TF Serving for production", "TFLite for mobile", "TPU support"],
        cons: ["More verbose API", "Declining community preference"],
      },
      {
        name: "OpenAI API",
        level: "Core",
        note: "GPT-4, embeddings, and function calling via API — the most used LLM provider.",
        useCase: "LLM inference, embeddings, and tool-calling agents",
        pros: ["Best-in-class models", "Easy API", "Great function calling"],
        cons: ["Vendor lock-in", "Cost at scale", "No self-hosting"],
      },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    description: "Data storage — relational, NoSQL, vector, and caching layers.",
    techs: [
      {
        name: "PostgreSQL",
        level: "Core",
        note: "The most advanced open-source relational database with pgvector for embeddings.",
        useCase: "Application data + vector storage via pgvector extension",
        pros: ["Rock-solid reliability", "pgvector for AI", "Advanced queries"],
        cons: ["Horizontal scaling is harder", "No built-in caching"],
      },
      {
        name: "Redis",
        level: "Core",
        note: "In-memory data store for caching, session management, and AI agent memory.",
        useCase: "Sub-millisecond caching, conversation history, and semantic cache",
        pros: ["Ultra-fast", "Flexible data structures", "TTL-based memory decay"],
        cons: ["Memory-bound", "Persistence needs config", "Cost for large datasets"],
      },
      {
        name: "Supabase",
        level: "Learning",
        note: "Open-source Firebase alternative built on PostgreSQL. Auth, storage, realtime, and edge functions.",
        useCase: "Full backend-as-a-service for web apps without managing infrastructure",
        pros: ["PostgreSQL under the hood", "Built-in auth", "Realtime subscriptions"],
        cons: ["Less control than raw Postgres", "Vendor dependency", "Pricing at scale"],
      },
    ],
  },
  {
    title: "Cloud & Infra",
    icon: "☁️",
    description: "Cloud platforms, containerization, and deployment infrastructure.",
    techs: [
      {
        name: "AWS (EC2, S3, Lambda)",
        level: "Core",
        note: "The most comprehensive cloud platform — EC2 for compute, S3 for storage, Lambda for serverless.",
        useCase: "Full production deployment with auto-scaling and managed services",
        pros: ["Most services available", "Great scaling", "Mature ecosystem"],
        cons: ["Complex pricing", "Steep learning curve", "Vendor lock-in"],
      },
      {
        name: "Docker",
        level: "Core",
        note: "Containerization standard — package your AI app with all dependencies.",
        useCase: "Reproducible deployments across dev, staging, and production",
        pros: ["Universal standard", "Isolation", "Easy CI/CD integration"],
        cons: ["Image size for ML models", "Networking complexity"],
      },
      {
        name: "Celery",
        level: "Proficient",
        note: "Distributed task queue for running background jobs and async AI pipelines.",
        useCase: "Background processing for long-running AI tasks",
        pros: ["Proven at scale", "Multiple broker support", "Retry logic"],
        cons: ["Complex debugging", "Requires message broker", "Monitoring overhead"],
      },
    ],
  },
  {
    title: "Observability",
    icon: "📊",
    description: "Monitoring, debugging, and optimization tools for AI systems.",
    techs: [
      {
        name: "LangSmith",
        level: "Core",
        note: "Observability platform for LLM apps — full traces, eval datasets, and prompt versioning.",
        useCase: "Debugging LLM chains, evaluating outputs, and tracking costs",
        pros: ["Full trace visibility", "Eval datasets", "Prompt versioning"],
        cons: ["LangChain-centric", "Paid at scale"],
      },
      {
        name: "MLflow / W&B",
        level: "Proficient",
        note: "Experiment tracking and model registry — MLflow is open-source, W&B is managed.",
        useCase: "Tracking training runs, comparing experiments, model versioning",
        pros: ["Experiment comparison", "Model registry", "Team collaboration"],
        cons: ["Setup overhead", "W&B can be costly"],
      },
    ],
  },
  {
    title: "Tools & OS",
    icon: "🛠️",
    description: "Dev tools, operating systems, and utilities that power the daily workflow.",
    techs: [
      {
        name: "Ubuntu / Linux",
        level: "Core",
        note: "Primary development OS. Server-side standard. Shell scripting, SSH, systemd, and everything terminal.",
        useCase: "Development environment, production servers, and CI/CD runners",
        pros: ["Free & open-source", "Package management", "Server standard"],
        cons: ["Desktop app gaps", "Hardware driver issues sometimes"],
      },
      {
        name: "Git",
        level: "Core",
        note: "Distributed version control. Branching, merging, rebasing — the backbone of all code.",
        useCase: "Every project, every team, every day",
        pros: ["Industry standard", "Powerful branching", "GitHub/GitLab ecosystem"],
        cons: ["Complex merge conflicts", "Steep learning curve for advanced ops"],
      },
      {
        name: "VS Code",
        level: "Core",
        note: "Primary code editor with extensions for Python, TypeScript, AI-assisted coding.",
        useCase: "Writing code, debugging, terminal integration, and AI pair programming",
        pros: ["Extension ecosystem", "Integrated terminal", "Free"],
        cons: ["Memory usage", "Can feel slow on large projects"],
      },
      {
        name: "Nginx",
        level: "Proficient",
        note: "High-performance web server and reverse proxy. SSL termination, load balancing.",
        useCase: "Serving static sites, reverse proxying to app servers, SSL termination",
        pros: ["Extremely fast", "Low memory", "Battle-tested"],
        cons: ["Config syntax", "Module compilation for extras"],
      },
    ],
  },
];
