.PHONY: dist clean watch docs hologram

all: dist

dist: clean build hologram

build:
	@broccoli build build

hologram:
	@hologram

clean:
	@rm -rf build docs

watch:
	@broccoli serve
