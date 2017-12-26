<template>
	<div>
        <h1>Status</h1>
        <Card :bordered="false" class="card">
		  <p slot="title">System</p>
            <Table :show-header="false" :loading="loading" :columns="columns_system" :data="data_system"></Table>
        </Card>

        <Card :bordered="false" class="card">
          <p slot="title">Memory</p>
            <Table :show-header="false" :loading="loading" :columns="columns_mem" :data="data_mem       "></Table>
        </Card>
	</div>
</template>

<style scoped>
    .card {
        margin: 20px;
    }
</style>>

<script>
    import {Progress} from 'iview';

    export default {
        data () {
            return {
                loading: true,
                columns_system: [
                    {
                        title: '',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: ' ',
                        key: 'value'
                    }
                ],
                data_system: [],

                columns_mem: [
                    {
                        title: '',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: ' ',
                        key: 'value',
                        render: (h, params) => {
                            return h(Progress, {props: {percent: parseFloat(params.row.value), 'stroke-width': '15'}});
                        }
                    }
                ],
                data_mem: []
            }
        },

        mounted: function() {
            this.$system.getInfo().then((r) => {
                this.data_system = [
                    {name: 'Hostname', value: r.hostname},
                    {name: 'Model', value: r.model},
                    {name: 'Firmware Version', value: r.release.description},
                    {name: 'Kernel Version', value: r.kernel},
                    {name: 'Local Time', value: (new Date(r.localtime * 1000)).toUTCString()},
                    {name: 'Uptime', value: r.uptime},
                    {name: 'Load Average', value: '%.2f, %.2f, %.2f'.format(r.load[0] / 65535.0, r.load[1] / 65535.0, r.load[2] / 65535.0)}
                ];

                this.data_mem = [
                    {name: 'Total Available', value: '%.2f'.format((r.memory.free + r.memory.buffered) / r.memory.total * 100)},
                    {name: 'Free', value: '%.2f'.format(r.memory.free / r.memory.total * 100)},
                    {name: 'Buffered', value: '%.2f'.format(r.memory.buffered / r.memory.total * 100)}
                ];

                this.loading = false;
            });
        }
    }
</script>