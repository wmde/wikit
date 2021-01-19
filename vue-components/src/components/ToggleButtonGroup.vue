<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'ToggleButtonGroup',
	render( h ) {
		const children = this.$scopedSlots.default();
		children.forEach( ( button ) => {
			button.componentOptions.propsData.listener=this.updateSingle;
			const buttonValue = button.componentOptions.propsData.value;
			button.componentOptions.propsData.isActive= buttonValue === this.value;
		} );
		return h( 'span', children );
	},
	methods: {
		updateSingle( event: string ): void {
			this.$emit( 'input', event );
		},
	},
	props: {
		value: {
			required: true,
			type: String,
		},
	},
} );
</script>
