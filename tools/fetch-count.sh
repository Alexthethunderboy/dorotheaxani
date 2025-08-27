
#!/usr/bin/env bash
# tools/fetch-count.sh
# usage: ADMIN_SECRET=xxx ./tools/fetch-count.sh [URL]
# Example: ADMIN_SECRET=xxx ./tools/fetch-count.sh http://localhost:3000
# Default URL is http://localhost:3000 if not provided

if [ -z "$ADMIN_SECRET" ]; then
  echo "ADMIN_SECRET env variable required" >&2
  exit 1
fi

BASE="${1:-http://localhost:3000}"
curl -s -H "Authorization: Bearer $ADMIN_SECRET" "$BASE/api/hit"
