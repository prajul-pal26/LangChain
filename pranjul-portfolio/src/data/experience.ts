export interface Experience {
  date: string;
  current?: boolean;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    date: "April 2026 — Present",
    current: true,
    role: "AI Engineer",
    company: "Famous Innovations — Political Consultancy",
    location: "Lucknow",
    bullets: [
      "Designing autonomous AI agents using OpenClaw and NemoClaw that execute complex enterprise workflows with minimal human intervention",
      "Architecting multi-agent systems with CrewAI and n8n for intelligent task routing, decision-making, and cross-departmental automation",
      "Leading development of proprietary AI products from early-stage R&D to production deployment",
      "Optimizing LLM tool-calling mechanisms, prompt strategies, and agent reliability through systematic evaluation",
    ],
  },
  {
    date: "Sep 2024 — April 2026",
    role: "Software Developer",
    company: "DeepVidya.ai — OpenCV University",
    location: "Bengaluru",
    bullets: [
      "Developed and maintained scalable platform features serving thousands of AI/ML learners worldwide",
      "Built end-to-end ML pipelines and integrated AI-powered features into the learning platform using FastAPI",
      "Achieved 40% latency reduction through Redis caching and Celery task queue optimization",
      "Designed and deployed RESTful APIs with comprehensive testing and documentation",
    ],
  },
  {
    date: "April 2024 — Sep 2024",
    role: "Full-Stack Python Developer",
    company: "CaseDocker — Smart Legal Workdesk",
    location: "Noida",
    bullets: [
      "Built full-stack Django applications for legal document management with advanced search and NLP capabilities",
      "Implemented natural language processing features for automated document classification and summarization",
      "Deployed and managed applications on AWS (EC2, S3, Lambda) with CI/CD pipelines",
    ],
  },
];
