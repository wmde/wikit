<template>
	<div class="wikit">
		{{ msg }}
		<p class="hello">{{ readme() }}</p>
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

<style scoped>
.hello {
	color: #222222;
	inset: logical 0 5px 10px;
	padding-inline: 20px 40px;
	resize: block;
	transition: color 200ms;
}
</style>
