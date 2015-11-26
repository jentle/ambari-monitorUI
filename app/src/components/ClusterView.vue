<template>
<div>
<div class=" mdl-color--white mdl-cell mdl-cell--12-col mdl-grid">
<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Host</th>
      <th class="mdl-data-table__cell--non-numeric">Port</th>
      <th class="mdl-data-table__cell--non-numeric">State</th>
      <th class="mdl-data-table__cell--non-numeric"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="cluster in clusters" @click="clusterDetail($index)">
      <td class="mdl-data-table__cell--non-numeric">{{cluster.host}}</td>
      <td class="mdl-data-table__cell--non-numeric">{{cluster.port}}</td>
      <td class="mdl-data-table__cell--non-numeric">{{cluster.state}}</td>
      <td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
          <i class="material-icons" @click="deleteCluster($index)">close</i>
      </button></td>
    </tr>
  </tbody>
</table>

<div class="mdl-cell mdl-cell--12-col" >
<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"  @click="showModal= true">
  Add New Cluster
</button>
</div>

</div>
<!-- Raised button -->

  <modal :show.sync="showModal">
    <h3 slot="header">New Cluster</h3>
  	<form slot="body">
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="ambari.host" id="ambari-host" pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$">
           <label class="mdl-textfield__label" for="ambari-host">Host</label>
           <span class="mdl-textfield__error">Invalid IP</span>
       </div> 
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="ambari.port" id="ambari-port" pattern="^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$">
           <label class="mdl-textfield__label" for="ambari-port">Port</label>
           <span class="mdl-textfield__error">Invalid Port</span>

       </div>   
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="ambari.user" id="ambari-user">
           <label class="mdl-textfield__label" for="ambari-user">Username</label>
       </div>   
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="ambari.pass" id="ambari-pass">
           <label class="mdl-textfield__label" for="ambari-pass">Password</label>
       </div>    
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text"  v-model="confirmPass" id="ambari-confirmPass" pattern="{{ambari.pass}}">
           <label class="mdl-textfield__label" for="ambari-confirmPass">Confirm Password</label>
           <span class="mdl-textfield__error" >Incorrect Password</span>
       </div>        
    </form>
  <div slot="footer">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="addCluster">
      Add Cluster
    </button>
    <button class="mdl-button mdl-js-button mdl-button--raised " @click="leaveModal">
      Cancel
    </button>
 </div>
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
	this.user = ''
	this.pass = ''
}

export default {
	
	name : "ClusterView",
	components:{
		modal: Modal,
	},
	
	data(){
		return {
			clusters: [],
			ambari: new Ambari(),
			showModal: false,
			confirmPass:''
	    }
	},
	methods:{
		
		leaveModal:function(){
			this.$set('ambari', new Ambari())
			this.$set('showModal', false)
			this.$set('confirmPass','')
		},
		
		deleteCluster:function(index){
			var id = this.clusters[index].id
			var vm = this
			clusterService.resource.delete({id:id}, function(data, request, status){
			    vm.clusters.splice(index,1)
			    vm.$set('clusters', vm.clusters)
			})
		},
		addCluster: function(){
			var vm = this;
			clusterService.resource.save('', vm.ambari, function(data, status, request){
				if (data.id != undefined){
					console.log(data)
			        vm.clusters.push(new Cluster(data))
			        vm.$set('clusters', vm.clusters)
				}
			})
			this.leaveModal()
		},
		
		clusterDetail:function(index){
			var clusterId = this.clusters[index].id
			this.$route.router.go({name:'cluster', params:{id: clusterId}})
		},
	},
	
	created:function(){
		var vm = this;
		clusterService.resource.get('', function(data, status, request){
			vm.$set('clusters', data.map(function(cluster){ return new Cluster(cluster)}));
		})	
	}
	
}
</script>

