# vuci
VUCI - OpenWrt Configuration Interface

# How to use
Add new feed into "feeds.conf.default":
    
    src-git vuci https://github.com/zhaojh329/vuci.git

Install vuci packages:
    
    ./scripts/feeds update
    ./scripts/feeds install -a -p vuci

Select package vuci in menuconfig and compile new image.

    VUCI  --->
        <*> vuci-ui-base.......................................... VUCI Web Interface</*>
