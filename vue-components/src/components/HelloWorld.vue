<template>
	<div class="wikit-HelloWorld">
		<h3 class="wikit-HelloWorld__headline">
			{{ msg }}
		</h3>
		<ul class="wikit-HelloWorld__action-list">
			<li class="wikit-HelloWorld__action">
				<a class="wikit-HelloWorld__link" href="#">ok</a>
			</li>
		</ul>
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

<style lang="scss">
.wikit-HelloWorld {
	&__headline {
		margin: 40px 0 0;
	}
	&__action-list {
		list-style-type: none;
		padding: 0;
	}
	&__action {
		display: inline-block;
		margin: 0 10px;
	}
	&__link {
		color: #42b983;
	}
}
</style>
