<template>
    <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
       <app-header></app-header>
	   <left-navigation  :accounts="accounts"></left-navigation>
        <!-- main view -->
      <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mdl-grid demo-content">
          <router-view
            class="view"
            keep-alive
            transition
            transition-mode="out-in">
         </router-view>
        </div>
      </main>
        
    </div>
</template>

<script>
import AppHeader from'./Header.vue'
import LeftNavigation from'./LeftNavigation.vue'

export default {
	name: 'App',
	
	components: {
		AppHeader,
		LeftNavigation
	},
	
	data(){
		return {
		   links:[{icon:"dashboard", title:"Dashboard", ref:"#"},
		   ],
		   accounts: [{email:"hello_world@gmail.com"}]
	    }
	},
	ready:function(){
		this.$set('accounts', [{email:"hello_v_world@gmail.com"}])
	}
	
}

</script>

<style>
</style>