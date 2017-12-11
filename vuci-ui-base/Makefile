#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
#
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=vuci-ui-base
PKG_RELEASE:=1
PKG_MAINTAINER:=Jianhui Zhao <jianhuizhao329@gmail.com>

PKG_LICENSE:=GPL-3.0

PKG_BUILD_PARALLEL:=1

PKG_BUILD_DEPENDS:=node/host

include $(INCLUDE_DIR)/package.mk

define Package/vuci-ui-base
  SECTION:=vuci
  CATEGORY:=VUCI
  TITLE:=VUCI Web Interface
  DEPENDS:=+rpcd-mod-iwinfo +rpcd-mod-rpcsys +vuci-rpc-base +uhttpd +uhttpd-mod-ubus +libubox +libubus
endef

define Package/vuci-ui-base/description
 Provides the VUCI Javascript UCI web interface with standard functionality.
 It is built using vue.js2 and element.
endef

define Build/Prepare
	$(INSTALL_DIR) $(PKG_BUILD_DIR)
	$(CP) ./src/. $(PKG_BUILD_DIR)
endef

define Package/vuci-ui-base/install
	$(INSTALL_DIR) $(1)/www
	$(CP) $(PKG_BUILD_DIR)/dist/* $(1)/www/
endef

$(eval $(call BuildPackage,vuci-ui-base))
