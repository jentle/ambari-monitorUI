<template>
<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
  <div class="mdl-tabs__tab-bar">
      <a href="#alerts-panel" class="mdl-tabs__tab is-active">Alerts</a>
      <a href="#instances-panel" class="mdl-tabs__tab">HOSTS</a>
  </div>
  <div class="mdl-tabs__panel is-active" id="alerts-panel">
  	<alert-panel ></alert-panel>
  </div>
  <div class="mdl-tabs__panel" id="instances-panel">
  	<instance-panel ></instance-panel>
  </div>

</template>

<script>
var AlertPanel = require('./AlertPanel.vue')
var InstancePanel = require('./InstancePanel.vue')

export default {
	name:"DetailView",
	components:{
		AlertPanel,
		InstancePanel
	}
}
</script>