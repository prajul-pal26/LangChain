const experienceData = [
    {
        role: "Solutions Architect",
        company: "Deloitte UK",
        date: "2023 - 2024",
        responsibilities: [
            "Led security architecture assessments for enterprise clients",
            "Developed automation tools reducing manual effort by 40%",
            "Conducted vendor due diligence for cybersecurity solutions",
            "Created business cases driving multi-million dollar investments"
        ]
    },
    {
        role: "Cybersecurity Analyst",
        company: "Tech Solutions Ltd",
        date: "2022 - 2023",
        responsibilities: [
            "Monitored and analyzed security threats and vulnerabilities",
            "Implemented security protocols and incident response procedures",
            "Collaborated with development teams on secure coding practices"
        ]
    }
];

export function Experience() {
    return (
        <section className="section" id="experience">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-icon">💼</span>
                    Professional Experience
                </h2>
                <div className="experience-timeline">
                    {experienceData.map((exp, index) => (
                        <div key={index} className="experience-card glass-card">
                            <div className="experience-header">
                                <h3 className="experience-role">{exp.role}</h3>
                                <span className="experience-date">{exp.date}</span>
                            </div>
                            <p className="experience-company">{exp.company}</p>
                            <ul className="experience-list">
                                {exp.responsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
