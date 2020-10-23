import Icon from '@/components/Icon';
import { iconSizes, iconColors, IconTypes } from '@/components/iconProps';
import { Component } from 'vue';

export default {
	component: Icon,
	title: 'Icon',
};

export function allTypes(): Component {
	return {
		data(): object {
			return { IconTypes };
		},
		components: { Icon },
		template: `
			<div>
				<div v-for="type in IconTypes" style="float: left; padding: 20px 50px; color: #555">
					<Icon :type="type" />
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
				<div v-for="size in iconSizes" style="float: left; padding: 20px 50px; color: #555">
					<Icon type="info" :size="size" />
					{{ size }}
				</div>
			</div>
		`,
	};
}
