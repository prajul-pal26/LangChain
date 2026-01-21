interface NavbarProps {
    activeSection: string;
    onNavClick: (section: string) => void;
}

export function Navbar({ activeSection, onNavClick }: NavbarProps) {
    const navLinks = ['about', 'experience', 'projects', 'skills', 'leadership', 'contact'];

    return (
        <nav className="navbar">
            <div className="nav-container">
                {navLinks.map((link) => (
                    <button
                        key={link}
                        className={`nav-link ${activeSection === link ? 'active' : ''}`}
                        onClick={() => onNavClick(link)}
                    >
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                    </button>
                ))}
            </div>
        </nav>
    );
}
