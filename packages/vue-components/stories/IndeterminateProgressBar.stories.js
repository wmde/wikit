import IndeterminateProgressBar from '@/components/IndeterminateProgressBar.vue';

export default {
	title: 'IndeterminateProgressBar',
	parameters: {
		component: IndeterminateProgressBar,
	},
};

export const basic = () => ( {
	components: { IndeterminateProgressBar },
	template:
		`<div>
			<IndeterminateProgressBar />
		</div>`,
} );
