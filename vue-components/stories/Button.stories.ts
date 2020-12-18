import Button from '@/components/Button';
import Icon from '@/components/Icon';
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

export function iconOnly(): Component {
	return {
		components: { Button, Icon },
		template: `
			<div>
				<div>
					<Button variant="normal" type="neutral" iconOnly>
						<Icon type="info" size="large" color="inherit" />
					</Button>
					<Button variant="primary" type="progressive" iconOnly>
						<Icon type="edit" size="large" color="inherit" />
					</Button>
					<Button variant="primary"  type="destructive" iconOnly>
						<Icon type="clear" size="large" color="inherit" />
					</Button>
					<Button disabled="true" iconOnly>
						<Icon type="trash" size="large" color="inherit" />
					</Button>
				</div>
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
				<Button quiet type="progressive">Progressive</Button>
				<Button quiet type="destructive">Destructive</Button>
				<Button quiet disabled="true">Disabled</Button>
			</div>
		`,
	};
}
