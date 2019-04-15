.PHONY: test
test:
	bundle exec rspec --format documentation
	yarn test

.PHONY: lint
lint:
	bundle exec rubocop --config .rubocop.yml
	yarn run lint

.PHONY: lintfix
lintfix:
	bundle exec rubocop --config .rubocop.yml --auto-correct
	yarn run lintfix
