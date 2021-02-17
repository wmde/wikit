import Popover from '@/components/Popover';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
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
						<Popover :is-shown="isShown" :react-to-hover="reactToHover">
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
	content: 'Here is some <em>content</em>. You can modify it in the "Controls" section.',
};

basic.argTypes = {
	content: {
		control: {
			type: 'text',
		},
	},
};

export function all(): Component {
	return {
		components: { Popover, Icon, Button },
		template: `
					<div>
					<div style="margin-left: 40vw; margin-top: 30vh;">
						<Popover :is-shown="true" :react-to-hover="false">
							<template v-slot:target>
								<Button :iconOnly="true" aria-label="show hint">
									<Icon type="info-outlined" size="medium" style="vertical-align: top;"/>
								</Button>
							</template>
							<template v-slot:default>
								<div>
									Foo bar
								</div>
								<div style="display: block;">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
									ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
						  	cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</template>
				</Popover>
			</div>
			</div>
		`,
	};
}
