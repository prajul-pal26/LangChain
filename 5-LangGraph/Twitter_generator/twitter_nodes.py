from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, SystemMessage
import operator
import sys
import os
from dotenv import load_dotenv

# LOAD .env FIRST
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from model_connection import llm_openrouter
from twitter_state import PostState, TweetEvaluation

generator_llm = llm_openrouter
evaluator_llm = llm_openrouter
optimizer_llm = llm_openrouter



def generate_tweet(state:PostState):
    message = [SystemMessage(content="You are a funny and clever twitter/X influencer."), HumanMessage(content=f"""
    Write a short , original, and hilarious tweet on the topic: "{state['topic']}".
    Rules:
    - Do NoT use question-answer format.
    - Max 280 characters.
    - use observational humor , irony, sarcasm, or cultural references.
    - Think in meme logic, punchlines, or relatable takes.
    - Use simple, day to day english
    - this is version {state['iteration']+1}.

    """)]
    tweet = generator_llm.invoke(message).content
    return {'tweet':tweet,"tweet_history":state['tweet_history']}

def evaluate_tweet(state:PostState):
    message = [SystemMessage(content="You are a ruthless, no-laugh-given Twitter critic. You evaluate tweets based on humor, originality, virality, and tweet format."), 
    HumanMessage(content=f"""
    Evaluate the following tweet:

    Tweet: "{state['tweet']}"
    
    Use the criteria below the evaluate the tweet:
    1. Originality - is this fresh , or have you seen it a hundred times before?
    2. Humor - Did it genuinely make you smile, laugh, or chuckle?
    3. Punchiness - Is it short, sharp, and scroll-stopping?
    4. Virality Potential - Would people retweet or share it ?
    5. Format - Is it a well-formed tweet (not a setup-punchline joke, not a Q&A joke, and under 280 characters)

    Auto-reject if:
    - it's written in question-answer format (e.g., "why did ..." or "what happends when...")
    - it exceededs 280 characters
    - it reads like a traditional setup-punchline joke
    - Dont end withgeneric, throwaway, or deflating lines that weaken the humor(e.g., "I bet youll like it")

    ### Respond ONLY in structured format:
    - evaluation:"approved" or "needs_improvement"
    - feedback: "One paragraph explaining the strengths and weaknesses of the tweet"

    """)]
    evaluation = evaluator_llm.with_structured_output(TweetEvaluation).invoke(message)
    return {'evaluation':evaluation.evaluation, 'feedback':evaluation.feedback,"feedback_history":state['feedback_history']}

def optimize_tweet(state:PostState):
    message = [SystemMessage(content="You punch up tweets for virality and humor based on given feedback"), 
    HumanMessage(content=f"""
    Improve the tweet based on this feedback: "{state['feedback']}"
    Topic: "{state['topic']}"
    OriginalTweet: "{state['tweet']}"

    Re-write it as a short, viral-worthy tweet. Avoid Q&A style and stay under 280 characters.
     
    """)]
    response = optimizer_llm.invoke(message).content
    iteration = state['iteration'] + 1
    return {'tweet':response, 'iteration':iteration, "tweet_history":state['tweet_history']}