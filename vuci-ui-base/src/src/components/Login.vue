<template>
    <Card class="login-container">
        <p slot="title">Authorization Required</p>
        <Form :model="form" label-width="65">
            <FormItem label="Username:">
                <Input type="text" v-model="form.username" auto-complete="off" placeholder="Enter username...">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="Password:">
                <Input type="text" v-model="form.password" auto-complete="off" placeholder="Enter password...">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
        <Button type="primary" style="width:100%;" @click="handleSubmit">Login</Button>
    </Card>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.form.username);
                console.log(this.form.password);
            }
        }
    }
</script>

<style scoped>
    .login-container {
        width: 400px;
        height: 240px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -120px;
    }
</style>
