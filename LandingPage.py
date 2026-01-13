import streamlit as st
import time
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="LangChain AI Hub | Pranjul",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Modern CSS with trending design elements
st.markdown("""
<style>
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');
    
    /* Root variables */
    :root {
        --primary: #7c3aed;
        --secondary: #06b6d4;
        --accent: #f472b6;
        --bg-dark: #0a0a0f;
        --bg-card: rgba(255, 255, 255, 0.03);
        --text-primary: #ffffff;
        --text-secondary: #a1a1aa;
        --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        --glass: rgba(255, 255, 255, 0.05);
    }
    
    /* Global styles */
    .stApp {
        background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
        font-family: 'Inter', sans-serif;
    }
    
    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .stDeployButton {display: none;}
    [data-testid="stToolbar"] {display: none;}
    
    /* Force center alignment for all markdown content */
    [data-testid="stMarkdownContainer"] {
        width: 100% !important;
    }
    
    [data-testid="stMarkdownContainer"] p {
        text-align: center !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    .element-container {
        width: 100% !important;
    }
    
    /* Force center all paragraphs inside styled divs */
    .hero-container p,
    .hero-subtitle,
    .section-subtitle,
    #projects p,
    #features p {
        text-align: center !important;
        margin-left: auto !important;
        margin-right: auto !important;
        width: 100% !important;
        max-width: 700px !important;
        display: block !important;
    }
    
    /* Override Streamlit's default left alignment */
    .stMarkdown {
        width: 100% !important;
    }
    
    .stMarkdown p {
        text-align: center !important;
    }
    
    /* Hero Section */
    .hero-container {
        text-align: center;
        padding: 8rem 2rem 6rem 2rem;
        position: relative;
        overflow: hidden;
        background: radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%);
        margin: 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        border-radius: 0 0 50px 50px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    
    .hero-container::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 30% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
        animation: float 15s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .hero-badge {
        display: inline-block;
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.2));
        border: 1px solid rgba(124, 58, 237, 0.3);
        border-radius: 50px;
        padding: 0.5rem 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        color: #a78bfa;
        backdrop-filter: blur(10px);
    }
    
    .hero-title {
        font-family: 'Outfit', sans-serif;
        font-size: 7rem;
        font-weight: 800;
        background: linear-gradient(180deg, #ffffff 0%, #f3e8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1.5rem;
        line-height: 1.05;
        letter-spacing: -0.03em;
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.3));
        width: 100%;
        max-width: 100%;
        word-wrap: break-word;
    }
    
    .hero-subtitle {
        font-size: 1.4rem;
        color: #e2e8f0;
        max-width: 600px;
        margin: 0 auto 2.5rem auto;
        line-height: 1.6;
        text-align: center;
    }
    
    .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #0e7490, #0891b2);
        color: #ffffff;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(14, 116, 144, 0.4);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(14, 116, 144, 0.5);
        background: linear-gradient(135deg, #0891b2, #0e7490);
        color: #ffffff;
    }
    
    .btn-secondary {
        background: linear-gradient(135deg, #0e7490, #0891b2);
        color: #ffffff;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(14, 116, 144, 0.4);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    
    .btn-secondary:hover {
        background: linear-gradient(135deg, #0891b2, #0e7490);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(14, 116, 144, 0.5);
    }
    
    /* Stats Section */
    .stats-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        padding: 3rem 2rem;
        max-width: 900px;
        margin: 0 auto;
    }
    
    .stat-card {
        text-align: center;
        padding: 2rem;
        background: var(--glass);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        border-color: rgba(124, 58, 237, 0.3);
    }
    
    .stat-number {
        font-family: 'Outfit', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, #7c3aed, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: #a1a1aa;
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    /* Section Title */
    .section-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.8rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1rem;
        color: white; /* Fallback */
    }
    
    .section-title span {
        background: linear-gradient(180deg, #ffffff 0%, #f3e8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
    }
    
    .section-subtitle {
        text-align: center;
        color: #a1a1aa;
        font-size: 1.1rem;
        margin-bottom: 3rem;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
    }
    
    /* Center all section containers */
    #projects, #features {
        text-align: center;
        width: 100%;
    }
    
    /* Project Cards */
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .project-card {
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border-radius: 24px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #7c3aed, #06b6d4);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-8px);
        border-color: rgba(124, 58, 237, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .project-card:hover::before {
        opacity: 1;
    }
    
    .project-icon {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
    }
    
    .icon-purple { background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1)); }
    .icon-cyan { background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.1)); }
    .icon-pink { background: linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(244, 114, 182, 0.1)); }
    .icon-green { background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1)); }
    
    .project-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.4rem;
        font-weight: 600;
        color: white;
        margin-bottom: 0.8rem;
    }
    
    .project-description {
        color: #a1a1aa;
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .tag {
        background: rgba(124, 58, 237, 0.15);
        color: #a78bfa;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .tag-cyan {
        background: rgba(6, 182, 212, 0.15);
        color: #22d3ee;
    }
    
    .project-status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: #22c55e;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        background: #22c55e;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }
    
    .status-wip .status-dot {
        background: #eab308;
    }
    
    .status-wip {
        color: #eab308;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    /* Features Section */
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .feature-card {
        background: var(--glass);
        border-radius: 16px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        border-color: rgba(124, 58, 237, 0.2);
        background: rgba(255, 255, 255, 0.06);
    }
    
    .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .feature-title {
        color: white;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    
    .feature-desc {
        color: #71717a;
        font-size: 0.9rem;
    }
    
    /* Footer */
    .footer {
        text-align: center;
        padding: 3rem 2rem 0rem 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        margin-top: 4rem;
    }
    
    [data-testid="stAppViewBlockContainer"] {
        padding-bottom: 0rem !important;
    }
    
    .footer-text {
        color: #52525b;
        font-size: 0.9rem;
        margin-bottom: 0 !important;
    }
    
    .footer-links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 1.5rem;
    }
    
    .footer-link {
        color: #a1a1aa;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
    }
    
    .footer-link:hover {
        color: #7c3aed;
    }
    
    /* Glow effects */
    .glow-purple { box-shadow: 0 0 40px rgba(124, 58, 237, 0.15); }
    .glow-cyan { box-shadow: 0 0 40px rgba(6, 182, 212, 0.15); }
    
    /* Responsive */
    @media (max-width: 768px) {
        .hero-title { font-size: 2.5rem; }
        .hero-subtitle { font-size: 1rem; }
        .projects-grid { grid-template-columns: 1fr; padding: 1rem; }
        .section-title { font-size: 2rem; }
    }
    
    /* Streamlit specific fixes */
    .stButton > button {
        background: linear-gradient(135deg, #7c3aed, #06b6d4);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
    }
    
    /* Divider */
    .custom-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), transparent);
        margin: 3rem auto;
        max-width: 600px;
    }
    
    /* Social Header */
    .social-header {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .social-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #a1a1aa;
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .social-icon:hover {
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.3));
        border-color: rgba(124, 58, 237, 0.5);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
    }
    
    .social-icon.github:hover { background: linear-gradient(135deg, #333, #555); }
    .social-icon.linkedin:hover { background: linear-gradient(135deg, #0077b5, #00a0dc); }
    .social-icon.twitter:hover { background: linear-gradient(135deg, #1da1f2, #4dc1f9); }
</style>
""", unsafe_allow_html=True)

