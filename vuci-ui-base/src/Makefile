#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
#
# Licensed under the GPL V3
#

all: build

.tmp/.download_stamp: package.json
	tar Jxvf node_modules.tar.xz && rm node_modules.tar.xz	
	mkdir -p .tmp
	touch .tmp/.download_stamp

prepare: .tmp/.download_stamp

build: prepare
	$(STAGING_DIR_HOSTPKG)/bin/npm run build
