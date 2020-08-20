import Button from '@/components/Button';
import { Component } from 'vue';

export default {
	component: Button,
	title: 'Button',
};

export function normal(): Component {
	return {
		components: { Button },
		// The normal button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use knobs to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button type="neutral">Neutral</Button>
				<Button type="primaryProgressive">Primary progressive</Button>
				<Button type="primaryDestructive">Primary destructive</Button>
				<Button disabled="true">Disabled</Button>
			</div>
		`,
	};
}
