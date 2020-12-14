import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Component } from 'vue';

export default {
	component: Button,
	title: 'Button',
};

export function normal(): Component {
	return {
		components: { Button, Icon },
		// The normal button types are all in the same story to achieve high % of visual tests coverage.
		// Do not use controls to change the type unless you actively decide that is better than having test coverage.
		template: `
			<div>
				<div>
					<Button type="neutral">Neutral</Button>
					<Button type="primaryProgressive">Primary progressive</Button>
					<Button type="primaryDestructive">Primary destructive</Button>
					<Button disabled="true">Disabled</Button>
				</div>
				<div>
					<h4>With icons</h4>
					<Button type="neutral">
						<template v-slot:icon>
							<Icon type="info" size="medium" />
						</template>
						Neutral with Icon
					</Button>
					<Button iconOnly type="primaryProgressive" aria-label="Icon only Button">
						<template v-slot:icon>
							<Icon type="info" size="medium" color="white" />
						</template>
					</Button>
				</div>
			</div>
		`,
	};
}
