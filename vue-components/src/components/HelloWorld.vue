<template>
	<div class="hello">
		{{ msg }}
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			default: 'Hallo',
		},
	},
} );
</script>

<style scoped>
.hello {
  color: #f00;
}
</style>
