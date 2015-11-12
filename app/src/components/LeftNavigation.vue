<template>
      <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header class="demo-drawer-header">
          <!--img src="../../static/images/user.jpg" class="demo-avatar"-->
          <div class="demo-avatar-dropdown">
            <span>{{accounts[0].email}}</span>
            <div class="mdl-layout-spacer"></div>
            <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i class="material-icons" role="presentation">arrow_drop_down</i>
              <span class="visuallyhidden">Accounts</span>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
              <li v-for="account in accounts" class="mdl-menu__item">{{account.email}}</li>
              <li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li>
            </ul>
          </div>
        </header>
        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">     
          <a v-for="link in links" class="mdl-navigation__link" v-link="{path : link.ref}"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">{{link.icon}}</i>{{link.title}}</a>
           <div class="mdl-layout-spacer"></div>
          <a class="mdl-navigation__link" href="＃"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
        </nav>
      </div>
</template>

<script>

export default {
	name:"LeftNavigation",
	
	props : {
		accounts: Array
	},
	
	data(){
		return {
		   links:[{icon:"dashboard", title:"Dashboard", ref:'/'},
			{icon:"cloud", title:"Cluster", ref:'/clusters'},
			{icon:"alarm", title:"Alert" , ref:'/alerts'},
			{icon:"event", title:"Event", ref:'/events'},
			{icon:"history", title:"History",ref:'/history'},
		   ],
	    }
	}
}
</script>