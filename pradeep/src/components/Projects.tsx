const projectsData = [
    {
        icon: "🛡️",
        title: "GuardML",
        description: "Machine learning-based intrusion detection system with real-time threat analysis and automated response capabilities."
    },
    {
        icon: "📊",
        title: "InvestIQ",
        description: "AI-powered investment analysis platform providing data-driven insights for portfolio optimization."
    },
    {
        icon: "🔐",
        title: "SecureVault",
        description: "Enterprise password management solution with zero-knowledge encryption and multi-factor authentication."
    }
];

export function Projects() {
    return (
        <section className="section" id="projects">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-icon">🚀</span>
                    Featured Projects
                </h2>
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div key={index} className="project-card glass-card">
                            <div className="project-icon">{project.icon}</div>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
