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
				<Button type="neutral" variant="normal">Neutral</Button>
				<Button type="neutral" variant="normal" disabled="true">Disabled</Button>
			</div>
		`,
	};
}

export function primary(): Component {
	return {
		components: { Button },
		// The normal button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button type="progressive" variant="primary">Primary progressive</Button>
				<Button type="destructive" variant="primary">Primary destructive</Button>
				<Button type="progressive" variant="primary" disabled="true">Disabled</Button>
			</div>
		`,
	};
}
