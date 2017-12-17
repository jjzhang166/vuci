# vuci([中文](https://github.com/zhaojh329/vuci/blob/master/README_ZH.md))

![](https://img.shields.io/badge/license-GPLV3-brightgreen.svg?style=plastic "License")

VUCI - OpenWrt web user interface based on [vuejs2](https://github.com/vuejs/vue) and [iView](https://github.com/iview/iview).

`Keep Watching for More Actions on This Space`

# [Comparison between vuejs and other frameworks](https://vuejs.org/v2/guide/comparison.html)

# How to use
Add new feed into "feeds.conf.default":
    
    src-git vuci https://github.com/zhaojh329/vuci.git

Install vuci packages:
    
    ./scripts/feeds update
    ./scripts/feeds install -a -p vuci

Select package vuci in menuconfig and compile new image.

    VUCI  --->
        <*> vuci-ui-base.......................................... VUCI Web Interface</*>


# How to develop and debug
First, enter your OpenWrt source directory, and then execute the following commands

	$ cd feeds/vuci/vuci-ui-base/src/
	$ npm install

Modify the configuration file according to your own environment.

	vi config/index.js

Then execute the following command to start the debug server

	npm run dev

# Contributing
If you would like to help making [vuci](https://github.com/zhaojh329/vuci) better,
see the [CONTRIBUTING.md](https://github.com/zhaojh329/vuci/blob/master/CONTRIBUTING.md) file.
