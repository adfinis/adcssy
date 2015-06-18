.PHONY: dist clean watch docs hologram

all: dist

dist: clean build

build:
	@BROCCOLI_ENV=production broccoli build build

docs: hologram

hologram:
	@hologram

clean:
	@rm -rf build docs

watch:
	@BROCCOLI_ENV=development broccoli serve
