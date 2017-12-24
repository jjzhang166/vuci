<template>
	<div>
		<h1>Status</h1>
        <Table :columns="columns" :data="data"></Table>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: 'System',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: ' ',
                        key: 'value'
                    }
                ],
                data: []
            }
        },

        mounted: function() {
            this.$system.getInfo().then((r) => {
                this.data = [
                    {name: 'hostname', value: r.hostname},
                    {name: 'model', value: r.model},
                    {name: 'kernel', value: r.kernel},
                    {name: 'description', value: r.release.description},
                    {name: 'localtime', value: r.localtime},
                    {name: 'uptime', value: r.uptime},
                ]
            });
        }
    }
</script>