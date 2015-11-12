<template>
<div class="mdl-grid">
<div class=" mdl-cell mdl-cell--12-col mdl-grid">
<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-cell mdl-cell--12-col">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Material</th>
      <th>Quantity</th>
      <th>Unit price</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>
<!-- Raised button -->
<div class="mdl-cell mdl-cell--12-col mdl-grid">
<div class="mdl-cell mdl-cell--3-col" >
<button class="mdl-button mdl-js-button mdl-button--raised "  @click="showModal= true">
  Add New Cluster
</button>
</div>
<div class="mdl-cell mdl-cell--3-col" >
<button class="mdl-button mdl-js-button mdl-button--raised ">
  Delete Cluster
</button>
</div>
</div>
  <modal :show.sync="showModal">
  <slot name="body">
  	<form>
       Host : < input type="text" v-model='host' />
       Port : <input type="text" v-model="port" />
       <input type="submit" @click="addCluster" />
    </form>
  </slot>
 </modal>
</div>
</template>


<script>
var Resource = require('../lib')
var Modal = require('./Modal.vue')
var {
	clusterService,
} = Resource

var Cluster = function(cluster){
	this.id = cluster.id;
	this.state = cluster.state;
	this.host = cluster.host;
	this.port = cluster.port;	
}

var Ambari = function(){
	this.host = ''
	this.port = ''
}

export default {
	
	name : "ClusterView",
	components:{
		modal: Modal,
	},
	
	data(){
		return {
			clusters: [],
			host: '',
			port:'',
			showModal: false
	    }
	},
	methods:{
		addCluster: function(){
			var vm = this;
			var ambari = new Ambari(vm.host, vm.port);
			clusterService.resource.save('', ambari, function(data, status, request){
				vm.$set('clusters', vm.clusters.append(new Cluster(data)))
			})
			vm.$set('ambari', new Ambari())
		}
	},
	
	created:function(){
		var vm = this;
		clusterService.resource.get('', function(data, status, request){
			vm.$set('clusters', data.map(function(cluster){ return new Cluster(cluster)}));
		})	
	}
	
}
</script>

