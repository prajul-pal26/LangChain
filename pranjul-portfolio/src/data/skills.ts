export interface Skill {
  name: string;
  level: "Core" | "Proficient";
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Agentic AI & GenAI",
    skills: [
      { name: "OpenClaw / NemoClaw", level: "Core" },
      { name: "CrewAI", level: "Core" },
      { name: "LangChain / LangGraph", level: "Core" },
      { name: "LlamaIndex", level: "Proficient" },
      { name: "RAG Pipelines", level: "Core" },
      { name: "Fine-tuning (LoRA/QLoRA)", level: "Proficient" },
      { name: "n8n / Antigravity", level: "Proficient" },
    ],
  },
  {
    title: "ML & Frameworks",
    skills: [
      { name: "Python", level: "Core" },
      { name: "PyTorch", level: "Core" },
      { name: "Hugging Face", level: "Core" },
      { name: "TensorFlow", level: "Proficient" },
      { name: "Scikit-learn", level: "Proficient" },
      { name: "FastAPI / Django", level: "Core" },
      { name: "OpenAI API", level: "Core" },
    ],
  },
  {
    title: "Infra & DevOps",
    skills: [
      { name: "Docker", level: "Core" },
      { name: "AWS (EC2, S3, Lambda)", level: "Core" },
      { name: "PostgreSQL / Redis", level: "Core" },
      { name: "CI/CD Pipelines", level: "Proficient" },
      { name: "MLflow / W&B", level: "Proficient" },
      { name: "Git / Linux", level: "Core" },
      { name: "Celery", level: "Proficient" },
    ],
  },
];
