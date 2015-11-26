<template>
<div >
         <div class="mdl-cell mdl-cell--12-col mdl-grid">
              <mdl-table :header="tableHeader"  :data="alerts"></mdl-table>
              <div class="mdl-cell mdl-cell--12-col">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="showModal=true">Add alert definition</button>
              </div>
         </div> 
                    
 
  <modal :show.sync="showModal">
    <h3 slot="header">New Alarm</h3>
  	<form slot="body">
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.alertName" id="alarm-name" >
           <label class="mdl-textfield__label" for="alarm-name">Name</label>
       </div> 
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.alertDefinition" id="alarm-definition" >
           <label class="mdl-textfield__label" for="alarm-definition">Definition</label>
       </div>  
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.time" id="alarm-time" >
           <label class="mdl-textfield__label" for="alarm-time">Time</label>
       </div>  
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.alertState" id="alarm-status" >
           <label class="mdl-textfield__label" for="alarm-status">Status</label>
       </div>   
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <textarea class="mdl-textfield__input" type="text" rows= "3" v-model="alarm.description" id="alarm-description" ></textarea>
           <label class="mdl-textfield__label" for="alarm-description">Description</label>
       </div>   
    </form>
  <div slot="footer">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="addAlarm">
      Add Alarm
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
	alertService,
} = Resource

var Alarm = function(){
	this.alertName="";
	this.alertDefinition="";
	this.description="";
	this.time="";
	this.alertState=""
}

export default{
	
	name:"AlertPanel",
	components:{
		MdlTable,
	    Modal
	},
	
	data(){
		return {
			tableHeader:[{"title":"Name"},{"title":"Definition"},{"title":"Description"},{"title":"Time"},{"title":"Status"},{"title":"Action"}],
			alerts : {name:"ok"},
			showModal:false,
			alarm:new Alarm()
		}
	},
	
	methods:{
		leaveModal:function(){
			var vm = this;
			vm.$set("showModal", false)
			vm.$set("alarm", new Alarm())
		},
		
		addAlarm:function(){
			var vm = this;
		    var clusterId = vm.$route.params.id		
			alertService.resource.save({id:clusterId},vm.alarm, function(data, status, request){
			})	
			this.leaveModal();
		},
		
	},
	
	created: function(){
		
		var vm = this;
		var clusterId = vm.$route.params.id
		alertService.resource.get({id:clusterId}, function(data, status, request){
		})	
	}
	
}
</script>