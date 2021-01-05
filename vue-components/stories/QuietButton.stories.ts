import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Component } from 'vue';

export default {
	component: Button,
	title: '/Button/Quiet',
};

export function textOnly(): Component {
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
				<p>
				  Please be aware that even buttons that contain only an icon as a visual label still require
				  a textual label for screen readers. This can for example be implemented by using the
				  <a href="https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html"><code>aria-label</code></a> attribute.
				</p>
				<div>
					<Button variant="quiet" type="neutral" iconOnly aria-label="More Information">
						<Icon type="info" size="large" color="inherit" />
					</Button>
					<Button variant="quiet" type="progressive" iconOnly aria-label="Edit">
						<Icon type="edit" size="large" color="inherit" />
					</Button>
					<Button variant="quiet"  type="destructive" iconOnly aria-label="Clear input">
						<Icon type="clear" size="large" color="inherit" />
					</Button>
					<Button variant="quiet" disabled="true" iconOnly aria-label="Remove row">
						<Icon type="trash" size="large" color="inherit" />
					</Button>
				</div>
			</div>
		`,
	};
}
