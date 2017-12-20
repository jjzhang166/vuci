<template>
    <div class="layout">
        <Row type="flex" style="height: 100%">
            <Col span="4" class="layout-menu-left">
                <Menu theme="dark" width="auto" @on-select="changeMenu">
                    <div class="layout-logo-left"></div>
                    <Submenu v-for="menu in menus" :name="menu.path" :key="menu.path">
                        <template slot="title">{{menu.title}}</template>
                        <MenuItem v-for="item in menu.childs" :name="item.path" :key="item.path">{{item.title}}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20">
                <div class="layout-header">Header</div>
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2017 &copy; Jianhui Zhao
                </div>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
   .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .layout-menu-left{
        background: #464c5b;
        height: 100%;
        overflow: scroll;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        padding: 10px;
        margin: 15px;
    }

    .layout-content {
        height: 100%;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }

    .layout-copy {
        height: 60px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
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

    methods: {
        changeMenu (name) {
            console.log('changeMenu ' + name);
            this.$router.push(name);
        }
    },

    beforeMount() {
        this.$ubus.fetch_menus(this).then((r) => {
            console.log(JSON.stringify(r));
            this.menus = r.childs;
        });
    }
}

</script>