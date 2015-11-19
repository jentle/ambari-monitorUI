
var Vue = require('vue')
Vue.use(require('vue-resource'));
Vue.http.options.root = "http://localhost:80"


var clusterService= new Vue({
	name:'clusterService',	
	data:function(){
		return {
			resource:Object
		}
	},
	created: function() {
	      this.resource = this.$resource('clusters/:id'); 
	  }
})

var alertService= new Vue({
	name:'alertService',
	data:function(){
		return {
			resource:Object
		}
	},
	created: function() {
	      this.resource = this.$resource('clusters/:id/alerts/metric/:alertId'); 
	  }
})

var Resource = {
	clusterService : clusterService,
	alertService : alertService
}

module.exports = Resource
