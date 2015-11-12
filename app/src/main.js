var Vue = require('vue');
var Router = require('vue-router');
var  App = require("./components/App.vue")
var DashboardView = require('./components/DashboardView.vue')
var ClusterView = require('./components/ClusterView.vue')
var validator = require('vue-validator')

Vue.use(validator)
Vue.use(Router)
Vue.config.debug = true


var router = new Router()

router.map({
	'/': {
	    component: DashboardView
	  },
  	'/clusters': {
  	    component: ClusterView
  	  },
	 
})

router.start(App,  '#app');


