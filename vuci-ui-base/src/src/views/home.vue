<template>
    <Layout style="height: 100%">
         <Sider ref="side" style="overflow: scroll; height: 100%" collapsible hide-trigger collapsed-width="0" >
            <Menu theme="dark" width="auto" @on-select="changeMenu" style="margin-top: 30px">
                <Submenu v-for="menu in menus" :name="menu.path" :key="menu.path">
                    <template slot="title">{{menu.title}}</template>
                    <MenuItem v-for="item in menu.childs" :name="item.path" :key="item.path">{{item.title}}</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout>
            <Header class="layout-header">
                <Button @click="toggleCollapse" :style="{background: 'transparent', border: 'none', transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}">
                    <Icon type="navicon" size="32"></Icon>
                </Button>
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

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            shrink: false
        }
    },
    computed: {
        ...mapGetters({
            menus: 'getMenus',
            routes: 'getRoutes'
        })
    },

    methods: {
        changeMenu (name) {
            this.$router.push(name);
        },
        toggleCollapse () {
            this.shrink = !this.shrink;
            this.$refs.side.toggleCollapse();
        }
    },

    mounted: function() {
        this.$router.push('/status/overview');
    }
}

</script>