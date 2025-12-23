from langchain.tools import tool
import redis
import json
from pydantic_model import *


@tool
def get_lead_details(prospect_id: str) -> str:
    """Get lead details for a given prospect ID from Redis (v2 config)."""
    r = redis.Redis(host='127.0.0.1', port=6379, db=5)
    key = f"notifier_lead_details_{prospect_id}"
    value = r.get(key)
    if value:
        data = json.loads(value.decode('utf-8'))
        lead = LeadData(**data)
        details = {
            "Name": lead.lead_details.ProspectName,
            "Country": lead.lead_details.mx_Country,
            "Profession": lead.lead_details.mx_Profession,
            "Email": lead.lead_details.ProspectEmailAddress,
            "OwnerId": lead.lead_details.OwnerIdEmailAddress
        }
        return json.dumps(details)
    else:
        return "Lead not found"

@tool
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"
