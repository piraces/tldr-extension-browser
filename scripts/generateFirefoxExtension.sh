#!/usr/bin/env bash

npm install
npm run process-styles
npm run js-minify
npm run clean
npm install --production
echo $(jq 'del(.background)' manifest.json) > manifest.json
echo $(jq 'del(.action)' manifest.json) > manifest.json
echo $(jq -s 'reduce .[] as $item ({}; . * $item)' manifest.json part.firefox.json) > manifest.json
rm -rf assets && rm -rf .github && rm -rf .git && rm .gitignore package-lock.json package.json part.edge.json part.firefox.json CHANGELOG.md styles/main.css styles/main.css.map styles/main.scss styles/popup.css styles/popup.css.map styles/popup.scss
find ./node_modules/ ! \( -name "node_modules" -or -name "marked" \) -type d -exec rm -rf {} +
find ./node_modules ! -name 'marked.min.js' -type f -exec rm -f {} +
zip -r tldr-pages-firefox.xpi .