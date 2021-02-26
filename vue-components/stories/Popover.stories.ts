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
									<Icon type="info-outlined" size="medium" style="vertical-align: top;"/>
								</Button>
							</template>
							<template v-slot:default>
								<div v-html="content"/>
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
		data() {
			return { PopoverPositions };
		},
		template: `
					<div>
					<div style="margin-left: 40vw; margin-top: 30vh;" v-for="value in PopoverPositions">
						<Popover :is-shown="true" :react-to-hover="false" :position="value">
							<template v-slot:target>
								<Button :iconOnly="true" aria-label="show hint">
									<Icon type="info-outlined" size="medium" style="vertical-align: top;"/>
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
