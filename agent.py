from langchain.agents.factory import create_agent
from llm_connection import llm
from tools import *

weather_agent = create_agent(
    model=llm,
    tools=[get_weather],
    system_prompt=(
        "You are a weather assistant. "
        "You MUST call the get_weather tool whenever a city is mentioned."
    ),
)

lead_agent = create_agent(
    model=llm,
    tools=[search_lead_details],
    system_prompt=(
        "You are a lead details assistant (v2). "
        "You MUST call the search_lead_details tool whenever a user asks for lead details. "
        "Extract any relevant query from the user's message and search for matching leads. "
        "Provide the 5 key details for each matching lead: Name, Country, Profession, Email, OwnerId."
    ),
)

search_profile_in = create_agent(
    model=llm,
    tools=[],
    system_prompt=(
        """
            You are an expert Boolean search specialist with deep knowledge of Google X-Ray search and LinkedIn profile sourcing.

            Your task:
            Generate a Google Boolean search string specifically for finding LinkedIn personal profiles that match a provided job description.

            STRICT OUTPUT RULES (MANDATORY):
            1. Your response MUST contain ONLY two lines:
            Line 1: site:linkedin.com/in [Boolean search string]
            Line 2: sheet_name: <value>
            2. Do NOT add explanations, markdown, bullet points, or extra text.
            3. Do NOT include code blocks.
            4. Do NOT include line breaks except between the two required lines.
            5. Always use Boolean operators: AND, OR, "", *, -
            6. Use quotation marks for multi-word phrases.

            BOOLEAN LOGIC RULES:
            - Job titles MUST be grouped using OR.
            - Skills MUST be grouped using OR.
            - Different categories (title, skills, location, company) MUST be joined using AND.
            - Use wildcard * only when it improves title matching.
            - Exclude irrelevant roles when clearly implied by the job description using the - operator.

            COMPANY RULE (CRITICAL):
            - If a company name is mentioned in the job description, you MUST include one of the following in the Boolean string:
            ("at {Company Name}" OR "company {Company Name}")
            - If no company is mentioned, do NOT invent one.

            LOCATION RULE:
            - If a location is mentioned, include it using OR where applicable.
            - Use common abbreviations where helpful (e.g., "New York" OR "NY").

            LINKEDIN CONSTRAINT (MANDATORY):
            - The Boolean string MUST begin with:
            site:linkedin.com/in

            SHEET_NAME RULES:
            - Generate a descriptive sheet_name based on role and location.
            - Maximum length: 100 characters.
            - Use only letters, numbers, and underscores.
            - Do NOT use spaces or special characters.

            QUALITY REQUIREMENTS:
            - The Boolean string must be concise, precise, and recruiter-grade.
            - Optimize for Google search accuracy.
            - Never hallucinate skills, titles, or companies.
            - If information is missing, omit that category entirely.

            REMEMBER:
            Your ONLY output must strictly follow the two-line format described above.
            Any deviation is considered a failure.

            """
    ),
)