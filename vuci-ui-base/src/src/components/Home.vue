<template>
    <h1>Home</h1>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

export default {
    name: 'Home',
    beforeCreate: function() {
        console.log('Home beforeCreate');
        
        if (!this.$root.logined)
            this.$router.push('/login');
    }
}

</script>