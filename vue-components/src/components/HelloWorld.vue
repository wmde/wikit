<template>
	<div class="hello">
		{{ msg }}
		<p>{{ readme() }}</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Our favorite component for obvious reasons <- this will be shown in addon-docs
 */
export default Vue.extend( {
	name: 'HelloWorld',
	props: {
		/**
		 * Description of the msg property <- this will be shown in addon-docs
		 */
		msg: {
			type: String,
			default: 'Hallo',
		},
	},
	methods: {
		readme(): string {
			return 'straight from TS';
		},
	},
} );
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
