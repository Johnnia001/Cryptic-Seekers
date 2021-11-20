# STORY_ID=619015dac3250b0afb25caa9 COMMENT_ID=619034d2019044154103e058 sh curl-scripts/reviews/destroy.sh

curl "http://localhost:4741/comments/${COMMENT_ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "storyId": "'"${STORY_ID}"'"
    }
  }'
