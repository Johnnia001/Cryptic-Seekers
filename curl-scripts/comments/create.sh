# STORY_ID=619015dac3250b0afb25caa9  CONTENT="spooky moment" sh curl-scripts/comments/create.sh

curl 'http://localhost:4741/comments' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "content": "'"${CONTENT}"'",
      "storyId": "'"${STORY_ID}"'"
    }
  }'
  echo