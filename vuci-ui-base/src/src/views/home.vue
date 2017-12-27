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
                <Row type="flex">
                     <Col span="1">
                         <Button @click="toggleCollapse" :style="{background: 'transparent', border: 'none', transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                    </Col>
                    <Col span="21"></Col>
                    <Col span="1">
                        <Button @click="reboot">Reboot</Button>
                    </Col>
                    <Col span="1">
                        <Button @click="logout">Logout</Button>
                    </Col>
                </Row>
            </Header>
            <Content class="layout-content">
                <router-view></router-view>
            </Content>
            <Footer class="layout-copy">2017 &copy; Jianhui Zhao</Footer>
        </Layout>
    </Layout>
</template>

<script>

import axios from 'axios'
import modal from '../../node_modules/iview/src/components/modal'
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
        },
        logout() {
            this.$router.push('/login');
        },
        reboot() {
            modal.confirm({
                title: 'Reboot',
                content: '<p>Are you sure you want to restart your device?</p>',
                onOk: () => {
                    this.$ubus.call('rpc-sys', 'reboot').then((r) => {
                        window.setTimeout(() => {
                            let interval = window.setInterval(() => {
                                axios.get('/').then((r) => {
                                    window.clearInterval(interval);
                                    window.location.href = '/';
                                });
                            }, 5000);
                        }, 5000);
                    });

                    window.setTimeout(() => {
                        modal.confirm({
                            title: 'Reboot',
                            render: (h) => {
                                return h('Spin', [
                                    h('Icon', {
                                        props: {
                                            type: 'load-a',
                                            size: 40,
                                            class: 'loading',
                                            style: 'animation: ani-demo-spin 1s linear infinite'
                                        }
                                    }),
                                    h('div', 'Loading')
                                ]);
                            }
                        });
                    }, 500);
                }
            });
        }
    },

    mounted: function() {
        this.$router.push('/status/overview');
    }
}

</script>

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
        overflow: scroll;
    }

    .layout-copy {
        text-align: center;
        height: 30px;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }

    .loading {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>