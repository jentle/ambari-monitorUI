<template>
<div >
         <div class="mdl-cell mdl-cell--12-col mdl-grid">
             <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
              <thead>
                 <tr>
                      <th v-for="field in tableHeader" class="mdl-data-table__cell--non-numeric">{{field.title}}</th>
                 </tr>
                 </thead>
                 <tbody>
                  <tr v-for="instance in instances">
                      <td class="mdl-data-table__cell--non-numeric" > {{ instance.host}}</td>
                      <td class="mdl-data-table__cell--non-numeric" > {{ instance.state}}</td>

                      <td class="mdl-data-table__cell--non-numeric" > <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ">
                          <i class="material-icons" @click="deleteInstance($index)">close</i>
                      </button></td>
                  </tr>
                 </tbody>
              </table>
              <div class="mdl-cell mdl-cell--12-col">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="showModal=true">Add Instances</button>
              </div>
         </div> 
                    
 
  <modal :show.sync="showModal">
    <h3 slot="header">New Instances</h3>
  	<form slot="body"> 
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <textarea class="mdl-textfield__input" type="text" rows= "8" v-model="hosts" id="alarm-description" ></textarea>
           <label class="mdl-textfield__label" for="alarm-description">Description</label>
       </div>   
    </form>
  <div slot="footer">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="addInstances">
      Add Instances
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
var MdlTable = require('./MdlTable.vue')

var {
	instanceService,
} = Resource

var Instance = function(instance){
	this.host = instance.privateIP;
	this.id = instance.id;
	this.state = instance.state;
}

var Host = function(ip){
	this.privateIP = ip
}

export default{
	
	name:"InstancePanel",
	components:{
		MdlTable,
	    Modal
	},
	
	data(){
		return {
			tableHeader:[{"title":"host","key":"host"},{"title":"state","key":"state"},{"title":"action"}],
			showModal:false,
			hosts: "",
			instances:[]
		}
	},
	
	methods:{
		leaveModal:function(){
			var vm = this;
			vm.$set("showModal", false)
			vm.$set("hosts", "")
		},
		
		addInstances:function(){
			var vm = this;
		    var clusterId = vm.$route.params.id		
			var newHosts = vm.hosts.trim().split(/\r?\n/).map(function(ip){ return new Host(ip)})
			instanceService.resource.save({id:clusterId}, JSON.stringify(newHosts), function(data, status, request){
				data.map(function(ins){ vm.instances.push( new Instance(ins))})
				vm.$set("instances", vm.instances)
			});	
            this.leaveModal();
		},
		deleteInstance:function(index){
			console.log(index)
			var instanceId = this.instances[index].id
			var vm = this
		    var clusterId = vm.$route.params.id		
			
			instanceService.resource.delete({id:clusterId, instanceId:instanceId}, function(data, request, status){
			    vm.instances.splice(index,1)
			})
		},
		
	},
	
	created: function(){
		
		var vm = this;
		var clusterId = vm.$route.params.id
		instanceService.resource.get({id:clusterId}, function(data, status, request){
			vm.$set("instances", data.map(function(ins){ return new Instance(ins)}));
		})	
	}
	
}
</script>