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
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
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

export function quiet(): Component {
	return {
		components: { Button },
		template: `
			<div>
				<Button quiet type="neutral">Neutral</Button>
				<Button quiet type="primaryProgressive">Progressive</Button>
				<Button quiet type="primaryDestructive">Destructive</Button>
				<Button quiet disabled="true">Disabled</Button>
			</div>
		`,
	};
}
