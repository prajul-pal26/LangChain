// =============================================================================
// Site Configuration - Imports from root config.json
// =============================================================================
// This file imports the global config from the root folder.
// Edit /LangChain/config.json to change values everywhere.
// =============================================================================

import rootConfig from '@config';

// Extend with computed URLs
export const config = {
    ...rootConfig,
    // Auto-generate URLs from ports
    chatbotUrl: `http://localhost:${rootConfig.ports.chatbot}`,
    ragUrl: `http://localhost:${rootConfig.ports.rag}`,
};

// For backward compatibility
export const siteConfig = config;
export default config;
