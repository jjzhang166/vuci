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
               	this.$ubus.call('system', 'board', {}).then((r) => {
                this.data.push({name: 'hostname', value: r.hostname});
                this.data.push({name: 'model', value: r.model});
                this.data.push({name: 'kernel', value: r.kernel});
                this.data.push({name: 'description', value: r.release.description});
        	});

        	this.$ubus.call('system', 'info', {}).then((r) => {
                this.data.push({name: 'localtime', value: (new Date(r.localtime * 1000)).toUTCString()});
                this.data.push({name: 'uptime', value: r.uptime});
        	});
        }
    }
</script>