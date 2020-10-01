import Icon from '@/components/Icon';
import { iconSizes, iconColors, iconTypes } from '@/components/iconProps';
import { Component } from 'vue';

export default {
	component: Icon,
	title: 'Icon',
};

export function all(): Component {
	return {
		data(): object {
			return { iconTypes };
		},
		components: { Icon },
		template: `
			<div>
				<div v-for="type in iconTypes" style="float: left; padding: 20px 50px; color: #555">
					<Icon :type="type" />
					{{ type }}
				</div>
			</div>
		`,
	};
}