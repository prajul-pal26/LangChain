export interface Project {
  title: string;
  badge: string;
  org: string;
  description: string;
  tags: string[];
  flagship?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI-Powered Social Media Automation Pipeline",
    badge: "FLAGSHIP",
    org: "DeepVidya.ai · Production System",
    description:
      "Built an end-to-end autonomous content pipeline using OpenClaw agents orchestrated through n8n. The system researches trending topics, generates platform-optimized content with Claude Code, schedules posts across channels, and feeds engagement analytics back into the planning loop — reducing content creation time by 80% while maintaining brand voice consistency.",
    tags: ["OpenClaw", "Claude Code", "n8n", "Multi-Agent", "Analytics"],
    flagship: true,
  },
  {
    title: "AI Blog Generator with Self-Evaluation",
    badge: "AGENTIC AI",
    org: "Personal Project · Production",
    description:
      "A multi-agent blog generation system using LangGraph that researches keywords, generates structured content, self-evaluates quality with multiple LLM judges, and optimizes for SEO — all autonomously.",
    tags: ["LangGraph", "Multi-LLM", "Self-Eval"],
  },
  {
    title: "GenerativeEdge — AI Learning Hub",
    badge: "KNOWLEDGE BASE",
    org: "Personal Project · Live",
    description:
      "A comprehensive AI knowledge platform featuring technical blog posts, project showcases, and learning resources for the AI engineering community.",
    tags: ["Next.js", "Technical Blog", "Knowledge System"],
  },
];
