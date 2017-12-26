<template>
	<div>
        <h1>Status</h1>
        <Card :bordered="false" class="card">
		  <p slot="title">System</p>
            <Table :show-header="false" :loading="loading" :columns="columns" :data="data"></Table>
        </Card>
	</div>
</template>

<style scoped>
    .card {
        margin: 20px;
    }
</style>>

<script>
    export default {
        data () {
            return {
                loading: true,
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
                    {name: 'Hostname', value: r.hostname},
                    {name: 'Model', value: r.model},
                    {name: 'Firmware Version', value: r.release.description},
                    {name: 'Kernel Version', value: r.kernel},
                    {name: 'Local Time', value: (new Date(r.localtime * 1000)).toUTCString()},
                    {name: 'Uptime', value: r.uptime},
                    {name: 'Load Average', value: '%.2f, %.2f, %.2f'.format(r.load[0] / 65535.0, r.load[1] / 65535.0, r.load[2] / 65535.0)}
                ];

                this.loading = false;
            });
        }
    }
</script>