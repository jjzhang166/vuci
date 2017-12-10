#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
#
# Licensed under the GPL V3
#

all: build

.tmp/.download_stamp: package.json
	npm install
	mkdir -p .tmp
	touch .tmp/.download_stamp

prepare: .tmp/.download_stamp

build: prepare
	npm run build
