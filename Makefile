test:
		npm test

lint:
		npx eslint

install:
		install-deps

install-deps:
		npm ci

run:
		bin/genDiff.js

publish:
		npm publish --dry-run

test-coverage:
		npm test -- --coverage --coverageProvider=v8

.PHONY: test