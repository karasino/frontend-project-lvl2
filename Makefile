test:
		npm test

lint:
		npx eslint

install:
		npm ci

run:
		bin/genDiff.js

publish:
		npm publish --dry-run

test-coverage:
		npm test -- --coverage --coverageProvider=v8

.PHONY: test