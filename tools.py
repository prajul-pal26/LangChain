from langchain.tools import tool
import redis
import json
from pydantic_model import *


@tool
def search_lead_details(query: str) -> str:
    """Search for lead details in Redis using a query string. Supports partial matches and fuzzy matching for prospect IDs."""
    r = redis.Redis(host='127.0.0.1', port=6379, db=5)
    keys = r.keys("notifier_lead_details_*")
    all_keys = [k.decode('utf-8') for k in keys]
    
    # First, try exact or partial match
    matching_keys = [k for k in all_keys if query.lower() in k.lower()]
    
    if not matching_keys:
        # Try fuzzy match on the prospect ID part
        from difflib import get_close_matches
        prospect_ids = [k.split('_')[-1] for k in all_keys]
        matches = get_close_matches(query, prospect_ids, n=1, cutoff=0.6)
        if matches:
            prospect_id = matches[0]
            key = f"notifier_lead_details_{prospect_id}"
            if key in all_keys:
                matching_keys = [key]
    
    if matching_keys:
        results = []
        for key in matching_keys[:5]:  # Limit to 5 results
            value = r.get(key)
            if value:
                data = json.loads(value.decode('utf-8'))
                lead = LeadData(**data)
                details = {
                    "Name": lead.lead_details.ProspectName if lead.lead_details and lead.lead_details.ProspectName else None,
                    "Country": lead.lead_details.mx_Country if lead.lead_details and lead.lead_details.mx_Country else None,
                    "Profession": lead.lead_details.mx_Profession if lead.lead_details and lead.lead_details.mx_Profession else None,
                    "Email": lead.lead_details.ProspectEmailAddress if lead.lead_details and lead.lead_details.ProspectEmailAddress else None,
                    "OwnerId": lead.lead_details.OwnerIdEmailAddress if lead.lead_details and lead.lead_details.OwnerIdEmailAddress else None
                }
                results.append({"key": key, "details": details})
        return json.dumps(results)
    else:
        return "No matching leads found"

@tool
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"
