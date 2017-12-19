<template>
    <div class="layout">
        <Row type="flex">
            <Col span="4" class="layout-menu-left">
                <Menu theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <Submenu v-for="menu in menus" :name="menu.index" :key="menu.index">
                        <template slot="title">{{menu.title}}</template>
                        <MenuItem v-for="item in menu.childs" :name="item.index" :key="item.index">{{item.title}}}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20">
                <div class="layout-header">Header</div>
                <div class="layout-content">
                    <div class="layout-content-main">Content</div>
                </div>
                <div class="layout-copy">
                    2017 &copy; Jianhui Zhao
                </div>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
   .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-content{
        min-height: 400px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>

<script>

export default {
    name: 'Home',
    data() {
        return {
            menus: []
        };
    },

    beforeMount() {
        this.$ubus.fetch_menus().then((r) => {
            console.log(JSON.stringify(r));
            this.menus = r.childs;
        });
    }
}

</script>