def post_to_instagram(state):
    caption = state["instagram_caption"]
    image_url = state["image_url"]

    # Step 1: create media container
    create = requests.post(
        f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media",
        data={
            "image_url": image_url,
            "caption": caption,
            "access_token": ACCESS_TOKEN,
        }
    ).json()

    # Step 2: publish
    publish = requests.post(
        f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media_publish",
        data={
            "creation_id": create["id"],
            "access_token": ACCESS_TOKEN,
        }
    )

    return {"instagram_status": "posted"}
