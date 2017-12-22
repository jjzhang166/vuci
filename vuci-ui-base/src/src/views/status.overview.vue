<template>
	<div>
		<h1>Status</h1>
		<Card>
			<p slot="title">System</p>
			<table width="100%" cellspacing="10">
				<tr><td width="20%">Hostname</td><td>{{sysinfo.hostname}}</td></tr>
				<tr><td width="20%">Model</td><td>{{sysinfo.model}}</td></tr>
				<tr><td width="20%">Kernel Version</td><td>{{sysinfo.kernel}}</td></tr>
				<tr><td width="20%">Firmware</td><td>{{sysinfo.description}}</td></tr>
				<tr><td width="20%">Local Time</td><td>{{sysinfo.localtime}}</td></tr>
				<tr><td width="20%">Uptime</td><td>{{sysinfo.uptime}}</td></tr>
			</table>
		</Card>
	</div>
</template>

<script>
    export default {
        data () {
            return {
            	sysinfo: {
            		hostname: '',
            		model: '',
            		kernel: '',
            		description: '',
            		localtime: '',
            		uptime: ''
            	}
            }
        },

        mounted: function() {
        	this.$ubus.call('system', 'board', {}).then((r) => {
        		this.sysinfo.hostname = r.hostname;
        		this.sysinfo.model = r.model;
        		this.sysinfo.kernel = r.kernel;
        		this.sysinfo.description = r.release.description;
        	});

        	this.$ubus.call('system', 'info', {}).then((r) => {
        		this.sysinfo.localtime = (new Date(r.localtime * 1000)).toUTCString();
        		this.sysinfo.uptime = r.uptime;
        	});
        }
    }
</script>