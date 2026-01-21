const educationData = [
    {
        school: "Imperial College Business School",
        degree: "MSc in Management",
        location: "London, UK",
        date: "August 2024 - August 2025"
    },
    {
        school: "Vellore Institute of Technology",
        degree: "B.Tech Electronics and Communication Engineering",
        location: "Vellore, India",
        date: "July 2018 - May 2022"
    }
];

export function Education() {
    return (
        <section className="section" id="education">
            <div className="container">
                <h2 className="section-title">
                    <span className="title-icon">🎓</span>
                    Education
                </h2>
                <div className="education-grid">
                    {educationData.map((edu, index) => (
                        <div key={index} className="education-card glass-card">
                            <h3 className="education-school">{edu.school}</h3>
                            <p className="education-degree">{edu.degree}</p>
                            <div className="education-meta">
                                <span className="location">📍 {edu.location}</span>
                                <span className="date">📅 {edu.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
