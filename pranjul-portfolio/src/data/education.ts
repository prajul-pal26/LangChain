export interface Education {
  date: string;
  current?: boolean;
  degree: string;
  institution: string;
  note?: string;
}

export const educations: Education[] = [
  {
    date: "2025 — 2026",
    current: true,
    degree: "Executive Diploma in ML & AI",
    institution: "upGrad & IIIT Bangalore",
    note: "Specialization in Generative AI",
  },
  {
    date: "2019 — 2023",
    degree: "B.Tech in Electrical Engineering",
    institution: "MMMUT, Gorakhpur",
  },
];
