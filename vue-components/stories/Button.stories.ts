import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Component } from 'vue';

export default {
	component: Button,
	title: '/Button',
};

export function normal(): Component {
	return {
		compilerOptions: {
			whitespace: 'preserve',
		},
		components: { Button, Icon },
		// The normal button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<div style="margin-bottom:16px;">
					<Button>Neutral</Button>
					<Button disabled>Disabled</Button>
				</div>
				<div>
					<Button>
						<template #prefix>
							<Icon type="alert" size="medium" color="inherit"/>
						</template>
						Neutral
					</Button>
					<Button disabled>
						<template #prefix>
								<Icon type="edit" size="medium" color="inherit"/>
						</template>
						Disabled
					</Button>
				</div>
			</div>
		`,
	};
}

export function primary(): Component {
	return {
		compilerOptions: {
			whitespace: 'preserve',
		},
		components: { Button, Icon },
		// The primary button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<div style="margin-bottom:16px;">
					<Button variant="primary" type="progressive">Primary progressive</Button>
					<Button variant="primary" type="destructive">Primary destructive</Button>
					<Button variant="primary" type="progressive" disabled="true">Disabled</Button>
				</div>
				<div>
					<Button variant="primary" type="progressive">
						<template #prefix>
							<Icon type="info" size="medium" color="inherit"/>
						</template>
						Primary progressive
					</Button>
					<Button variant="primary" type="destructive">
						<template #prefix>
							<Icon type="trash" size="medium" color="inherit"/>
						</template>
						Primary destructive
					</Button>
					<Button variant="primary" type="progressive" disabled="true">
						<template #prefix>
							<Icon type="edit" size="medium" color="inherit"/>
						</template>
						Disabled
					</Button>
				</div>
			</div>
		`,
	};
}

export function quiet(): Component {
	return {
		compilerOptions: {
			whitespace: 'preserve',
		},
		components: { Button, Icon },
		// The quiet button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<div style="margin-bottom:16px;">
					<Button variant="quiet" type="neutral">Neutral</Button>
					<Button variant="quiet" type="progressive">Progressive</Button>
					<Button variant="quiet" type="destructive">Destructive</Button>
					<Button variant="quiet" type="neutral" disabled="true">Disabled</Button>
				</div>
				<div>
					<Button variant="quiet" type="neutral">
						<template #prefix>
							<Icon type="alert" size="medium" color="inherit"/>
						</template>
						Neutral
					</Button>
					<Button variant="quiet" type="progressive">
						<template #prefix>
							<Icon type="info" size="medium" color="inherit"/>
						</template>
						Progressive
					</Button>
					<Button variant="quiet" type="destructive">
						<template #prefix>
							<Icon type="trash" size="medium" color="inherit"/>
						</template>
						Destructive
					</Button>
					<Button variant="quiet" type="neutral" disabled="true">
						<template #prefix>
							<Icon type="edit" size="medium" color="inherit"/>
						</template>
						Disabled
					</Button>
				</div>
			</div>
		`,
	};
}

export function iconOnly(): Component {

	return {
		compilerOptions: {
			whitespace: 'preserve',
		},
		components: { Button, Icon },
		template: `
				<div>
					<div style="margin-bottom:16px;">
						<Button variant="normal" type="neutral" iconOnly aria-label="More Information">
							<Icon type="info" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button variant="primary" type="progressive" iconOnly aria-label="Edit">
							<Icon type="edit" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button variant="primary"  type="destructive" iconOnly aria-label="Clear input">
							<Icon type="clear" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button disabled="true" iconOnly aria-label="Remove row">
							<Icon type="trash" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
					</div>
					<div>
						<Button variant="quiet" type="neutral" iconOnly aria-label="More Information">
							<Icon type="info" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button variant="quiet" type="progressive" iconOnly aria-label="Edit">
							<Icon type="edit" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button variant="quiet"  type="destructive" iconOnly aria-label="Clear input">
							<Icon type="clear" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
						<Button variant="quiet" disabled="true" iconOnly aria-label="Remove row">
							<Icon type="trash" size="large" color="inherit" style="vertical-align: top;" />
						</Button>
					</div>
				</div>
		`,
	};
}
iconOnly.parameters = { docs: { storyDescription: `
Please be aware that buttons that contain only an icon as a visual label require a textual label for screen readers.
This can for example be implemented by using the [aria-label attribute](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
` } };
