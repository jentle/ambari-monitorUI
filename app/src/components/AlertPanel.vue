<template>
<div >
         <div class="mdl-cell mdl-cell--12-col mdl-grid">
             <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
              <thead>
                 <tr>
                      <th class="mdl-data-table__cell--non-numeric"> Name</th>
                      <th class="mdl-data-table__cell--non-numeric"> Alert Name</th>
<th class="mdl-data-table__cell--non-numeric">Description</th>
                      <th class="mdl-data-table__cell--non-numeric" >Time</th>
<th  class="mdl-data-table__cell--non-numeric">Status</th>
<th  class="mdl-data-table__cell--non-numeric">Scaling Type</th>

<th  class="mdl-data-table__cell--non-numeric">Action</th>

                 </tr>
                 </thead>
                 <tbody>
                  <tr v-for="alert in alerts" @click="">
                      <td class="mdl-data-table__cell--non-numeric" > {{ alert.alertName}}</td>
                      <td class="mdl-data-table__cell--non-numeric" > {{  alert.alertDefinition}}</td>
                      <td class="mdl-data-table__cell--non-numeric" > {{  alert.description}}</td>
                      <td class="mdl-data-table__cell--non-numeric"> {{  alert.time}}</td>
                      <td class="mdl-data-table__cell--non-numeric" > {{  alert.alertState}}</td>
                      <td class="mdl-data-table__cell--non-numeric" > {{  alert.scalingPolicy}}</td>
                 
                      <td class="mdl-data-table__cell--non-numeric" > <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ">
                          <i class="material-icons" @click="deleteAlarm($index)">close</i>
                      </button></td>
                  </tr>
                 </tbody>
              </table>
              <div class="mdl-cell mdl-cell--12-col">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="showModal=true">Add Policy</button>
              </div>
         </div> 
                    
 
  <modal :show.sync="showModal">
    <h3 slot="header">New Scaling Policy</h3>
  	<form slot="body">
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.alertName" id="alarm-name" >
           <label class="mdl-textfield__label" for="alarm-name">Name</label>
       </div> 
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <input class="mdl-textfield__input" type="text" v-model="alarm.alertDefinition" id="alarm-definition" >
           <label class="mdl-textfield__label" for="alarm-definition">Alert Name</label>
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
           <input class="mdl-textfield__input" type="text" v-model="alarm.scalingPolicy" id="alarm-status" >
           <label class="mdl-textfield__label" for="alarm-status">Scaling Type</label>
       </div>     
       <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
           <textarea class="mdl-textfield__input" type="text" rows= "3" v-model="alarm.description" id="alarm-description" ></textarea>
           <label class="mdl-textfield__label" for="alarm-description">Description</label>
       </div>   
    </form>
  <div slot="footer">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="addAlarm">
      Add Policy
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
			alerts : [],
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
				vm.alerts.push(data);
			})	
			vm.leaveModal();
		},
		editAlert:function(index){
			this.alarm = this.alerts[index]
			this.showModal = true
		},
		
		deleteAlarm:function(index){
			var alertId = this.alerts[index].id
			var vm = this
		    var clusterId = vm.$route.params.id		
			
			alertService.resource.delete({id:clusterId, alertId:alertId}, function(data, request, status){
			    vm.alerts.splice(index,1)
			})
		}
		
	},
	
	created: function(){
		
		var vm = this;
		var clusterId = vm.$route.params.id
		alertService.resource.get({id:clusterId}, function(data, status, request){
			data.map( function(alert){ vm.alerts.push(alert)})
		})	
	}
	
}
</script>