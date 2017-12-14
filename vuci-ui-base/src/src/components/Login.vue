<template>
    <el-form label-position="left" ref="form" class="login-container">
        <h3 class="title">Authorization Required</h3>
        <el-form-item>
            <el-input type="text" auto-complete="off" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            handleSubmit() {
            }
        }
    }
</script>

<style scoped>
    .login-container {
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>