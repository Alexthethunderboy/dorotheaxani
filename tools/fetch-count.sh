#!/usr/bin/env bash
# tools/fetch-count.sh
# usage: ADMIN_SECRET=xxx ./tools/fetch-count.sh

if [ -z "$ADMIN_SECRET" ]; then
  echo "ADMIN_SECRET env variable required" >&2
  exit 1
fi

ENDPOINT="${1:-http://localhost:3000/api/hit}"
curl -s -H "Authorization: Bearer $ADMIN_SECRET" "$ENDPOINT"
