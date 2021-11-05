import Icon from '@/components/Icon';
import { iconSizes, IconDirection, iconColors, IconTypes } from '@/components/iconProps';
import { Component } from 'vue';

export default {
	component: Icon,
	title: 'Icon',
};

export function basic( args: object ): Component {
	return {
		components: { Icon },
		props: Object.keys( args ),
		template: '<Icon type="arrownext" :dir="dir"/>',
	};
}

basic.args = {
	dir: IconDirection.LTR,
};

basic.argTypes = {
	dir: {
		control: {
			type: 'radio',
			options: Object.values( IconDirection ),
			default: IconDirection.LTR,
		},
		table: {
			type: {
				summary: 'string',
			},
			defaultValue: {
				summary: 'ltr',
			},
		},
	},
	type: {
		control: false,
	},
	color: {
		control: false,
	},
	size: {
		control: false,
	},
};

export function allTypes(): Component {
	return {
		data(): object {
			return { IconTypes };
		},
		components: { Icon },
		template: `
			<div>
				<div v-for="type in IconTypes" style="display: flex; align-items: center; float: left; padding: 20px 50px; color: #54595d; font-family: sans-serif">
					<Icon :type="type" style="vertical-align: top; padding: 8px;"  />
					{{ type }}
				</div>
			</div>
		`,
	};
}

export function allSizes(): Component {
	return {
		data(): object {
			return { iconSizes };
		},
		components: { Icon },
		template: `
			<div>
				<div v-for="size in iconSizes" style="display: flex; align-items: center; float: left; padding: 20px 50px; color: #54595d; font-family: sans-serif">
					<Icon type="info" :size="size" style="vertical-align: top; padding: 8px;" />
					{{ size }}
				</div>
			</div>
		`,
	};
}
