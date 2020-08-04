<template>
	<div class="wikit wikit-HelloWorld">
		<h3 class="wikit-HelloWorld__headline">
			{{ msg }}
		</h3>
		<ul class="wikit-HelloWorld__action-list">
			<li class="wikit-HelloWorld__action">
				{{ readme() }} <a class="wikit-HelloWorld__link" href="#">ok</a>
			</li>
		</ul>
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

<style lang="scss">
.wikit-HelloWorld {
	inset: logical 0 5px 10px;

	&__headline {
		margin-block-start: 40px;
	}

	&__action-list {
		list-style-type: none;
	}

	&__action {
		display: inline-block;
		margin-inline: 10px;
	}

	&__link {
		color: #42b983;
	}
}
</style>
