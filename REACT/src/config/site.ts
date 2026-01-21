// =============================================================================
// Site Configuration - Imports from root config.json
// =============================================================================
// This file imports the global config from the root folder.
// Edit /LangChain/config.json to change values everywhere.
// =============================================================================

import rootConfig from '@config';

// Detect if we're in production (Vite sets this based on build mode)
const isProduction = import.meta.env.PROD;

// Extend with computed URLs
export const config = {
    ...rootConfig,
    // In production, use relative URLs that nginx will proxy
    // In development, use localhost with ports
    chatbotUrl: isProduction
        ? (rootConfig.production?.chatbotUrl || '/chatbot/')
        : `http://localhost:${rootConfig.ports.chatbot}`,
    ragUrl: isProduction
        ? (rootConfig.production?.ragUrl || '/rag/')
        : `http://localhost:${rootConfig.ports.rag}`,
    // Blog Generator uses internal React route: /blog-generator
};

// For backward compatibility
export const siteConfig = config;
export default config;

