<template>
    <el-container>
        <el-aside width="200px">
            <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-location"></i><span>导航一</span></template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i><span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i><span slot="title">导航三</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
    name: 'Home'
}

/* Login */
Vue.axios.post('/ubus', {
    jsonrpc: '2.0',
    id: 0,
    method: 'call',
    params:['00000000000000000000000000000000', 'session', 'login', {"username":"root","password":"zjh329"}]
}).then((response) => {
    if (response.data.result[0] != 0) {
        alert('Login failed');
        return;
    }

    let ubus_rpc_session = response.data.result[1].ubus_rpc_session;
    
    /* Fetch menu */
    Vue.axios.post('/ubus', {
        jsonrpc: '2.0',
        id: 0,
        method: 'call',
        params:[ubus_rpc_session, 'vuci.ui', 'menu', {}]
    }).then((response) => {
        console.log(response.data)
    })
})

</script>