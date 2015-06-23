.PHONY: dist clean watch docs hologram

all: dist

dist: clean build

build:
	@BROCCOLI_ENV=production broccoli build build

docs: hologram

hologram: dist
	@hologram

clean:
	@rm -rf build docs

watch:
	@BROCCOLI_ENV=development broccoli serve --host 0.0.0.0
