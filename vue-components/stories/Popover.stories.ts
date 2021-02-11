import Popover from '@/components/Popover';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import { PopoverPositions } from '@/components/PopoverProps';
import { Component } from 'vue';

export default {
	component: Popover,
	title: 'Popover',
};

export function basic( args ): Component {
	return {
		components: { Popover, Icon, Button },
		props: Object.keys( args ),
		template: `
			<div>
			<div style="height: 80vh; display: flex; justify-content: space-around; align-items: center;">
				<Popover :is-shown="isShown" :react-to-hover="reactToHover" :position="position">
					<template v-slot:target>
						<Button :iconOnly="true" aria-label="show hint">
							Popover trigger
						</Button>
					</template>
					<template v-slot:default>
						<div v-html="content" />
					</template>
				</Popover>
			</div>
			</div>
		`,
	};
}

basic.args = {
	isShown: false,
	reactToHover: true,
	position: 'bottom',
	content: 'Here is some <em>content</em>. You can modify it in the "Controls" section.',
};

basic.argTypes = {
	position: {
		control: {
			type: 'select',
			options: Object.values( PopoverPositions ),
		},
	},
	content: {
		control: {
			type: 'text',
		},
	},
};

export function all(): Component {
	return {
		components: { Popover, Icon, Button },
		data(): { PopoverPositions: string[] } {
			return { PopoverPositions };
		},
		template: `
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(30em, 1fr)); grid-gap: 1em;">
			<div
				style="
						min-height: 10em;
						display: inline-flex;
						justify-content: center;
						align-items: center;
					"
				v-for="value in PopoverPositions"
			>
				<Popover :is-shown="true" :react-to-hover="false" :position="value">
					<template v-slot:target>
						<Button :iconOnly="true" aria-label="show hint" style="min-height: 3em;">
							{{ value }}
						</Button>
					</template>
					<template v-slot:default>
						<div>
							current position: <b><em>{{ value }}</em></b>.
						</div>
					</template>
				</Popover>
			</div>
			</div>
		`,
	};
}
