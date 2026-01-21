const skillsData = [
    {
        category: "Technical Skills",
        skills: ["Python", "JavaScript", "AWS", "Azure", "Docker", "Kubernetes", "Terraform", "SQL"]
    },
    {
        category: "Cybersecurity",
        skills: ["SIEM", "Penetration Testing", "Threat Modeling", "Incident Response", "Risk Assessment", "Compliance"]
    },
    {
        category: "Business & Strategy",
        skills: ["Business Analysis", "Stakeholder Management", "Vendor Due Diligence", "Project Management", "Strategic Planning"]
    }
];

export function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-icon">⚙️</span>
                    Skills
                </h2>
                <div className="skills-grid">
                    {skillsData.map((category, index) => (
                        <div key={index} className="skill-category glass-card">
                            <h3 className="skill-category-title">{category.category}</h3>
                            <div className="skill-tags">
                                {category.skills.map((skill, i) => (
                                    <span key={i} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