# Hero Section
st.markdown("""<div class="hero-container"><h1 class="hero-title">The Generative Edge</h1><p style="text-align: center; font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 500; margin-top: -10px; margin-bottom: 30px; color: #fdf2f8;">- by Pranjul</p><div class="social-header"><a href="https://github.com/prajul-pal26" target="_blank" class="social-icon github" title="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a><a href="https://linkedin.com/in/yourprofile" target="_blank" class="social-icon linkedin" title="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a><a href="https://twitter.com/yourhandle" target="_blank" class="social-icon twitter" title="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div><p class="hero-subtitle">Explore my collection of AI-powered projects using LangChain, RAG, and intelligent chatbots. Solving real-world problems with cutting-edge technology.</p><div class="hero-buttons"><a href="#projects" class="btn-primary">🚀 View Projects</a><a href="#features" class="btn-secondary">📚 Learn More</a></div></div>""", unsafe_allow_html=True)

# Stats Section
st.markdown("""
<div class="stats-container">
    <div class="stat-card glow-purple">
        <div class="stat-number">3+</div>
        <div class="stat-label">AI Projects</div>
    </div>
    <div class="stat-card glow-cyan">
        <div class="stat-number">5+</div>
        <div class="stat-label">Technologies</div>
    </div>
    <div class="stat-card glow-purple">
        <div class="stat-number">100%</div>
        <div class="stat-label">Open Source</div>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="custom-divider"></div>', unsafe_allow_html=True)

# Projects Section
st.markdown("""
<div id="projects">
    <h2 class="section-title">🎯 <span>My Projects</span></h2>
    <p class="section-subtitle" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important; width: 100% !important;">
        Hands-on AI projects that solve real problems and demonstrate practical applications
    </p>
</div>
""", unsafe_allow_html=True)

# Project Cards
st.markdown("""
<style>
    .project-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    .project-card-link:hover .project-card {
        transform: translateY(-8px);
        border-color: rgba(124, 58, 237, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    .launch-btn {
        background: linear-gradient(135deg, #0e7490, #0891b2);
        color: #ffffff;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(14, 116, 144, 0.4);
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    .launch-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(14, 116, 144, 0.5);
        background: linear-gradient(135deg, #0891b2, #0e7490);
    }
    .launch-btn-rag {
        background: linear-gradient(135deg, #0e7490, #0891b2);
        color: #ffffff;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(14, 116, 144, 0.4);
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    .launch-btn-rag:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(14, 116, 144, 0.5);
        background: linear-gradient(135deg, #0891b2, #0e7490);
    }
    .launch-btn-disabled {
        background: rgba(255, 255, 255, 0.1);
        color: #71717a;
        padding: 0.8rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        cursor: not-allowed;
    }
</style>
<div class="projects-grid">
    <a href="http://localhost:8502" target="_blank" class="project-card-link">
        <div class="project-card">
            <div class="project-icon icon-purple">🤖</div>
            <h3 class="project-title">AI Chatbot</h3>
            <p class="project-description">
                An intelligent conversational AI assistant built with LangChain and Streamlit. 
                Features beautiful UI, real-time responses, and memory persistence.
            </p>
            <div class="project-tags">
                <span class="tag">LangChain</span>
                <span class="tag tag-cyan">Streamlit</span>
                <span class="tag">Python</span>
            </div>
            <div class="project-status">
                <span class="status-dot"></span>
                Live & Running - Click to Open
            </div>
        </div>
    </a>
    <a href="http://localhost:8503" target="_blank" class="project-card-link">
        <div class="project-card">
            <div class="project-icon icon-cyan">🔍</div>
            <h3 class="project-title">RAG Document Assistant</h3>
            <p class="project-description">
                Upload any document (PDF/TXT) and chat with it. Uses RAG technology to 
                provide context-aware answers based on your data.
            </p>
            <div class="project-tags">
                <span class="tag">RAG</span>
                <span class="tag tag-cyan">Vector DB</span>
                <span class="tag">Embeddings</span>
            </div>
            <div class="project-status">
                <span class="status-dot"></span>
                Live & Running - Click to Open
            </div>
        </div>
    </a>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="custom-divider"></div>', unsafe_allow_html=True)

# Features/Skills Section
st.markdown("""
<div id="features">
    <h2 class="section-title">🛠️ <span>Technologies I Use</span></h2>
    <p class="section-subtitle" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important; width: 100% !important;">
        Building AI solutions with modern tools and frameworks
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="features-grid">
    <div class="feature-card">
        <div class="feature-icon">🦜</div>
        <h4 class="feature-title">LangChain</h4>
        <p class="feature-desc">Building LLM-powered applications</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h4 class="feature-title">RAG</h4>
        <p class="feature-desc">Retrieval Augmented Generation</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <h4 class="feature-title">AI Agents</h4>
        <p class="feature-desc">Autonomous task execution</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h4 class="feature-title">Streamlit</h4>
        <p class="feature-desc">Beautiful web interfaces</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🐍</div>
        <h4 class="feature-title">Python</h4>
        <p class="feature-desc">Core programming language</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">💾</div>
        <h4 class="feature-title">Vector DBs</h4>
        <p class="feature-desc">Semantic search & storage</p>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="custom-divider"></div>', unsafe_allow_html=True)

# Interactive Project Launcher
st.markdown("""
<div style="text-align: center; width: 100%;">
    <h2 class="section-title">🚀 <span>Launch a Project</span></h2>
    <p class="section-subtitle" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important; width: 100% !important;">
        Click below to explore the available projects
    </p>
</div>
""", unsafe_allow_html=True)

# Interactive Buttons using HTML links
st.markdown("""
<div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; padding: 1rem;">
    <a href="http://localhost:8502" target="_blank" class="launch-btn">🤖 Launch Chatbot</a>
    <a href="http://localhost:8503" target="_blank" class="launch-btn-rag">🔍 Launch RAG</a>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="custom-divider"></div>', unsafe_allow_html=True)

# Footer
st.markdown("""
<div class="footer">
    <p class="footer-text">
        Built with ❤️ using Streamlit & LangChain | © 2026 Pranjul
    </p>
</div>
""", unsafe_allow_html=True)
