const leadershipData = [
    {
        role: "Academic Mentor",
        org: "Imperial College London",
        description: "Mentoring undergraduate students in career development and academic excellence."
    },
    {
        role: "Captain",
        org: "Indian Crossbow Team",
        description: "Led the national team in international competitions, developing team strategies and training programs."
    }
];

export function Leadership() {
    return (
        <section className="section" id="leadership">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-icon">🏆</span>
                    Leadership & Volunteering
                </h2>
                <div className="leadership-grid">
                    {leadershipData.map((item, index) => (
                        <div key={index} className="leadership-card glass-card">
                            <h3 className="leadership-role">{item.role}</h3>
                            <p className="leadership-org">{item.org}</p>
                            <p className="leadership-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
