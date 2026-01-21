const contactData = [
    {
        icon: "✉️",
        title: "Email",
        link: "mailto:drishandutt9@gmail.com",
        text: "drishandutt9@gmail.com"
    },
    {
        icon: "📞",
        title: "Phone",
        link: "tel:+447873372993",
        text: "+44 7873 372993"
    },
    {
        icon: "💼",
        title: "LinkedIn",
        link: "https://linkedin.com",
        text: "Connect on LinkedIn",
        external: true
    }
];

export function Contact() {
    return (
        <section className="section" id="contact">
            <div className="container">
                <h2 className="section-title-center">Let's Connect</h2>
                <p className="section-subtitle">I'm always open to discussing new opportunities and ideas</p>
                <div className="contact-grid">
                    {contactData.map((item, index) => (
                        <div key={index} className="contact-card glass-card">
                            <div className="contact-card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <a
                                href={item.link}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                            >
                                {item.text}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
