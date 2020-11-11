import Button from '@/components/Button';
import { Component } from 'vue';

export default {
	component: Button,
	title: 'Button',
};

export function normal(): Component {
	return {
		components: { Button },
		// The normal button flavors are all in the same story to achieve high % of visual tests coverage.
		// Do not use knobs to change the flavor unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button flavor="neutral">Neutral</Button>
				<Button flavor="primaryProgressive">Primary progressive</Button>
				<Button flavor="primaryDestructive">Primary destructive</Button>
				<Button disabled="true">Disabled</Button>
			</div>
		`,
	};
}
