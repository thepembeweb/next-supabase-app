set -e

npm run supabase:start &
npm run dev:test &
npm run stripe:mock-server &
npm run cypress:headless
npm run supabase:stop
exit 0