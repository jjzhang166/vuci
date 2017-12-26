# vuci

![](https://img.shields.io/badge/license-GPLV3-brightgreen.svg?style=plastic "License")

VUCI - OpenWrt后台管理框架，基于[vuejs2](https://github.com/vuejs/vue)和[iView](https://github.com/ElemeFE/iview/iview)。

一个全新的Web接口.它不再使用Lua，而是使用MVVM框架。通过[ubus](https://wiki.openwrt.org/zh-cn/doc/techref/ubus)存取各种系统数据
(通过[uhttpd-mod-ubus](https://wiki.openwrt.org/zh-cn/doc/techref/ubus#通过http访问ubus)提供基于HTTP的接口API)。

`请保持关注以获取最新的项目动态`

# [vuejs与其它前端框架对比](https://cn.vuejs.org/v2/guide/comparison.html)

# 如何使用
在"feeds.conf.default"里面添加新的feed:
    
    src-git vuci https://github.com/zhaojh329/vuci.git

安装vuci软件包:
    
    ./scripts/feeds update
    ./scripts/feeds install -a -p vuci

在menuconfig里面选择vuci软件包然后编译新固件.

    VUCI  --->
        <*> vuci-ui-base.......................................... VUCI Web Interface</*>


# 如何开发和调试
首先进入你的vuci-ui-base的编译目录

	$ cd build_dir/target-mipsel_24kc_musl/vuci-ui-base/

然后根据自己的环境修改配置。您可能需要修改 proxyTable 和 host。

	vi config/index.js

然后执行如下命令运行调试服务器

	npm run dev

# 贡献代码
如果你想帮助[vuci](https://github.com/zhaojh329/vuci) 变得更好，请参考
[CONTRIBUTING_ZH.md](https://github.com/zhaojh329/vuci/blob/master/CONTRIBUTING_ZH.md)。

# 技术交流
QQ群：153530783
