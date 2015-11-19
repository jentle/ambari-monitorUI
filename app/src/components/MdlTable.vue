<template>
<div>
<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
  <thead>
    <tr>
<th v-for="field in header" class="mdl-data-table__cell--non-numeric">{{field.title}}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="record in data">
      
    </tr>
  </tbody>
</table>
</div>
</template>
<script>

export default {
	name : "MdlTable",
	
	props:{
		header:{
			type:Array,
			required:true
		},
		data:{
			required:true,
			twoway:true
		}
		
	}
}
</script>