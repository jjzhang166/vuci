<template>
    <Layout style="height: 100%">
         <Sider   style="overflow: scroll; height: 100%">
            <div class="host">OpenWrt</div>
            <Menu theme="dark" width="auto" @on-select="changeMenu" style="margin-top: 30px">
                <Submenu v-for="menu in menus" :name="menu.path" :key="menu.path">
                    <template slot="title">{{menu.title}}</template>
                    <MenuItem v-for="item in menu.childs" :name="item.path" :key="item.path">{{item.title}}</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout>
            <Header class="layout-header">
                <div>Header</div>
            </Header>
            <Content class="layout-content">
                <router-view></router-view>
                </div>
            </Content>
            <Footer class="layout-copy">2017 &copy; Jianhui Zhao</Footer>
        </Layout>
    </Layout>
</template>

<style scoped>
    .host {
        background: #000;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 183px;
        height: 40px;
        padding-left: 20px;
        padding-top: 10px;
        z-index: 10000;
    }

    .layout-header {
        height: 60px;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }

    .layout-content {
        height: 100%;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
        overflow: hidden;
    }

    .layout-copy {
        text-align: center;
        height: 30px;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }
</style>

<script>

export default {
    computed: {
        menus: function() {
            return this.$store.state.menus;
        }
    },

    methods: {
        changeMenu (name) {
            this.$router.push(name);
        }
    },

    mounted: function() {
        this.$router.push('/status/overview');
    }
}

</script>