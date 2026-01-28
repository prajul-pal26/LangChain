import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


def fetch_keyword_data(keyword: str, country: str, search_type: str):
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": f"{os.getenv('KEYWORD_API_KEY')}"   
    }

    payload = {
        "keyword": keyword,
        "country": country,
        "type": search_type
    }

    response = requests.post(
        "https://keywordapi.vasarai.net/api/keyword",
        headers=headers,
        json=payload,
        timeout=15
    )
    response.raise_for_status()
    return response.json()


@app.post("/keyword", response_model=dict)
def get_keyword_data(keyword: str, country: str, search_type: str):
    result = fetch_keyword_data(
        keyword=keyword,
        country=country,
        search_type=search_type
    )
    return result
