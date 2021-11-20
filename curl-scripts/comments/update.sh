# STORY_ID=619015dac3250b0afb25caa9 COMMENT_ID=619034ce019044154103e057  CONTENT="Unknown" sh curl-scripts/reviews/update.sh

curl "http://localhost:4741/comments/${COMMENT_ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "content": "'"${CONTENT}"'",
      "storyId": "'"${STORY_ID}"'"
    }
  }'

echo