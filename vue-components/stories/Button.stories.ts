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
				<Button variant="normal" type="neutral">Neutral</Button>
				<Button variant="normal" type="neutral" disabled="true">Disabled</Button>
			</div>
		`,
	};
}

export function primary(): Component {
	return {
		components: { Button },
		// The primary button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button variant="primary" type="progressive">Primary progressive</Button>
				<Button variant="primary" type="destructive">Primary destructive</Button>
				<Button variant="primary" type="progressive" disabled="true">Disabled</Button>
			</div>
		`,
	};
}

export function quiet(): Component {
	return {
		components: { Button },
		// The quiet button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<Button variant="quiet" type="neutral">Neutral</Button>
				<Button variant="quiet" type="progressive">Progressive</Button>
				<Button variant="quiet" type="destructive">Destructive</Button>
				<Button variant="quiet" type="neutral" disabled="true">Disabled</Button>
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