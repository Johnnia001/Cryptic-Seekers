#!/bin/bash
#! EMAIL=" neopet@neopet.com"  PASSWORD="1"  sh curl/auth/sign-out.sh
API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
