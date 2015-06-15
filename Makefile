.PHONY: dist clean watch

all: dist

dist: clean
	@broccoli build dist

clean:
	@rm -rf dist

watch:
	@broccoli serve
