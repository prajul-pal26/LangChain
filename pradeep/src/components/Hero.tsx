export function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <p className="hero-tagline">SOLUTIONS ARCHITECT • CYBERSECURITY • AUTOMATION • BUSINESS STRATEGY • OPERATIONS</p>
                <h1 className="hero-title">DRISHAN<br />DUTT</h1>
                <p className="hero-description">
                    Bridging complex cybersecurity operations with business strategies.<br />
                    Experienced in security architecture, vendor due diligence, and<br />
                    enterprise solutions.
                </p>
                <div className="hero-contact">
                    <a href="mailto:drishandutt9@gmail.com" className="contact-item">
                        <span className="contact-icon">✉</span>
                        <span>drishandutt9@gmail.com</span>
                    </a>
                    <a href="tel:+447873372993" className="contact-item">
                        <span className="contact-icon">📞</span>
                        <span>+44 7873 372993</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-item linkedin">
                        <span className="contact-icon">in</span>
                        <span>LinkedIn</span>
                    </a>
                </div>
                <div className="hero-buttons">
                    <a href="#experience" className="btn btn-primary">View Experience</a>
                    <a href="#contact" className="btn btn-outline">Get in Touch</a>
                </div>
                <div className="scroll-indicator">
                    <span className="chevron">⌄</span>
                </div>
            </div>
        </section>
    );
}
