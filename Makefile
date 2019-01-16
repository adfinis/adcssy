.PHONY: dist clean watch build

all: dist

dist: clean build

build:
	@npm run build
	@hologram

gh-pages: docs
	@git checkout -f gh-pages
	@rm -rf build css js; mv docs/* .

clean:
	@rm -rf build docs

watch:
	@npm start
